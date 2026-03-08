# Automation Scope Definition

## Purpose

This document defines the initial automation scope for the DemoQA Book Store project.

It answers three questions:
- which flows will be automated
- which flows will only be documented for now
- how each flow is prioritized

This scope is based on:
- module analysis documents
- current observed application behavior
- identified risks and limitations

---

## Scope Decision Rules

A flow is a good candidate for automation when it is:
- stable in the current environment
- observable without heavy setup
- repeatable across runs
- low-risk for cross-test pollution
- valuable for business coverage

A flow should remain **documentation-only for now** when it is:
- not fully observable yet
- dependent on unstable or unverified UI state
- destructive without proper reset strategy
- highly dependent on persistent data
- not meaningful in the current environment state

---

## Flows Confirmed for Automation

### Book Store / Catalog

#### Smoke
- open Book Store page
- verify search input is visible
- verify at least one book row is visible
- navigate from Book Store to Login

#### Critical
- search by exact title
- search with no results
- open book detail from the list

#### Regression
- search by partial title
- search by author
- clear search and restore list
- verify pagination controls are visible and stable in single-page mode
- verify search behavior on mobile viewport

---

### Login

#### Smoke
- open Login page
- verify username, password, and login button are visible

#### Critical
- login with invalid credentials shows expected feedback
- navigate from Login to Registration
- navigate from Login back to Book Store
- login with valid credentials and reach authenticated area

#### Regression
- empty username validation
- empty password validation
- empty credentials validation
- wrong username validation
- wrong password validation
- repeated failed login attempts
- mobile login behavior

---

### Registration

#### Smoke
- open Registration page
- verify all required fields are visible
- navigate back to Login

#### Critical
- verify required field presence
- verify weak/invalid password validation behavior

#### Regression
- missing first name
- missing last name
- missing username
- missing password
- duplicate username behavior
- controlled successful registration with dynamic data

**Important note:**
Successful registration is automatable only if the environment remains stable and no CAPTCHA appears.
Current revalidation on the public site shows intermittent behavior: the same successful-registration flow may complete in some runs and fail to proceed in others, depending on whether the public environment presents a CAPTCHA or similar gate.
Duplicate-username validation depends on that same submission path, so it inherits the same weakness and may be skipped for the same functional dependency when the register flow does not execute correctly.

---

### Profile

#### Smoke
- unauthenticated access to Profile shows guidance message
- unauthenticated Profile exposes Login link
- unauthenticated Profile exposes Register link

#### Critical
- authenticated user reaches Profile successfully
- logout from authenticated Profile

#### Regression
- search within collection
- empty collection behavior
- invalid session state behavior
- navigation behavior across authenticated and unauthenticated states

---

### Profile Collection Management

#### Regression only
- remove one book from collection
- cancel single-book deletion
- remove all books from collection
- cancel bulk deletion
- verify empty collection after delete-all

**Important note:**
These flows are intentionally excluded from smoke and standard critical coverage because they are destructive and stateful.

---

## Flows to Document Only for Now

The following flows should remain documented but not implemented immediately.

### Book Detail direct-by-URL validation
**Reason:**
Current direct page-content fetch did not clearly expose the expected detail page structure.

**Decision:**
- automate detail access from book list first
- defer direct-by-URL validation until locators are confirmed in browser

### True multi-page pagination navigation
**Reason:**
Current observed environment shows `Page 1 of 1`.

**Decision:**
- document multi-page expectations
- do not implement true next/previous page traversal until the environment exposes multiple pages

### Broad mobile coverage across all modules
**Reason:**
Responsive layout may alter selectors and action placement.

**Decision:**
- keep only targeted mobile checks initially
- defer full mobile suite until desktop flows are stable

### Registration as a high-frequency default flow
**Reason:**
Registration creates persistent users and depends on unique data.

**Decision:**
- keep it isolated in controlled regression
- do not include it in the default smoke path

### Book collection add/remove end-to-end chaining
**Reason:**
These flows can pollute state and affect repeatability.

**Decision:**
- keep add/remove scenarios isolated
- do not chain them into broad end-to-end suites yet

---

## Priority Classification Summary

## Smoke
Use smoke only for stable, fast, low-risk flows:
- Book Store page loads
- Login page loads
- Registration page loads
- unauthenticated Profile guidance is visible
- basic navigation between public pages

## Critical
Use critical for core business behavior with manageable setup:
- valid login
- invalid login
- exact-title search
- no-result search
- open detail from list
- authenticated Profile access
- logout

## Regression
Use regression for broader validation and stateful behavior:
- registration validation matrix
- author/partial search coverage
- collection search
- destructive Profile actions
- invalid session scenarios
- selected mobile checks

## Documentation-only for now
Use documentation-only when behavior is not yet stable enough to automate confidently:
- true multi-page navigation
- direct detail rendering by URL as a standalone flow
- broad mobile parity across all modules
- high-frequency registration success in standard suites

---

## Initial Recommended Automation Order

Suggested implementation order:

1. Public smoke flows
2. Login critical flows
3. Book Store search and detail-from-list flows
4. Unauthenticated Profile flows
5. Authenticated Profile access and logout
6. Registration validations
7. Controlled collection-management regression flows

This order maximizes stability, feedback speed, and repeatability.

---

## Out-of-Scope for Initial Phase

For the initial automation phase, the following are out of scope:
- full API automation coverage
- full mobile parity across every flow
- uncontrolled destructive collection scenarios
- direct multi-page pagination traversal without supporting data
- large end-to-end chains with persistent shared state

---

## Final Decision

The initial automation scope will focus on:
- stable public flows
- core authentication flows
- stable read-only catalog behavior
- limited and controlled authenticated flows

Stateful, destructive, or not-yet-observable behaviors will remain documented and deferred until the framework has stronger setup/reset capabilities.
