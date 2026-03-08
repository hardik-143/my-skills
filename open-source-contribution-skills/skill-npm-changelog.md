# Skill: Maintaining a CHANGELOG for npm Packages

## Summary

Maintaining a clear `CHANGELOG.md` helps developers quickly understand **what changed between versions** of a package.

Use the **Keep a Changelog** format together with **Semantic Versioning (SemVer)**.

---

# Basic Changelog Format

```md
# Changelog

All notable changes will be documented in this file.

This project follows:
- Keep a Changelog
- Semantic Versioning

---

## [x.y.z] — YYYY-MM-DD

### ✨ Added
- New features

### 🚀 Improved
- Enhancements or performance improvements

### 🐛 Fixed
- Bug fixes

### 🔄 Changed
- Behavior changes (non-breaking)

### ❌ Removed
- Removed or deprecated features

### ⚠ Breaking Changes
- Changes requiring code updates
```

---

# Semantic Versioning

```
MAJOR.MINOR.PATCH
```

| Version | When to bump |
|------|------|
| PATCH | bug fixes |
| MINOR | new backward-compatible features |
| MAJOR | breaking changes |

Example:

```
1.0.0 → 1.0.1  bug fix
1.0.1 → 1.1.0  new feature
1.1.0 → 2.0.0  breaking change
```

---

# What to Document

### ✨ Added
New features, options, utilities.

### 🚀 Improved
Performance or UX improvements.

### 🐛 Fixed
Bug fixes or incorrect behavior.

### 🔄 Changed
Refactors or behavior updates.

### ⚠ Breaking Changes
API changes that require migration.

Example:

```ts
// before
validator(value, answers)

// after
validator(value, question, answers)
```

---

# Best Practices

- Be specific about what changed
- Reference issues or PRs when possible
- Include migration examples for breaking changes
- Keep formatting consistent across versions

Example:

```
- Fixed OG image validation issue (#12)
- Added canonical URL support
```

---

# When to Update the Changelog

Update the changelog when:

- publishing a new version
- merging new features
- fixing bugs
- introducing breaking changes

---

# Publishing Checklist

Before `npm publish`:

- [ ] Add changelog entry
- [ ] Bump version in `package.json`
- [ ] Ensure versions match
- [ ] Document breaking changes
- [ ] Update README if needed

---

# Final Principle

> A good changelog allows developers to quickly see **what changed, why it changed, and how to upgrade**.