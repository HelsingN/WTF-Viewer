"""Runtime configuration. Fail closed. Paper is the only Phase 1 environment."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any, Literal

from pydantic import BaseModel, Field, model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

REPO_ROOT = Path(__file__).resolve().parents[1]
CONFIG_DIR = REPO_ROOT / "config"

PHASE1_LIVE_EXECUTION_LOCKED = True
PAPER_DATABASE_PATH = "data/paper.db"
LIVE_DATABASE_PATH = "data/live.db"
SIM_DATABASE_PATH = "data/sim.db"
IBKR_PAPER_PORT = 7497
IBKR_LIVE_PORT = 7496


class EnvironmentFile(BaseModel):
    name: Literal["paper"] = "paper"
    broker_env: Literal["PAPER"] = "PAPER"
    broker_adapter: Literal["simulated"] = "simulated"
    live_trading_enabled: bool = False
    manual_approval_required: bool = True
    database_path: str = PAPER_DATABASE_PATH
    log_dir: str = "logs/paper"
    order_id_namespace: str = "paper"

    @model_validator(mode="after")
    def reject_live_contamination(self) -> EnvironmentFile:
        if self.live_trading_enabled:
            raise ValueError("environment.json cannot enable live trading")
        if not self.manual_approval_required:
            raise ValueError("manual approval is mandatory in Phase 1")
        if Path(self.database_path).as_posix() != PAPER_DATABASE_PATH:
            raise ValueError(f"PAPER database_path must be {PAPER_DATABASE_PATH}")
        if "live" in Path(self.log_dir).as_posix().lower():
            raise ValueError("PAPER log_dir must not contain 'live'")
        if self.order_id_namespace != "paper":
            raise ValueError("PAPER order_id_namespace must be 'paper'")
        if self.broker_adapter == "simulated" and "live" in SIM_DATABASE_PATH.lower():
            raise ValueError("simulated adapter path cannot contain 'live'")
        return self


class EnvVars(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=str(REPO_ROOT / ".env"),
        env_file_encoding="utf-8",
        extra="ignore",
    )

    BROKER_ENV: Literal["PAPER", "LIVE"] = "PAPER"
    LIVE_TRADING_ENABLED: bool = False
    MANUAL_APPROVAL_REQUIRED: bool = True
    TRADING_HALTED: bool = False
    IBKR_HOST: str = "127.0.0.1"
    IBKR_PORT: int = IBKR_PAPER_PORT
    IBKR_CLIENT_ID: int = 1
    IBKR_ACCOUNT: str = ""
    TZ: str = "UTC"
    DISPLAY_TZ: str = "Asia/Jerusalem"


class RiskLimits(BaseModel):
    max_risk_per_trade: float = Field(gt=0, le=1)
    max_total_open_risk: float = Field(gt=0, le=1)
    max_correlated_ai_risk: float = Field(gt=0, le=1)
    max_new_trades_per_day: int = Field(ge=1)
    cash_buffer_min: float = Field(ge=0, le=1)
    broker_borrowing_allowed: bool
    fx_margin_debit_allowed: bool
    uncovered_option_writing_allowed: bool
    market_order_for_option_spread_allowed: bool
    passive_hold_to_expiration_allowed: bool
    auto_exercise_reliance_allowed: bool
    after_hours_auto_execution_allowed: bool
    broker_permission_expands_strategy: bool
    max_account_borrowed_leverage: float
    defined_risk_options: bool
    naked_short_allowed: bool
    naked_options_allowed: bool
    unknown_max_loss_allowed: bool
    no_averaging_down: bool

    @model_validator(mode="after")
    def enforce_hard_rules(self) -> RiskLimits:
        forbidden_true = {
            "broker borrowing": self.broker_borrowing_allowed,
            "FX margin debit": self.fx_margin_debit_allowed,
            "uncovered option writing": self.uncovered_option_writing_allowed,
            "MARKET orders for option spreads": self.market_order_for_option_spread_allowed,
            "passive hold to expiration": self.passive_hold_to_expiration_allowed,
            "auto-exercise reliance": self.auto_exercise_reliance_allowed,
            "after-hours auto execution": self.after_hours_auto_execution_allowed,
            "broker permission expanding strategy": self.broker_permission_expands_strategy,
            "naked shorts": self.naked_short_allowed,
            "naked options": self.naked_options_allowed,
            "unknown max loss": self.unknown_max_loss_allowed,
        }
        enabled = [name for name, allowed in forbidden_true.items() if allowed]
        if enabled:
            raise ValueError("forbidden: " + ", ".join(enabled))
        if not self.defined_risk_options:
            raise ValueError("defined-risk options are required")
        if self.max_account_borrowed_leverage != 1.0:
            raise ValueError("borrowed leverage must stay 1.0x")
        return self


class RuntimeSettings(BaseModel):
    environment: EnvironmentFile
    env: EnvVars
    risk_limits: RiskLimits
    strategy: dict[str, Any]
    watchlist: dict[str, Any]

    def live_execution_permitted(self) -> bool:
        if PHASE1_LIVE_EXECUTION_LOCKED:
            return False
        return (
            self.env.BROKER_ENV == "LIVE"
            and self.env.LIVE_TRADING_ENABLED
            and self.env.MANUAL_APPROVAL_REQUIRED
            and self.environment.live_trading_enabled
            and self.environment.manual_approval_required
        )

    def assert_safe_to_start(self) -> None:
        if self.env.BROKER_ENV == "LIVE" or self.env.LIVE_TRADING_ENABLED:
            raise RuntimeError("Phase 1 live execution is locked; BROKER_ENV must be PAPER")
        if self.env.BROKER_ENV != self.environment.broker_env:
            raise RuntimeError("BROKER_ENV disagrees with environment.json")
        if self.env.IBKR_PORT == IBKR_LIVE_PORT:
            raise RuntimeError("PAPER config cannot use IBKR live port 7496")
        if Path(self.environment.database_path).as_posix() == LIVE_DATABASE_PATH:
            raise RuntimeError("PAPER runtime cannot use live.db")
        if not self.live_execution_permitted() and self.env.LIVE_TRADING_ENABLED:
            raise RuntimeError("live trading flag set but execution is not permitted")


def _load_json(name: str) -> dict[str, Any]:
    path = CONFIG_DIR / name
    with path.open(encoding="utf-8") as handle:
        data = json.load(handle)
    if not isinstance(data, dict):
        raise ValueError(f"{name} must be a JSON object")
    return data


def load_runtime() -> RuntimeSettings:
    runtime = RuntimeSettings(
        environment=EnvironmentFile.model_validate(_load_json("environment.json")),
        env=EnvVars(),
        risk_limits=RiskLimits.model_validate(_load_json("risk_limits.json")),
        strategy=_load_json("strategy.json"),
        watchlist=_load_json("watchlist.json"),
    )
    runtime.assert_safe_to_start()
    return runtime
