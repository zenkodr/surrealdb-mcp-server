---
description: Guidelines for continuously improving rules based on emerging code patterns and best practices.
globs: **/*
alwaysApply: true
---

# Guidelines for Continuous Rule Improvement

## Introduction
These guidelines provide a framework for continuously improving rules based on emerging code patterns and best practices.

## Rule Lifecycle Management
The lifecycle of a rule involves several key processes:
- **Improvement Triggers:** Identify new code patterns, repeated implementations, common error patterns, and emerging best practices.
- **Analysis Process:** Compare new code with existing rules, identify patterns to standardize, and monitor test patterns and coverage.
- **Updates and Deprecation:** Manage the lifecycle of rules by adding new rules, modifying existing ones, and deprecating outdated rules.

### Improvement Triggers
- New code patterns not covered by existing rules
- Repeated similar implementations across files
- Common error patterns that could be prevented
- New libraries or tools being used consistently
- Emerging best practices in the codebase

### Analysis Process
- Compare new code with existing rules
- Identify patterns that should be standardized
- Look for references to external documentation
- Check for consistent error handling patterns
- Monitor test patterns and coverage

### Updates and Deprecation
#### Add New Rules When:
- A new technology/pattern is used in 3+ files
- Common bugs could be prevented by a rule
- Code reviews repeatedly mention the same feedback
- New security or performance patterns emerge

#### Modify Existing Rules When:
- Better examples exist in the codebase
- Additional edge cases are discovered
- Related rules have been updated
- Implementation details have changed

#### Deprecate Rules When:
- Patterns become outdated
- Rules no longer apply
- References to deprecated rules need updating
- Migration paths for old patterns are required

## Rule Quality and Maintenance
To ensure high-quality rules, follow these guidelines:
- **Quality Checks:** Ensure rules are actionable, specific, and consistently enforced.
- **Continuous Improvement:** Monitor code reviews, track development questions, and update rules after major refactors.
- **Example Pattern Recognition:** Identify repeated patterns in the codebase and consider adding them to relevant rules.
- **Documentation Updates:** Keep examples synchronized with code and document breaking changes.

### Quality Checks
- Rules should be actionable and specific
- Examples should come from actual code
- References should be up to date
- Patterns should be consistently enforced

### Continuous Improvement
- Monitor code review comments
- Track common development questions
- Update rules after major refactors
- Add links to relevant documentation
- Cross-reference related rules
- See [Self-Improving Reflection](#self-improving-reflection) for broader improvement opportunities based on user interactions and feedback.

  **Self-Improving Reflection Process:**
  1. Offer reflection to the user before using the `attempt_completion` tool for tasks involving user feedback or multiple non-trivial steps.
  2. Review interaction and identify areas for improvement.
  3. Formulate and propose improvements to the rules and guidelines.
  4. Await user action on suggestions.

  **Constraints:**
  - Do not offer reflection if no rules and guidelines were active or the task was very simple.

  **Related Concepts:**
  - Continuous improvement
  - Feedback incorporation

### Example Pattern Recognition
```typescript
// If you see repeated patterns like:
const data = await prisma.user.findMany({
  select: { id: true, email: true },
  where: { status: 'ACTIVE' }
});

// Consider adding to [prisma.md](md:. /.rules/prisma.md):
// - Standard select fields
// - Common where conditions
// - Performance optimization patterns
```

### Documentation Updates
- Keep examples synchronized with code
- Update references to external docs
- Maintain links between related rules
- Document breaking changes
- Ensure examples are up to date
- Provide clear migration paths for deprecated rules
