# 🧩 Full Reactive Form Task — **Enterprise User Registration System**

## 🏢 Real-World Scenario

You are building a **User Registration module** for an **Enterprise Application** (HR / SaaS / Admin Portal).

The system must support:

* Personal users
* Business users
* Dynamic fields
* Server-side validation
* Conditional logic
* Scalable architecture

---

## 🎯 Business Requirements

### 1️⃣ Form Types

User can register as:

* **Personal User**
* **Business User**

---

### 2️⃣ Form Fields

#### Common Fields (All Users)

* Full Name (required)
* Email (required, valid email)
* Password (required, min 8 chars)
* Confirm Password (must match)
* Role (User / Admin)

---

#### Business User Only

* Company Name (required)
* GST Number (required, pattern)
* Number of Employees

---

#### Dynamic Section

* Skills (user can add/remove skills dynamically)

---

### 3️⃣ Validation Rules

* Email must be **unique** (async validator – API simulation)
* Password & Confirm Password must match
* Company fields required **only if Business User**
* Minimum 1 skill required
* Show validation errors properly

---

### 4️⃣ UX Rules

* Disable submit if form invalid
* Show/hide company fields dynamically
* Clean separation of logic
* Easy to extend later