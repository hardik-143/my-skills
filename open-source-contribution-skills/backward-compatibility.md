# Skill: Maintaining Backward Compatibility

## Summary

Ensuring new versions of a library **do not break existing user code** whenever possible.

Backward compatibility helps maintain trust and stability for users.

---

# What is Backward Compatibility

Existing code using the package should continue working after an update.

Example:

Before:

```ts
seoFields({
  title: true,
});
```

After update — still works.

---

# Strategies

### Avoid removing existing options

Instead of removing options, keep them working.

---

### Add new features without breaking old APIs

Example:

```ts
seoFields({
  title: true,
  description: true,
});
```

Old configs should remain valid.

---

# When Breaking Changes Are Necessary

If breaking changes are required:

- bump **major version**
- provide migration guide
- clearly document changes

---

# Final Principle

> Never break existing users unless absolutely necessary.
