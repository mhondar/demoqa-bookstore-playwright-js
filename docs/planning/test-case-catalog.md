# Test Case Catalog

## Purpose

This document centralizes the full inventory of documented test cases.

It provides a quick reference for:
- global test case IDs
- test case titles
- module grouping
- traceability across planning and implementation documents

The catalog is aligned with the current global numbering strategy used in `docs/test-cases/`.

## Auth

### Login

- [`TC-CRT-E2E-001` — Valid Login](../test-cases/e2e/e2e-test-cases.md#tc-crt-e2e-001)
- [`TC-CRT-E2E-002` — Invalid Login](../test-cases/e2e/e2e-test-cases.md#tc-crt-e2e-002)
- [`TC-REG-E2E-003` — Login with Empty Fields](../test-cases/e2e/e2e-test-cases.md#tc-reg-e2e-003)
- [`TC-SMK-LG-004` — Validate login page loads](../test-cases/auth/login-test-cases.md#tc-smk-lg-004)
- [`TC-SMK-LG-005` — Validate login form controls are visible](../test-cases/auth/login-test-cases.md#tc-smk-lg-005)
- [`TC-CRT-LG-006` — Validate login with valid credentials](../test-cases/auth/login-test-cases.md#tc-crt-lg-006)
- [`TC-CRT-LG-007` — Validate login with invalid user](../test-cases/auth/login-test-cases.md#tc-crt-lg-007)
- [`TC-CRT-LG-008` — Validate login with invalid password](../test-cases/auth/login-test-cases.md#tc-crt-lg-008)
- [`TC-CRT-LG-009` — Validate navigation from login to registration](../test-cases/auth/login-test-cases.md#tc-crt-lg-009)
- [`TC-REG-LG-010` — Validate login with empty username](../test-cases/auth/login-test-cases.md#tc-reg-lg-010)
- [`TC-REG-LG-011` — Validate login with empty password](../test-cases/auth/login-test-cases.md#tc-reg-lg-011)
- [`TC-REG-LG-012` — Validate login with empty fields](../test-cases/auth/login-test-cases.md#tc-reg-lg-012)
- [`TC-CRT-LG-013` — Validate logout](../test-cases/auth/login-test-cases.md#tc-crt-lg-013)
- [`TC-REG-LG-014` — Validate navigation from login back to Book Store](../test-cases/auth/login-test-cases.md#tc-reg-lg-014)

### Registration

- [`TC-SMK-RG-015` — Validate registration page loads](../test-cases/auth/registration-test-cases.md#tc-smk-rg-015)
- [`TC-SMK-RG-016` — Validate registration form controls are visible](../test-cases/auth/registration-test-cases.md#tc-smk-rg-016)
- [`TC-CRT-RG-017` — Validate navigation from registration back to login](../test-cases/auth/registration-test-cases.md#tc-crt-rg-017)
- [`TC-CRT-RG-018` — Validate registration with valid unique data](../test-cases/auth/registration-test-cases.md#tc-crt-rg-018)
- [`TC-REG-RG-019` — Validate registration with empty first name](../test-cases/auth/registration-test-cases.md#tc-reg-rg-019)
- [`TC-REG-RG-020` — Validate registration with empty last name](../test-cases/auth/registration-test-cases.md#tc-reg-rg-020)
- [`TC-REG-RG-021` — Validate registration with empty username](../test-cases/auth/registration-test-cases.md#tc-reg-rg-021)
- [`TC-REG-RG-022` — Validate registration with empty password](../test-cases/auth/registration-test-cases.md#tc-reg-rg-022)
- [`TC-REG-RG-023` — Validate registration with invalid password format](../test-cases/auth/registration-test-cases.md#tc-reg-rg-023)
- [`TC-REG-RG-024` — Validate registration with duplicate username](../test-cases/auth/registration-test-cases.md#tc-reg-rg-024)

---

## Book Store

### Book Store

- [`TC-SMK-E2E-025` — Access Book Store](../test-cases/e2e/e2e-test-cases.md#tc-smk-e2e-025)
- [`TC-SMK-E2E-026` — View Book Catalog](../test-cases/e2e/e2e-test-cases.md#tc-smk-e2e-026)
- [`TC-CRT-E2E-027` — Search Books by Exact Title](../test-cases/e2e/e2e-test-cases.md#tc-crt-e2e-027)
- [`TC-CRT-E2E-028` — Search with No Results](../test-cases/e2e/e2e-test-cases.md#tc-crt-e2e-028)
- [`TC-SMK-BS-029` — Validate book list loads](../test-cases/bookstore/bookstore-test-cases.md#tc-smk-bs-029)
- [`TC-SMK-BS-030` — Validate visible number of records](../test-cases/bookstore/bookstore-test-cases.md#tc-smk-bs-030)
- [`TC-CRT-BS-031` — Validate search with valid text](../test-cases/bookstore/bookstore-test-cases.md#tc-crt-bs-031)
- [`TC-CRT-BS-032` — Validate search with no matches](../test-cases/bookstore/bookstore-test-cases.md#tc-crt-bs-032)
- [`TC-CRT-BS-033` — Validate navigation to detail page](../test-cases/bookstore/bookstore-test-cases.md#tc-crt-bs-033)

### Book Detail

- [`TC-CRT-E2E-034` — Navigate to Book Detail](../test-cases/e2e/e2e-test-cases.md#tc-crt-e2e-034)
- [`TC-REG-E2E-035` — Add Book to Collection](../test-cases/e2e/e2e-test-cases.md#tc-reg-e2e-035)
- [`TC-REG-E2E-036` — Attempt to Add Book Without Login](../test-cases/e2e/e2e-test-cases.md#tc-reg-e2e-036)
- [`TC-CRT-BD-037` — Validate book detail page loads from catalog selection](../test-cases/bookstore/book-detail-test-cases.md#tc-crt-bd-037)
- [`TC-CRT-BD-038` — Validate detail page shows expected book information](../test-cases/bookstore/book-detail-test-cases.md#tc-crt-bd-038)
- [`TC-REG-BD-039` — Validate back navigation to Book Store](../test-cases/bookstore/book-detail-test-cases.md#tc-reg-bd-039)
- [`TC-REG-BD-040` — Validate add book to collection without login is blocked](../test-cases/bookstore/book-detail-test-cases.md#tc-reg-bd-040)
- [`TC-REG-BD-041` — Validate add book to collection with authenticated user](../test-cases/bookstore/book-detail-test-cases.md#tc-reg-bd-041)

### Search

- [`TC-SMK-SRCH-042` — Validate search input is visible](../test-cases/bookstore/search-test-cases.md#tc-smk-srch-042)
- [`TC-CRT-SRCH-043` — Validate search with valid exact title](../test-cases/bookstore/search-test-cases.md#tc-crt-srch-043)
- [`TC-REG-SRCH-044` — Validate search with valid partial title](../test-cases/bookstore/search-test-cases.md#tc-reg-srch-044)
- [`TC-REG-SRCH-045` — Validate search by author](../test-cases/bookstore/search-test-cases.md#tc-reg-srch-045)
- [`TC-CRT-SRCH-046` — Validate search with no matches](../test-cases/bookstore/search-test-cases.md#tc-crt-srch-046)
- [`TC-REG-SRCH-047` — Validate clearing search restores the list](../test-cases/bookstore/search-test-cases.md#tc-reg-srch-047)

### Pagination

- [`TC-REG-PAG-048` — Validate pagination controls are visible](../test-cases/bookstore/pagination-test-cases.md#tc-reg-pag-048)
- [`TC-REG-PAG-049` — Validate current page indicator value](../test-cases/bookstore/pagination-test-cases.md#tc-reg-pag-049)
- [`TC-REG-PAG-050` — Validate previous button behavior on first page](../test-cases/bookstore/pagination-test-cases.md#tc-reg-pag-050)
- [`TC-REG-PAG-051` — Validate next button behavior on last page](../test-cases/bookstore/pagination-test-cases.md#tc-reg-pag-051)
- [`TC-REG-PAG-052` — Validate pagination remains stable after search interaction](../test-cases/bookstore/pagination-test-cases.md#tc-reg-pag-052)

---

## Profile

### User Profile

- [`TC-CRT-E2E-053` — Access Authenticated Profile](../test-cases/e2e/e2e-test-cases.md#tc-crt-e2e-053)
- [`TC-CRT-E2E-054` — Logout](../test-cases/e2e/e2e-test-cases.md#tc-crt-e2e-054)
- [`TC-SMK-PR-055` — Validate unauthenticated profile access shows guidance](../test-cases/profile/profile-test-cases.md#tc-smk-pr-055)
- [`TC-SMK-PR-056` — Validate login link is available from unauthenticated profile](../test-cases/profile/profile-test-cases.md#tc-smk-pr-056)
- [`TC-SMK-PR-057` — Validate register link is available from unauthenticated profile](../test-cases/profile/profile-test-cases.md#tc-smk-pr-057)
- [`TC-CRT-PR-058` — Validate navigation from unauthenticated profile to login](../test-cases/profile/profile-test-cases.md#tc-crt-pr-058)
- [`TC-CRT-PR-059` — Validate navigation from unauthenticated profile to registration](../test-cases/profile/profile-test-cases.md#tc-crt-pr-059)
- [`TC-CRT-PR-060` — Validate access to authenticated profile](../test-cases/profile/profile-test-cases.md#tc-crt-pr-060)
- [`TC-CRT-PR-061` — Validate viewing book collection](../test-cases/profile/profile-test-cases.md#tc-crt-pr-061)
- [`TC-CRT-PR-062` — Validate logout from profile](../test-cases/profile/profile-test-cases.md#tc-crt-pr-062)
- [`TC-REG-PR-063` — Validate search within profile collection](../test-cases/profile/profile-test-cases.md#tc-reg-pr-063)
- [`TC-REG-PR-064` — Validate profile collection search with no matches](../test-cases/profile/profile-test-cases.md#tc-reg-pr-064)
- [`TC-REG-PR-065` — Validate empty collection state is handled safely](../test-cases/profile/profile-test-cases.md#tc-reg-pr-065)
- [`TC-REG-PR-066` — Validate navigation from profile back to Book Store](../test-cases/profile/profile-test-cases.md#tc-reg-pr-066)

### Remove Books

- [`TC-REG-E2E-067` — Remove Book from Collection](../test-cases/e2e/e2e-test-cases.md#tc-reg-e2e-067)
- [`TC-REG-PR-068` — Validate removing a single book](../test-cases/profile/remove-books-test-cases.md#tc-reg-pr-068)
- [`TC-REG-PR-069` — Validate cancel single-book deletion](../test-cases/profile/remove-books-test-cases.md#tc-reg-pr-069)
- [`TC-REG-PR-070` — Validate removing all books if supported](../test-cases/profile/remove-books-test-cases.md#tc-reg-pr-070)
- [`TC-REG-PR-071` — Validate cancel delete-all action](../test-cases/profile/remove-books-test-cases.md#tc-reg-pr-071)
- [`TC-REG-PR-072` — Validate delete controls are safe on empty collection](../test-cases/profile/remove-books-test-cases.md#tc-reg-pr-072)

---

## Security

- [`TC-CRT-E2E-073` — Access Protected Profile Without Authentication](../test-cases/e2e/e2e-test-cases.md#tc-crt-e2e-073)
- [`TC-CRT-SEC-074` — Validate redirect to login when unauthenticated](../test-cases/security/basic-security-test-cases.md#tc-crt-sec-074)
- [`TC-CRT-SEC-075` — Validate restricted actions without authentication](../test-cases/security/basic-security-test-cases.md#tc-crt-sec-075)
- [`TC-REG-SEC-076` — Validate protected profile content is hidden when unauthenticated](../test-cases/security/basic-security-test-cases.md#tc-reg-sec-076)
- [`TC-REG-SEC-077` — Validate protected action does not create collection changes when unauthenticated](../test-cases/security/basic-security-test-cases.md#tc-reg-sec-077)

---

## Summary

- Total documented test cases: `77`
- Global numbering range: `001` → `077`
- Source of truth for content details remains under `docs/test-cases/`