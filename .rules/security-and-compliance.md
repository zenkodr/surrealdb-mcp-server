# Security and Compliance

## Security Checklist (for PRs & Reviews)
- [ ] All secrets are stored in environment variables
- [ ] All user/client inputs are validated and sanitized
- [ ] Authentication and authorization checks are present
- [ ] Sensitive data is encrypted at rest and in transit
- [ ] Data Access Layer (DAL) is used for all DB operations
- [ ] Security events are logged
- [ ] Dependencies have been checked for vulnerabilities (e.g., via `npm audit`)
- [ ] Incident response plan is referenced and up-to-date

## Incident Response
- In case of a security incident or suspected breach:
  1. Notify project maintainers immediately
  2. Follow the incident response plan (see `docs/incident-response.md` if present)
  3. Document the event and actions taken in `progress.md`

---

- Store secrets in environment variables.
- Sanitize inputs; implement authentication and authorization checks.
- Encrypt sensitive data; use Data Access Layer (DAL).
- Log security events; have an incident plan.
- Implement regular security audits of dependencies.

## Related Concepts
- Security best practices
- Compliance
