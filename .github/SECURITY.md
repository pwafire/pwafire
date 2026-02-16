# Security Policy

## Supported Versions

PWAFire follows semantic versioning. Security updates are provided for the current major version and the previous major version for a limited time after a new major release.

| Version | Supported          | Status                          |
| ------- | ------------------ | ------------------------------- |
| 6.x.x   | :white_check_mark: | Current - Active support        |
| 5.x.x   | :warning:          | Limited support (critical only) |
| < 5.0   | :x:                | No longer supported             |

**Note:** We strongly recommend always using the latest version to benefit from security patches, bug fixes, and new features.

## Security Considerations

PWAFire is a client-side library that provides wrappers around browser PWA APIs. While the library itself doesn't handle sensitive data directly, developers should be aware of:

### Best Practices

- **User Permissions**: Always request permissions responsibly and explain why they're needed
- **Data Validation**: Validate all user input before processing, especially with File System Access and Clipboard APIs
- **HTTPS Required**: PWA APIs require secure contexts (HTTPS). Never use in insecure environments
- **Content Security Policy**: Ensure your CSP allows necessary PWA features without compromising security
- **XSS Prevention**: Sanitize any user-generated content before displaying, especially with notification and share APIs

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security issue, please report it responsibly.

### How to Report

**For sensitive security issues**, please use GitHub's private vulnerability reporting:

1. Go to https://github.com/pwafire/pwafire/security/advisories/new
2. Click "Report a vulnerability"
3. Provide detailed information about the vulnerability
4. We'll acknowledge receipt within 48 hours

**For non-sensitive issues**, you can:
- Open a public issue at https://github.com/pwafire/pwafire/issues
- Tag it with the `security` label

### What to Include

When reporting a vulnerability, please include:

- **Description**: Clear description of the vulnerability
- **Impact**: What could an attacker accomplish?
- **Reproduction**: Step-by-step instructions to reproduce
- **Affected versions**: Which versions are impacted
- **Suggested fix**: If you have ideas (optional)
- **PoC code**: Proof-of-concept code demonstrating the issue (if applicable)

### What to Expect

- **Acknowledgment**: Within 48 hours of your report
- **Initial assessment**: Within 5 business days
- **Status updates**: Every 7 days until resolved
- **Resolution timeline**:
  - Critical vulnerabilities: 7-14 days
  - High severity: 30 days
  - Medium/Low severity: 60-90 days

### If Accepted

1. We'll work on a fix and may contact you for clarification
2. Once fixed, we'll:
   - Release a patched version
   - Publish a security advisory
   - Credit you in the advisory (if desired)
3. We'll coordinate disclosure timing with you

### If Declined

- We'll explain why we don't consider it a vulnerability
- We may still address it as a bug or enhancement
- You're free to disclose publicly after our response

## Security Update Process

When a security vulnerability is fixed:

1. **Patch release**: Published on npm with updated version
2. **Security advisory**: Published on GitHub with CVE (if applicable)
3. **Announcement**: Posted in:
   - GitHub Releases
   - README.md (for critical issues)
   - npm package description
4. **Documentation**: Security best practices updated if needed

## Disclosure Policy

- **Private disclosure period**: 90 days from initial report
- **Coordinated disclosure**: We'll work with you on timing
- **Credit**: We'll credit researchers who report valid issues (unless you prefer anonymity)

## Security Resources

- [PWA Security Best Practices](https://web.dev/security/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

## Contact

For urgent security matters not suitable for GitHub:
- Create a private security advisory (preferred)
- Email: [Add security contact email if available]

Thank you for helping keep PWAFire and its users safe!
