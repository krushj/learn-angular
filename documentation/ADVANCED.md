# Phase 2 — Advanced Angular

## Outline
- [1. Dependency Injection (DI)](#1-dependency-injection-di)
  - [What is Dependency Injection?](#1-what-is-dependency-injection-di)
  - [Injectable Services](#2-injectable-services)
  - [Provider Scopes](#3-provider-scopes-very-important)
  - [`providedIn` options](#4-providedin-root--platform--any)
  - [DI Hierarchy](#5-di-hierarchy-critical-concept)
  - [DI Under the Hood](#6-di-under-the-hood-how-angular-actually-does-it)
  - [Real-World Example](#7-real-world-example)
  - [Interview-Ready One-Liners](#8-interview-ready-one-liners)
- [2. Routing & Navigation](#2-routing--navigation)
  - [What Routing Is](#what-routing-is-quick)
  - [Router Setup](#1-router-setup-foundation)
  - [RouterOutlet](#2-routeroutlet-where-pages-render)
  - [Navigation from HTML](#3-navigation-from-html-declarative)
  - [Navigation from TypeScript](#4-navigation-from-typescript-programmatic)
  - [Reading Route Data](#5-reading-route-data)
  - [Route Guards](#6-route-guards-security--rules)
  - [Lazy Loading](#7-lazy-loading-performance)
  - [Preloading Strategies](#8-preloading-strategies-faster-subsequent-loads)
  - [Typical Navigation Flow](#9-typical-navigation-flow-end-to-end)
  - [HTML vs TS Navigation](#html-vs-ts-navigation-quick-compare)
- [3. Angular Forms](#3-angular-forms)
  - [Template-Driven Forms](#1-template-driven-forms)
  - [Reactive Forms](#2-reactive-forms-recommended)
  - [FormControl](#3-formcontrol)
  - [FormGroup](#4-formgroup)
  - [FormArray](#5-formarray)
  - [Validators](#6-validators-built-in)
  - [Custom Validators](#7-custom-validators)
  - [Async Validators](#8-async-validators)
  - [Conditional Forms](#9-conditional-forms)
  - [Dynamic Forms](#10-dynamic-forms)
  - [Form Best Practices](#11-form-best-practices-very-important)
  - [Template vs Reactive Comparison](#template-vs-reactive-quick-comparison)
  - [Interview-Ready One-Liners](#interview-ready-one-liners-1)

---

## 1. Dependency Injection (DI)

### 1. What is Dependency Injection (DI)?

### Simple meaning

**Dependency Injection is a design pattern where Angular creates and provides objects (services) instead of you creating them manually.**

👉 You *ask* for what you need, Angular *gives* it to you.

---

### Why DI exists

Without DI:

* Components create their own dependencies
* Tight coupling
* Hard to test
* Hard to reuse

With DI:

* Loose coupling
* Easy testing
* Reusable services
* Cleaner architecture

---

### Simple example (conceptual)

> Component needs UserService
> Component does NOT create UserService
> Angular creates UserService and injects it

---

### 2. Injectable Services

### What is an Injectable Service?

A **service** is a class that contains:

* Business logic
* API calls
* Shared data

`@Injectable()` tells Angular:

> “This class can be injected using DI”

---

### Example

```ts
@Injectable({
  providedIn: 'root'
})
export class UserService {
  getUsers() {
    return ['Alice', 'Bob'];
  }
}
```

📌 `@Injectable` makes the class available to Angular’s DI system.

---

### Using the service in a component

```ts
constructor(private userService: UserService) {}
```

👉 You did not create `UserService`
👉 Angular injected it

---

### 3. Provider Scopes (VERY IMPORTANT)

Provider scope defines:

> **Where and how many instances of a service are created**

Angular has **multiple scopes**.

---

### 🔹 Component-level Provider

```ts
@Component({
  providers: [UserService]
})
```

**Behavior**

* New instance per component
* Destroyed when component is destroyed
* NOT shared

📌 Use when data must be **isolated**

---

### 🔹 Root-level Provider

```ts
@Injectable({
  providedIn: 'root'
})
```

**Behavior**

* Single instance for entire app
* Shared everywhere
* Created during app bootstrap

📌 Most common & recommended

---

### 4. `providedIn: root / platform / any`

This controls **where Angular registers the service**.

---

### 🔹 `providedIn: 'root'` ✅ (Most used)

```ts
@Injectable({ providedIn: 'root' })
```

* One instance for whole app
* Tree-shakable
* Best for:

  * AuthService
  * API services
  * Global state

---

### 🔹 `providedIn: 'platform'`

```ts
@Injectable({ providedIn: 'platform' })
```

* One instance shared across **multiple Angular apps**
* Rarely used
* Used in:

  * Micro-frontend platforms
  * Shared runtime services

---

### 🔹 `providedIn: 'any'`

```ts
@Injectable({ providedIn: 'any' })
```

* New instance per **lazy-loaded module**
* Shared within that module only

📌 Useful when:

* Each lazy module needs its own instance

⚠️ Less common today with standalone APIs

---

### 🔁 Quick Comparison

| Scope    | Instance | Shared?         | Use case          |
| -------- | -------- | --------------- | ----------------- |
| root     | One      | Entire app      | Global services   |
| platform | One      | Across apps     | Platform services |
| any      | Multiple | Per lazy module | Module isolation  |

---

### 5. DI Hierarchy (CRITICAL CONCEPT)

Angular resolves dependencies using a **hierarchical injector tree**.

### Injector order:

```
Component Injector
   ↓
Route / Module Injector
   ↓
Root Injector
   ↓
Platform Injector
```

---

### What this means

* Angular looks **locally first**
* If not found → goes up the tree
* Closest provider wins

---

### Example

If:

* Service is provided in component
* Also provided in root

👉 Angular uses the **component instance**, not root

---

### 6. DI Under the Hood (How Angular Actually Does It)

### Internally Angular:

1. Reads `@Injectable` metadata
2. Registers provider in injector
3. Creates service instance **only when needed**
4. Caches instance based on scope
5. Injects instance via constructor

---

### Important internals

* DI uses **tokens** (class = token)
* Uses metadata generated by Ivy
* Services are **lazy-instantiated**
* Destroyed when their injector is destroyed

---

### Why this is powerful

* No manual object creation
* Automatic lifecycle handling
* Easy mocking for tests
* High performance

---

### 7. Real-World Example

### AuthService

* Provided in `root`
* Shared across app
* Holds logged-in user state

### CartService (per feature)

* Provided in component or route
* Each feature has its own cart
* Destroyed when feature exits

---

### 8. Interview-Ready One-Liners

* **What is DI?**

  > Dependency Injection is a pattern where Angular provides required dependencies instead of components creating them manually.

* **Why DI?**

  > DI improves reusability, testability, and separation of concerns.

* **Hierarchy?**

  > Angular resolves dependencies using a hierarchical injector tree where the closest provider wins.

* **providedIn root vs any?**

  > `root` creates a singleton app-wide service, while `any` creates separate instances per lazy-loaded module.

---

## 2. Routing & Navigation

### What Routing Is (Quick)

Angular Routing maps **URLs → components** so users can navigate the app **without page reloads** (SPA behavior).

---

### 1. Router Setup (Foundation)

### Routes configuration

```ts
// app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { UsersComponent } from './users.component';
import { UserDetailComponent } from './user-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UsersComponent },
  { path: 'users/:id', component: UserDetailComponent },
  { path: 'admin', loadComponent: () => import('./admin.component').then(m => m.AdminComponent) }
];
```

### Provide the router at bootstrap

```ts
// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes, withPreloading(PreloadAllModules))]
});
```

**Why this matters**

* Centralizes navigation rules
* Enables lazy loading and preloading
* Keeps SPA navigation fast

---

### 2. RouterOutlet (Where pages render)

```html
<!-- app.component.html -->
<header>
  <a routerLink="/">Home</a>
  <a routerLink="/users" routerLinkActive="active">Users</a>
  <a routerLink="/admin" routerLinkActive="active">Admin</a>
</header>

<router-outlet></router-outlet>
```

**Key idea**
`<router-outlet>` is a **placeholder**. Angular creates/destroys routed components here.

---

### 3. Navigation from HTML (Declarative)

### Basic links

```html
<a routerLink="/">Home</a>
<a routerLink="/users">Users</a>
```

### With route params

```html
<a [routerLink]="['/users', user.id]">View User</a>
```

### With query params

```html
<a [routerLink]="['/users']"
   [queryParams]="{ page: 2, sort: 'name' }">
  Users (Page 2)
</a>
```

### Active route styling

```html
<a routerLink="/users" routerLinkActive="active">Users</a>
```

**When to use HTML navigation**

* Menus, links, simple buttons
* No conditional logic needed

---

### 4. Navigation from TypeScript (Programmatic)

### Inject the Router

```ts
import { Router } from '@angular/router';

constructor(private router: Router) {}
```

### Simple navigation

```ts
goToUsers() {
  this.router.navigate(['/users']);
}
```

```html
<button (click)="goToUsers()">Go to Users</button>
```

### With route params

```ts
viewUser(id: number) {
  this.router.navigate(['/users', id]);
}
```

### With query params

```ts
goToUsersPage() {
  this.router.navigate(['/users'], {
    queryParams: { page: 1, sort: 'date' }
  });
}
```

### Conditional navigation (very common)

```ts
loginSuccess() {
  this.router.navigate(['/dashboard']);
}
```

**When to use TS navigation**

* After form submit
* After API success
* Auth redirects
* Conditional flows

By default, Angular **replaces** existing query parameters when navigating.

```ts
this.router.navigate(['/users'], {
  queryParams: { page: 1 }
});
```

👉 Old query params are **lost**.

---

### 🔹 What does **`merge`** do?

```ts
this.router.navigate(['/users'], {
  queryParams: { page: 1 },
  queryParamsHandling: 'merge'
});
```

👉 **Keeps existing query params** and **adds/updates new ones**.

---

### Example

Current URL:

```
/users?filter=active
```

After navigation:

```
/users?filter=active&page=1
```

---

### 🔁 Options (Easy to Remember)

| Option     | Meaning        |
| ---------- | -------------- |
| default    | Replace params |
| `merge`    | Keep + update  |
| `preserve` | Keep only      |


---

### 5. Reading Route Data

### Route params

```ts
import { ActivatedRoute } from '@angular/router';

constructor(private route: ActivatedRoute) {
  const id = this.route.snapshot.paramMap.get('id');
}
```

### Query params (reactive)

```ts
this.route.queryParams.subscribe(params => {
  console.log(params['page'], params['sort']);
});
```

**Rule of thumb**

* **Route params** → required identifiers
* **Query params** → optional filters/sorting/pagination

---

### 6. Route Guards (Security & Rules)

### CanActivate guard

```ts
import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const isLoggedIn = true; // replace with real auth check
  return isLoggedIn;
};
```

### Apply the guard

```ts
{ path: 'admin', component: AdminComponent, canActivate: [authGuard] }
```

**Use guards to**

* Protect routes
* Enforce permissions
* Prevent navigation

---

### 7. Lazy Loading (Performance)

### Lazy-load a standalone component

```ts
{
  path: 'admin',
  loadComponent: () =>
    import('./admin.component').then(m => m.AdminComponent)
}
```

### Lazy-load route groups

```ts
{
  path: 'shop',
  loadChildren: () =>
    import('./shop.routes').then(m => m.shopRoutes)
}
```

**Why**

* Smaller initial bundle
* Faster startup

---

### 8. Preloading Strategies (Faster Subsequent Loads)

```ts
import { PreloadAllModules } from '@angular/router';

provideRouter(routes, withPreloading(PreloadAllModules));
```

**Options**

* `NoPreloading` (default)
* `PreloadAllModules` (recommended for many apps)
* Custom strategies (advanced)

---

### 9. Typical Navigation Flow (End-to-End)

1. User clicks a link (`routerLink`) **or** code calls `router.navigate`
2. Router checks **guards**
3. Loads component (lazy if needed)
4. Renders it in `<router-outlet>`
5. Updates URL (no reload)

---

### HTML vs TS Navigation (Quick Compare)

| Aspect      | HTML (`routerLink`) | TS (`router.navigate`) |
| ----------- | ------------------- | ---------------------- |
| Simplicity  | ✅                   | ❌                      |
| Logic-based | ❌                   | ✅                      |
| Best for    | Menus & links       | Auth, forms, redirects |

---


## 3. Angular Forms

### Overview

Angular provides **two form approaches**:

1. **Template-driven forms** (simple, HTML-focused)
2. **Reactive forms** (powerful, scalable, TypeScript-focused)

---

### 1. Template-Driven Forms

### What they are

Forms driven mostly by **HTML templates** with minimal TypeScript.

### When to use

* Simple forms
* Few fields
* Less dynamic behavior

---

### Example: Simple Login Form (Template-driven)

#### HTML

```html
<form #loginForm="ngForm" (ngSubmit)="onSubmit(loginForm)">
  <input
    name="email"
    ngModel
    required
    email
    placeholder="Email" />

  <input
    name="password"
    ngModel
    required
    minlength="6"
    type="password"
    placeholder="Password" />

  <button type="submit" [disabled]="loginForm.invalid">
    Login
  </button>
</form>
```

#### Component

```ts
onSubmit(form: any) {
  console.log(form.value);
}
```

### Key points

* Uses `ngModel`
* Validation defined in HTML
* Less control for complex cases

---

### 2. Reactive Forms (Recommended)

### What they are

Forms fully controlled in **TypeScript** using form objects.

### When to use

* Large forms
* Dynamic fields
* Complex validation
* Enterprise apps

---

### 3. FormControl

### What it is

Represents **a single form field**.

```ts
import { FormControl } from '@angular/forms';

name = new FormControl('');
```

### With validation

```ts
name = new FormControl('', Validators.required);
```

---

### 4. FormGroup

### What it is

A **group of FormControls** (entire form).

---

### Example: Registration Form

```ts
import { FormGroup, FormControl, Validators } from '@angular/forms';

form = new FormGroup({
  username: new FormControl('', Validators.required),
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', Validators.minLength(6))
});
```

#### HTML

```html
<form [formGroup]="form" (ngSubmit)="submit()">
  <input formControlName="username" />
  <input formControlName="email" />
  <input type="password" formControlName="password" />

  <button [disabled]="form.invalid">Submit</button>
</form>
```

---

### 5. FormArray

### What it is

Used for **dynamic lists of controls** (add/remove fields).

---

### Example: Skills Form

```ts
import { FormArray, FormBuilder } from '@angular/forms';

constructor(private fb: FormBuilder) {}

form = this.fb.group({
  name: [''],
  skills: this.fb.array([])
});

get skills() {
  return this.form.get('skills') as FormArray;
}

addSkill() {
  this.skills.push(this.fb.control(''));
}
```

#### HTML

```html
<div formArrayName="skills">
  <div *ngFor="let skill of skills.controls; let i = index">
    <input [formControlName]="i" />
  </div>
</div>

<button (click)="addSkill()">Add Skill</button>
```

---

### 6. Validators (Built-in)

### Common Validators

```ts
Validators.required
Validators.email
Validators.minLength(6)
Validators.maxLength(20)
Validators.pattern(/^[A-Z]+$/)
```

### Usage

```ts
email: ['', [Validators.required, Validators.email]]
```

---

### 7. Custom Validators

### When to use

* Business-specific rules
* Cross-field validation

---

### Example: Password Match Validator

```ts
import { AbstractControl } from '@angular/forms';

export function passwordMatchValidator(control: AbstractControl) {
  const password = control.get('password')?.value;
  const confirm = control.get('confirmPassword')?.value;

  return password === confirm ? null : { passwordMismatch: true };
}
```

#### Apply to FormGroup

```ts
this.form = this.fb.group(
  {
    password: [''],
    confirmPassword: ['']
  },
  { validators: passwordMatchValidator }
);
```

---

### 8. Async Validators

### What they are

Validators that run **asynchronously** (API calls).

---

### Example: Username Availability

```ts
import { AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';

usernameValidator(control: AbstractControl) {
  return this.userService.checkUsername(control.value).pipe(
    map(isTaken => (isTaken ? { usernameTaken: true } : null))
  );
}
```

```ts
username: ['', null, this.usernameValidator.bind(this)]
```

---

### 9. Conditional Forms

### Example: Company Field Only for Business Users

```ts
this.form = this.fb.group({
  type: ['personal'],
  company: ['']
});

this.form.get('type')?.valueChanges.subscribe(type => {
  const company = this.form.get('company');
  if (type === 'business') {
    company?.setValidators(Validators.required);
  } else {
    company?.clearValidators();
  }
  company?.updateValueAndValidity();
});
```

---

### 10. Dynamic Forms

### What they are

Forms created **from configuration or API data**.

---

### Example: Build from Config

```ts
fields = [
  { name: 'email', validators: [Validators.required, Validators.email] },
  { name: 'password', validators: [Validators.required] }
];

form = this.fb.group(
  this.fields.reduce((acc: any, field) => {
    acc[field.name] = ['', field.validators];
    return acc;
  }, {})
);
```

📌 Used in:

* Survey builders
* Admin panels
* CMS systems

---

### 11. Form Best Practices (VERY IMPORTANT)

### ✅ Do

* Prefer **Reactive Forms**
* Keep logic in TS, not templates
* Use custom validators for business rules
* Unsubscribe from `valueChanges` if needed
* Use `FormBuilder` for cleaner code

---

### ❌ Avoid

* Heavy logic in templates
* Using `any` for forms
* Overusing template-driven forms
* Mixing template-driven & reactive in same form

---

### Template vs Reactive (Quick Comparison)

| Feature        | Template-driven | Reactive   |
| -------------- | --------------- | ---------- |
| Control        | Low             | High       |
| Scalability    | ❌               | ✅          |
| Dynamic forms  | ❌               | ✅          |
| Validation     | HTML            | TypeScript |
| Enterprise use | ❌               | ✅          |

---


### ✅ Common `FormControl` Methods — Quick Reference Table

| Method                     | Example Code                                 | What it Does                                              |
| -------------------------- | -------------------------------------------- | --------------------------------------------------------- |
| `setValue()`               | `control.setValue('test@mail.com')`          | Sets the value exactly; errors if structure doesn’t match |
| `patchValue()`             | `control.patchValue('test@mail.com')`        | Safely updates the value (partial update allowed)         |
| `reset()`                  | `control.reset()`                            | Resets value, validation state, and flags                 |
| `disable()`                | `control.disable()`                          | Disables the control; excluded from `form.value`          |
| `enable()`                 | `control.enable()`                           | Enables a disabled control                                |
| `setValidators()`          | `control.setValidators(Validators.required)` | Replaces existing validators                              |
| `addValidators()`          | `control.addValidators(Validators.email)`    | Adds validators without removing existing ones            |
| `clearValidators()`        | `control.clearValidators()`                  | Removes all validators                                    |
| `updateValueAndValidity()` | `control.updateValueAndValidity()`           | Re-runs validation and updates status                     |
| `markAsTouched()`          | `control.markAsTouched()`                    | Marks control as touched (for showing errors)             |
| `markAsDirty()`            | `control.markAsDirty()`                      | Marks control as modified                                 |
| `markAsPristine()`         | `control.markAsPristine()`                   | Marks control as not modified                             |
| `markAsUntouched()`        | `control.markAsUntouched()`                  | Marks control as untouched                                |
| `hasError()`               | `control.hasError('required')`               | Checks if a specific validation error exists              |
| `getRawValue()`            | `form.getRawValue()`                         | Gets values including disabled controls                   |
| `valueChanges`             | `control.valueChanges.subscribe()`           | Emits value changes (Observable)                          |
| `statusChanges`            | `control.statusChanges.subscribe()`          | Emits status changes (VALID / INVALID / PENDING)          |

Perfect 👍
Below are **ALL remaining tables** you asked for — **clear, compact, interview-ready**, and **real-world focused**.

---

### ✅ `FormGroup` Methods — Quick Reference Table

| Method                     | Example Code                                 | What it Does                                            |
| -------------------------- | -------------------------------------------- | ------------------------------------------------------- |
| `setValue()`               | `form.setValue({name:'A', email:'a@b.com'})` | Sets values for **all controls** (exact match required) |
| `patchValue()`             | `form.patchValue({email:'a@b.com'})`         | Updates **partial values safely**                       |
| `reset()`                  | `form.reset()`                               | Resets all controls and states                          |
| `get()`                    | `form.get('email')`                          | Gets a specific control                                 |
| `disable()`                | `form.disable()`                             | Disables entire form                                    |
| `enable()`                 | `form.enable()`                              | Enables entire form                                     |
| `setValidators()`          | `form.setValidators(customValidator)`        | Sets group-level validators                             |
| `clearValidators()`        | `form.clearValidators()`                     | Removes group validators                                |
| `updateValueAndValidity()` | `form.updateValueAndValidity()`              | Re-runs validation                                      |
| `hasError()`               | `form.hasError('passwordMismatch')`          | Checks group-level error                                |
| `markAllAsTouched()`       | `form.markAllAsTouched()`                    | Marks all fields touched                                |
| `valueChanges`             | `form.valueChanges.subscribe()`              | Emits form value changes                                |
| `statusChanges`            | `form.statusChanges.subscribe()`             | Emits form status changes                               |

---

### ✅ `FormArray` Methods — Quick Reference Table

| Method         | Example Code                          | What it Does             |
| -------------- | ------------------------------------- | ------------------------ |
| `push()`       | `skills.push(new FormControl('JS'))`  | Adds a new control       |
| `insert()`     | `skills.insert(1, new FormControl())` | Inserts control at index |
| `removeAt()`   | `skills.removeAt(0)`                  | Removes control at index |
| `clear()`      | `skills.clear()`                      | Removes all controls     |
| `at()`         | `skills.at(0)`                        | Gets control at index    |
| `length`       | `skills.length`                       | Number of controls       |
| `setValue()`   | `skills.setValue(['JS','TS'])`        | Sets values exactly      |
| `patchValue()` | `skills.patchValue(['JS'])`           | Partial update           |
| `reset()`      | `skills.reset()`                      | Resets array             |
| `disable()`    | `skills.disable()`                    | Disables all controls    |
| `enable()`     | `skills.enable()`                     | Enables all controls     |

---

### ✅ Form Control States — What They Mean

| State       | Meaning                      |
| ----------- | ---------------------------- |
| `valid`     | Control passes validation    |
| `invalid`   | Validation failed            |
| `pending`   | Async validation running     |
| `touched`   | User focused & blurred field |
| `untouched` | User never touched field     |
| `dirty`     | Value changed                |
| `pristine`  | Value unchanged              |
| `disabled`  | Control disabled             |

---

### ✅ Checking States (Code Examples)

| Check      | Code                           |
| ---------- | ------------------------------ |
| Is valid   | `control.valid`                |
| Is invalid | `control.invalid`              |
| Is touched | `control.touched`              |
| Is dirty   | `control.dirty`                |
| Has error  | `control.hasError('required')` |

---

# ✅ When to Use What (Real-World Guide)

| Scenario               | Use               |
| ---------------------- | ----------------- |
| Simple form            | `FormControl`     |
| Full form              | `FormGroup`       |
| Dynamic list           | `FormArray`       |
| Conditional validation | `setValidators()` |
| Show errors            | `markAsTouched()` |
| API-driven UI          | `valueChanges`    |

---