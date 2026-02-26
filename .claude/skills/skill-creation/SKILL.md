---
name: skill-creation
description: Use this skill when the user asks to "create a skill", "make a skill", "add a new skill", "write a skill", "build a skill", "create a command", "make a command", "add a slash command", "create an agent", "build a plugin", "set up a plugin", or needs guidance on skill structure, command format, agent definitions, plugin development, or extending Claude Code capabilities.
version: 1.0.0
---

# Creating Skills, Commands, Agents & Plugins

This skill covers everything needed to extend Claude Code with custom skills, slash commands, agents, and plugins.

## Quick Reference: What to Create

| Need | Create | Location | Invoked by |
|------|--------|----------|------------|
| Specialized knowledge Claude uses automatically | **Skill** | `skills/name/SKILL.md` | Claude (auto) |
| Reusable prompt the user triggers with `/name` | **Command** | `commands/name.md` | User (`/name`) |
| Autonomous subprocess for complex tasks | **Agent** | `agents/name.md` | Claude (auto) |
| Bundle of skills + commands + agents | **Plugin** | `.claude-plugin/plugin.json` | Both |

## Where to Put Files

**Project-level** (this repo only):
```
.claude/skills/    .claude/commands/    .claude/agents/
```

**User-level** (all repos):
```
~/.claude/skills/    ~/.claude/commands/    ~/.claude/agents/
```

Files are auto-discovered — no registration needed.

---

## 1. Creating Skills

Skills are knowledge that Claude loads automatically when the description matches the user's request.

### File: `skills/skill-name/SKILL.md`

```yaml
---
name: skill-name
description: Use this skill when the user asks to "trigger phrase 1", "trigger phrase 2", "trigger phrase 3", mentions "keyword", or needs help with topic-area.
version: 1.0.0
---

# Skill Title

## When This Skill Applies
- Condition 1
- Condition 2

## How to Do the Thing
Step-by-step guidance here...
```

### Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Lowercase identifier with hyphens |
| `description` | Yes | Trigger conditions — the most important field |
| `version` | No | Semantic version (e.g., `1.0.0`) |
| `license` | No | License info or `"Complete terms in LICENSE.txt"` |

### Writing the Description (Critical)

The description determines when Claude activates the skill. It must be specific.

**Do:**
- Include 3-6 specific trigger phrases in quotes
- Use format: `Use this skill when the user asks to "phrase"...`
- Include keywords and topic areas
- Cover variations of how users might ask

**Don't:**
- Be generic: ~~"Provides guidance on development"~~
- Use second person: ~~"You should use this when..."~~

### Skill Content Guidelines

- Write in **imperative form**: "To create a skill, follow these steps..."
- Keep SKILL.md to **1,500-2,000 words** (max 5,000)
- Move detailed references to `references/` subdirectory
- Always mention supporting files so Claude knows they exist

### Directory Structure

```
skills/skill-name/
├── SKILL.md          # Required — core knowledge
├── references/       # Optional — detailed docs loaded on demand
│   ├── patterns.md
│   └── advanced.md
├── examples/         # Optional — working examples
│   └── sample.md
└── scripts/          # Optional — helper scripts
    └── validate.sh
```

### Progressive Disclosure

Skills load in three levels to save context:

1. **Metadata** (always loaded) — name + description
2. **SKILL.md body** (when triggered) — core guidance
3. **Resources** (on demand) — references/, examples/, scripts/

Keep SKILL.md lean and put deep detail in references/.

---

## 2. Creating Commands

Commands are reusable prompts users invoke with `/command-name`.

### File: `commands/command-name.md`

```yaml
---
description: Brief description shown in help (under 60 chars)
argument-hint: [arg1] [arg2]
allowed-tools: Read, Grep, Bash(git:*)
model: sonnet
---

Instructions for Claude about what to do.

Use $ARGUMENTS to access user input.
Use $1, $2 for positional arguments.
```

### Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `description` | Yes | Short help text (under 60 chars) |
| `argument-hint` | No | Documents expected arguments |
| `allowed-tools` | No | Pre-approved tools to reduce prompts |
| `model` | No | `haiku`, `sonnet`, `opus`, or `inherit` |
| `disable-model-invocation` | No | `true` = user-only, Claude cannot invoke |

### Key Concepts

- Command content is **instructions FOR Claude**, not messages to users
- **Arguments**: `$1`, `$2` for positional, `$ARGUMENTS` for all
- **File references**: `@path/to/file` includes file content
- **Dynamic content**: `` !`git status` `` executes and injects output
- **Plugin paths**: `${CLAUDE_PLUGIN_ROOT}` resolves to plugin root

### Tool Restrictions

Pre-approve tools to reduce permission prompts:
```yaml
allowed-tools: Read, Grep, Bash(git add:*), Bash(git commit:*)
```

Patterns: `Bash(git:*)` allows all git subcommands.

---

## 3. Creating Agents

Agents are autonomous subprocesses Claude spawns for complex tasks.

### File: `agents/agent-name.md`

```yaml
---
name: agent-name
description: Use this agent when [conditions].

<example>
Context: [Situation]
user: "[Request]"
assistant: "[Response]"
<commentary>
[Why this agent triggers]
</commentary>
</example>

<example>
Context: [Another situation]
user: "[Another request]"
assistant: "[Response]"
<commentary>
[Explanation]
</commentary>
</example>

model: inherit
color: blue
tools: ["Read", "Grep", "Glob", "Bash"]
---

## System Prompt

You are a specialized agent that...

Your responsibilities:
1. ...
2. ...

Always follow these rules:
- ...
```

### Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | 3-50 chars, lowercase, hyphens only |
| `description` | Yes | Must include 2-4 `<example>` blocks |
| `model` | Yes | `inherit`, `sonnet`, `opus`, or `haiku` |
| `color` | Yes | `blue`, `cyan`, `green`, `yellow`, `magenta`, `red` |
| `tools` | No | Array of allowed tools (default: all) |

### Key Differences from Skills

- Agent descriptions need **concrete `<example>` blocks** (2-4 required)
- The body is a **system prompt** written in **second person** ("You are...", "You will...")
- Agents run as **isolated subprocesses** with their own context
- Restrict tools to **minimum needed** (principle of least privilege)

---

## 4. Creating Plugins

Plugins bundle skills, commands, and agents into a distributable package.

### Structure

```
my-plugin/
├── .claude-plugin/
│   └── plugin.json
├── commands/
│   └── my-command.md
├── skills/
│   └── my-skill/
│       └── SKILL.md
├── agents/
│   └── my-agent.md
└── .mcp.json          # Optional MCP server config
```

### File: `.claude-plugin/plugin.json`

```json
{
  "name": "my-plugin",
  "description": "What this plugin does",
  "version": "1.0.0",
  "author": {
    "name": "Your Name",
    "email": "you@example.com"
  }
}
```

All skills, commands, and agents inside the plugin are auto-discovered.

---

## Checklist for Creating Any Extension

1. **Decide the type** — skill (auto), command (user-invoked), or agent (subprocess)
2. **Choose the location** — project `.claude/` or user `~/.claude/`
3. **Create the directory** — `mkdir -p .claude/skills/my-skill`
4. **Write the file** — SKILL.md, command.md, or agent.md
5. **Write a specific description** — include trigger phrases and keywords
6. **Keep content focused** — one domain per skill, lean body, details in references/
7. **Test it** — ask a question that should trigger the skill and verify it activates

See `references/examples.md` for complete working examples.
