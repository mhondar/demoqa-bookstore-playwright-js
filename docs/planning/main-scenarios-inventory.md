# Main Scenarios Inventory

## Purpose

This document defines the initial inventory of main business scenarios for the DemoQA Book Store automation project.

It focuses on the core scenarios that will drive:
- page object implementation
- test suite structure
- smoke, critical, and regression planning
- future traceability between analysis and automated coverage

The scenarios below are based on the current automation scope and previously documented module analysis.

---

## Scenario Inventory

## 1. Access Book Store

**Scenario ID:** `BS-001`

**Goal:**
Verify that a user can access the public Book Store page successfully.

**Type:**
Public / read-only

**Preconditions:**
- no authentication required
- application is reachable

**Main steps:**
- navigate to `/books`
- wait for page to load
- verify the catalog container is visible

**Expected result:**
- Book Store page loads successfully
- at least one visible book entry is rendered

**Priority:**
- `Smoke`

**Automation decision:**
- automate

---

## 2. View Book Catalog

**Scenario ID:** `BS-002`

**Goal:**
Verify that the visible book catalog shows book metadata correctly.

**Type:**
Public / read-only

**Preconditions:**
- user is on `/books`

**Main steps:**
- open Book Store page
- inspect visible catalog rows
- verify title, author, and publisher information is present

**Expected result:**
- book rows are visible
- each row exposes meaningful metadata

**Priority:**
- `Smoke`

**Automation decision:**
- automate

---

## 3. Search Books

**Scenario ID:** `BS-003`

**Goal:**
Verify that a user can search the catalog and filter visible books.

**Type:**
Public / read-only

**Preconditions:**
- user is on `/books`
- known search data is available in `test-data/books.json`

**Main steps:**
- enter an exact title, partial title, author, or no-result term
- observe filtered results
- optionally clear the search input

**Expected result:**
- matching rows remain visible
- non-matching rows are filtered out
- no-result search behaves safely
- clearing search restores the list

**Priority:**
- `Critical` for exact title and no-result search
- `Regression` for partial title, author, and reset behavior

**Automation decision:**
- automate

---

## 4. Navigate to Book Detail

**Scenario ID:** `BD-001`

**Goal:**
Verify that a user can open a book detail page from the catalog.

**Type:**
Public / mostly read-only

**Preconditions:**
- user is on `/books`
- known book title is available in the list

**Main steps:**
- open Book Store page
- click a known book title
- observe the resulting detail page

**Expected result:**
- route changes to `/books?book=<isbn>`
- selected book detail view is displayed
- title/author match the selected book

**Priority:**
- `Critical`

**Automation decision:**
- automate from list navigation
- keep direct-by-URL validation documented for now

---

## 5. Valid Login

**Scenario ID:** `LG-001`

**Goal:**
Verify that a valid user can log in successfully.

**Type:**
Authenticated / controlled state

**Preconditions:**
- valid credentials are available in environment/config
- browser session is clean

**Main steps:**
- open `/login`
- enter valid username and password
- submit the form

**Expected result:**
- authentication succeeds
- user reaches authenticated area (expected Profile)

**Priority:**
- `Critical`

**Automation decision:**
- automate

---

## 6. Invalid Login

**Scenario ID:** `LG-002`

**Goal:**
Verify that invalid credentials are rejected correctly.

**Type:**
Authentication negative

**Preconditions:**
- invalid credential dataset is available
- browser session is clean

**Main steps:**
- open `/login`
- submit wrong username and/or password
- observe feedback

**Expected result:**
- user remains on login page
- invalid credential message or equivalent feedback is shown
- no authenticated access is granted

**Priority:**
- `Critical`

**Automation decision:**
- automate

---

## 7. Logout

**Scenario ID:** `PR-001`

**Goal:**
Verify that an authenticated user can log out successfully.

**Type:**
Authenticated / state transition

**Preconditions:**
- user is authenticated
- user can access Profile

**Main steps:**
- reach the authenticated Profile area
- click logout
- observe resulting state

**Expected result:**
- authenticated session is cleared
- user is redirected or shown unauthenticated state

**Priority:**
- `Critical`

**Automation decision:**
- automate

---

## 8. Access Authenticated Profile

**Scenario ID:** `PR-002`

**Goal:**
Verify that an authenticated user can open the Profile area successfully.

**Type:**
Authenticated / controlled state

**Preconditions:**
- valid credentials or authenticated storage state available

**Main steps:**
- authenticate the user
- navigate to `/profile`
- inspect profile state

**Expected result:**
- unauthenticated message is not shown
- authenticated profile content is visible
- collection area is available

**Priority:**
- `Critical`

**Automation decision:**
- automate

---

## 9. Add Book to Collection

**Scenario ID:** `BD-002`

**Goal:**
Verify that an authenticated user can add a selected book to their collection.

**Type:**
Authenticated / stateful

**Preconditions:**
- user is authenticated
- known book detail page is reachable
- collection state is controlled before execution

**Main steps:**
- open a known book detail page from the catalog
- trigger `Add To Your Collection`
- verify resulting collection state

**Expected result:**
- selected book is added to the user collection
- collection reflects the change correctly

**Priority:**
- `Regression`

**Automation decision:**
- automate later in controlled regression only
- not part of smoke or default critical path initially

---

## 10. Remove Book from Collection

**Scenario ID:** `PR-003`

**Goal:**
Verify that an authenticated user can remove a book from their collection.

**Type:**
Authenticated / destructive / stateful

**Preconditions:**
- user is authenticated
- collection contains at least one known book
- collection state is seeded and controlled

**Main steps:**
- open authenticated Profile
- target a known book in the collection
- trigger delete action
- confirm removal

**Expected result:**
- selected book is removed from the collection
- collection state updates correctly

**Priority:**
- `Regression`

**Automation decision:**
- automate in isolated regression suite only
- keep out of smoke and default critical coverage

---

## Priority Summary

### Smoke
- `BS-001` Access Book Store
- `BS-002` View Book Catalog

### Critical
- `BS-003` Search Books (exact title / no-result baseline)
- `BD-001` Navigate to Book Detail
- `LG-001` Valid Login
- `LG-002` Invalid Login
- `PR-001` Logout
- `PR-002` Access Authenticated Profile

### Regression
- `BS-003` extended search coverage
- `BD-002` Add Book to Collection
- `PR-003` Remove Book from Collection

---

## Implementation Notes

- Read-only public scenarios should be implemented first.
- Authenticated flows should use deterministic credentials or controlled storage state.
- Add/remove collection flows must be isolated because they affect persistent data.
- Direct detail-by-URL validation remains outside this first scenario set.
- True multi-page pagination is not included because the current environment shows `Page 1 of 1`.

---

## Recommended Next Step

Use this scenario inventory to create the **Initial Coverage Plan**, mapping each scenario to:
- target suite
- page objects needed
- test data needed
- setup/cleanup requirements
