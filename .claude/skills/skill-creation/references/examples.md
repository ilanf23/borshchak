# Complete Working Examples

## Example Skill: Code Review Standards

```
skills/code-review/SKILL.md
```

```yaml
---
name: code-review
description: Use this skill when the user asks to "review code", "check code quality", "review my PR", "look at my changes", mentions "code review", or needs guidance on code quality, best practices, or standards.
version: 1.0.0
---

# Code Review Standards

## When This Applies
- Reviewing pull requests or diffs
- Checking code quality before commit
- Suggesting improvements to existing code

## Review Checklist

### Correctness
- Does the code do what it claims?
- Are edge cases handled?
- Are there off-by-one errors?

### Security
- No hardcoded secrets or credentials
- Input validation at system boundaries
- No SQL injection, XSS, or command injection

### Readability
- Clear naming for variables and functions
- Functions do one thing well
- No unnecessary complexity

### Performance
- No N+1 queries
- Appropriate data structures
- No unnecessary allocations in hot paths
```

---

## Example Command: Deploy

```
commands/deploy.md
```

```yaml
---
description: Deploy the application to a target environment
argument-hint: [environment]
allowed-tools: Bash(git:*), Bash(npm:*), Bash(docker:*)
disable-model-invocation: true
---

Deploy the application to the specified environment.

Environment is: $1 (default to "staging" if not provided)

Steps:
1. Run `git status` to verify clean working tree
2. Run the test suite with `npm test`
3. If tests pass, build with `npm run build`
4. Deploy using `docker compose -f docker-compose.$1.yml up -d`
5. Verify the deployment is healthy
6. Report the result to the user
```

---

## Example Agent: Test Runner

```
agents/test-runner.md
```

```yaml
---
name: test-runner
description: Use this agent to run and analyze test results.

<example>
Context: User has made code changes and wants to verify
user: "Run the tests"
assistant: "I'll spawn the test-runner agent to execute and analyze the test suite."
<commentary>
Direct request to run tests triggers this agent.
</commentary>
</example>

<example>
Context: User is fixing a bug and needs to verify the fix
user: "Check if my fix works"
assistant: "Let me use the test-runner agent to verify your changes pass all tests."
<commentary>
Verification requests related to testing trigger this agent.
</commentary>
</example>

model: inherit
color: green
tools: ["Bash", "Read", "Grep", "Glob"]
---

## System Prompt

You are a test execution and analysis agent.

Your responsibilities:
1. Identify the project's test framework and run command
2. Execute the full test suite or targeted tests
3. Parse test output for failures and errors
4. Provide clear summaries of what passed and what failed
5. For failures, identify the root cause and suggest fixes

Always:
- Run tests from the project root
- Report total pass/fail/skip counts
- Quote the exact error messages for failures
- Suggest targeted re-runs for failed tests
```

---

## Example Skill with References

```
skills/api-design/
├── SKILL.md
└── references/
    ├── rest-patterns.md
    └── error-handling.md
```

**SKILL.md:**
```yaml
---
name: api-design
description: Use this skill when the user asks to "design an API", "create endpoints", "structure a REST API", mentions "API design", or needs guidance on HTTP methods, URL patterns, request/response formats, or error handling.
version: 1.0.0
---

# API Design Guide

## Core Principles
- Use nouns for resources, not verbs
- Use HTTP methods correctly (GET=read, POST=create, PUT=replace, PATCH=update, DELETE=remove)
- Return appropriate status codes
- Version your API

## URL Patterns
- Collections: `GET /users`
- Single resource: `GET /users/:id`
- Nested resources: `GET /users/:id/posts`
- Actions (when needed): `POST /users/:id/activate`

For detailed REST patterns, see `references/rest-patterns.md`.
For error handling standards, see `references/error-handling.md`.
```

---

## Anti-Patterns to Avoid

### Bad Description (Too Generic)
```yaml
description: Provides guidance on building software.
```

### Bad Description (Second Person)
```yaml
description: You should use this skill when you need help with testing.
```

### Good Description
```yaml
description: Use this skill when the user asks to "write tests", "add test coverage", "create unit tests", "set up testing", mentions "jest", "pytest", "vitest", or needs guidance on test structure, mocking, assertions, or test-driven development.
```

### Bad Skill Body (Too Wordy)
```markdown
You should consider using dependency injection because it makes your code
more testable. What you want to do is...
```

### Good Skill Body (Imperative, Direct)
```markdown
## Dependency Injection

To make code testable, inject dependencies rather than importing them directly:

1. Accept dependencies as constructor/function parameters
2. Define interfaces for external services
3. Provide test doubles (mocks/stubs) in tests
```
