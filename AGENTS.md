# Project Instructions

Respond in Korean. Code, identifiers, and commit messages stay in English.

## Project Facts (verify against the repo if anything looks different)

- Next.js 16 (App Router) + TypeScript + Prisma 7 + SQLite (dev).
- Middleware file: proxy.ts (there is no middleware.ts).
- Prisma client instance: lib/db.ts (driver adapter). Import db from there.
- Prisma client is generated to app/generated/prisma.
- Auth: iron-session. Use `getSession()` from `lib/session.ts` in Node code; `proxy.ts` uses `getProxySession` (Edge-safe).
- Routes: `app/(tabs)/` holds home, closet, coordination, profile (shared tab-bar layout). `app/add-item/` is outside the group on purpose.
- Each page keeps its server logic in its own `action.ts`. Any file whose functions are called from a `"use client"` component needs `"use server"` at the top.
- Data access rules: filter queries by `userId: session.id`. Check item ownership (`item.userId === session.id`) before update/delete. Never select `password` for display data.
- Uploads are written to `public/upload/` (gitignored). Never commit uploaded files.
- LLM calls go through `callOllama` in `app/actions/call_ollama.ts`. LLM output can be truncated or malformed: always strip code fences, wrap `JSON.parse` in try/catch, and `.flat()` id arrays before a Prisma `in` query.
- Shared UI: `FormInput`, `FormSelect`, `ColorPicker`. Reuse them before writing new inputs.

## General

- Inspect existing code (callers, dependencies, Prisma schema) before editing.
- Make the smallest change necessary. Do not touch unrelated files.
- Follow existing patterns, naming, formatting, and error handling. No speculative features or unrelated refactoring.
- If the user is learning a concept, explain it first and show code second.

## Documentation

- For Next.js APIs, read `node_modules/next/dist/docs/` first.
- For library versions or API changes not covered by local docs, use the `search-web` skill (`web_search`, then `fetch_content`) instead of answering from memory.
- When answering a documentation or version question, answer only from content you actually read.
- If you read any web page or doc, end the reply with a "Sources:" section listing exactly those URLs. Skip this section otherwise.

## Approval Required

Make localized changes within the request freely. Ask first before:

- Substantial refactoring, out-of-scope changes, or a different implementation approach
- Deleting files
- Changing the DB schema or running destructive DB operations: `prisma migrate reset`, `prisma db push --force-reset`, deleting `dev.db` or `public/upload/` (inspect schema, migration history, and affected data first)
- Adding, removing, or upgrading dependencies
- Commands that delete data, overwrite files, or are hard to reverse, including `git push --force`, `git clean`, `git reset --hard` (explain the impact first)

## Safety

- Never expose secrets or env values, and never print API keys or session contents in logs. Do not modify `.env` unless necessary and authorized.
- Never discard or overwrite user changes or data.
- Do not commit unless asked. Do not run `git reset` or `git revert`.
- Do not start another dev server. Assume `npm run dev` is already running.

## Verification and Report

- After changes, run `npx tsc --noEmit` and `npm run lint`. No tests are configured; say so instead of implying they ran.
- Do not suppress TS/ESLint errors to pass. Report failures honestly.
- Before significant changes, briefly explain the plan.
- At the end, summarize changed files, checks actually run, results, and anything unverified. Do not claim success without verifying.
