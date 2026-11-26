# EduCore React ERP - School & Student Management System

A production-ready **React 18** frontend with **Full Authentication (JWT)**, Interactive Analytics, Student Admissions, Course Management, and Printable Invoices built for your backend.

---

## ⚡ Instant Run (Zero Setup - Runs in 5 Seconds)

### Step 1: Start Backend
```bash
cd School_data
npm start
```

### Step 2: Open React App in Browser
Go to:
👉 **[http://localhost:4600](http://localhost:4600)**

*(Or double-click and open `frontend/index.html` in Chrome/Edge)*

---

## 📁 React Source Code Structure

If your senior wants to inspect the modular React codebase:
```
frontend-react/
├── package.json
├── vite.config.js
├── index.html
└── src/
    ├── main.jsx                 # React 18 createRoot
    ├── App.jsx                  # Main React Component & Router layout
    ├── context/
    │   └── AuthContext.jsx      # JWT Auth Provider (Login, Register, Logout)
    └── services/
        └── api.js               # REST API fetch calls for all backend routes
```

To run via Vite dev server:
```bash
cd frontend-react
npm install
npm run dev
```

---

## 🌟 Key Features

1. **Authentication System (JWT)**:
   - Login, Register, Logout with JWT Bearer Token management.
   - User profile dropdown and authenticated session persistence in LocalStorage.
2. **Dashboard & Analytics**:
   - 4 Live Metric KPI Cards (Students, Total Revenue, Active Courses, Scholarships).
   - Interactive Chart.js charts: Enrollment by Course & Payment Modes.
3. **Student Directory**:
   - Search by Name, Student ID, or Contact.
   - Filters by Course and Gender.
   - Bio Profile modal with full student info.
4. **New Admission Form**:
   - Dynamic course selection (auto-loads base fee from backend).
   - Real-time scholarship discount & net payable calculation.
5. **Course Catalog**:
   - Course cards with fee and duration badges.
   - "+ Add Course" modal connected to `/api/course_data`.
6. **Fees Billing & Printable Invoices**:
   - Instant fee collection modal.
   - **Printable Official Fee Receipt**: School header, invoice number, payment breakdown, and print action (`Ctrl + P`).
