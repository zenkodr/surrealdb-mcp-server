# Contributing to SurrealDB MCP Server

Thank you for your interest in contributing to the SurrealDB MCP Server! This document provides guidelines and instructions for contributing to this project.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone. Please be kind and constructive in your communications and contributions.

## Getting Started

1. **Fork the repository** on GitHub.
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/surrealdb-mcp-server.git
   cd surrealdb-mcp-server
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Set up your development environment** with the required environment variables (see README.md).

## Development Workflow

1. **Create a new branch** for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/issue-you-are-fixing
   ```

2. **Make your changes** and ensure they follow the project's coding standards.

3. **Test your changes**:
   ```bash
   npm run lint     # Check for code style issues
   npm run format   # Format code according to project standards
   npm run build    # Build the project
   npm test         # Run tests (once implemented)
   ```

4. **Commit your changes** with a clear and descriptive commit message:
   ```bash
   git commit -m "Add feature: description of your changes"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Submit a pull request** to the main repository.

## Pull Request Guidelines

When submitting a pull request:

1. **Describe your changes** clearly in the PR description.
2. **Reference any related issues** using GitHub's issue linking (e.g., "Fixes #123").
3. **Ensure all tests pass** and there are no linting errors.
4. **Include tests** for new features or bug fixes when possible.
5. **Update documentation** if your changes affect the public API or user-facing functionality.

## Reporting Bugs

When reporting bugs:

1. **Use the GitHub issue tracker**.
2. **Describe the bug** with clear steps to reproduce.
3. **Include relevant information** such as:
   - Your environment (Node.js version, OS, etc.)
   - Error messages or logs
   - Expected vs. actual behavior

## Feature Requests

Feature requests are welcome! Please use the GitHub issue tracker and:

1. **Clearly describe the feature** you'd like to see.
2. **Explain why it would be valuable** to the project.
3. **Provide examples** of how it might work if possible.

## Code Style and Standards

This project uses:

- **TypeScript** for type safety
- **ESLint** for code linting
- **Prettier** for code formatting

Please ensure your code follows these standards by running:

```bash
npm run lint
npm run format
```

## Project Structure

The project is organized as follows:

- `src/` - Source code
- `build/` - Compiled JavaScript (generated)
- `assets/` - Static assets like images
- `memory-bank/` - Project documentation and context

## Testing

When adding new features or fixing bugs, please include tests that cover your changes. Once a testing framework is implemented, run tests with:

```bash
npm test
```

## Documentation

Please update documentation when making changes:

- **Code comments** for complex logic
- **JSDoc** for public APIs
- **README.md** for user-facing changes
- **Memory Bank** files for architectural decisions

## License

By contributing to this project, you agree that your contributions will be licensed under the project's [MIT License](LICENSE).

## Questions?

If you have any questions about contributing, please open an issue for discussion.

Thank you for contributing to the SurrealDB MCP Server!
