# Negative Scenarios Inventory

## Purpose

This document defines the initial inventory of negative scenarios for the DemoQA Book Store automation project.

It focuses on invalid, blocked, or protected behaviors that the application should handle safely.

The scenarios below are aligned with:
- the current automation scope
- the risks and limitations already identified
- the initial main-scenarios inventory

---

## Scenario Inventory

## 1. Login with Invalid Credentials

**Scenario ID:** `NEG-LG-001`

**Goal:**
Verify that the application rejects invalid credentials and prevents unauthorized access.

**Type:**
Authentication negative

**Preconditions:**
- browser session is clean
- invalid credentials are available from `test-data/invalid-users.json`

**Main steps:**
- open `/login`
- enter an invalid username and/or password
- submit the form

**Expected result:**
- user remains on login page
- invalid credential feedback is shown
- authenticated access is not granted

**Priority:**
- `Critical`

**Automation decision:**
- automate immediately

---

## 2. Login with Empty Fields

**Scenario ID:** `NEG-LG-002`

**Goal:**
Verify that the login form blocks submission or shows validation when required fields are empty.

**Type:**
Authentication negative / validation

**Preconditions:**
- browser session is clean
- login page is reachable

**Main steps:**
- open `/login`
- leave username and password empty, or leave one field empty
- attempt to submit the form

**Expected result:**
- validation behavior is shown
- login does not succeed
- user remains on login page

**Priority:**
- `Regression`

**Automation decision:**
- automate

**Notes:**
- keep empty-field validations separate from wrong-credential validations
- validation containers may differ from invalid-credential message containers

---

## 3. Search with No Results

**Scenario ID:** `NEG-BS-001`

**Goal:**
Verify that Book Store search handles unmatched input safely.

**Type:**
Public negative / read-only

**Preconditions:**
- user is on `/books`
- no-result term is available in `test-data/books.json`

**Main steps:**
- open Book Store page
- enter a non-existing search term
- observe filtered result state

**Expected result:**
- no matching rows remain visible, or empty filtered state is shown
- page layout remains stable
- no error or broken rendering occurs

**Priority:**
- `Critical`

**Automation decision:**
- automate immediately

---

## 4. Access Protected Actions Without Authentication

**Scenario ID:** `NEG-PR-001`

**Goal:**
Verify that protected Profile-related actions are not available to unauthenticated users.

**Type:**
Access-control negative

**Preconditions:**
- browser session is clean
- user is not authenticated

**Main steps:**
- navigate directly to `/profile`
- inspect the resulting state
- attempt to continue through available guidance links if needed

**Expected result:**
- protected profile content is not shown
- unauthenticated guidance message is displayed
- login and registration paths are offered instead of protected actions

**Priority:**
- `Critical`

**Automation decision:**
- automate immediately

---

## 5. Attempt to Add Book Without Login

**Scenario ID:** `NEG-BD-001`

**Goal:**
Verify that an unauthenticated user cannot add a book to the collection.

**Type:**
Protected-action negative / stateful

**Preconditions:**
- browser session is clean
- user is not authenticated
- known book detail can be opened from the catalog

**Main steps:**
- open a known book detail page from the list
- attempt to trigger `Add To Your Collection`
- observe resulting behavior

**Expected result:**
- add-to-collection does not succeed for an unauthenticated user
- application redirects to login or blocks the action safely
- no collection state is created or changed

**Priority:**
- `Regression`

**Automation decision:**
- automate in a controlled way after `BookDetailPage` is implemented

**Notes:**
- keep this scenario isolated from authenticated add-to-collection tests
- prefer validating from list-to-detail navigation rather than direct-by-URL only

---

## Priority Summary

### Critical
- `NEG-LG-001` Login with Invalid Credentials
- `NEG-BS-001` Search with No Results
- `NEG-PR-001` Access Protected Actions Without Authentication

### Regression
- `NEG-LG-002` Login with Empty Fields
- `NEG-BD-001` Attempt to Add Book Without Login

---

## Implementation Notes

- Negative authentication scenarios should use centralized invalid datasets.
- Protected-action negatives should always start with a clean unauthenticated session.
- Search negative scenarios are good early candidates because they are stable and read-only.
- Add-to-collection negative flow should be implemented only after detail navigation is stable.

---

## Recommended Next Step

Use this negative inventory together with the main scenario inventory to build the **Initial Coverage Plan**, including:
- suite assignment
- setup/cleanup needs
- data dependencies
- implementation order
