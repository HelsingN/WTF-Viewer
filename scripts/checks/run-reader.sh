#!/usr/bin/env bash
set -euo pipefail

check_dir=$(mktemp -d)
port=${WTF_READER_TEST_PORT:-5187}
worker_pid=
cleanup() {
  if [[ -n $worker_pid ]]; then
    kill "$worker_pid" 2>/dev/null || true
    wait "$worker_pid" 2>/dev/null || true
  fi
  rm -rf "$check_dir"
}
trap cleanup EXIT

wrangler=(node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js)
"${wrangler[@]}" d1 execute DB --local --config dist/server/wrangler.json --persist-to "$check_dir/db" --file drizzle/0000_late_dragon_lord.sql
"${wrangler[@]}" dev --config dist/server/wrangler.json --local --persist-to "$check_dir/db" --ip 127.0.0.1 --inspector-port 0 --port "$port" >"$check_dir/worker.log" 2>&1 &
worker_pid=$!
for _ in {1..40}; do
  if curl --fail --silent "http://127.0.0.1:$port/" --output /dev/null; then break; fi
  if ! kill -0 "$worker_pid" 2>/dev/null; then cat "$check_dir/worker.log"; exit 1; fi
  sleep 1
done
if ! node --disable-warning=ExperimentalWarning scripts/checks/reader-browser.mjs "http://127.0.0.1:$port"; then
  tail -60 "$check_dir/worker.log"
  exit 1
fi
