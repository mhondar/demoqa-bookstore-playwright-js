# Registration Test Cases

## Purpose

This document contains the initial test case design for the Registration module.

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

## TC-SMK-RG-015

**Title:**
Validate registration page loads

**Preconditions:**
- no active authenticated session
- application is reachable

**Test data:**
- URL: `/register`

**Steps:**
- open the Registration page
- wait for the page to load
- inspect the main registration section

**Expected result:**
- Registration page loads successfully
- registration section is visible

**Priority:**
- High

**Test type:**
- Smoke

---

## TC-SMK-RG-016

**Title:**
Validate registration form controls are visible

**Preconditions:**
- user is on the Registration page

**Test data:**
- none

**Steps:**
- inspect first name input
- inspect last name input
- inspect username input
- inspect password input
- inspect register button

**Expected result:**
- all required inputs are visible
- register button is visible

**Priority:**
- High

**Test type:**
- Smoke

---

## TC-CRT-RG-017

**Title:**
Validate navigation from registration back to login

**Preconditions:**
- user is on the Registration page

**Test data:**
- none

**Steps:**
- click the Back to Login action
- observe the resulting page

**Expected result:**
- user is redirected to the Login page
- login form is visible

**Priority:**
- High

**Test type:**
- Critical

---

## TC-CRT-RG-018

**Title:**
Validate registration with valid unique data

**Preconditions:**
- clean session
- environment allows controlled registration flow

**Test data:**
- `utils/data-helpers.js` → dynamic unique user

**Steps:**
- open the Registration page
- enter valid first name
- enter valid last name
- enter unique username
- enter valid password
- submit the registration form

**Expected result:**
- submission is accepted for processing
- account is created successfully or the expected success flow is reached

**Priority:**
- Medium

**Test type:**
- Critical

---

## TC-REG-RG-019

**Title:**
Validate registration with empty first name

**Preconditions:**
- clean session
- user is on the Registration page

**Test data:**
- empty first name
- valid values for remaining required fields

**Steps:**
- leave first name empty
- complete the remaining required fields
- submit the registration form

**Expected result:**
- registration does not succeed
- validation or blocked submission is shown

**Priority:**
- Medium

**Test type:**
- Regression

---

## TC-REG-RG-020

**Title:**
Validate registration with empty last name

**Preconditions:**
- clean session
- user is on the Registration page

**Test data:**
- empty last name
- valid values for remaining required fields

**Steps:**
- enter valid first name
- leave last name empty
- complete the remaining required fields
- submit the registration form

**Expected result:**
- registration does not succeed
- validation or blocked submission is shown

**Priority:**
- Medium

**Test type:**
- Regression

---

## TC-REG-RG-021

**Title:**
Validate registration with empty username

**Preconditions:**
- clean session
- user is on the Registration page

**Test data:**
- empty username
- valid values for remaining required fields

**Steps:**
- complete first name and last name
- leave username empty
- enter valid password
- submit the registration form

**Expected result:**
- registration does not succeed
- validation or blocked submission is shown

**Priority:**
- Medium

**Test type:**
- Regression

---

## TC-REG-RG-022

**Title:**
Validate registration with empty password

**Preconditions:**
- clean session
- user is on the Registration page

**Test data:**
- empty password
- valid values for remaining required fields

**Steps:**
- complete first name
- complete last name
- enter valid username
- leave password empty
- submit the registration form

**Expected result:**
- registration does not succeed
- validation or blocked submission is shown

**Priority:**
- Medium

**Test type:**
- Regression

---

## TC-REG-RG-023

**Title:**
Validate registration with invalid password format

**Preconditions:**
- clean session
- user is on the Registration page

**Test data:**
- invalid password dataset
- valid values for remaining required fields

**Steps:**
- complete the registration form with valid name and username values
- enter an invalid password format
- submit the registration form

**Expected result:**
- registration does not succeed
- password rule feedback is shown or submission is blocked

**Priority:**
- Medium

**Test type:**
- Regression

---

## TC-REG-RG-024

**Title:**
Validate registration with duplicate username

**Preconditions:**
- clean session
- known duplicate username exists in the environment

**Test data:**
- existing username
- valid values for remaining required fields

**Steps:**
- complete the registration form using an existing username
- submit the registration form
- inspect the feedback area

**Expected result:**
- registration does not succeed
- duplicate-user feedback is shown or the request is safely rejected

**Priority:**
- Medium

**Test type:**
- Regression