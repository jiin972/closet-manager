<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project Instructions

## General

- Read this file before making changes.
- Inspect existing code before creating or modifying files.
- Make the smallest change necessary to complete the task.
- Do not modify unrelated files.
- Preserve existing user changes.

## Project Structure

- This is a Next.js application using TypeScript.
- Use the existing project structure and patterns whenever possible.
- Reuse existing components, utilities, and modules instead of creating duplicates.

## Documentation

- Prefer documentation available in the local project over information from memory.
- For Next.js APIs, read the relevant documentation in `node_modules/next/dist/docs/` before writing code when the API may have changed.
- Use relevant project Skills when they apply to the task.
- Inspect existing source code and configuration before introducing a new pattern or dependency.

## Database

- This project uses Prisma.
- Inspect the existing Prisma schema and database utilities before modifying database-related code.
- Use the existing Prisma patterns and configuration.
- Do not modify the database schema unless the task requires it.

## Before Editing

1. Understand the relevant existing code.
2. Identify related files, dependencies, and callers.
3. Read relevant documentation and Skills when necessary.
4. Make the smallest appropriate change.
5. Verify the changes after editing.

## Verification

- Run relevant type checking, linting, and tests after making changes when available.
- If verification fails, investigate and report the failure instead of hiding it.
- Do not claim a task is complete if important verification has failed.

## Git

- Do not commit changes unless explicitly requested.
- Do not reset, revert, or discard existing user changes.
- Do not modify unrelated changes in the working tree.

## Communication

- Before making significant changes, briefly explain the planned approach.
- After making changes, summarize what changed and how it was verified.

## Scope and Approval

- Treat the user's request as the authorized scope of work. Make necessary, localized file changes without asking for approval for every edit.
- If the task requires substantial refactoring, changes outside the requested scope, or a materially different implementation approach, explain the plan and obtain approval before proceeding.
- Obtain explicit approval before deleting files, changing the database schema, running destructive or difficult-to-reverse database operations, adding or removing dependencies, or changing major dependency versions.
- Never overwrite or discard user data or existing user changes without explicit approval.

## Dependencies and Commands

- Do not install, remove, or upgrade packages unless explicitly requested or approved.
- Before running commands that may delete data, overwrite files, modify production resources, or cause other irreversible effects, explain the impact and obtain approval.
- Prefer existing dependencies and project utilities over introducing new ones.

## Database and Environment

- Never expose secrets, credentials, session keys, or environment variable values in logs, documentation, or responses.
- Do not modify `.env` files or other secret-bearing configuration unless necessary and authorized.
- Before applying database migrations, inspect the schema, migration history, and affected data. Obtain approval before applying changes that could cause data loss or affect production data.

## Code Quality

- Follow the existing naming conventions, formatting, component patterns, and error-handling practices.
- Avoid unnecessary abstractions, duplicate utilities, speculative features, and unrelated refactoring.
- Do not suppress TypeScript errors, ESLint warnings, or failing tests merely to make verification pass. Explain unresolved issues clearly.

## Completion Report

- Summarize the files changed and the purpose of each change.
- Report the checks actually performed and their results.
- Explicitly disclose any unverified behavior, failed checks, or remaining risks.
- Do not claim that a test, build, migration, or other operation succeeded unless its result was verified.
