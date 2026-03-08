# Search Test Cases

## Purpose

This document contains the initial test case design for the Search submodule inside Book Store.

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

## TC-SMK-SRCH-040

**Title:**
Validate search input is visible

**Preconditions:**
- user is on Book Store page

**Test data:**
- none

**Steps:**
- open Book Store page
- inspect the search area

**Expected result:**
- search input is visible and ready for use

**Priority:**
- High

**Test type:**
- Smoke

---

## TC-CRT-SRCH-041

**Title:**
Validate search with valid exact title

**Preconditions:**
- user is on Book Store page
- search input is visible

**Test data:**
- `test-data/books.json` → `searchTerms.exactTitle`

**Steps:**
- enter exact title in the search input
- observe filtered results

**Expected result:**
- expected book remains visible
- unrelated results are filtered out

**Priority:**
- High

**Test type:**
- Critical

---

## TC-REG-SRCH-042

**Title:**
Validate search with valid partial title

**Preconditions:**
- user is on Book Store page
- search input is visible

**Test data:**
- `test-data/books.json` → `searchTerms.partialTitle`

**Steps:**
- enter partial title in the search input
- observe filtered results

**Expected result:**
- matching results remain visible
- list is reduced according to the search term

**Priority:**
- Medium

**Test type:**
- Regression

---

## TC-REG-SRCH-043

**Title:**
Validate search by author

**Preconditions:**
- user is on Book Store page
- search input is visible

**Test data:**
- `test-data/books.json` → `searchTerms.author`

**Steps:**
- enter author name in the search input
- observe filtered results

**Expected result:**
- books associated with the author remain visible
- non-matching results are filtered out

**Priority:**
- Medium

**Test type:**
- Regression

---

## TC-CRT-SRCH-044

**Title:**
Validate search with no matches

**Preconditions:**
- user is on Book Store page
- search input is visible

**Test data:**
- `test-data/books.json` → `searchTerms.noResults`

**Steps:**
- enter a non-existing term in the search input
- observe filtered result state

**Expected result:**
- no matching records are visible or empty state is shown
- page remains stable

**Priority:**
- High

**Test type:**
- Critical

---

## TC-REG-SRCH-045

**Title:**
Validate clearing search restores the list

**Preconditions:**
- user is on Book Store page
- a search has already been applied

**Test data:**
- `test-data/books.json` → `searchTerms.exactTitle`
- `test-data/books.json` → `searchTerms.empty`

**Steps:**
- enter a valid search term
- clear the search input
- observe the list state

**Expected result:**
- full visible list is restored
- page returns to default search state

**Priority:**
- Medium

**Test type:**
- Regression
