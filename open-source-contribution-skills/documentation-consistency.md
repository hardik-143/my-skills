# Skill: Maintaining Documentation Consistency

## Summary

Ensuring that **all documentation references remain accurate and consistent** when adding, updating, or removing features in a project.

Whenever a feature changes, every related reference across the documentation must be updated to prevent confusion and outdated information.

This practice improves **developer experience, reliability, and maintainability** of open-source projects.

---

# Why Documentation Consistency Matters

When features evolve but documentation is not updated, it can cause:

- incorrect usage by developers
- broken examples
- confusion in configuration options
- outdated API references

Good maintainers ensure **documentation always matches the current codebase**.

---

# When Documentation Must Be Updated

Documentation should be reviewed whenever you:

| Change                    | Required Documentation Update      |
| ------------------------- | ---------------------------------- |
| Add a feature             | Add usage examples and explanation |
| Remove a feature          | Remove all references and examples |
| Rename a property         | Update all occurrences             |
| Change an API shape       | Update examples and configuration  |
| Modify types              | Update TypeScript examples         |
| Add configuration options | Update config tables and docs      |

---

# Example

### Before

```ts
seoFields({
  title: true,
  description: true,
});
```

### After adding a new option

```ts
seoFields({
  title: true,
  description: true,
  canonicalUrl: true,
});
```

Documentation should update:

- README examples
- configuration reference tables
- documentation pages
- code snippets
- changelog

---

# What to Check When Updating Docs

When a feature changes, review these locations:

- README.md
- documentation website
- usage examples
- API reference tables
- configuration snippets
- tutorials or guides
- TypeScript examples
- CHANGELOG entries

---

# Example Scenario

### Feature Update

New field added:

```
canonicalUrl
```

Required documentation updates:

- README configuration example
- API options table
- plugin usage documentation
- changelog entry

---

# Best Practices

### Update docs in the same commit

Avoid updating documentation later.

Good commit:

```
feat: add canonicalUrl field support
docs: update README and config examples
```

---

### Search for all references

Use search tools to locate affected documentation.

Example search:

```
canonicalUrl
seoFields(
```

---

### Keep examples synchronized

If an API changes, update:

- code snippets
- TypeScript types
- tutorials
- sample configurations

---

# Common Mistakes

### Updating code but not docs

Example problem:

Feature added but README still shows old configuration.

---

### Leaving outdated examples

Developers copy documentation examples directly.  
Outdated snippets cause immediate errors.

---

### Updating only one page

Documentation often exists in multiple places:

- README
- docs website
- examples
- changelog

All must stay consistent.

---

# Recommended Workflow

1. Implement feature change
2. Update all related documentation
3. Update examples and snippets
4. Add changelog entry
5. Review documentation for outdated references

---

# Final Principle

> **Documentation should always reflect the current behavior of the code.**

Whenever the code changes, documentation must evolve with it.

---

# Related Skills

- Writing Good README Documentation
- Maintaining a CHANGELOG
- Semantic Versioning
- Managing Open Source Projects
