# Pagination Test Cases

## Purpose

This document contains the initial test case design for the Pagination submodule inside Book Store.

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

## TC-REG-PAG-052

**Title:**
Validate pagination controls are visible

**Preconditions:**
- user is on Book Store page
- book list is loaded

**Test data:**
- none

**Steps:**
- inspect the pagination area
- verify previous button, next button, and page indicator

**Expected result:**
- pagination controls are visible
- page indicator is displayed

**Priority:**
- Medium

**Test type:**
- Regression

---

## TC-REG-PAG-053

**Title:**
Validate current page indicator value

**Preconditions:**
- user is on Book Store page
- pagination area is visible

**Test data:**
- current environment state

**Steps:**
- inspect the page indicator text

**Expected result:**
- indicator shows the current paging state
- current observed state is `Page 1 of 1`

**Priority:**
- Low

**Test type:**
- Regression

---

## TC-REG-PAG-054

**Title:**
Validate previous button behavior on first page

**Preconditions:**
- user is on Book Store page
- page indicator shows first page

**Test data:**
- current environment state

**Steps:**
- click previous button on the first page
- observe resulting state

**Expected result:**
- page remains stable
- page indicator does not move to an invalid state

**Priority:**
- Low

**Test type:**
- Regression

---

## TC-REG-PAG-055

**Title:**
Validate next button behavior on last page

**Preconditions:**
- user is on Book Store page
- current environment shows single-page state

**Test data:**
- current environment state

**Steps:**
- click next button on the last available page
- observe resulting state

**Expected result:**
- page remains stable
- page indicator does not move to an invalid state

**Priority:**
- Low

**Test type:**
- Regression

---

## TC-REG-PAG-056

**Title:**
Validate pagination remains stable after search interaction

**Preconditions:**
- user is on Book Store page
- pagination area is visible
- search input is visible

**Test data:**
- `test-data/books.json` → `searchTerms.exactTitle`

**Steps:**
- apply a valid search term
- inspect the pagination area after filtering

**Expected result:**
- pagination remains visible or safely stable
- page layout is not broken after search interaction

**Priority:**
- Low

**Test type:**
- Regression
