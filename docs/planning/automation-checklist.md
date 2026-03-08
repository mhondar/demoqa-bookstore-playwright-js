# Automation Checklist

## Purpose

This checklist tracks which documented test cases are already automated in executable Playwright specs and which ones are still pending.

**Legend**
- `[x]` Automated in current specs
- `[ ]` Not automated yet

**Current status**
- Automated: `8 / 77`
- Pending: `69 / 77`

**Automation sources reviewed**
- `tests/auth/login.spec.js`
- `tests/bookstore/bookstore.spec.js`

---

## Auth

### Login

- [x] `TC-CRT-E2E-001` — Valid Login
- [x] `TC-CRT-E2E-002` — Invalid Login
- [x] `TC-REG-E2E-003` — Login with Empty Fields
- [x] `TC-SMK-LG-004` — Validate login page loads
- [x] `TC-SMK-LG-005` — Validate login form controls are visible
- [ ] `TC-CRT-LG-006` — Validate login with valid credentials
- [ ] `TC-CRT-LG-007` — Validate login with invalid user
- [ ] `TC-CRT-LG-008` — Validate login with invalid password
- [ ] `TC-CRT-LG-009` — Validate navigation from login to registration
- [ ] `TC-REG-LG-010` — Validate login with empty username
- [ ] `TC-REG-LG-011` — Validate login with empty password
- [ ] `TC-REG-LG-012` — Validate login with empty fields
- [ ] `TC-CRT-LG-013` — Validate logout
- [ ] `TC-REG-LG-014` — Validate navigation from login back to Book Store

### Registration

- [ ] `TC-SMK-RG-015` — Validate registration page loads
- [ ] `TC-SMK-RG-016` — Validate registration form controls are visible
- [ ] `TC-CRT-RG-017` — Validate navigation from registration back to login
- [ ] `TC-CRT-RG-018` — Validate registration with valid unique data
- [ ] `TC-REG-RG-019` — Validate registration with empty first name
- [ ] `TC-REG-RG-020` — Validate registration with empty last name
- [ ] `TC-REG-RG-021` — Validate registration with empty username
- [ ] `TC-REG-RG-022` — Validate registration with empty password
- [ ] `TC-REG-RG-023` — Validate registration with invalid password format
- [ ] `TC-REG-RG-024` — Validate registration with duplicate username

---

## Book Store

### Book Store

- [x] `TC-SMK-E2E-025` — Access Book Store
- [x] `TC-SMK-E2E-026` — View Book Catalog
- [x] `TC-CRT-E2E-027` — Search Books by Exact Title
- [ ] `TC-CRT-E2E-028` — Search with No Results
- [ ] `TC-SMK-BS-029` — Validate book list loads
- [ ] `TC-SMK-BS-030` — Validate visible number of records
- [ ] `TC-CRT-BS-031` — Validate search with valid text
- [ ] `TC-CRT-BS-032` — Validate search with no matches
- [ ] `TC-CRT-BS-033` — Validate navigation to detail page

### Book Detail

- [ ] `TC-CRT-E2E-034` — Navigate to Book Detail
- [ ] `TC-REG-E2E-035` — Add Book to Collection
- [ ] `TC-REG-E2E-036` — Attempt to Add Book Without Login
- [ ] `TC-CRT-BD-037` — Validate book detail page loads from catalog selection
- [ ] `TC-CRT-BD-038` — Validate detail page shows expected book information
- [ ] `TC-REG-BD-039` — Validate back navigation to Book Store
- [ ] `TC-REG-BD-040` — Validate add book to collection without login is blocked
- [ ] `TC-REG-BD-041` — Validate add book to collection with authenticated user

### Search

- [ ] `TC-SMK-SRCH-042` — Validate search input is visible
- [ ] `TC-CRT-SRCH-043` — Validate search with valid exact title
- [ ] `TC-REG-SRCH-044` — Validate search with valid partial title
- [ ] `TC-REG-SRCH-045` — Validate search by author
- [ ] `TC-CRT-SRCH-046` — Validate search with no matches
- [ ] `TC-REG-SRCH-047` — Validate clearing search restores the list

### Pagination

- [ ] `TC-REG-PAG-048` — Validate pagination controls are visible
- [ ] `TC-REG-PAG-049` — Validate current page indicator value
- [ ] `TC-REG-PAG-050` — Validate previous button behavior on first page
- [ ] `TC-REG-PAG-051` — Validate next button behavior on last page
- [ ] `TC-REG-PAG-052` — Validate pagination remains stable after search interaction

---

## Profile

### User Profile

- [ ] `TC-CRT-E2E-053` — Access Authenticated Profile
- [ ] `TC-CRT-E2E-054` — Logout
- [ ] `TC-SMK-PR-055` — Validate unauthenticated profile access shows guidance
- [ ] `TC-SMK-PR-056` — Validate login link is available from unauthenticated profile
- [ ] `TC-SMK-PR-057` — Validate register link is available from unauthenticated profile
- [ ] `TC-CRT-PR-058` — Validate navigation from unauthenticated profile to login
- [ ] `TC-CRT-PR-059` — Validate navigation from unauthenticated profile to registration
- [ ] `TC-CRT-PR-060` — Validate access to authenticated profile
- [ ] `TC-CRT-PR-061` — Validate viewing book collection
- [ ] `TC-CRT-PR-062` — Validate logout from profile
- [ ] `TC-REG-PR-063` — Validate search within profile collection
- [ ] `TC-REG-PR-064` — Validate profile collection search with no matches
- [ ] `TC-REG-PR-065` — Validate empty collection state is handled safely
- [ ] `TC-REG-PR-066` — Validate navigation from profile back to Book Store

### Remove Books

- [ ] `TC-REG-E2E-067` — Remove Book from Collection
- [ ] `TC-REG-PR-068` — Validate removing a single book
- [ ] `TC-REG-PR-069` — Validate cancel single-book deletion
- [ ] `TC-REG-PR-070` — Validate removing all books if supported
- [ ] `TC-REG-PR-071` — Validate cancel delete-all action
- [ ] `TC-REG-PR-072` — Validate delete controls are safe on empty collection

---

## Security

- [ ] `TC-CRT-E2E-073` — Access Protected Profile Without Authentication
- [ ] `TC-CRT-SEC-074` — Validate redirect to login when unauthenticated
- [ ] `TC-CRT-SEC-075` — Validate restricted actions without authentication
- [ ] `TC-REG-SEC-076` — Validate protected profile content is hidden when unauthenticated
- [ ] `TC-REG-SEC-077` — Validate protected action does not create collection changes when unauthenticated
