# Contributing

Perfect. This part matters more than people think, because a framework without conventions becomes inconsistent fast.

Here is a clean convention set for the project.

## Define Conventions

### 1. File Naming Convention

Use **English** for all file and folder names.

#### General rule

Use **PascalCase** for Page Objects and classes, and **kebab-case** for test files and non-class support files.

#### Rules

* **Page Objects / classes** → `PascalCase`
* **Test files** → `kebab-case`
* **Utility files** → `kebab-case`
* **Data files** → `kebab-case`
* **Folders** → `kebab-case`

#### Examples

##### Page Objects

```text
BasePage.js
LoginPage.js
BookStorePage.js
BookDetailPage.js
ProfilePage.js
```

##### Test files

```text
login-valid-user.spec.js
login-invalid-user.spec.js
book-search.spec.js
book-detail-navigation.spec.js
add-book-to-collection.spec.js
remove-book-from-collection.spec.js
```

##### Utility files

```text
test-data-builder.js
date-helper.js
env-helper.js
```

##### Data files

```text
valid-users.json
invalid-users.json
search-terms.json
books-data.json
```

##### Folders

```text
tests/
pages/
utils/
fixtures/
test-data/
auth/
config/
```

#### Recommendation

To avoid chaos, use this exact rule:

* `PascalCase` for **page classes**
* `kebab-case` for **spec files, JSON files, and folders, plain helper modules**

That gives good visual separation.

---

### 2. Test Naming Convention

Test names should describe:

* **what is being tested**
* **under which condition**
* **what is expected**

A good test name should read almost like documentation.

#### File naming format

```text
feature-action-expected-result.spec.js
```

#### Examples

```text
login-valid-credentials.spec.js
login-empty-fields.spec.js
book-search-valid-keyword.spec.js
book-search-no-results.spec.js
profile-remove-book.spec.js
```

#### Test block naming style

Use this pattern:

```javascript
test('should [expected behavior] when [condition]', async ({ page }) => {
  // test steps
});
```

#### Examples

```javascript
test('should login successfully with valid credentials', async ({ page }) => {
  // ...
});

test('should display no matching records when searching with an invalid keyword', async ({ page }) => {
  // ...
});

test('should redirect unauthenticated users to the login page', async ({ page }) => {
  // ...
});
```

#### Suite naming

Use `test.describe()` by module or feature:

```javascript
test.describe('Login', () => {
  // tests
});

test.describe('Book Search', () => {
  // tests
});

test.describe('Profile Management', () => {
  // tests
});
```

---

### 3. Branching Convention

Keep it simple. Fancy Git flows are often overkill for a practice framework.

#### Main branches

* `main` → stable branch
* optional: `develop` → integration branch if later needed

For now, **main + feature branches** is enough.

#### Feature branch naming

Use:

```text
feature/<short-description>
```

#### Bug fix branch naming

```text
fix/<short-description>
```

#### Chore / maintenance branch naming

```text
chore/<short-description>
```

#### Docs branch naming

```text
docs/<short-description>
```

#### Examples

```text
feature/project-setup
feature/playwright-config
feature/login-tests
feature/book-search-tests
feature/profile-page-object

fix/login-locator
fix/flaky-search-test

chore/add-eslint
chore/update-gitignore

docs/update-readme
docs/add-framework-architecture
```

#### Recommendation

For this project, use:

* `feature/` for framework or automation work
* `fix/` for locator/test/config fixes
* `chore/` for maintenance
* `docs/` for documentation

That is enough and keeps history readable.

---

### 4. Commit Convention

Use **Conventional Commits**. It makes the history much cleaner and more professional.

#### Format

```text
type: short description
```

#### Main commit types

* `feat:` → new functionality
* `fix:` → bug fix
* `chore:` → maintenance/configuration
* `docs:` → documentation
* `refactor:` → code improvement without behavior change
* `test:` → test-related additions or updates

#### Examples

```text
chore: initialize project repository
chore: install playwright and project dependencies
chore: add base playwright configuration

docs: add initial project readme
docs: define project conventions

feat: add login page object
feat: add bookstore page object
feat: implement valid login test
feat: implement book search tests

fix: update login selectors
fix: stabilize book search assertion

refactor: extract common navigation methods into base page
test: add negative login scenarios
```

#### Commit writing rules

* Use **lowercase**
* Keep message short and clear
* One logical change per commit
* Do not write vague commits like:

  * `update stuff`
  * `changes`
  * `fix`
  * `new test`

Those are useless later.

---

### 5. Project Language Convention

This should be **English everywhere**.

#### Use English for:

* code
* file names
* folder names
* class names
* variables
* functions
* comments
* test names
* documentation
* commit messages
* branch names

#### Example

Use:

```javascript
const validUser = ...
async login(username, password)
test('should login successfully with valid credentials', ...)
```

Avoid mixing like:

```javascript
const usuarioValido = ...
async iniciarSesion(username, password)
```

That mix always ends up ugly.

---

