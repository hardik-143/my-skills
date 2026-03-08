# Skill: Writing Documentation Websites

## Summary

Creating clear, structured documentation websites that help developers **quickly understand, install, and use a project**.

Good documentation websites improve:

- developer onboarding
- project adoption
- support requests reduction
- overall developer experience (DX)

---

# Goals of a Good Documentation Website

A documentation website should help users:

- understand what the project does
- install it quickly
- learn how to use it
- explore configuration options
- troubleshoot problems

The goal is to **remove friction for developers**.

---

# Core Documentation Sections

Most documentation websites follow this structure.

```
Introduction
Installation
Quick Start
Configuration
API Reference
Examples
FAQ / Troubleshooting
Changelog
```

Example structure:

```
docs/
  introduction.md
  installation.md
  quick-start.md
  configuration.md
  api.md
  examples.md
```

---

# Start With a Quick Start Guide

The **Quick Start** section is the most important part.

It should allow a developer to start using the tool in **under 2 minutes**.

Example:

```bash
npm install sanity-plugin-seofields
```

```ts
import { seoFields } from "sanity-plugin-seofields";
```

Keep the example minimal and easy to follow.

---

# Provide Clear Code Examples

Developers prefer **working examples over long explanations**.

Example:

```ts
seoFields({
  title: true,
  description: true,
  twitter: true,
});
```

Avoid overly complex examples in early sections.

---

# Document Configuration Options

If your project supports configuration, document every option clearly.

Example table:

| Option      | Type    | Description              |
| ----------- | ------- | ------------------------ |
| title       | boolean | Enables SEO title field  |
| description | boolean | Enables meta description |
| twitter     | boolean | Enables Twitter metadata |

Always include **default values if applicable**.

---

# Keep Documentation Organized

Good documentation follows a logical flow:

1. Introduction
2. Installation
3. Quick Start
4. Advanced Usage
5. API Reference

Avoid mixing beginner and advanced content.

---

# Keep Code and Documentation in Sync

Whenever a feature changes:

- update documentation examples
- update configuration tables
- update API references
- update tutorials

Documentation should always match the **current codebase**.

---

# Use Simple Language

Documentation should be:

- clear
- concise
- easy to scan

Avoid unnecessary complexity.

Good example:

```
This option enables the SEO title field.
```

Bad example:

```
This configuration parameter is responsible for activating
the title-based metadata generation mechanism.
```

---

# Include Visual Structure

Use headings, lists, and sections to improve readability.

Good documentation is **scannable**, not just readable.

Example:

```
## Installation
## Quick Start
## Configuration
## API
```

---

# Tools for Documentation Websites

Popular tools for building documentation sites:

| Tool       | Use Case                   |
| ---------- | -------------------------- |
| Docusaurus | large documentation sites  |
| VitePress  | fast static documentation  |
| Next.js    | custom documentation sites |
| GitBook    | hosted documentation       |

---

# Recommended Workflow

1. Design documentation structure
2. Write installation and quick start
3. Document configuration options
4. Add usage examples
5. Update documentation whenever features change

---

# Final Principle

> Great documentation makes a project easy to adopt.

A developer should be able to **install and use the project without reading the source code**.

---

# Related Skills

- Writing Good README Documentation
- Maintaining Documentation Consistency
- Maintaining a CHANGELOG
- Writing Migration Guides
