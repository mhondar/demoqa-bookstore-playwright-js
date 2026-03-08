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

- [`TC-CRT-E2E-006` — Valid Login](../test-cases/e2e/e2e-test-cases.md#tc-crt-e2e-006)
- [`TC-CRT-E2E-007` — Invalid Login](../test-cases/e2e/e2e-test-cases.md#tc-crt-e2e-007)
- [`TC-REG-E2E-008` — Login with Empty Fields](../test-cases/e2e/e2e-test-cases.md#tc-reg-e2e-008)
- [`TC-SMK-LG-015` — Validate login page loads](../test-cases/auth/login-test-cases.md#tc-smk-lg-015)
- [`TC-SMK-LG-016` — Validate login form controls are visible](../test-cases/auth/login-test-cases.md#tc-smk-lg-016)
- [`TC-CRT-LG-017` — Validate login with valid credentials](../test-cases/auth/login-test-cases.md#tc-crt-lg-017)
- [`TC-CRT-LG-018` — Validate login with invalid user](../test-cases/auth/login-test-cases.md#tc-crt-lg-018)
- [`TC-CRT-LG-019` — Validate login with invalid password](../test-cases/auth/login-test-cases.md#tc-crt-lg-019)
- [`TC-CRT-LG-020` — Validate navigation from login to registration](../test-cases/auth/login-test-cases.md#tc-crt-lg-020)
- [`TC-REG-LG-021` — Validate login with empty username](../test-cases/auth/login-test-cases.md#tc-reg-lg-021)
- [`TC-REG-LG-022` — Validate login with empty password](../test-cases/auth/login-test-cases.md#tc-reg-lg-022)
- [`TC-REG-LG-023` — Validate login with empty fields](../test-cases/auth/login-test-cases.md#tc-reg-lg-023)
- [`TC-CRT-LG-024` — Validate logout](../test-cases/auth/login-test-cases.md#tc-crt-lg-024)
- [`TC-REG-LG-025` — Validate navigation from login back to Book Store](../test-cases/auth/login-test-cases.md#tc-reg-lg-025)

### Registration

- [`TC-SMK-RG-026` — Validate registration page loads](../test-cases/auth/registration-test-cases.md#tc-smk-rg-026)
- [`TC-SMK-RG-027` — Validate registration form controls are visible](../test-cases/auth/registration-test-cases.md#tc-smk-rg-027)
- [`TC-CRT-RG-028` — Validate navigation from registration back to login](../test-cases/auth/registration-test-cases.md#tc-crt-rg-028)
- [`TC-CRT-RG-029` — Validate registration with valid unique data](../test-cases/auth/registration-test-cases.md#tc-crt-rg-029)
- [`TC-REG-RG-030` — Validate registration with empty first name](../test-cases/auth/registration-test-cases.md#tc-reg-rg-030)
- [`TC-REG-RG-031` — Validate registration with empty last name](../test-cases/auth/registration-test-cases.md#tc-reg-rg-031)
- [`TC-REG-RG-032` — Validate registration with empty username](../test-cases/auth/registration-test-cases.md#tc-reg-rg-032)
- [`TC-REG-RG-033` — Validate registration with empty password](../test-cases/auth/registration-test-cases.md#tc-reg-rg-033)
- [`TC-REG-RG-034` — Validate registration with invalid password format](../test-cases/auth/registration-test-cases.md#tc-reg-rg-034)
- [`TC-REG-RG-035` — Validate registration with duplicate username](../test-cases/auth/registration-test-cases.md#tc-reg-rg-035)

---

## Book Store

### Book Store

- [`TC-SMK-E2E-001` — Access Book Store](../test-cases/e2e/e2e-test-cases.md#tc-smk-e2e-001)
- [`TC-SMK-E2E-002` — View Book Catalog](../test-cases/e2e/e2e-test-cases.md#tc-smk-e2e-002)
- [`TC-CRT-E2E-003` — Search Books by Exact Title](../test-cases/e2e/e2e-test-cases.md#tc-crt-e2e-003)
- [`TC-CRT-E2E-004` — Search with No Results](../test-cases/e2e/e2e-test-cases.md#tc-crt-e2e-004)
- [`TC-SMK-BS-036` — Validate book list loads](../test-cases/bookstore/bookstore-test-cases.md#tc-smk-bs-036)
- [`TC-SMK-BS-037` — Validate visible number of records](../test-cases/bookstore/bookstore-test-cases.md#tc-smk-bs-037)
- [`TC-CRT-BS-038` — Validate search with valid text](../test-cases/bookstore/bookstore-test-cases.md#tc-crt-bs-038)
- [`TC-CRT-BS-039` — Validate search with no matches](../test-cases/bookstore/bookstore-test-cases.md#tc-crt-bs-039)
- [`TC-CRT-BS-040` — Validate navigation to detail page](../test-cases/bookstore/bookstore-test-cases.md#tc-crt-bs-040)

### Book Detail

- [`TC-CRT-E2E-005` — Navigate to Book Detail](../test-cases/e2e/e2e-test-cases.md#tc-crt-e2e-005)
- [`TC-REG-E2E-012` — Add Book to Collection](../test-cases/e2e/e2e-test-cases.md#tc-reg-e2e-012)
- [`TC-REG-E2E-013` — Attempt to Add Book Without Login](../test-cases/e2e/e2e-test-cases.md#tc-reg-e2e-013)
- [`TC-CRT-BD-041` — Validate book detail page loads from catalog selection](../test-cases/bookstore/book-detail-test-cases.md#tc-crt-bd-041)
- [`TC-CRT-BD-042` — Validate detail page shows expected book information](../test-cases/bookstore/book-detail-test-cases.md#tc-crt-bd-042)
- [`TC-REG-BD-043` — Validate back navigation to Book Store](../test-cases/bookstore/book-detail-test-cases.md#tc-reg-bd-043)
- [`TC-REG-BD-044` — Validate add book to collection without login is blocked](../test-cases/bookstore/book-detail-test-cases.md#tc-reg-bd-044)
- [`TC-REG-BD-045` — Validate add book to collection with authenticated user](../test-cases/bookstore/book-detail-test-cases.md#tc-reg-bd-045)

### Search

- [`TC-SMK-SRCH-046` — Validate search input is visible](../test-cases/bookstore/search-test-cases.md#tc-smk-srch-046)
- [`TC-CRT-SRCH-047` — Validate search with valid exact title](../test-cases/bookstore/search-test-cases.md#tc-crt-srch-047)
- [`TC-REG-SRCH-048` — Validate search with valid partial title](../test-cases/bookstore/search-test-cases.md#tc-reg-srch-048)
- [`TC-REG-SRCH-049` — Validate search by author](../test-cases/bookstore/search-test-cases.md#tc-reg-srch-049)
- [`TC-CRT-SRCH-050` — Validate search with no matches](../test-cases/bookstore/search-test-cases.md#tc-crt-srch-050)
- [`TC-REG-SRCH-051` — Validate clearing search restores the list](../test-cases/bookstore/search-test-cases.md#tc-reg-srch-051)

### Pagination

- [`TC-REG-PAG-052` — Validate pagination controls are visible](../test-cases/bookstore/pagination-test-cases.md#tc-reg-pag-052)
- [`TC-REG-PAG-053` — Validate current page indicator value](../test-cases/bookstore/pagination-test-cases.md#tc-reg-pag-053)
- [`TC-REG-PAG-054` — Validate previous button behavior on first page](../test-cases/bookstore/pagination-test-cases.md#tc-reg-pag-054)
- [`TC-REG-PAG-055` — Validate next button behavior on last page](../test-cases/bookstore/pagination-test-cases.md#tc-reg-pag-055)
- [`TC-REG-PAG-056` — Validate pagination remains stable after search interaction](../test-cases/bookstore/pagination-test-cases.md#tc-reg-pag-056)

---

## Profile

### User Profile

- [`TC-CRT-E2E-009` — Access Authenticated Profile](../test-cases/e2e/e2e-test-cases.md#tc-crt-e2e-009)
- [`TC-CRT-E2E-011` — Logout](../test-cases/e2e/e2e-test-cases.md#tc-crt-e2e-011)
- [`TC-SMK-PR-057` — Validate unauthenticated profile access shows guidance](../test-cases/profile/profile-test-cases.md#tc-smk-pr-057)
- [`TC-SMK-PR-058` — Validate login link is available from unauthenticated profile](../test-cases/profile/profile-test-cases.md#tc-smk-pr-058)
- [`TC-SMK-PR-059` — Validate register link is available from unauthenticated profile](../test-cases/profile/profile-test-cases.md#tc-smk-pr-059)
- [`TC-CRT-PR-060` — Validate navigation from unauthenticated profile to login](../test-cases/profile/profile-test-cases.md#tc-crt-pr-060)
- [`TC-CRT-PR-061` — Validate navigation from unauthenticated profile to registration](../test-cases/profile/profile-test-cases.md#tc-crt-pr-061)
- [`TC-CRT-PR-062` — Validate access to authenticated profile](../test-cases/profile/profile-test-cases.md#tc-crt-pr-062)
- [`TC-CRT-PR-063` — Validate viewing book collection](../test-cases/profile/profile-test-cases.md#tc-crt-pr-063)
- [`TC-CRT-PR-064` — Validate logout from profile](../test-cases/profile/profile-test-cases.md#tc-crt-pr-064)
- [`TC-REG-PR-065` — Validate search within profile collection](../test-cases/profile/profile-test-cases.md#tc-reg-pr-065)
- [`TC-REG-PR-066` — Validate profile collection search with no matches](../test-cases/profile/profile-test-cases.md#tc-reg-pr-066)
- [`TC-REG-PR-067` — Validate empty collection state is handled safely](../test-cases/profile/profile-test-cases.md#tc-reg-pr-067)
- [`TC-REG-PR-068` — Validate navigation from profile back to Book Store](../test-cases/profile/profile-test-cases.md#tc-reg-pr-068)

### Remove Books

- [`TC-REG-E2E-014` — Remove Book from Collection](../test-cases/e2e/e2e-test-cases.md#tc-reg-e2e-014)
- [`TC-REG-PR-069` — Validate removing a single book](../test-cases/profile/remove-books-test-cases.md#tc-reg-pr-069)
- [`TC-REG-PR-070` — Validate cancel single-book deletion](../test-cases/profile/remove-books-test-cases.md#tc-reg-pr-070)
- [`TC-REG-PR-071` — Validate removing all books if supported](../test-cases/profile/remove-books-test-cases.md#tc-reg-pr-071)
- [`TC-REG-PR-072` — Validate cancel delete-all action](../test-cases/profile/remove-books-test-cases.md#tc-reg-pr-072)
- [`TC-REG-PR-073` — Validate delete controls are safe on empty collection](../test-cases/profile/remove-books-test-cases.md#tc-reg-pr-073)

---

## Security

- [`TC-CRT-E2E-010` — Access Protected Profile Without Authentication](../test-cases/e2e/e2e-test-cases.md#tc-crt-e2e-010)
- [`TC-CRT-SEC-074` — Validate redirect to login when unauthenticated](../test-cases/security/basic-security-test-cases.md#tc-crt-sec-074)
- [`TC-CRT-SEC-075` — Validate restricted actions without authentication](../test-cases/security/basic-security-test-cases.md#tc-crt-sec-075)
- [`TC-REG-SEC-076` — Validate protected profile content is hidden when unauthenticated](../test-cases/security/basic-security-test-cases.md#tc-reg-sec-076)
- [`TC-REG-SEC-077` — Validate protected action does not create collection changes when unauthenticated](../test-cases/security/basic-security-test-cases.md#tc-reg-sec-077)

---

## Summary

- Total documented test cases: `77`
- Global numbering range: `001` → `077`
- Source of truth for content details remains under `docs/test-cases/`