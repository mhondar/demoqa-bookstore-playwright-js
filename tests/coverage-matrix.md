# Coverage Matrix

## Purpose

This document maps application functionality to the current scenario inventory.

It helps answer four key questions:
- which functionality is covered by which test cases
- which scenarios belong to smoke vs regression coverage
- which scenarios are happy path vs negative path
- what priority level each scenario has

This matrix is based on:
- `tests/main-scenarios-inventory.md`
- `tests/negative-scenarios-inventory.md`
- `tests/automation-scope.md`

---

## Coverage Matrix

| Functionality | Scenario ID | Test Case / Scenario | Suite Class | Path Type | Priority Level | Automation Status | Notes |
|---|---|---|---|---|---|---|---|
| Access public Book Store | `BS-001` | Access Book Store | Smoke | Happy path | High | Automate now | Stable public read-only entry point |
| View public catalog | `BS-002` | View Book Catalog | Smoke | Happy path | High | Automate now | Validates visible book metadata |
| Search catalog by exact title | `BS-003` | Search Books (exact title) | Critical | Happy path | High | Automate now | Stable search baseline |
| Search catalog with no results | `NEG-BS-001` | Search with No Results | Critical | Negative path | High | Automate now | Stable negative read-only check |
| Search catalog by partial title | `BS-003` | Search Books (partial title) | Regression | Happy path | Medium | Automate now | Broader filtering coverage |
| Search catalog by author | `BS-003` | Search Books (author) | Regression | Happy path | Medium | Automate now | Depends on stable known data |
| Reset search state | `BS-003` | Clear search and restore list | Regression | Happy path | Medium | Automate now | Useful for UI state consistency |
| Open book detail from list | `BD-001` | Navigate to Book Detail | Critical | Happy path | High | Automate now | Prefer from-list navigation |
| Access Login page | `LG-001` | Valid Login (page access phase) | Smoke | Happy path | High | Automate now | Covered by login page load checks |
| Login with valid credentials | `LG-001` | Valid Login | Critical | Happy path | High | Automate now | Core authentication flow |
| Login with invalid credentials | `LG-002` / `NEG-LG-001` | Invalid Login | Critical | Negative path | High | Automate now | Core negative authentication check |
| Login with empty fields | `NEG-LG-002` | Login with Empty Fields | Regression | Negative path | Medium | Automate now | Validation-focused scenario |
| Navigate from Login to Registration | `LG-001` related | Login to Registration navigation | Critical | Happy path | Medium | Automate now | Public navigation coverage |
| Navigate from Login to Book Store | `LG-001` related | Login to Book Store navigation | Critical | Happy path | Medium | Automate now | Public navigation coverage |
| Access Registration page | `REG-LOAD` (implicit) | Registration page load | Smoke | Happy path | Medium | Automate now | Needed for form validation coverage |
| Registration required field checks | `REG-VALIDATION` (implicit) | Registration field validation | Critical / Regression | Negative path | Medium | Automate now | Keep isolated from account-creation flow |
| Successful registration | `REG-SUCCESS` (implicit) | Controlled successful registration | Regression | Happy path | Medium | Controlled automation | Use dynamic user data, isolate carefully |
| Access Profile without authentication | `NEG-PR-001` | Access Protected Actions Without Authentication | Critical | Negative path | High | Automate now | Stable access-control baseline |
| View unauthenticated Profile guidance | `NEG-PR-001` | Unauthenticated Profile guidance | Smoke | Negative path | High | Automate now | Public, stable, low-risk |
| Access authenticated Profile | `PR-002` | Access Authenticated Profile | Critical | Happy path | High | Automate now | Needs controlled session state |
| Logout from authenticated Profile | `PR-001` | Logout | Critical | Happy path | High | Automate now | Must start from authenticated state |
| Search inside Profile collection | `PR-COL-SEARCH` (implicit) | Search within collection | Regression | Happy path | Medium | Automate later | Requires authenticated seeded state |
| Attempt protected actions without login | `NEG-PR-001` | Protected actions blocked unauthenticated | Critical | Negative path | High | Automate now | Includes direct profile access protection |
| Attempt add book without login | `NEG-BD-001` | Attempt to Add Book Without Login | Regression | Negative path | Medium | Controlled automation | Depends on stable detail page interactions |
| Add book to collection | `BD-002` | Add Book to Collection | Regression | Happy path | Medium | Controlled automation | Stateful, isolate from smoke |
| Remove single book from collection | `PR-003` | Remove Book from Collection | Regression | Negative/Stateful control | Medium | Controlled automation | Destructive flow, seeded data required |
| Remove all books from collection | `PR-DEL-ALL` (implicit) | Remove all books from collection | Regression | Negative/Stateful control | Medium | Controlled automation | Destructive and high pollution risk |
| Cancel destructive deletion | `PR-CANCEL-DEL` (implicit) | Cancel delete flows | Regression | Negative path | Medium | Automate later | Needs authenticated modal handling |
| Pagination controls visible | `PG-001` (implicit) | Pagination visible and stable | Regression | Happy path | Low | Automate now | Current env only shows single-page state |
| Multi-page pagination traversal | `PG-002` (deferred) | True next/previous paging | Documentation-only | Happy path | Low | Defer | Current environment shows `Page 1 of 1` |
| Direct book detail by URL | `BD-URL-001` (deferred) | Direct detail rendering by URL | Documentation-only | Happy path | Low | Defer | Not clearly observable in current fetch |

---

## Classification Rules

### Suite Class
- **Smoke**: stable, fast, low-risk, public or highly reliable checks
- **Critical**: core business flows with high product value
- **Regression**: broader validation, stateful flows, and destructive scenarios
- **Documentation-only**: known functionality not ready for reliable automation yet

### Path Type
- **Happy path**: expected successful business flow
- **Negative path**: invalid input, blocked access, or protected action rejection
- **Negative/Stateful control**: destructive or persistent-data-sensitive behavior requiring controlled setup

### Priority Level
- **High**: business-critical and foundational flows
- **Medium**: important but dependent on additional setup or broader validation
- **Low**: deferred, environment-limited, or lower immediate product value

---

## Coverage Summary by Functionality

### Book Store
- covered by: `BS-001`, `BS-002`, `BS-003`, `BD-001`, `NEG-BS-001`
- current coverage focus: public, stable, read-only flows

### Login
- covered by: `LG-001`, `LG-002`, `NEG-LG-001`, `NEG-LG-002`
- current coverage focus: valid/invalid authentication and validation behavior

### Registration
- covered by: registration page load, validation, and controlled success scenarios
- current coverage focus: validation first, controlled account creation later

### Profile
- covered by: `PR-001`, `PR-002`, `NEG-PR-001`
- current coverage focus: unauthenticated baseline plus controlled authenticated access/logout

### Collection Management
- covered by: `BD-002`, `PR-003`, `NEG-BD-001`
- current coverage focus: regression-only controlled stateful scenarios

---

## Initial Coverage Gaps (Known and Accepted)

These gaps are currently accepted by design:
- direct detail-by-URL validation
- true multi-page pagination traversal
- full mobile parity across all scenarios
- uncontrolled registration success flows
- uncontrolled add/remove collection end-to-end chains

These remain documented but not part of the first stable automation wave.

---

## Recommended Use

Use this matrix when:
- deciding which test to implement next
- checking whether a functionality already has coverage
- deciding if a scenario belongs to smoke, critical, or regression
- explaining why some flows are automated now and others are deferred
