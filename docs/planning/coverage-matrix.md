# Coverage Matrix

## Purpose

This document maps application functionality to the current scenario inventory.

It helps answer four key questions:
- which functionality is covered by which test cases
- which scenarios belong to smoke vs regression coverage
- which scenarios are happy path vs negative path
- what priority level each scenario has

This matrix is based on:
- `docs/planning/main-scenarios-inventory.md`
- `docs/planning/negative-scenarios-inventory.md`
- `docs/planning/automation-scope.md`

---

## Coverage Matrix

| Functionality | Scenario ID | Test Case IDs | Test Case / Scenario | Suite Class | Path Type | Priority Level | Automation Status | Notes |
|---|---|---|---|---|---|---|---|---|
| Access public Book Store | `BS-001` | [TC-SMK-E2E-025](../test-cases/e2e/e2e-test-cases.md#tc-smk-e2e-025), [TC-SMK-BS-029](../test-cases/bookstore/bookstore-test-cases.md#tc-smk-bs-029) | Access Book Store | Smoke | Happy path | High | Automate now | Stable public read-only entry point |
| View public catalog | `BS-002` | [TC-SMK-E2E-026](../test-cases/e2e/e2e-test-cases.md#tc-smk-e2e-026), [TC-SMK-BS-030](../test-cases/bookstore/bookstore-test-cases.md#tc-smk-bs-030) | View Book Catalog | Smoke | Happy path | High | Automate now | Validates visible book metadata |
| Search catalog by exact title | `BS-003` | [TC-CRT-E2E-027](../test-cases/e2e/e2e-test-cases.md#tc-crt-e2e-027), [TC-CRT-BS-031](../test-cases/bookstore/bookstore-test-cases.md#tc-crt-bs-031), [TC-CRT-SRCH-043](../test-cases/bookstore/search-test-cases.md#tc-crt-srch-043) | Search Books (exact title) | Critical | Happy path | High | Automate now | Stable search baseline |
| Search catalog with no results | `NEG-BS-001` | [TC-CRT-E2E-028](../test-cases/e2e/e2e-test-cases.md#tc-crt-e2e-028), [TC-CRT-BS-032](../test-cases/bookstore/bookstore-test-cases.md#tc-crt-bs-032), [TC-CRT-SRCH-046](../test-cases/bookstore/search-test-cases.md#tc-crt-srch-046) | Search with No Results | Critical | Negative path | High | Automate now | Stable negative read-only check |
| Search catalog by partial title | `BS-003` | [TC-REG-SRCH-044](../test-cases/bookstore/search-test-cases.md#tc-reg-srch-044) | Search Books (partial title) | Regression | Happy path | Medium | Automate now | Broader filtering coverage |
| Search catalog by author | `BS-003` | [TC-REG-SRCH-045](../test-cases/bookstore/search-test-cases.md#tc-reg-srch-045) | Search Books (author) | Regression | Happy path | Medium | Automate now | Depends on stable known data |
| Reset search state | `BS-003` | [TC-REG-SRCH-047](../test-cases/bookstore/search-test-cases.md#tc-reg-srch-047) | Clear search and restore list | Regression | Happy path | Medium | Automate now | Useful for UI state consistency |
| Open book detail from list | `BD-001` | [TC-CRT-E2E-034](../test-cases/e2e/e2e-test-cases.md#tc-crt-e2e-034), [TC-CRT-BS-033](../test-cases/bookstore/bookstore-test-cases.md#tc-crt-bs-033), [TC-CRT-BD-037](../test-cases/bookstore/book-detail-test-cases.md#tc-crt-bd-037), [TC-CRT-BD-038](../test-cases/bookstore/book-detail-test-cases.md#tc-crt-bd-038) | Navigate to Book Detail | Critical | Happy path | High | Automate now | Prefer from-list navigation |
| Access Login page | `LG-001` related | [TC-SMK-LG-004](../test-cases/auth/login-test-cases.md#tc-smk-lg-004), [TC-SMK-LG-005](../test-cases/auth/login-test-cases.md#tc-smk-lg-005) | Login page load and control visibility | Smoke | Happy path | High | Automate now | Covered by login page load checks |
| Login with valid credentials | `LG-001` | [TC-CRT-E2E-001](../test-cases/e2e/e2e-test-cases.md#tc-crt-e2e-001), [TC-CRT-LG-006](../test-cases/auth/login-test-cases.md#tc-crt-lg-006) | Valid Login | Critical | Happy path | High | Automate now | Core authentication flow |
| Login with invalid user | `NEG-LG-001` | [TC-CRT-LG-007](../test-cases/auth/login-test-cases.md#tc-crt-lg-007) | Invalid Login (invalid user) | Critical | Negative path | High | Automate now | Explicit invalid-user coverage |
| Login with invalid password | `NEG-LG-001` | [TC-CRT-LG-008](../test-cases/auth/login-test-cases.md#tc-crt-lg-008) | Invalid Login (invalid password) | Critical | Negative path | High | Automate now | Explicit invalid-password coverage |
| Login with empty fields | `NEG-LG-002` | [TC-REG-E2E-003](../test-cases/e2e/e2e-test-cases.md#tc-reg-e2e-003), [TC-REG-LG-010](../test-cases/auth/login-test-cases.md#tc-reg-lg-010), [TC-REG-LG-011](../test-cases/auth/login-test-cases.md#tc-reg-lg-011), [TC-REG-LG-012](../test-cases/auth/login-test-cases.md#tc-reg-lg-012) | Login with Empty Fields | Regression | Negative path | Medium | Automate now | Validation-focused scenario |
| Navigate from Login to Registration | `LG-001` related | [TC-CRT-LG-009](../test-cases/auth/login-test-cases.md#tc-crt-lg-009) | Login to Registration navigation | Critical | Happy path | Medium | Automate now | Public navigation coverage |
| Navigate from Login to Book Store | `LG-001` related | [TC-REG-LG-014](../test-cases/auth/login-test-cases.md#tc-reg-lg-014) | Login to Book Store navigation | Regression | Happy path | Medium | Automate now | Public navigation coverage |
| Access Registration page | `REG-LOAD` (implicit) | [TC-SMK-RG-015](../test-cases/auth/registration-test-cases.md#tc-smk-rg-015), [TC-SMK-RG-016](../test-cases/auth/registration-test-cases.md#tc-smk-rg-016) | Registration page load | Smoke | Happy path | Medium | Automate now | Needed for form validation coverage |
| Navigate from Registration to Login | `REG-LOAD` related | [TC-CRT-RG-017](../test-cases/auth/registration-test-cases.md#tc-crt-rg-017) | Registration to Login navigation | Critical | Happy path | Medium | Automate now | Stable public path |
| Successful registration | `REG-SUCCESS` (implicit) | [TC-CRT-RG-018](../test-cases/auth/registration-test-cases.md#tc-crt-rg-018) | Controlled successful registration | Critical | Happy path | Medium | Controlled automation | Use dynamic user data, isolate carefully |
| Registration required field checks | `REG-VALIDATION` (implicit) | [TC-REG-RG-019](../test-cases/auth/registration-test-cases.md#tc-reg-rg-019), [TC-REG-RG-020](../test-cases/auth/registration-test-cases.md#tc-reg-rg-020), [TC-REG-RG-021](../test-cases/auth/registration-test-cases.md#tc-reg-rg-021), [TC-REG-RG-022](../test-cases/auth/registration-test-cases.md#tc-reg-rg-022) | Registration field validation | Regression | Negative path | Medium | Automate now | Keep isolated from account-creation flow |
| Registration password / duplicate-user validation | `REG-VALIDATION` (implicit) | [TC-REG-RG-023](../test-cases/auth/registration-test-cases.md#tc-reg-rg-023), [TC-REG-RG-024](../test-cases/auth/registration-test-cases.md#tc-reg-rg-024) | Registration rule validation | Regression | Negative path | Medium | Automate now | Covers invalid password and duplicate username |
| View unauthenticated Profile guidance | `NEG-PR-001` | [TC-SMK-PR-055](../test-cases/profile/profile-test-cases.md#tc-smk-pr-055), [TC-SMK-PR-056](../test-cases/profile/profile-test-cases.md#tc-smk-pr-056), [TC-SMK-PR-057](../test-cases/profile/profile-test-cases.md#tc-smk-pr-057) | Unauthenticated Profile guidance | Smoke | Negative path | High | Automate now | Public, stable, low-risk |
| Navigate from unauthenticated Profile | `NEG-PR-001` related | [TC-CRT-PR-058](../test-cases/profile/profile-test-cases.md#tc-crt-pr-058), [TC-CRT-PR-059](../test-cases/profile/profile-test-cases.md#tc-crt-pr-059) | Profile to Login / Registration navigation | Critical | Negative path | High | Automate now | Recovery paths from protected area |
| Access authenticated Profile | `PR-002` | [TC-CRT-E2E-053](../test-cases/e2e/e2e-test-cases.md#tc-crt-e2e-053), [TC-CRT-PR-060](../test-cases/profile/profile-test-cases.md#tc-crt-pr-060) | Access Authenticated Profile | Critical | Happy path | High | Automate now | Needs controlled session state |
| View book collection in Profile | `PR-002` related | [TC-CRT-PR-061](../test-cases/profile/profile-test-cases.md#tc-crt-pr-061) | Viewing book collection | Critical | Happy path | High | Automate now | Verifies authenticated collection visibility |
| Logout from authenticated Profile | `PR-001` | [TC-CRT-E2E-054](../test-cases/e2e/e2e-test-cases.md#tc-crt-e2e-054), [TC-CRT-LG-013](../test-cases/auth/login-test-cases.md#tc-crt-lg-013), [TC-CRT-PR-062](../test-cases/profile/profile-test-cases.md#tc-crt-pr-062) | Logout | Critical | Happy path | High | Automate now | Must start from authenticated state |
| Search inside Profile collection | `PR-COL-SEARCH` (implicit) | [TC-REG-PR-063](../test-cases/profile/profile-test-cases.md#tc-reg-pr-063), [TC-REG-PR-064](../test-cases/profile/profile-test-cases.md#tc-reg-pr-064) | Search within collection | Regression | Happy path | Medium | Automate later | Requires authenticated seeded state |
| Empty collection handling | `PR-COL-EMPTY` (implicit) | [TC-REG-PR-065](../test-cases/profile/profile-test-cases.md#tc-reg-pr-065) | Empty collection state | Regression | Happy path | Medium | Automate later | Needs controlled empty state |
| Navigate from Profile to Book Store | `PR-002` related | [TC-REG-PR-066](../test-cases/profile/profile-test-cases.md#tc-reg-pr-066) | Profile to Book Store navigation | Regression | Happy path | Medium | Automate now | Public navigation consistency |
| Attempt add book without login | `NEG-BD-001` | [TC-REG-E2E-036](../test-cases/e2e/e2e-test-cases.md#tc-reg-e2e-036), [TC-REG-BD-040](../test-cases/bookstore/book-detail-test-cases.md#tc-reg-bd-040), [TC-REG-SEC-077](../test-cases/security/basic-security-test-cases.md#tc-reg-sec-077) | Attempt to Add Book Without Login | Regression | Negative path | Medium | Controlled automation | Depends on stable detail page interactions |
| Add book to collection | `BD-002` | [TC-REG-E2E-035](../test-cases/e2e/e2e-test-cases.md#tc-reg-e2e-035), [TC-REG-BD-041](../test-cases/bookstore/book-detail-test-cases.md#tc-reg-bd-041) | Add Book to Collection | Regression | Happy path | Medium | Controlled automation | Stateful, isolate from smoke |
| Remove single book from collection | `PR-003` | [TC-REG-PR-068](../test-cases/profile/remove-books-test-cases.md#tc-reg-pr-068) | Remove Book from Collection | Regression | Negative/Stateful control | Medium | Controlled automation | Destructive flow, seeded data required |
| Remove all books from collection | `PR-DEL-ALL` (implicit) | [TC-REG-PR-070](../test-cases/profile/remove-books-test-cases.md#tc-reg-pr-070) | Remove all books from collection | Regression | Negative/Stateful control | Medium | Controlled automation | Destructive and high pollution risk |
| Cancel destructive deletion | `PR-CANCEL-DEL` (implicit) | [TC-REG-PR-069](../test-cases/profile/remove-books-test-cases.md#tc-reg-pr-069), [TC-REG-PR-071](../test-cases/profile/remove-books-test-cases.md#tc-reg-pr-071) | Cancel delete flows | Regression | Negative path | Medium | Automate later | Needs authenticated modal handling |
| Delete controls in empty collection | `PR-COL-EMPTY` (implicit) | [TC-REG-PR-072](../test-cases/profile/remove-books-test-cases.md#tc-reg-pr-072) | Safe delete controls on empty collection | Regression | Negative path | Medium | Automate later | Confirms safe no-data behavior |
| Pagination controls visible | `PG-001` (implicit) | [TC-REG-PAG-048](../test-cases/bookstore/pagination-test-cases.md#tc-reg-pag-048), [TC-REG-PAG-049](../test-cases/bookstore/pagination-test-cases.md#tc-reg-pag-049) | Pagination visible and stable | Regression | Happy path | Low | Automate now | Current env only shows single-page state |
| Pagination boundary behavior | `PG-001` (implicit) | [TC-REG-PAG-050](../test-cases/bookstore/pagination-test-cases.md#tc-reg-pag-050), [TC-REG-PAG-051](../test-cases/bookstore/pagination-test-cases.md#tc-reg-pag-051) | Previous / Next boundary handling | Regression | Happy path | Low | Automate now | Current env only shows single-page state |
| Pagination after search | `PG-001` (implicit) | [TC-REG-PAG-052](../test-cases/bookstore/pagination-test-cases.md#tc-reg-pag-052) | Pagination after search interaction | Regression | Happy path | Low | Automate now | Checks UI stability after filtering |
| Redirect to login when unauthenticated | `NEG-PR-001` related | [TC-CRT-SEC-074](../test-cases/security/basic-security-test-cases.md#tc-crt-sec-074) | Redirect to Login when unauthenticated | Critical | Negative path | High | Automate now | Core access-control baseline |
| Restricted actions without authentication | `NEG-PR-001`, `NEG-BD-001` | [TC-CRT-SEC-075](../test-cases/security/basic-security-test-cases.md#tc-crt-sec-075) | Restricted actions without authentication | Critical | Negative path | High | Automate now | Covers blocked protected actions |
| Hidden protected content when unauthenticated | `NEG-PR-001` related | [TC-REG-SEC-076](../test-cases/security/basic-security-test-cases.md#tc-reg-sec-076) | Protected content hidden unauthenticated | Regression | Negative path | Medium | Automate now | Verifies no protected content leakage |
| Multi-page pagination traversal | `PG-002` (deferred) | none documented yet | True next/previous paging | Documentation-only | Happy path | Low | Defer | Current environment shows `Page 1 of 1` |
| Direct book detail by URL | `BD-URL-001` (deferred) | none documented yet | Direct detail rendering by URL | Documentation-only | Happy path | Low | Defer | Not clearly observable in current fetch |

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

### Security
- covered by: `NEG-PR-001`, `NEG-BD-001`
- current coverage focus: access control, login redirect behavior, and restricted unauthenticated actions

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
