# Skill: Designing Developer-Friendly APIs

## Summary

Designing APIs that are **simple, predictable, and easy to use**.  
Good API design improves developer experience and reduces integration mistakes.

---

# Goals of Good API Design

A good API should be:

- easy to understand
- consistent
- flexible
- well-documented

Developers should understand how to use it **without reading the source code**.

---

# Prefer Simple Configuration

Example:

```ts
seoFields({
  title: true,
  description: true,
  twitter: true
})
```

Avoid overly complex APIs.

---

# Use Clear Naming

Good:

```
title
description
canonicalUrl
```

Bad:

```
t
desc
canon
```

Clear naming improves readability.

---

# Provide Sensible Defaults

Users should not need to configure everything.

Example:

```ts
seoFields()
```

Defaults can enable common features automatically.

---

# Keep APIs Consistent

Follow consistent patterns across options.

Example:

```
title: boolean
description: boolean
twitter: boolean
```

---

# Final Principle

> A developer should be able to use the API in **a few minutes without confusion**.