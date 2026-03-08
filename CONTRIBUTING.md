# Contributing

Perfect. This part matters more than people think, because a framework without conventions becomes inconsistent fast.

Here is a clean convention set for the project.

## Define Conventions

### 1. File Naming Convention

Use **English** for all file and folder names.

#### General rule

Use **PascalCase** for Page Objects and classes, and **kebab-case** for test files and non-class support files.

#### Rules

- **Page Objects / classes** → `PascalCase`
- **Test files** → `kebab-case`
- **Utility files** → `kebab-case`
- **Data files** → `kebab-case`
- **Folders** → `kebab-case`

#### Examples

##### Page Objects

```text
BasePage.js
LoginPage.js
BookStorePage.js
BookDetailPage.js
ProfilePage.js
```

#### Test files

```text
login.spec.js
registration.spec.js
bookstore.spec.js
book-detail.spec.js
profile.spec.js
remove-books.spec.js
security.spec.js
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

- `PascalCase` for **page classes**
- `kebab-case` for **spec files, JSON files, and folders, plain helper modules**

That gives good visual separation.

---

### 2. Test Naming Convention

Test names should describe:

- **what is being tested**
- **under which condition**
- **what is expected**

A good test name should read almost like documentation.

#### File naming format

Test files must use the **suite name**, not the individual test case name.

```text
suite-name.spec.js
```

#### Examples

```text
login.spec.js
bookstore.spec.js
book-detail.spec.js
profile.spec.js
remove-books.spec.js
e2e-regression.spec.js
```

#### File content rule

Each spec file should group the test cases of the same suite.

Examples:

- `tests/auth/login.spec.js` → contains login cases
- `tests/bookstore/bookstore.spec.js` → contains Book Store cases
- `tests/bookstore/book-detail.spec.js` → contains Book Detail cases
- `tests/profile/profile.spec.js` → contains profile visibility/search cases
- `tests/profile/remove-books.spec.js` → contains destructive collection-removal cases
- `tests/regression/e2e-regression.spec.js` → contains truly cross-functional journeys

Avoid creating one spec file per single test case unless there is a very strong technical reason.

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

test('should display no matching records when searching with an invalid keyword', async ({
  page,
}) => {
  // ...
});

test('should redirect unauthenticated users to the login page', async ({
  page,
}) => {
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

#### Recommended relationship between folders, files, and cases

- folder → functional catalog area
- file → suite name inside that area
- test block → individual documented test case

#### Folder strategy rule

Use only **functional folders** under `tests/`.

Allowed top-level test folders should represent business or catalog areas, for example:

- `tests/auth`
- `tests/bookstore`
- `tests/profile`
- `tests/security`
- `tests/regression` only when a case genuinely spans multiple functionalities

Do **not** create top-level folders by execution type such as:

- `tests/smoke`
- `tests/regression`
- `tests/critical`

Execution type must be represented through tags like `@smoke`, `@critical`, and `@regression`, not through folder names.
Use `tests/regression` only as an exception for cross-functional journeys that do not belong naturally to a single functionality folder.

Example:

```text
tests/
  auth/
    login.spec.js
    registration.spec.js
  bookstore/
    bookstore.spec.js
    book-detail.spec.js
    search.spec.js
    pagination.spec.js
  profile/
    profile.spec.js
    remove-books.spec.js
  security/
    security.spec.js
  regression/
    e2e-regression.spec.js
```

### 2.1 Test Case ID Convention

For documentation and traceability, every test case must use this ID format:

```text
TC-<TYPE>-<MODULE>-<NNN>
```

#### Format rules

- `TC` → fixed prefix for test case
- `TYPE` → execution classification
- `MODULE` → functional module or suite
- `NNN` → three-digit sequential identifier

#### Allowed type codes

- `SMK` → smoke
- `CRT` → critical
- `REG` → regression

#### Allowed module codes

- `E2E` → cross-module end-to-end coverage
- `SEC` → basic security scenarios
- `BS` → Book Store
- `BD` → Book Detail
- `SRCH` → Search
- `PAG` → Pagination
- `LG` → Login
- `RG` → Registration
- `PR` → Profile

#### Examples

```text
TC-SMK-BS-001
TC-CRT-BD-002
TC-REG-PR-003
TC-CRT-E2E-071
```

#### Recommendation

- Keep IDs unique across the repository.
- If the catalog is intentionally renumbered, update every reference consistently in docs, specs, and test data.
- When a document groups cross-module journeys, use `E2E` as the module code.
- Reflect negative behavior in the title and linked scenario ID, not by changing the `TYPE` segment.

### 2.2 Test Tag Convention

To keep the folder structure aligned with the catalog hierarchy, test selection must rely on tags instead of separate `smoke/`, `critical/`, or `regression/` folders.

#### Tagging goals

Tags are used to:

- filter tests by execution purpose
- filter tests by functional module
- keep the physical folder structure aligned with the test catalog
- support targeted execution from Playwright CLI

#### Core rule

Every automated test should include:

- **one execution tag**
- **one functional tag**

Optional complementary tags may be added only when they improve selection clarity.

#### Execution tags

Use exactly one of these tags according to the test case `TYPE`:

- `@smoke` → for `SMK` test cases
- `@critical` → for `CRT` test cases
- `@regression` → for `REG` test cases

#### When to use each execution tag

- Use `@smoke` when the test verifies a minimal high-value flow that confirms the application is available and a core feature works.
- Use `@critical` when the test validates an essential business flow that must be stable but is not necessarily part of the smallest smoke subset.
- Use `@regression` when the test expands coverage with broader happy-path, edge, stateful, or negative scenarios.

#### Functional tags

Use one functional tag based on the module under test:

- `@e2e` → truly cross-functional journeys that span multiple functionalities
- `@security` → security and access-control scenarios
- `@bookstore` → Book Store module tests
- `@book-detail` → Book Detail tests
- `@search` → search-focused tests when search is the primary subject
- `@pagination` → pagination-focused tests
- `@login` → login tests
- `@registration` → registration tests
- `@profile` → profile and collection tests

#### When to use each functional tag

- Use `@e2e` only when the implemented test really spans more than one functionality and belongs in `tests/regression`.
- Use the functional tag of the feature actually exercised when an `E2E`-coded case is implemented inside a single functionality folder.
- Use `@bookstore` when the main subject is the catalog page or its base visibility/state.
- Use `@book-detail` when the main subject is the detail page and its actions.
- Use `@search` when search behavior is the main validation target, even if it happens inside Book Store or Profile.
- Use `@pagination` when the primary intent is page navigation across rows.
- Use `@login` for authentication entry tests.
- Use `@registration` for user creation or registration form scenarios.
- Use `@profile` for profile page, collection visibility, logout from profile, and collection management flows.
- Use `@security` for access restrictions, redirects, and protected actions.

#### Optional complementary tags

These tags are optional and should be added only if they help with focused execution:

- `@negative` → negative validation or blocked behavior
- `@authenticated` → requires logged-in state
- `@unauthenticated` → requires anonymous state
- `@destructive` → changes persistent state, such as removing books
- `@mobile` → mobile-specific execution focus when needed

Do not overload tests with too many tags. Prefer the minimum set that improves discoverability.

#### Mapping between ID and execution tag

- `TC-SMK-*` → must include `@smoke`
- `TC-CRT-*` → must include `@critical`
- `TC-REG-*` → must include `@regression`

#### Recommended minimum tagging pattern

```javascript
test('TC-SMK-E2E-023 Access Book Store @smoke @e2e', async ({ page }) => {
  // ...
});

test('TC-CRT-LG-006 Login with valid credentials @critical @login', async ({
  page,
}) => {
  // ...
});

test('TC-REG-PR-066 Remove a single book @regression @profile @authenticated @destructive', async ({
  page,
}) => {
  // ...
});
```

For example, `TC-SMK-E2E-023` is implemented under Book Store because it validates Book Store access only, so the preferred implementation tag is `@smoke @bookstore`, not `@smoke @e2e`.

#### CLI examples

```bash
npx playwright test --grep @smoke
npx playwright test --grep "@critical.*@login"
npx playwright test --grep "@regression.*@profile"
npx playwright test --grep @destructive
```

#### Recommendation

- Keep folders based on functional hierarchy: `tests/auth`, `tests/bookstore`, `tests/profile`, `tests/security`.
- Keep only one top-level folder per functionality.
- Use `tests/regression` only for cases that truly combine multiple functionalities.
- Use tags for execution intent and targeted subsets.
- Keep the tag set stable across the repository.
- Do not create synonymous tags for the same concept.

#### Rule for future implementations

When implementing a new automated test case, always define a **suggested tag set** before or during implementation.

At minimum, every implementation handoff should state:

- the required execution tag
- the required functional tag
- any optional contextual tags that make the case easier to select

Recommended format in implementation notes or task handoff:

```text
Suggested tags:
- required: @smoke @e2e
- optional: @unauthenticated
```

Examples:

- `TC-SMK-E2E-023` → suggested tags: `@smoke @bookstore`
- `TC-CRT-LG-006` → suggested tags: `@critical @login`
- `TC-REG-BD-038` → suggested tags: `@regression @book-detail @negative @unauthenticated`
- `TC-REG-PR-066` → suggested tags: `@regression @profile @authenticated @destructive`

This recommendation should be applied consistently in future implementation discussions so tag decisions stay predictable before coding starts.

---

### 3. Branching Convention

Keep it simple. Fancy Git flows are often overkill for a practice framework.

#### Main branches

- `main` → stable branch
- optional: `develop` → integration branch if later needed

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

- `feature/` for framework or automation work
- `fix/` for locator/test/config fixes
- `chore/` for maintenance
- `docs/` for documentation

That is enough and keeps history readable.

---

### 4. Commit Convention

Use **Conventional Commits**. It makes the history much cleaner and more professional.

#### Format

```text
type: short description
```

#### Main commit types

- `feat:` → new functionality
- `fix:` → bug fix
- `chore:` → maintenance/configuration
- `docs:` → documentation
- `refactor:` → code improvement without behavior change
- `test:` → test-related additions or updates

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

- Use **lowercase**
- Keep message short and clear
- One logical change per commit
- Do not write vague commits like:
  - `update stuff`
  - `changes`
  - `fix`
  - `new test`

Those are useless later.

---

### 5. Project Language Convention

This should be **English everywhere**.

#### Use English for:

- code
- file names
- folder names
- class names
- variables
- functions
- comments
- test names
- documentation
- commit messages
- branch names

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

### 6. Page Object Model Design Convention

Use these rules consistently across all classes in `pages/`.

#### Rules for creating Page Objects

- One page class per functional screen/component.
- Constructor should only keep `page` and initialize locators.
- Use `BasePage` only for shared behavior used by multiple page classes.
- Keep methods small and action-oriented (`clickLogin()`, `searchBook()`, `addToCollection()`).

#### What belongs inside a page class

- Page-specific locators
- Reusable actions and flows on that page
- Small helper getters (for text/state retrieval)

Do not include suite orchestration logic in page classes.

#### Separate locators from actions

Define locators together in constructor or a dedicated `selectors` object, and keep actions in separate methods.

Good pattern:

```javascript
class BookStorePage {
  constructor(page) {
    this.page = page;

    // locators
    this.searchInput = page.getByPlaceholder('Type to search');
    this.bookRows = page.locator('.rt-tr-group');
  }

  // actions
  async search(term) {
    await this.searchInput.fill(term);
  }
}
```

#### Avoid complex assertions inside POM

Keep business assertions in test files (`tests/**/*.spec.js`).

Inside a page class:

- acceptable: return values / expose locator handles
- avoid: multi-step `expect()` validations and business rule assertions

Use test files for validation clarity and better reporting.

---

### 7. Utilities Layer Design Convention

Utilities in `utils/` should support reuse across multiple test modules.

#### Create navigation helpers

Keep shared navigation logic in a dedicated helper module:

- `goToHome(page)`
- `goToLogin(page)`
- `goToBooks(page)`
- `goToProfile(page)`

Use these only for generic routing behavior.

#### Create dynamic data helpers

Use a helper for generating stable dynamic data:

- unique ids
- dynamic users
- dynamic books
- random picks from lists

This avoids duplicate data generation logic in test files.

#### Create common validation helpers

Use lightweight shared validations (visibility, url, text, title) to avoid repetition.

Keep validations generic and framework-level.

#### Create logging helper (optional)

Use a logger only if needed for diagnostics or CI troubleshooting.

- support `debug`, `info`, `warn`, `error`
- respect `LOG_LEVEL`
- avoid noisy logs by default

#### Boundaries

- Utilities should not know business scenarios.
- Utilities should not replace page objects.
- Utilities should not contain full test flows.

---

### 8. Test Data Strategy Convention

Use a clear separation between static, dynamic, credential, and invalid datasets.

#### Static JSON test data

Store stable reusable datasets in `test-data/`.

Examples:

- `users.json`
- `invalid-users.json`
- `books.json`
- `test-scenarios.json`

Use these when assertions depend on known values.

#### Dynamic user data

Use helper functions for runtime-generated data that must be unique.

Examples:

- dynamic usernames
- unique emails
- generated book objects

Keep this logic in utility modules, not inline in test files.

#### Credential management strategy

Never hardcode sensitive credentials in tests.

Use:

- local `.env`
- CI secrets
- centralized access through config

Committed test data files may contain demo values only.

#### Invalid data scenarios

Group negative scenarios in dedicated JSON files so they can be reused across modules.

Examples:

- wrong password
- empty username
- empty password
- invalid email format

This keeps tests small, readable, and consistent.

---
