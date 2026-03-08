# Detailed Test Cases

## Purpose

This document defines the minimum necessary detail for future automation.

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

## TC-SMK-E2E-025

**Title:**
Access Book Store

**Scenario:** `BS-001`

**Preconditions:**
- no authentication required

**Test data:**
- URL: `/books`

**Steps:**
- open Book Store page
- wait until the page is loaded
- verify catalog area is visible

**Expected result:**
- page loads correctly
- at least one book row is visible

**Priority:**
- High

**Test type:**
- Smoke

---

## TC-SMK-E2E-026

**Title:**
View Book Catalog

**Scenario:** `BS-002`

**Preconditions:**
- user is on Book Store page

**Test data:**
- none beyond current catalog

**Steps:**
- inspect first visible rows
- verify title, author, and publisher are present

**Expected result:**
- catalog rows are rendered with meaningful metadata

**Priority:**
- High

**Test type:**
- Smoke

---

## TC-CRT-E2E-027

**Title:**
Search Books by Exact Title

**Scenario:** `BS-003`

**Preconditions:**
- user is on Book Store page

**Test data:**
- `test-data/books.json` → `searchTerms.exactTitle`

**Steps:**
- enter exact title in search input
- observe filtered results

**Expected result:**
- matching book remains visible
- unrelated rows are filtered out

**Priority:**
- High

**Test type:**
- Critical

---

## TC-CRT-E2E-028

**Title:**
Search with No Results

**Scenario:** `NEG-BS-001`

**Preconditions:**
- user is on Book Store page

**Test data:**
- `test-data/books.json` → `searchTerms.noResults`

**Steps:**
- enter non-existing term in search input
- observe result state

**Expected result:**
- no matching rows are visible or empty state is shown
- layout remains stable

**Priority:**
- High

**Test type:**
- Critical

---

## TC-CRT-E2E-034

**Title:**
Navigate to Book Detail

**Scenario:** `BD-001`

**Preconditions:**
- user is on Book Store page

**Test data:**
- known title from `test-data/books.json`

**Steps:**
- click known book title from the list
- observe resulting page

**Expected result:**
- route changes to `/books?book=<isbn>`
- selected book detail is displayed

**Priority:**
- High

**Test type:**
- Critical

---

## TC-CRT-E2E-001

**Title:**
Valid Login

**Scenario:** `LG-001`

**Preconditions:**
- clean session
- valid credentials available

**Test data:**
- `.env` / `config/global.js` valid credentials

**Steps:**
- open Login page
- enter valid credentials
- submit login form

**Expected result:**
- authentication succeeds
- user reaches authenticated area

**Priority:**
- High

**Test type:**
- Critical

---

## TC-CRT-E2E-002

**Title:**
Invalid Login

**Scenario:** `NEG-LG-001`

**Preconditions:**
- clean session

**Test data:**
- `test-data/invalid-users.json` → invalid login scenario

**Steps:**
- open Login page
- enter invalid credentials
- submit login form

**Expected result:**
- user stays on login page
- invalid credential message is shown

**Priority:**
- High

**Test type:**
- Critical

---

## TC-REG-E2E-003

**Title:**
Login with Empty Fields

**Scenario:** `NEG-LG-002`

**Preconditions:**
- clean session

**Test data:**
- empty username and/or password

**Steps:**
- open Login page
- leave required fields empty
- submit login form

**Expected result:**
- validation or blocked submission is shown
- user remains on login page

**Priority:**
- Medium

**Test type:**
- Regression

---

## TC-CRT-E2E-053

**Title:**
Access Authenticated Profile

**Scenario:** `PR-002`

**Preconditions:**
- valid credentials or authenticated storage state available

**Test data:**
- valid credentials or saved session state

**Steps:**
- authenticate user
- open Profile page
- inspect resulting state

**Expected result:**
- unauthenticated message is not shown
- profile content is visible

**Priority:**
- High

**Test type:**
- Critical

---

## TC-CRT-E2E-073

**Title:**
Access Protected Profile Without Authentication

**Scenario:** `NEG-PR-001`

**Preconditions:**
- clean unauthenticated session

**Test data:**
- URL: `/profile`

**Steps:**
- open Profile page directly
- inspect resulting state

**Expected result:**
- protected content is not shown
- login/register guidance is visible

**Priority:**
- High

**Test type:**
- Critical

---

## TC-CRT-E2E-054

**Title:**
Logout

**Scenario:** `PR-001`

**Preconditions:**
- authenticated user session exists

**Test data:**
- valid credentials or authenticated session state

**Steps:**
- open authenticated Profile
- trigger logout
- inspect resulting state

**Expected result:**
- authenticated session is cleared
- user is redirected or shown unauthenticated state

**Priority:**
- High

**Test type:**
- Critical

---

## TC-REG-E2E-035

**Title:**
Add Book to Collection

**Scenario:** `BD-002`

**Preconditions:**
- authenticated user
- stable book detail access
- controlled collection state

**Test data:**
- known book from `test-data/books.json`

**Steps:**
- open known book detail
- trigger add-to-collection action
- verify collection state

**Expected result:**
- book is added to collection successfully

**Priority:**
- Medium

**Test type:**
- Regression

---

## TC-REG-E2E-036

**Title:**
Attempt to Add Book Without Login

**Scenario:** `NEG-BD-001`

**Preconditions:**
- clean unauthenticated session
- stable book detail access

**Test data:**
- known book from `test-data/books.json`

**Steps:**
- open known book detail
- trigger add-to-collection action
- observe resulting behavior

**Expected result:**
- action is blocked or redirected to login
- no collection change occurs

**Priority:**
- Medium

**Test type:**
- Regression

---

## TC-REG-E2E-067

**Title:**
Remove Book from Collection

**Scenario:** `PR-003`

**Preconditions:**
- authenticated user
- collection seeded with known book

**Test data:**
- known book in user collection

**Steps:**
- open authenticated Profile
- remove selected book
- confirm deletion if needed

**Expected result:**
- selected book is removed from collection

**Priority:**
- Medium

**Test type:**
- Regression

---

## Implementation Notes

- Start automation with `TC-SMK-E2E-025` to `TC-CRT-E2E-054`.
- Keep `TC-REG-E2E-035` to `TC-REG-E2E-067` isolated because they depend on persistent state.
- Reuse centralized test data from `test-data/` and credentials from environment/config.
- Keep assertions focused on stable outcomes only.