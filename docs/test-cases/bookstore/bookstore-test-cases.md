# Book Store Test Cases

## Purpose

This document contains the initial test case design for the Book Store module.

Test case IDs follow the convention `TC-<TYPE>-<MODULE>-<NNN>`.

It keeps only the minimum information needed for future automation:
- test case ID
- title
- preconditions
- test data
- steps
- expected result
- priority
- test type

---

## TC-SMK-BS-036

**Title:**
Validate book list loads

**Preconditions:**
- no authentication required
- application is reachable

**Test data:**
- URL: `/books`

**Steps:**
- open the Book Store page
- wait for the page to load
- verify the book list container is visible

**Expected result:**
- Book Store page loads successfully
- book list is visible

**Priority:**
- High

**Test type:**
- Smoke

---

## TC-SMK-BS-037

**Title:**
Validate visible number of records

**Preconditions:**
- user is on the Book Store page
- book list is loaded

**Test data:**
- current visible catalog data

**Steps:**
- count the visible book rows
- verify the visible row count is greater than zero
- optionally compare count stability before interaction

**Expected result:**
- at least one record is visible
- visible records are rendered consistently

**Priority:**
- High

**Test type:**
- Smoke

---

## TC-CRT-BS-038

**Title:**
Validate search with valid text

**Preconditions:**
- user is on the Book Store page
- search input is visible

**Test data:**
- `test-data/books.json` → `searchTerms.exactTitle`

**Steps:**
- enter a valid known search term in the search input
- observe the filtered results
- verify the expected book remains visible

**Expected result:**
- search filters the list correctly
- the matching record is visible
- unrelated records are filtered out

**Priority:**
- High

**Test type:**
- Critical

---

## TC-CRT-BS-039

**Title:**
Validate search with no matches

**Preconditions:**
- user is on the Book Store page
- search input is visible

**Test data:**
- `test-data/books.json` → `searchTerms.noResults`

**Steps:**
- enter a non-existing search term in the search input
- observe the filtered result state

**Expected result:**
- no matching records are visible or empty state is shown
- page layout remains stable

**Priority:**
- High

**Test type:**
- Critical

---

## TC-CRT-BS-040

**Title:**
Validate navigation to detail page

**Preconditions:**
- user is on the Book Store page
- a known book title is visible in the list

**Test data:**
- `test-data/books.json` → `books.gitPocketGuide.title`
- `test-data/books.json` → `books.gitPocketGuide.isbn`

**Steps:**
- click the known book title from the list
- observe the resulting page and URL

**Expected result:**
- user is redirected to the corresponding detail page
- URL contains the selected book identifier
- selected book detail is displayed

**Priority:**
- High

**Test type:**
- Critical
