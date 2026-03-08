# Skill: Structuring npm Packages

## Summary

Organizing an npm package with a **clean and predictable structure** to improve maintainability and developer experience.

---

# Typical Package Structure

```
package-name/
  src/
  dist/
  types/
  README.md
  CHANGELOG.md
  package.json
  tsconfig.json
```

---

# Folder Purpose

| Folder | Purpose |
|------|------|
| src | source code |
| dist | compiled build output |
| types | TypeScript type definitions |

---

# Entry Points

Define clear entry points in `package.json`.

Example:

```json
{
  "main": "dist/index.js",
  "types": "dist/index.d.ts"
}
```

---

# Include Important Files

Every npm package should include:

- README.md
- CHANGELOG.md
- LICENSE

These help developers understand and trust the package.

---

# Final Principle

> A clean package structure makes the project easier to maintain and adopt.