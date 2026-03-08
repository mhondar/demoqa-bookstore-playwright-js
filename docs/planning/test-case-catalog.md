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
- [`TC-CRT-LG-006` — Validate login with invalid password](../test-cases/auth/login-test-cases.md#tc-crt-lg-006)
- [`TC-CRT-LG-007` — Validate navigation from login to registration](../test-cases/auth/login-test-cases.md#tc-crt-lg-007)
- [`TC-REG-LG-008` — Validate login with empty username](../test-cases/auth/login-test-cases.md#tc-reg-lg-008)
- [`TC-REG-LG-009` — Validate login with empty password](../test-cases/auth/login-test-cases.md#tc-reg-lg-009)
- [`TC-REG-LG-010` — Validate login with empty fields](../test-cases/auth/login-test-cases.md#tc-reg-lg-010)
- [`TC-CRT-LG-011` — Validate logout](../test-cases/auth/login-test-cases.md#tc-crt-lg-011)
- [`TC-REG-LG-012` — Validate navigation from login back to Book Store](../test-cases/auth/login-test-cases.md#tc-reg-lg-012)

### Registration

- [`TC-SMK-RG-013` — Validate registration page loads](../test-cases/auth/registration-test-cases.md#tc-smk-rg-013)
- [`TC-SMK-RG-014` — Validate registration form controls are visible](../test-cases/auth/registration-test-cases.md#tc-smk-rg-014)
- [`TC-CRT-RG-015` — Validate navigation from registration back to login](../test-cases/auth/registration-test-cases.md#tc-crt-rg-015)
- [`TC-CRT-RG-016` — Validate registration with valid unique data](../test-cases/auth/registration-test-cases.md#tc-crt-rg-016)
- [`TC-REG-RG-017` — Validate registration with empty first name](../test-cases/auth/registration-test-cases.md#tc-reg-rg-017)
- [`TC-REG-RG-018` — Validate registration with empty last name](../test-cases/auth/registration-test-cases.md#tc-reg-rg-018)
- [`TC-REG-RG-019` — Validate registration with empty username](../test-cases/auth/registration-test-cases.md#tc-reg-rg-019)
- [`TC-REG-RG-020` — Validate registration with empty password](../test-cases/auth/registration-test-cases.md#tc-reg-rg-020)
- [`TC-REG-RG-021` — Validate registration with invalid password format](../test-cases/auth/registration-test-cases.md#tc-reg-rg-021)
- [`TC-REG-RG-022` — Validate registration with duplicate username](../test-cases/auth/registration-test-cases.md#tc-reg-rg-022)

---

## Book Store

### Book Store

- [`TC-SMK-E2E-023` — Access Book Store](../test-cases/e2e/e2e-test-cases.md#tc-smk-e2e-023)
- [`TC-SMK-E2E-024` — View Book Catalog](../test-cases/e2e/e2e-test-cases.md#tc-smk-e2e-024)
- [`TC-CRT-E2E-025` — Search Books by Exact Title](../test-cases/e2e/e2e-test-cases.md#tc-crt-e2e-025)
- [`TC-CRT-E2E-026` — Search with No Results](../test-cases/e2e/e2e-test-cases.md#tc-crt-e2e-026)
- [`TC-SMK-BS-027` — Validate book list loads](../test-cases/bookstore/bookstore-test-cases.md#tc-smk-bs-027)
- [`TC-SMK-BS-028` — Validate visible number of records](../test-cases/bookstore/bookstore-test-cases.md#tc-smk-bs-028)
- [`TC-CRT-BS-029` — Validate search with valid text](../test-cases/bookstore/bookstore-test-cases.md#tc-crt-bs-029)
- [`TC-CRT-BS-030` — Validate search with no matches](../test-cases/bookstore/bookstore-test-cases.md#tc-crt-bs-030)
- [`TC-CRT-BS-031` — Validate navigation to detail page](../test-cases/bookstore/bookstore-test-cases.md#tc-crt-bs-031)

### Book Detail

- [`TC-CRT-E2E-032` — Navigate to Book Detail](../test-cases/e2e/e2e-test-cases.md#tc-crt-e2e-032)
- [`TC-REG-E2E-033` — Add Book to Collection](../test-cases/e2e/e2e-test-cases.md#tc-reg-e2e-033)
- [`TC-REG-E2E-034` — Attempt to Add Book Without Login](../test-cases/e2e/e2e-test-cases.md#tc-reg-e2e-034)
- [`TC-CRT-BD-035` — Validate book detail page loads from catalog selection](../test-cases/bookstore/book-detail-test-cases.md#tc-crt-bd-035)
- [`TC-CRT-BD-036` — Validate detail page shows expected book information](../test-cases/bookstore/book-detail-test-cases.md#tc-crt-bd-036)
- [`TC-REG-BD-037` — Validate back navigation to Book Store](../test-cases/bookstore/book-detail-test-cases.md#tc-reg-bd-037)
- [`TC-REG-BD-038` — Validate add book to collection without login is blocked](../test-cases/bookstore/book-detail-test-cases.md#tc-reg-bd-038)
- [`TC-REG-BD-039` — Validate add book to collection with authenticated user](../test-cases/bookstore/book-detail-test-cases.md#tc-reg-bd-039)

### Search

- [`TC-SMK-SRCH-040` — Validate search input is visible](../test-cases/bookstore/search-test-cases.md#tc-smk-srch-040)
- [`TC-CRT-SRCH-041` — Validate search with valid exact title](../test-cases/bookstore/search-test-cases.md#tc-crt-srch-041)
- [`TC-REG-SRCH-042` — Validate search with valid partial title](../test-cases/bookstore/search-test-cases.md#tc-reg-srch-042)
- [`TC-REG-SRCH-043` — Validate search by author](../test-cases/bookstore/search-test-cases.md#tc-reg-srch-043)
- [`TC-CRT-SRCH-044` — Validate search with no matches](../test-cases/bookstore/search-test-cases.md#tc-crt-srch-044)
- [`TC-REG-SRCH-045` — Validate clearing search restores the list](../test-cases/bookstore/search-test-cases.md#tc-reg-srch-045)

### Pagination

- [`TC-REG-PAG-046` — Validate pagination controls are visible](../test-cases/bookstore/pagination-test-cases.md#tc-reg-pag-046)
- [`TC-REG-PAG-047` — Validate current page indicator value](../test-cases/bookstore/pagination-test-cases.md#tc-reg-pag-047)
- [`TC-REG-PAG-048` — Validate previous button behavior on first page](../test-cases/bookstore/pagination-test-cases.md#tc-reg-pag-048)
- [`TC-REG-PAG-049` — Validate next button behavior on last page](../test-cases/bookstore/pagination-test-cases.md#tc-reg-pag-049)
- [`TC-REG-PAG-050` — Validate pagination remains stable after search interaction](../test-cases/bookstore/pagination-test-cases.md#tc-reg-pag-050)

---

## Profile

### User Profile

- [`TC-CRT-E2E-051` — Access Authenticated Profile](../test-cases/e2e/e2e-test-cases.md#tc-crt-e2e-051)
- [`TC-CRT-E2E-052` — Logout](../test-cases/e2e/e2e-test-cases.md#tc-crt-e2e-052)
- [`TC-SMK-PR-053` — Validate unauthenticated profile access shows guidance](../test-cases/profile/profile-test-cases.md#tc-smk-pr-053)
- [`TC-SMK-PR-054` — Validate login link is available from unauthenticated profile](../test-cases/profile/profile-test-cases.md#tc-smk-pr-054)
- [`TC-SMK-PR-055` — Validate register link is available from unauthenticated profile](../test-cases/profile/profile-test-cases.md#tc-smk-pr-055)
- [`TC-CRT-PR-056` — Validate navigation from unauthenticated profile to login](../test-cases/profile/profile-test-cases.md#tc-crt-pr-056)
- [`TC-CRT-PR-057` — Validate navigation from unauthenticated profile to registration](../test-cases/profile/profile-test-cases.md#tc-crt-pr-057)
- [`TC-CRT-PR-058` — Validate access to authenticated profile](../test-cases/profile/profile-test-cases.md#tc-crt-pr-058)
- [`TC-CRT-PR-059` — Validate viewing book collection](../test-cases/profile/profile-test-cases.md#tc-crt-pr-059)
- [`TC-CRT-PR-060` — Validate logout from profile](../test-cases/profile/profile-test-cases.md#tc-crt-pr-060)
- [`TC-REG-PR-061` — Validate search within profile collection](../test-cases/profile/profile-test-cases.md#tc-reg-pr-061)
- [`TC-REG-PR-062` — Validate profile collection search with no matches](../test-cases/profile/profile-test-cases.md#tc-reg-pr-062)
- [`TC-REG-PR-063` — Validate empty collection state is handled safely](../test-cases/profile/profile-test-cases.md#tc-reg-pr-063)
- [`TC-REG-PR-064` — Validate navigation from profile back to Book Store](../test-cases/profile/profile-test-cases.md#tc-reg-pr-064)

### Remove Books

- [`TC-REG-E2E-065` — Remove Book from Collection](../test-cases/e2e/e2e-test-cases.md#tc-reg-e2e-065)
- [`TC-REG-PR-066` — Validate removing a single book](../test-cases/profile/remove-books-test-cases.md#tc-reg-pr-066)
- [`TC-REG-PR-067` — Validate cancel single-book deletion](../test-cases/profile/remove-books-test-cases.md#tc-reg-pr-067)
- [`TC-REG-PR-068` — Validate removing all books if supported](../test-cases/profile/remove-books-test-cases.md#tc-reg-pr-068)
- [`TC-REG-PR-069` — Validate cancel delete-all action](../test-cases/profile/remove-books-test-cases.md#tc-reg-pr-069)
- [`TC-REG-PR-070` — Validate delete controls are safe on empty collection](../test-cases/profile/remove-books-test-cases.md#tc-reg-pr-070)

---

## Security

- [`TC-CRT-E2E-071` — Access Protected Profile Without Authentication](../test-cases/e2e/e2e-test-cases.md#tc-crt-e2e-071)
- [`TC-CRT-SEC-072` — Validate redirect to login when unauthenticated](../test-cases/security/basic-security-test-cases.md#tc-crt-sec-072)
- [`TC-CRT-SEC-073` — Validate restricted actions without authentication](../test-cases/security/basic-security-test-cases.md#tc-crt-sec-073)
- [`TC-REG-SEC-074` — Validate protected profile content is hidden when unauthenticated](../test-cases/security/basic-security-test-cases.md#tc-reg-sec-074)
- [`TC-REG-SEC-075` — Validate protected action does not create collection changes when unauthenticated](../test-cases/security/basic-security-test-cases.md#tc-reg-sec-075)

---

## Summary

- Total documented test cases: `75`
- Global numbering range: `001` → `075`
- Source of truth for content details remains under `docs/test-cases/`