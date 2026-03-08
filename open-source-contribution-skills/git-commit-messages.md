# Skill: Writing Good Git Commit Messages

## Summary

Good Git commit messages clearly explain **what changed and why**.  
They help with debugging, code reviews, collaboration, and generating changelogs.

---

# Commit Message Structure

A good commit message typically has three parts:

```
<type>: <short summary>

(optional explanation)

(optional footer)
```

Example:

```
feat: add SEO health dashboard

Adds a dashboard that shows SEO score based on
title, description, canonical URL and OG image.

Closes #12
```

---

# Use Conventional Commit Types

Many open-source projects follow this format.

| Type     | Meaning                 |
| -------- | ----------------------- |
| feat     | New feature             |
| fix      | Bug fix                 |
| docs     | Documentation change    |
| refactor | Code restructuring      |
| perf     | Performance improvement |
| test     | Tests added or updated  |
| chore    | Maintenance tasks       |

Examples:

```
feat: add SEO health dashboard
fix: resolve OG image validation issue
docs: update README configuration examples
refactor: simplify metadata generator
```

---

# Use Imperative Mood

Write commits like commands.

✅ Correct

```
fix image upload bug
add login validation
update documentation
```

❌ Incorrect

```
fixed image upload bug
adding login validation
updates documentation
```

---

# Keep the Subject Line Short

Follow the **50/72 rule**:

- **50 characters** → subject line
- **72 characters** → body line width

Example:

```
fix: prevent crash when seo title is empty

Previously the preview renderer assumed a title existed.
Now it safely falls back to the document title.
```

---

# Reference Issues

If the commit fixes an issue, reference it.

```
fix: OG image validation skipped nested fields

Closes #42
```

---

# Avoid Vague Messages

Bad:

```
fix bug
update code
misc changes
```

Good:

```
fix: meta description length validation
```

---

# Make Atomic Commits

Each commit should represent **one logical change**.

Bad:

```
feat: add dashboard and fix bugs
```

Good:

```
feat: add SEO health dashboard
fix: correct OG image validation
docs: update dashboard documentation
```

---

# Example Commit History

```
feat: add SEO health dashboard
fix: correct OG image validation
docs: add plugin configuration examples
refactor: simplify metadata generator
```

---

# Commit Workflow

Typical workflow:

```
git add .
git commit -m "feat: add SEO health dashboard"
git push
```

---

# Commit Template

```
<type>: <short summary>

<optional explanation>

<optional footer>
```

Example:

```
feat: add SEO health dashboard

Adds a visual dashboard showing SEO issues
for documents in the project.

Closes #21
```

---

# Final Tips

Good commit messages should be:

- clear
- concise
- meaningful
- consistent

Think of commits as **documentation for future developers**.

---

# Related Skills

- Maintaining a CHANGELOG
- Semantic Versioning
- Writing Good README Documentation
- Managing Open Source Projects
