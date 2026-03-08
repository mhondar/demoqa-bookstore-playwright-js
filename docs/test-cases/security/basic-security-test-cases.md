# Basic Security Test Cases

## Purpose

This document contains the initial test case design for basic security and access-control scenarios.

Test case IDs follow the convention `TC-<TYPE>-<MODULE>-<NNN>`.

Each test case includes only:
- test case ID
- title
- preconditions
- test data
- steps
- expected result
- priority
- test type

---

## TC-CRT-SEC-074

**Title:**
Validate redirect to login when unauthenticated

**Preconditions:**
- clean unauthenticated session
- protected route is reachable in the environment

**Test data:**
- protected route such as `/profile`

**Steps:**
- navigate directly to a protected route while unauthenticated
- observe the resulting navigation and UI state

**Expected result:**
- user is redirected to the Login page or shown a clear login-required state
- protected content is not exposed

**Priority:**
- High

**Test type:**
- Critical

---

## TC-CRT-SEC-075

**Title:**
Validate restricted actions without authentication

**Preconditions:**
- clean unauthenticated session
- restricted action is reachable from a public flow

**Test data:**
- known book from `test-data/books.json`

**Steps:**
- open a public page that exposes a protected action path
- attempt to execute a restricted action without logging in
- observe the resulting behavior

**Expected result:**
- restricted action does not succeed
- application redirects to login or blocks the action safely
- no protected state change occurs

**Priority:**
- High

**Test type:**
- Critical

---

## TC-REG-SEC-076

**Title:**
Validate protected profile content is hidden when unauthenticated

**Preconditions:**
- clean unauthenticated session

**Test data:**
- URL: `/profile`

**Steps:**
- open the Profile page directly without authentication
- inspect the visible content

**Expected result:**
- book collection, logout control, and destructive actions are not visible
- only safe guidance or public navigation is available

**Priority:**
- Medium

**Test type:**
- Regression

---

## TC-REG-SEC-077

**Title:**
Validate protected action does not create collection changes when unauthenticated

**Preconditions:**
- clean unauthenticated session
- known book detail is reachable

**Test data:**
- `test-data/books.json` → known book title

**Steps:**
- open a known book detail page from the public catalog
- attempt to add the book to the collection without logging in
- inspect the resulting state

**Expected result:**
- collection is not modified
- action is blocked or redirected safely
- no authenticated-only confirmation is shown

**Priority:**
- Medium

**Test type:**
- Regression