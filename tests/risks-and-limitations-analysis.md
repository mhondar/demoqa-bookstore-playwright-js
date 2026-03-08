# Risks and Limitations Analysis

## Purpose

This document centralizes the main automation risks and technical limitations identified while analyzing the DemoQA Book Store application.

It is intended to guide:
- test design decisions
- prioritization of stable coverage
- separation between smoke, critical, and regression suites
- mitigation strategies for flaky or stateful behaviors

---

## 1. Unstable UI Elements

The following UI areas may be unstable, generic, or sensitive to layout changes.

### Generic table/list locators
Observed across Book Store and Profile-related areas:
- row containers may be generic
- book data may be rendered in repeated table-like structures
- row parsing can become fragile if selectors are too broad

**Risk:**
- tests may match the wrong row or cell
- small UI changes can break selectors across multiple tests

**Mitigation:**
- prefer accessible selectors when available
- keep fallback CSS selectors centralized inside page objects
- target title links or specific field labels instead of full-row assertions

### Search-driven dynamic visibility
Observed in Book Store search behavior:
- search appears to filter visible rows dynamically
- filtered state may depend on DOM changes rather than navigation or API responses

**Risk:**
- timing-sensitive assertions may become flaky
- visible row count may vary temporarily while filtering settles

**Mitigation:**
- assert on stable visible titles instead of the entire table
- use controlled waits only when necessary
- keep search logic encapsulated in `BookStorePage`

### Responsive/mobile layout changes
Observed or anticipated across modules:
- book rows may compress or restructure on smaller viewports
- navigation links and action buttons may shift position
- delete controls in Profile may become harder to target on mobile

**Risk:**
- selectors valid on desktop may fail on mobile
- visual grouping of fields may change across viewports

**Mitigation:**
- validate responsive locators separately
- avoid brittle positional selectors
- keep mobile coverage in regression, not smoke

### Confirmation dialogs and modals
Expected in destructive Profile flows:
- delete one book
- delete all books

**Risk:**
- modal selectors may be generic
- confirm/cancel flows can become flaky if the modal is animated or delayed

**Mitigation:**
- isolate modal handling inside `ProfilePage`
- validate modal presence before clicking confirm/cancel
- keep destructive tests explicit and independent

---

## 2. CAPTCHA or Validation Barriers

### Registration CAPTCHA status
Current finding:
- CAPTCHA was **not observed** during manual review or page-content fetch for `/register`

**Current interpretation:**
- registration may be automatable end to end in the current environment

**Limitation:**
- this must still be revalidated during real implementation because environment behavior may change

**Mitigation:**
- treat CAPTCHA as a conditional risk, not a confirmed blocker
- keep registration success tests isolated until proven stable

### Validation message inconsistency
Observed or expected in Login and Registration:
- required-field feedback may differ from business-error feedback
- validation messages may appear in generic containers
- client-side and server-side validation may not always behave identically

**Risk:**
- tests may assert the wrong container or wrong message timing
- exact text matching may be brittle

**Mitigation:**
- keep assertions focused on stable, business-relevant messages
- separate empty-field validations from invalid-credential validations
- use central negative test data from `test-data/invalid-users.json`

### Password rule enforcement
Expected in Registration:
- password rules may be enforced with specific complexity requirements
- UI validation may differ from backend validation

**Risk:**
- registration tests may pass locally and fail with different data rules later

**Mitigation:**
- isolate password-rule tests
- use controlled invalid datasets and known good patterns
- avoid overgeneralizing from one successful case

---

## 3. Flows Difficult to Automate

### Authenticated Profile behaviors
Profile collection management depends on a valid logged-in session.

Affected flows:
- access authenticated profile state
- search within collection
- remove one book
- remove all books
- logout from authenticated state

**Difficulty:**
- current observed page state is unauthenticated only
- authenticated controls have not yet been directly confirmed in implementation

**Mitigation:**
- use deterministic credentials
- use pre-authenticated storage state in `auth/` when possible
- implement authenticated and unauthenticated suites separately

### Destructive collection flows
Affected flows:
- removing a single book
- removing all books

**Difficulty:**
- these flows modify persistent state
- they may affect later tests if the collection is not reset

**Mitigation:**
- keep destructive tests out of smoke
- run them in controlled regression suites
- seed and reset collection data before/after execution

### Registration success flow
Affected flow:
- end-to-end successful user registration

**Difficulty:**
- requires unique usernames
- may be blocked in future by CAPTCHA or validation changes
- creates persistent users that affect later repeatability

**Mitigation:**
- use `buildDynamicUser()` for unique usernames
- isolate successful registration from standard smoke suite
- prefer a dedicated test account strategy when possible

### Book detail verification
Affected flow:
- validating direct detail page rendering by URL

**Difficulty:**
- current page fetch did not clearly expose the detail view in a stable way
- direct URL access may not reflect the same behavior as navigation from the list

**Mitigation:**
- prefer opening detail pages from the book list
- validate a few stable metadata fields only
- confirm detail locators directly in browser before broad coverage

### Multi-page pagination behavior
Affected flow:
- moving across multiple pages in Book Store

**Difficulty:**
- current observed dataset shows `Page 1 of 1`
- meaningful multi-page behavior is not currently observable

**Mitigation:**
- limit current automation to pagination visibility and single-page stability
- defer true multi-page tests until the environment supports them

---

## 4. Persistent Data Affecting Repeatability

### Test account state
Affected modules:
- Login
- Profile
- Book collection management

**Risk:**
- the same user may accumulate or lose books between runs
- authenticated flows may behave differently depending on prior state

**Mitigation:**
- maintain deterministic test accounts
- explicitly seed expected state before tests
- clean up after destructive scenarios

### Registered user uniqueness
Affected module:
- Registration

**Risk:**
- repeated runs with fixed usernames will fail on duplicates
- manually created accounts can make tests non-repeatable

**Mitigation:**
- generate unique usernames dynamically
- separate one-time exploratory accounts from automated test accounts

### Collection pollution from add/remove flows
Affected modules:
- Book Detail
- Profile

**Risk:**
- add-to-collection tests and remove-book tests can interfere with each other
- delete-all tests can invalidate later scenarios unexpectedly

**Mitigation:**
- isolate add/remove suites
- avoid chaining destructive and additive tests without reset logic
- run collection tests with explicit setup and cleanup

### Session persistence
Affected modules:
- Login
- Profile
- Logout

**Risk:**
- stored session state may leak between tests
- a user may start already logged in or unexpectedly logged out

**Mitigation:**
- clear browser state between authentication tests
- use controlled storage states intentionally, not implicitly
- keep session assumptions explicit in each suite

---

## 5. Recommended Automation Strategy

### Good candidates for smoke
- Book Store page loads
- Login page loads
- exact title search works
- unauthenticated Profile shows expected guidance
- Book Store to Login navigation works

### Good candidates for critical
- valid login
- invalid login
- open known book detail from list
- authenticated profile access
- controlled logout flow

### Good candidates for regression
- registration validations
- Profile search within collection
- remove one book
- remove all books
- author search
- no-result search
- mobile coverage

### Keep isolated or carefully controlled
- successful registration
- add-to-collection
- delete-all-books
- any flow depending on persistent collection data

---

## 6. Overall Recommendations

- Build page objects around stable, small responsibilities.
- Keep smoke tests read-only and low-risk.
- Treat authenticated and destructive flows as controlled regression coverage.
- Use static JSON for deterministic assertions and dynamic data only when uniqueness is required.
- Revalidate uncertain areas directly in browser before implementing broad assertions.

This document should evolve as more real locators and authenticated flows are implemented.
