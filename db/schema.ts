import { integer, sqliteTable, text, primaryKey } from 'drizzle-orm/sqlite-core';
export const workspaces = sqliteTable('workspaces', {
 owner: text('owner').primaryKey(), revision: integer('revision').notNull().default(0), payload: text('payload').notNull().default('{}'), updatedAt: text('updated_at').notNull().default('')
});
export const workspaceVersions = sqliteTable('workspace_versions', {
 owner:text('owner').notNull(), revision:integer('revision').notNull(), payload:text('payload').notNull(), action:text('action').notNull(), createdAt:text('created_at').notNull()
},t=>[primaryKey({columns:[t.owner,t.revision]})]);
