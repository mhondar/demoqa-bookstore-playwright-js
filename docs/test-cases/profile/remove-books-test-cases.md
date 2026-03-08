# Remove Books from Profile Test Cases

## Purpose

This document contains the initial test case design for destructive collection-management flows inside User Profile.

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

## TC-REG-PR-069

**Title:**
Validate removing a single book

**Preconditions:**
- authenticated user session exists
- collection is seeded with a known book

**Test data:**
- `test-data/books.json` → `collectionData.booksToRemove.singleRemoveBook`

**Steps:**
- open the Profile page in authenticated state
- locate the seeded book in the collection
- trigger row-level delete action
- confirm the deletion if confirmation is shown

**Expected result:**
- selected book is removed from the collection
- remaining collection state is updated correctly

**Priority:**
- Medium

**Test type:**
- Regression

---

## TC-REG-PR-070

**Title:**
Validate cancel single-book deletion

**Preconditions:**
- authenticated user session exists
- collection is seeded with a known book

**Test data:**
- `test-data/books.json` → `collectionData.booksToRemove.singleRemoveBook`

**Steps:**
- open the Profile page in authenticated state
- trigger row-level delete action for a known book
- cancel the deletion in the confirmation flow

**Expected result:**
- selected book remains in the collection
- collection state does not change

**Priority:**
- Medium

**Test type:**
- Regression

---

## TC-REG-PR-071

**Title:**
Validate removing all books if supported

**Preconditions:**
- authenticated user session exists
- collection contains one or more books

**Test data:**
- `test-data/books.json` → `collectionData.booksToRemove.deleteAllBooks`
- `test-data/books.json` → `collectionData.expectedInitialProfileState.seededCollection`

**Steps:**
- open the Profile page in authenticated state
- trigger the delete-all action
- confirm the deletion if confirmation is shown

**Expected result:**
- if bulk deletion is supported in the current environment, collection becomes empty
- empty-state view is shown safely

**Priority:**
- Medium

**Test type:**
- Regression

---

## TC-REG-PR-072

**Title:**
Validate cancel delete-all action

**Preconditions:**
- authenticated user session exists
- collection contains one or more books

**Test data:**
- `test-data/books.json` → `collectionData.booksToRemove.deleteAllBooks`
- `test-data/books.json` → `collectionData.expectedInitialProfileState.seededCollection`

**Steps:**
- open the Profile page in authenticated state
- trigger the delete-all action
- cancel the deletion in the confirmation flow

**Expected result:**
- all books remain in the collection
- collection state does not change

**Priority:**
- Medium

**Test type:**
- Regression

---

## TC-REG-PR-073

**Title:**
Validate delete controls are safe on empty collection

**Preconditions:**
- authenticated user session exists
- collection is empty or controlled to represent empty state

**Test data:**
- `test-data/books.json` → `collectionData.expectedInitialProfileState.emptyCollection`

**Steps:**
- open the Profile page in authenticated state
- inspect row-level delete controls and bulk-delete controls

**Expected result:**
- delete controls are hidden, disabled, or safely non-effective
- no error is shown

**Priority:**
- Medium

**Test type:**
- Regression