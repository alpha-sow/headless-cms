# Contributing to Headless CMS

Thank you for your interest in contributing to our headless CMS project! We welcome contributions from the community and are excited to work with you.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Issue Reporting](#issue-reporting)

## 📜 Code of Conduct

This project adheres to a code of conduct that we expect all contributors to follow. Please be respectful, inclusive, and constructive in all interactions.

## 🚀 Getting Started

### Prerequisites

Before contributing, ensure you have:

- **Java 21** or higher
- **Node.js 18+** and npm/pnpm
- **PostgreSQL** database
- **Docker** and Docker Compose
- **Git** for version control
- Your preferred IDE (IntelliJ IDEA, VS Code, etc.)

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/headless-cms.git
   cd headless-cms
   ```

2. **Backend Setup**
   ```bash
   # Ensure PostgreSQL is running
   # Update database configuration in src/main/resources/application-dev.yaml
   ./mvnw spring-boot:run
   ```

3. **Frontend Setup**
   ```bash
   cd frontend/
   npm install
   npm run dev
   ```

4. **Docker Setup (Alternative)**
   ```bash
   docker compose up --build -d
   ```

## 🤝 How to Contribute

### Types of Contributions

We welcome various types of contributions:

- 🐛 **Bug fixes**
- ✨ **New features**
- 📚 **Documentation improvements**
- 🎨 **UI/UX enhancements**
- 🚀 **Performance optimizations**
- 🔧 **Refactoring**
- 🧪 **Tests**

### Finding Work

- Check our [GitHub Issues](../../issues) for open tasks
- Look for issues labeled `good first issue` for beginners
- Issues labeled `help wanted` are great for contributors
- Feel free to propose new features or improvements

## 🔄 Pull Request Process

### Before You Start

1. **Create an Issue**: For significant changes, create an issue first to discuss the approach
2. **Check Existing Work**: Ensure no one else is working on the same feature
3. **Fork the Repository**: Create your own fork to work on

### Development Workflow

1. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```

2. **Make Changes**
   - Follow our coding standards
   - Add tests for new functionality
   - Update documentation as needed

3. **Test Your Changes**
   ```bash
   # Backend tests
   ./mvnw test
   
   # Frontend tests (if available)
   cd frontend/
   npm run test
   
   # Integration tests
   docker compose up --build -d
   ```

4. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add user profile management feature"
   ```
   
   Use conventional commit messages:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation
   - `style:` for formatting changes
   - `refactor:` for code refactoring
   - `test:` for adding tests
   - `chore:` for maintenance tasks

5. **Push and Create PR**
   ```bash
   git push origin your-branch-name
   ```
   
   Then create a Pull Request on GitHub.

### Pull Request Guidelines

- **Title**: Use a clear, descriptive title
- **Description**: Provide a detailed description of changes
- **Link Issues**: Reference any related issues (`Fixes #123`)
- **Screenshots**: Include screenshots for UI changes
- **Breaking Changes**: Clearly document any breaking changes

## 🎯 Coding Standards

### Backend (Java/Spring Boot)

- Follow standard Java naming conventions
- Use Spring Boot best practices
- Implement proper error handling
- Add JavaDoc for public methods
- Follow RESTful API design principles

```java
@RestController
@RequestMapping("/api/users")
@Validated
public class UserController {
    
    /**
     * Retrieves a paginated list of users.
     * @param pageable pagination parameters
     * @return paginated user response
     */
    @GetMapping
    @IsAdmin
    public ResponseEntity<PageResponse<UserDTO>> getUsers(Pageable pageable) {
        // Implementation
    }
}
```

### Frontend (Vue.js/TypeScript)

- Use TypeScript for type safety
- Follow Vue 3 Composition API patterns
- Use Pinia for state management
- Implement proper component structure
- Add proper TypeScript interfaces

```vue
<script setup lang="ts">
interface Props {
  userId: string
  readonly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  readonly: false
})

const emit = defineEmits<{
  save: [user: User]
  cancel: []
}>()
</script>
```

### General Guidelines

- **Code Formatting**: Use consistent indentation (2 spaces for frontend, 4 for backend)
- **Naming**: Use descriptive variable and function names
- **Comments**: Add comments for complex logic only
- **Security**: Never commit secrets or sensitive data
- **Performance**: Consider performance implications of changes

## 🧪 Testing Guidelines

### Backend Tests

- Write unit tests for service layer
- Add integration tests for controllers
- Use meaningful test method names
- Test both happy path and error scenarios

```java
@Test
void shouldCreateUserSuccessfully() {
    // Given
    CreateUserRequest request = new CreateUserRequest("john@example.com", "John Doe");
    
    // When
    UserDTO result = userService.createUser(request);
    
    // Then
    assertThat(result.email()).isEqualTo("john@example.com");
    assertThat(result.fullName()).isEqualTo("John Doe");
}
```

### Frontend Tests

- Write component tests for Vue components
- Test user interactions and state changes
- Use meaningful test descriptions

## 🐛 Issue Reporting

When reporting issues, please:

1. **Use Issue Templates**: Choose the appropriate template (Bug Report, Feature Request, or General Issue)
2. **Provide Details**: Include steps to reproduce, environment info, and error logs
3. **Search First**: Check if the issue already exists
4. **Be Specific**: Use clear, descriptive titles

## 📚 Documentation

When contributing documentation:

- Use clear, concise language
- Include code examples where helpful
- Update relevant sections when adding features
- Maintain consistency with existing documentation

## 🎉 Recognition

Contributors are recognized in several ways:

- Listed in our contributors section
- Mentioned in release notes for significant contributions
- Invited to join our contributor community

## 💬 Getting Help

If you need help:

- 📖 Check the [README](README.md) and documentation
- 🔍 Search existing [GitHub Issues](../../issues)
- 💬 Create a new issue using the "General Issue" template
- 📧 Reach out to maintainers

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the [MIT License](LICENSE.md).

---

Thank you for contributing to Headless CMS! 🚀