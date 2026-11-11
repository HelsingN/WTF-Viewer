CREATE TABLE `workspace_versions` (
	`owner` text NOT NULL,
	`revision` integer NOT NULL,
	`payload` text NOT NULL,
	`action` text NOT NULL,
	`created_at` text NOT NULL,
	PRIMARY KEY(`owner`, `revision`)
);
--> statement-breakpoint
CREATE TABLE `workspaces` (
	`owner` text PRIMARY KEY NOT NULL,
	`revision` integer DEFAULT 0 NOT NULL,
	`payload` text DEFAULT '{}' NOT NULL,
	`updated_at` text DEFAULT '' NOT NULL
);
