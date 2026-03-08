# Skill: Deprecating Features Safely

## Summary

Deprecation is the process of **phasing out old features without immediately breaking users**.

It allows developers time to migrate to newer alternatives.

---

# Deprecation Process

1. Mark feature as deprecated
2. Provide alternative
3. Warn users
4. Remove in a future major version

---

# Example

Old option:

```ts
seoFields({
  twitterCard: true,
});
```

New option:

```ts
seoFields({
  twitter: true,
});
```

---

# Provide Deprecation Warning

Example:

```ts
console.warn("twitterCard is deprecated. Use twitter instead.");
```

This helps developers update their code.

---

# Document the Deprecation

Update:

- README
- documentation website
- CHANGELOG

Explain the replacement feature.

---

# Final Principle

> Deprecation should guide developers toward better solutions without breaking their applications immediately.
