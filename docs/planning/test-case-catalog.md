# Test Case Catalog

## Purpose

This document centralizes the full inventory of documented test cases.

It provides a quick reference for:
- global test case IDs
- test case titles
- module grouping
- traceability across planning and implementation documents

The catalog is aligned with the current global numbering strategy used in `docs/test-cases/`.

---

## General

- `TC-SMK-E2E-001` — Access Book Store
- `TC-SMK-E2E-002` — View Book Catalog
- `TC-CRT-E2E-003` — Search Books by Exact Title
- `TC-CRT-E2E-004` — Search with No Results
- `TC-CRT-E2E-005` — Navigate to Book Detail
- `TC-CRT-E2E-006` — Valid Login
- `TC-CRT-E2E-007` — Invalid Login
- `TC-REG-E2E-008` — Login with Empty Fields
- `TC-CRT-E2E-009` — Access Authenticated Profile
- `TC-CRT-E2E-010` — Access Protected Profile Without Authentication
- `TC-CRT-E2E-011` — Logout
- `TC-REG-E2E-012` — Add Book to Collection
- `TC-REG-E2E-013` — Attempt to Add Book Without Login
- `TC-REG-E2E-014` — Remove Book from Collection

---

## Auth

### Login

- `TC-SMK-LG-015` — Validate login page loads
- `TC-SMK-LG-016` — Validate login form controls are visible
- `TC-CRT-LG-017` — Validate login with valid credentials
- `TC-CRT-LG-018` — Validate login with invalid user
- `TC-CRT-LG-019` — Validate login with invalid password
- `TC-CRT-LG-020` — Validate navigation from login to registration
- `TC-REG-LG-021` — Validate login with empty username
- `TC-REG-LG-022` — Validate login with empty password
- `TC-REG-LG-023` — Validate login with empty fields
- `TC-CRT-LG-024` — Validate logout
- `TC-REG-LG-025` — Validate navigation from login back to Book Store

### Registration

- `TC-SMK-RG-026` — Validate registration page loads
- `TC-SMK-RG-027` — Validate registration form controls are visible
- `TC-CRT-RG-028` — Validate navigation from registration back to login
- `TC-CRT-RG-029` — Validate registration with valid unique data
- `TC-REG-RG-030` — Validate registration with empty first name
- `TC-REG-RG-031` — Validate registration with empty last name
- `TC-REG-RG-032` — Validate registration with empty username
- `TC-REG-RG-033` — Validate registration with empty password
- `TC-REG-RG-034` — Validate registration with invalid password format
- `TC-REG-RG-035` — Validate registration with duplicate username

---

## Book Store

### Book Store

- `TC-SMK-BS-036` — Validate book list loads
- `TC-SMK-BS-037` — Validate visible number of records
- `TC-CRT-BS-038` — Validate search with valid text
- `TC-CRT-BS-039` — Validate search with no matches
- `TC-CRT-BS-040` — Validate navigation to detail page

### Book Detail

- `TC-CRT-BD-041` — Validate book detail page loads from catalog selection
- `TC-CRT-BD-042` — Validate detail page shows expected book information
- `TC-REG-BD-043` — Validate back navigation to Book Store
- `TC-REG-BD-044` — Validate add book to collection without login is blocked
- `TC-REG-BD-045` — Validate add book to collection with authenticated user

### Search

- `TC-SMK-SRCH-046` — Validate search input is visible
- `TC-CRT-SRCH-047` — Validate search with valid exact title
- `TC-REG-SRCH-048` — Validate search with valid partial title
- `TC-REG-SRCH-049` — Validate search by author
- `TC-CRT-SRCH-050` — Validate search with no matches
- `TC-REG-SRCH-051` — Validate clearing search restores the list

### Pagination

- `TC-REG-PAG-052` — Validate pagination controls are visible
- `TC-REG-PAG-053` — Validate current page indicator value
- `TC-REG-PAG-054` — Validate previous button behavior on first page
- `TC-REG-PAG-055` — Validate next button behavior on last page
- `TC-REG-PAG-056` — Validate pagination remains stable after search interaction

---

## Profile

### User Profile

- `TC-SMK-PR-057` — Validate unauthenticated profile access shows guidance
- `TC-SMK-PR-058` — Validate login link is available from unauthenticated profile
- `TC-SMK-PR-059` — Validate register link is available from unauthenticated profile
- `TC-CRT-PR-060` — Validate navigation from unauthenticated profile to login
- `TC-CRT-PR-061` — Validate navigation from unauthenticated profile to registration
- `TC-CRT-PR-062` — Validate access to authenticated profile
- `TC-CRT-PR-063` — Validate viewing book collection
- `TC-CRT-PR-064` — Validate logout from profile
- `TC-REG-PR-065` — Validate search within profile collection
- `TC-REG-PR-066` — Validate profile collection search with no matches
- `TC-REG-PR-067` — Validate empty collection state is handled safely
- `TC-REG-PR-068` — Validate navigation from profile back to Book Store

### Remove Books

- `TC-REG-PR-069` — Validate removing a single book
- `TC-REG-PR-070` — Validate cancel single-book deletion
- `TC-REG-PR-071` — Validate removing all books if supported
- `TC-REG-PR-072` — Validate cancel delete-all action
- `TC-REG-PR-073` — Validate delete controls are safe on empty collection

---

## Security

- `TC-CRT-SEC-074` — Validate redirect to login when unauthenticated
- `TC-CRT-SEC-075` — Validate restricted actions without authentication
- `TC-REG-SEC-076` — Validate protected profile content is hidden when unauthenticated
- `TC-REG-SEC-077` — Validate protected action does not create collection changes when unauthenticated

---

## Summary

- Total documented test cases: `77`
- Global numbering range: `001` → `077`
- Source of truth for content details remains under `docs/test-cases/`