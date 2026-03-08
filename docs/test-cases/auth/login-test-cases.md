# Login Test Cases

## Purpose

This document contains the initial test case design for the Login module.

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

## TC-SMK-LG-004

**Title:**
Validate login page loads

**Preconditions:**
- no active authenticated session
- application is reachable

**Test data:**
- URL: `/login`

**Steps:**
- open the Login page
- wait for the page to load
- inspect the main login section

**Expected result:**
- Login page loads successfully
- login section is visible

**Priority:**
- High

**Test type:**
- Smoke

---

## TC-SMK-LG-005

**Title:**
Validate login form controls are visible

**Preconditions:**
- user is on the Login page

**Test data:**
- none

**Steps:**
- inspect username input
- inspect password input
- inspect login button

**Expected result:**
- username input is visible
- password input is visible
- login button is visible and enabled

**Priority:**
- High

**Test type:**
- Smoke

---

## TC-CRT-LG-006

**Title:**
Validate login with invalid password

**Preconditions:**
- clean session

**Test data:**
- `test-data/invalid-users.json` → invalid password dataset
- valid username from environment/config

**Steps:**
- open the Login page
- enter valid username
- enter invalid password
- submit the login form
- inspect the feedback area

**Expected result:**
- authentication does not succeed
- user remains on the Login page
- invalid credential feedback is shown

**Priority:**
- High

**Test type:**
- Critical

---

## TC-CRT-LG-007

**Title:**
Validate navigation from login to registration

**Preconditions:**
- user is on the Login page

**Test data:**
- none

**Steps:**
- click the New User action
- observe the resulting page

**Expected result:**
- user is redirected to the Registration page
- registration form is visible

**Priority:**
- Medium

**Test type:**
- Critical

---

## TC-REG-LG-008

**Title:**
Validate login with empty username

**Preconditions:**
- clean session
- user is on the Login page

**Test data:**
- empty username
- valid password

**Steps:**
- leave username empty
- enter a valid password
- submit the login form

**Expected result:**
- submission is blocked
- focus returns to the username input
- username input is marked invalid / highlighted in red
- user remains on the Login page

**Priority:**
- Medium

**Test type:**
- Regression

---

## TC-REG-LG-009

**Title:**
Validate login with empty password

**Preconditions:**
- clean session
- user is on the Login page

**Test data:**
- valid username
- empty password

**Steps:**
- enter a valid username
- leave password empty
- submit the login form

**Expected result:**
- submission is blocked
- password input is marked invalid / highlighted in red
- username remains populated
- user remains on the Login page

**Priority:**
- Medium

**Test type:**
- Regression

---

## TC-REG-LG-010

**Title:**
Validate login with empty fields

**Preconditions:**
- clean session
- user is on the Login page

**Test data:**
- empty username
- empty password

**Steps:**
- leave username empty
- leave password empty
- submit the login form

**Expected result:**
- submission is blocked or validation is shown
- user remains on the Login page

**Priority:**
- Medium

**Test type:**
- Regression

---

## TC-CRT-LG-011

**Title:**
Validate logout

**Preconditions:**
- authenticated user session exists

**Test data:**
- valid credentials or authenticated session state

**Steps:**
- access the authenticated area
- trigger logout
- inspect the resulting state

**Expected result:**
- authenticated session is cleared
- user is redirected or shown an unauthenticated state

**Priority:**
- High

**Test type:**
- Critical

---

## TC-REG-LG-012

**Title:**
Validate navigation from login back to Book Store

**Preconditions:**
- user is on the Login page

**Test data:**
- none

**Steps:**
- click the Book Store action
- observe the resulting page

**Expected result:**
- user is redirected to the Book Store page
- catalog view is visible

**Priority:**
- Medium

**Test type:**
- Regression