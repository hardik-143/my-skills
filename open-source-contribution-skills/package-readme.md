# Skill: Writing Package-Quality README.md

## Summary

Creating clear and structured `README.md` files that help developers **understand, install, and use a package quickly**.

A good README improves:

- developer onboarding
- package adoption
- documentation clarity
- overall developer experience (DX)

---

# Goals of a Good README

A README should help users quickly:

- understand what the package does
- install it
- use it with simple examples
- explore configuration options

The goal is to **get developers started within minutes**.

---

# Recommended README Structure

Most npm packages follow this structure.

```
# Package Name

Short description

## Features

## Installation

## Quick Start

## Usage

## Configuration

## API

## Contributing

## License
```

---

# Provide Quick Installation

Example:

```bash
npm install your-package
```

or

```bash
pnpm add your-package
```

---

# Include a Quick Start Example

Developers should see a working example immediately.

```ts
import { seoFields } from "sanity-plugin-seofields";

seoFields({
  title: true,
  description: true,
});
```

Keep the example simple.

---

# Document Configuration Options

If your package has options, explain them clearly.

| Option      | Type    | Description              |
| ----------- | ------- | ------------------------ |
| title       | boolean | Enables SEO title field  |
| description | boolean | Enables meta description |

---

# Keep README Updated

Whenever features change:

- update examples
- update configuration tables
- update API references

Documentation should always reflect the **current version of the package**.

---

# Best Practices

- Keep explanations short and clear
- Provide real code examples
- Use headings and sections
- Avoid unnecessary complexity

---

# Final Principle

> A developer should understand how to install and use the package **within the first few minutes of reading the README**.

---

# Related Skills

- Writing Documentation Websites
- Maintaining Documentation Consistency
- Maintaining a CHANGELOG
- Semantic Versioning
