# Skill: Managing Package Releases

## Summary

Managing releases in a structured way ensures that users clearly understand **what changed and which version to install**.

---

# Typical Release Workflow

1. Implement feature or fix
2. Update CHANGELOG
3. Bump version
4. Publish package

Example:

```
npm version patch
npm publish
```

---

# Version Types

| Version | Meaning |
|------|------|
| PATCH | bug fixes |
| MINOR | new features |
| MAJOR | breaking changes |

Example:

```
1.0.0 → 1.0.1  bug fix
1.0.1 → 1.1.0  new feature
1.1.0 → 2.0.0  breaking change
```

---

# Tag Releases

Create Git tags for releases.

Example:

```
git tag v1.1.0
git push --tags
```

---

# Final Principle

> Each release should clearly communicate **what changed and why**.