# Automation Checklist

## Purpose

This checklist tracks which documented test cases are already automated in executable Playwright specs and which ones are still pending.

**Legend**
- `[x]` Automated in current specs
- `[ ]` Not automated yet

**Current status**
- Automated: `40 / 75`
- Pending: `35 / 75`

**Automation sources reviewed**
- `tests/auth/login.spec.js`
- `tests/auth/registration.spec.js`
- `tests/bookstore/book-store.spec.js`
- `tests/bookstore/book-detail.spec.js`

---

## Auth

### Login

- [x] `TC-CRT-E2E-001` — Valid Login
- [x] `TC-CRT-E2E-002` — Invalid Login
- [x] `TC-REG-E2E-003` — Login with Empty Fields
- [x] `TC-SMK-LG-004` — Validate login page loads
- [x] `TC-SMK-LG-005` — Validate login form controls are visible
- [x] `TC-CRT-LG-006` — Validate login with invalid password
- [x] `TC-CRT-LG-007` — Validate navigation from login to registration
- [x] `TC-REG-LG-008` — Validate login with empty username
- [x] `TC-REG-LG-009` — Validate login with empty password
- [x] `TC-REG-LG-010` — Validate login with empty fields (covered by `TC-REG-E2E-003`)
- [x] `TC-CRT-LG-011` — Validate logout
- [x] `TC-REG-LG-012` — Validate navigation from login back to Book Store

### Registration

- [x] `TC-SMK-RG-013` — Validate registration page loads
- [x] `TC-SMK-RG-014` — Validate registration form controls are visible
- [x] `TC-CRT-RG-015` — Validate navigation from registration back to login
- [x] `TC-CRT-RG-016` — Validate registration with valid unique data (implemented with `@error` tag and skipped due to known runtime instability in the public environment)
- [x] `TC-REG-RG-017` — Validate registration with empty first name
- [x] `TC-REG-RG-018` — Validate registration with empty last name
- [x] `TC-REG-RG-019` — Validate registration with empty username
- [x] `TC-REG-RG-020` — Validate registration with empty password
- [x] `TC-REG-RG-021` — Validate registration with invalid password format
- [x] `TC-REG-RG-022` — Validate registration with duplicate username (subject to successful registration submission; because the public registration flow is weak and error-prone, this case has the same effect by functional dependency and skips when CAPTCHA/gate prevents the request from being sent)

---

## Book Store

### Book Store

- [x] `TC-SMK-E2E-023` — Access Book Store
- [x] `TC-SMK-E2E-024` — View Book Catalog
- [x] `TC-CRT-E2E-025` — Search Books by Exact Title
- [x] `TC-CRT-E2E-026` — Search with No Results
- [x] `TC-SMK-BS-027` — Validate book list loads
- [x] `TC-SMK-BS-028` — Validate visible number of records
- [x] `TC-CRT-BS-029` — Validate search with valid text
- [x] `TC-CRT-BS-030` — Validate search with no matches
- [x] `TC-CRT-BS-031` — Validate navigation to detail page

### Book Detail

- [x] `TC-CRT-E2E-032` — Navigate to Book Detail
- [x] `TC-REG-E2E-033` — Add Book to Collection (implemented as controlled automation with explicit API setup and cleanup for the authenticated collection state)
- [x] `TC-REG-E2E-034` — Attempt to Add Book Without Login
- [x] `TC-CRT-BD-035` — Validate book detail page loads from catalog selection
- [x] `TC-CRT-BD-036` — Validate detail page shows expected book information
- [x] `TC-REG-BD-037` — Validate back navigation to Book Store
- [x] `TC-REG-BD-038` — Validate add book to collection without login is blocked
- [x] `TC-REG-BD-039` — Validate add book to collection with authenticated user

### Search

- [ ] `TC-SMK-SRCH-040` — Validate search input is visible
- [ ] `TC-CRT-SRCH-041` — Validate search with valid exact title
- [ ] `TC-REG-SRCH-042` — Validate search with valid partial title
- [ ] `TC-REG-SRCH-043` — Validate search by author
- [ ] `TC-CRT-SRCH-044` — Validate search with no matches
- [ ] `TC-REG-SRCH-045` — Validate clearing search restores the list

### Pagination

- [ ] `TC-REG-PAG-046` — Validate pagination controls are visible
- [ ] `TC-REG-PAG-047` — Validate current page indicator value
- [ ] `TC-REG-PAG-048` — Validate previous button behavior on first page
- [ ] `TC-REG-PAG-049` — Validate next button behavior on last page
- [ ] `TC-REG-PAG-050` — Validate pagination remains stable after search interaction

---

## Profile

### User Profile

- [ ] `TC-CRT-E2E-051` — Access Authenticated Profile
- [ ] `TC-CRT-E2E-052` — Logout
- [ ] `TC-SMK-PR-053` — Validate unauthenticated profile access shows guidance
- [ ] `TC-SMK-PR-054` — Validate login link is available from unauthenticated profile
- [ ] `TC-SMK-PR-055` — Validate register link is available from unauthenticated profile
- [ ] `TC-CRT-PR-056` — Validate navigation from unauthenticated profile to login
- [ ] `TC-CRT-PR-057` — Validate navigation from unauthenticated profile to registration
- [ ] `TC-CRT-PR-058` — Validate access to authenticated profile
- [ ] `TC-CRT-PR-059` — Validate viewing book collection
- [ ] `TC-CRT-PR-060` — Validate logout from profile
- [ ] `TC-REG-PR-061` — Validate search within profile collection
- [ ] `TC-REG-PR-062` — Validate profile collection search with no matches
- [ ] `TC-REG-PR-063` — Validate empty collection state is handled safely
- [ ] `TC-REG-PR-064` — Validate navigation from profile back to Book Store

### Remove Books

- [ ] `TC-REG-E2E-065` — Remove Book from Collection
- [ ] `TC-REG-PR-066` — Validate removing a single book
- [ ] `TC-REG-PR-067` — Validate cancel single-book deletion
- [ ] `TC-REG-PR-068` — Validate removing all books if supported
- [ ] `TC-REG-PR-069` — Validate cancel delete-all action
- [ ] `TC-REG-PR-070` — Validate delete controls are safe on empty collection

---

## Security

- [ ] `TC-CRT-E2E-071` — Access Protected Profile Without Authentication
- [ ] `TC-CRT-SEC-072` — Validate redirect to login when unauthenticated
- [ ] `TC-CRT-SEC-073` — Validate restricted actions without authentication
- [ ] `TC-REG-SEC-074` — Validate protected profile content is hidden when unauthenticated
- [ ] `TC-REG-SEC-075` — Validate protected action does not create collection changes when unauthenticated
