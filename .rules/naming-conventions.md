# Naming Conventions

- Shared/domain types must be in src/types/{domain}/index.ts and imported from there; no local duplication.
- Shared/domain components must be in src/components/{domain}/index.tsx and imported from there; no local duplication.
- Dirs: kebab-case (user-auth/).
- Components: PascalCase (UserProfile.jsx).
- Utils: camelCase (formatDate.js).
- Constants: UPPER_SNAKE_CASE (MAX_RETRY).
- Types: PascalCase (UserData.ts).
- Interfaces: PascalCase (UserData.ts).
- Enums: PascalCase (UserData.ts).

## Related Concepts
- Code organization
- Naming consistency
