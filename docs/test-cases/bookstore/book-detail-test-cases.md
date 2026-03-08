# Book Detail Test Cases

## Purpose

This document contains the initial test case design for the Book Detail submodule.

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

## TC-CRT-BD-041

**Title:**
Validate book detail page loads from catalog selection

**Preconditions:**
- user is on Book Store page
- known book is visible in the list

**Test data:**
- `test-data/books.json` → `books.gitPocketGuide.title`
- `test-data/books.json` → `books.gitPocketGuide.isbn`

**Steps:**
- click the known book title from the catalog
- wait for the detail page to load
- verify the detail view is displayed

**Expected result:**
- user reaches the book detail page
- URL contains the selected ISBN
- detail container is visible

**Priority:**
- High

**Test type:**
- Critical

---

## TC-CRT-BD-042

**Title:**
Validate detail page shows expected book information

**Preconditions:**
- user is on a known book detail page

**Test data:**
- `test-data/books.json` → `books.gitPocketGuide.title`
- `test-data/books.json` → `books.gitPocketGuide.author`
- `test-data/books.json` → `books.gitPocketGuide.isbn`

**Steps:**
- open the known book detail page from the catalog
- inspect the visible detail fields
- verify title, author, and ISBN information

**Expected result:**
- selected book information matches expected data
- key metadata is visible on the page

**Priority:**
- High

**Test type:**
- Critical

---

## TC-REG-BD-043

**Title:**
Validate back navigation to Book Store

**Preconditions:**
- user is on a book detail page

**Test data:**
- known book from `test-data/books.json`

**Steps:**
- open a known book detail page
- click the back-to-book-store action
- observe resulting page

**Expected result:**
- user returns to the Book Store page
- book list is visible again

**Priority:**
- Medium

**Test type:**
- Regression

---

## TC-REG-BD-044

**Title:**
Validate add book to collection without login is blocked

**Preconditions:**
- clean unauthenticated session
- stable book detail access

**Test data:**
- `test-data/books.json` → `books.gitPocketGuide.title`

**Steps:**
- open a known book detail page from the catalog
- trigger add-to-collection action
- observe resulting behavior

**Expected result:**
- add-to-collection does not succeed
- user is redirected to login or blocked safely

**Priority:**
- Medium

**Test type:**
- Regression

---

## TC-REG-BD-045

**Title:**
Validate add book to collection with authenticated user

**Preconditions:**
- authenticated user session exists
- collection state is controlled
- stable book detail access

**Test data:**
- `test-data/books.json` → `books.gitPocketGuide.title`

**Steps:**
- open a known book detail page
- trigger add-to-collection action
- verify resulting collection state

**Expected result:**
- selected book is added to the collection successfully

**Priority:**
- Medium

**Test type:**
- Regression
