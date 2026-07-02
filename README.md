# Meridian - Guiding Enterprise Excellence.

> Enterprise Governance, Risk, Compliance, and Procurement Platform

Meridian is a role-aware enterprise front-end that centralizes procurement, vendor management, risk tracking, compliance records, audit visibility, reporting, authentication, and account preferences in one application shell.

<p align="center">
  <img src="https://img.shields.io/badge/React-19.0.1-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React 19.0.1" />
  <img src="https://img.shields.io/badge/Vite-6.2.3-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite 6.2.3" />
  <img src="https://img.shields.io/badge/Redux%20Toolkit-2.12.0-764ABC?style=for-the-badge&logo=redux&logoColor=white" alt="Redux Toolkit 2.12.0" />
  <img src="https://img.shields.io/badge/Material%20UI-9.1.2-007FFF?style=for-the-badge&logo=mui&logoColor=white" alt="Material UI 9.1.2" />
  <img src="https://img.shields.io/badge/React%20Router-7.18.0-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white" alt="React Router 7.18.0" />
  <img src="https://img.shields.io/badge/Axios-1.18.1-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios 1.18.1" />
  <img src="https://img.shields.io/badge/i18next-26.3.4-26A69A?style=for-the-badge" alt="i18next 26.3.4" />
  <img src="https://img.shields.io/badge/Redux%20Persist-6.0.0-764ABC?style=for-the-badge" alt="Redux Persist 6.0.0" />
  <img src="https://img.shields.io/badge/Status-Demo%20%2F%20Evaluation-2E7D32?style=for-the-badge" alt="Project Status" />
  <img src="https://img.shields.io/badge/License-Unlicensed-lightgrey?style=for-the-badge" alt="License" />
</p>

<p align="center">
  <strong>Guiding Enterprise Excellence.</strong><br />
  A modern enterprise interface for governance, risk, compliance, procurement, and reporting workflows.
</p>

---

## Table of Contents
- [Project Overview](#project-overview)
- [Business Background](#business-background)
- [Problem Statement](#problem-statement)
- [Product Vision](#product-vision)
- [Objectives](#objectives)
- [Key Features](#key-features)
- [Target Users](#target-users)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [System Architecture](#system-architecture)
- [Redux Architecture](#redux-architecture)
- [Routing Architecture](#routing-architecture)
- [Component Hierarchy](#component-hierarchy)
- [Application Workflow](#application-workflow)
- [Application Modules](#application-modules)
- [User Roles & Permissions](#user-roles--permissions)
- [Authentication & Authorization](#authentication--authorization)
- [State Management](#state-management)
- [API & Services](#api--services)
- [Mock Data Strategy](#mock-data-strategy)
- [UI / UX](#ui--ux)
- [Performance Optimizations](#performance-optimizations)
- [Testing Strategy](#testing-strategy)
- [Screenshots](#screenshots)
- [Installation & Quick Start](#installation--quick-start)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)
- [Roadmap](#roadmap)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)
- [Acknowledgements](#acknowledgements)
- [Support](#support)
- [Footer](#footer)

## Project Overview
Meridian is a single-page enterprise application built with React and Vite. It presents a structured operating model for governance, risk, compliance, procurement, vendor oversight, reporting, and user preferences. The current implementation is front-end driven, with Redux Toolkit managing application state and mock data simulating enterprise workflows.

## Business Background
Large organizations often manage procurement, vendor oversight, compliance, risk, and audit in disconnected systems. That fragmentation creates duplicate work, inconsistent reporting, and reduced visibility for operational leaders. Meridian consolidates those flows into a unified user experience.

## Problem Statement
The codebase addresses fragmented enterprise operations, limited role-specific visibility, and manual coordination between procurement, risk, compliance, audit, and reporting teams. Meridian demonstrates how a modern front-end can centralize those workflows without a live backend during early delivery or evaluation.

## Product Vision
Provide a professional enterprise control center where authenticated users can navigate role-specific modules, manage records, inspect dashboards, export reports, update preferences, and preserve session context across reloads.

## Objectives
- Centralize procurement, vendor, risk, compliance, audit, and reporting workflows.
- Enforce role-based navigation and access control.
- Present enterprise metrics through a responsive dashboard.
- Support local editing, filtering, exporting, and inspection of records.
- Preserve auth and UI preferences across sessions.
- Support localization for English and Hindi.

## Key Features
- Role-aware login with demo credentials.
- Protected application shell with sidebar, header, breadcrumbs, search, and notifications.
- Dashboard with KPIs, charts, and recent activity views.
- Procurement list with create, update, delete, filter, details, approval, and export actions.
- Vendor list with onboarding, profile dialogs, deletion, and export.
- Risk registry with record management and export.
- Compliance registry with record management and export.
- Audit log browser with search, sorting, and export.
- Reports hub with role-based report cards and export actions.
- Settings module for profile, password, language, timezone, and notification preferences.
- Landing page with enterprise marketing content and contact/demo form.
- Public resource pages for blogs, documentation, FAQs, privacy policy, and terms of service.
- Theme switching between light and dark modes.
- Persisted auth and UI state.
- Global search across permitted records.

## Target Users
- **Employee**: Submits and tracks procurement requests and views personal dashboard data.
- **Manager**: Reviews procurement activity, manages vendors, and accesses reporting surfaces.
- **Compliance Officer**: Maintains compliance records, reviews risk signals, and exports compliance-oriented reports.
- **Auditor**: Reviews audit logs and audit-related reporting for traceability.
- **Administrator**: Has broad access across protected modules, settings, and oversight capabilities.
- **Guest / Public Visitor**: Accesses the public landing page and resource pages such as blogs, documentation, FAQs, privacy policy, terms, and sign-in screens.

## Technology Stack

| Technology | Purpose | Version |
|---|---|---:|
| React | UI framework | 19.0.1 |
| Vite | Build tool and development server | 6.2.3 |
| Redux Toolkit | Centralized state management | 2.12.0 |
| React Redux | React bindings for Redux | 9.3.0 |
| Redux Persist | Persisted client state | 6.0.0 |
| React Router DOM | Routing and navigation | 7.18.0 |
| Material UI | Design system and component library | 9.1.2 |
| Emotion | Styling engine used by MUI | 11.14.x |
| Axios | HTTP client | 1.18.1 |
| React Hook Form | Form state management | 7.80.0 |
| Yup | Schema validation | 1.7.1 |
| Recharts | Data visualization | 3.9.0 |
| date-fns | Date helpers and formatting | 4.4.0 |
| jsPDF | PDF generation | 4.2.1 |
| xlsx | Excel export | 0.18.5 |
| papaparse | CSV export | 5.5.4 |
| i18next | Localization runtime | 26.3.4 |
| react-i18next | React localization bindings | 17.0.8 |
| motion | UI motion and transitions | 12.23.24 |
| lucide-react | Supplemental icon set | 0.546.0 |
| uuid | Client-side ID generation | 14.0.1 |

## Project Structure
```text
meridian-_e---grcp/
├── .env.example
├── .gitignore
├── README.md
├── index.html
├── metadata.json
├── package-lock.json
├── package.json
├── src/
│   ├── App.jsx
│   ├── components/
│   │   └── ScrollToTop.jsx
│   ├── features/
│   │   ├── Audit/
│   │   ├── Auth/
│   │   ├── Compliance/
│   │   ├── Dashboard/
│   │   ├── Landing/
│   │   ├── Procurement/
│   │   ├── Reports/
│   │   ├── Resources/
│   │   ├── Risk/
│   │   ├── Settings/
│   │   └── Vendors/
│   ├── hooks/
│   ├── index.css
│   ├── layouts/
│   ├── mocks/
│   ├── routes/
│   ├── services/
│   ├── store/
│   │   └── slices/
│   └── tests/
├── ts_errors.txt
├── tsconfig.json
└── vite.config.ts
```

## System Architecture

**Architecture Diagram**

![image alt](https://github.com/mohammed-danish-dev/Meridian/blob/c3f96a237adfd4dfdbfcae68af2053ec2e57bcdf/Image%20-%2001.png)

The application follows a layered frontend architecture:

- **Overall frontend architecture**: A React 19 single-page application bootstrapped by Vite and wrapped in Redux Provider, Redux Persist, and Material UI theme providers.
- **Presentation layer**: Shared layout components, feature pages, dialogs, cards, DataGrid tables, and chart widgets render the user interface.
- **Routing**: `react-router-dom` defines public pages, protected pages, and lazy-loaded route boundaries.
- **State management**: Redux Toolkit slices manage auth, UI preferences, domain entities, notifications, dashboard metrics, audit logs, and reports.
- **Service layer**: Axios, export helpers, formatting helpers, date utilities, and localization bootstrap live in `src/services/`.
- **Mock data layer**: `src/mocks/dataGenerator.js` seeds enterprise-like users, procurements, vendors, risks, compliance items, audit logs, and notifications.
- **UI layer**: Material UI provides theming, responsive layout primitives, dialogs, forms, navigation, and data tables.
- **Data flow**: User actions dispatch Redux actions or async thunks, slices update state, selectors feed the UI, and the view re-renders with persisted preferences and filtered datasets.

## Redux Architecture

**Redux Flow Diagram**

![image alt](https://github.com/mohammed-danish-dev/Meridian/blob/213449b592d58426122d412b547c5f1ba16893a6/Image%20-%2002.png)

The Redux implementation is centered around `src/store/store.js` and the slices under `src/store/slices/`.

- **Store configuration**: The root store combines `auth`, `ui`, `procurement`, `vendors`, `risk`, `compliance`, `notifications`, `dashboard`, `audit`, and `reports`.
- **Slices**: Each business domain owns a dedicated slice with local CRUD-style reducers and mock-backed initial state.
- **Reducers**: Redux Toolkit reducers use Immer-backed mutation syntax for compact immutable updates.
- **Actions**: Components dispatch actions for login, logout, theme toggles, record changes, notification updates, and profile preferences.
- **Async thunks**: `createAsyncThunk` is used for dashboard metrics, audit logs, and report generation to simulate asynchronous enterprise lifecycles.
- **Selectors**: Components read state with `useSelector` at the point of use.
- **Redux Persist**: Only `auth` and `ui` are persisted, preserving login state and interface preferences across reloads.
- **State lifecycle**: A component dispatches an action, the slice updates, selectors expose the new state, and the affected UI re-renders immediately.

## Routing Architecture

**Router Flow Diagram**

![image alt](https://github.com/mohammed-danish-dev/Meridian/blob/213449b592d58426122d412b547c5f1ba16893a6/Image%20-%2003.png)

Routing is defined in `src/routes/router.jsx` and uses lazy loading for route-level code splitting.

- **Public routes**: `/`, `/blogs`, `/blogs/:id`, `/documentation`, `/faqs`, `/privacy`, `/terms`, `/login`, `/forgot-password`, `/reset-password`, and `/session-expired`.
- **Protected routes**: `/dashboard`, `/procurement`, `/vendors`, `/risk`, `/compliance`, `/audit`, `/reports`, and `/settings` render inside the authenticated shell.
- **Nested routes**: `AppLayout` renders the shared shell and places module content through `Outlet`.
- **Role-based routing**: Route guards verify the authenticated user and allowed role list before rendering a module.
- **Navigation flow**: Public users enter through the landing page or sign-in page, and authenticated users are directed to permitted modules based on role.

## Component Hierarchy

**Component Hierarchy Diagram**

![image alt](https://github.com/mohammed-danish-dev/Meridian/blob/213449b592d58426122d412b547c5f1ba16893a6/Image%20-%2004.png)

- **Layouts**: `AppLayout`, `Header`, `Sidebar`, and `GlobalSearch` form the persistent enterprise shell.
- **Pages**: Feature pages under `src/features/` implement landing, auth, dashboard, module lists, reports, settings, and public resources.
- **Reusable components**: `ScrollToTop` and `StatCard` are shared across the app.
- **Feature components**: Forms, dialogs, lists, and tab panels are colocated with their domain modules.
- **Hooks**: `useTranslation` synchronizes language selection, and `useHomeNavigation` routes users to role-appropriate landing destinations.
- **Services**: HTTP, export, format, date, i18n, and translation helpers live in `src/services/`.
- **Store**: Redux slices hold operational state consumed by layout, search, dashboard, forms, and notification surfaces.

## Application Workflow
1. A visitor opens the public landing page.
2. The user navigates to sign-in or one of the public resource pages.
3. The login screen validates credentials and dispatches the mock authentication flow.
4. Successful authentication stores the user, token, and preferences in Redux.
5. The protected shell renders with role-aware sidebar items and header controls.
6. The user opens module pages, searches permitted records, and performs record actions.
7. Lists, dialogs, and charts read from Redux state and refresh immediately after updates.
8. Export actions create CSV, Excel, or PDF output from the current data set.
9. Settings updates change profile, password, language, timezone, and notification preferences.

## Application Modules

### Landing Page
Public-facing enterprise marketing page with navigation, theme toggle, resource links, statistics, dashboard preview, workflow narrative, and a contact/demo form.

### Authentication
Login, forgot password, reset password, and session-expired screens with role-aware demo access and local password update behavior.

### Dashboard
Role-sensitive dashboard with KPI cards, spend and risk visualizations, activity summaries, and export actions.

### Procurement
Procurement request browser with filtering, create/edit dialogs, approval and rejection actions, details dialog, deletion confirmation, and export support.

### Vendors
Vendor browser with onboarding, edit flow, profile dialog, search, deletion, rating display, and export support.

### Risk
Risk registry with severity, category, impact, likelihood, status, form-based record management, details view, deletion, and export support.

### Compliance
Compliance registry with certification and policy records, expiration tracking, form-based management, details view, deletion, and export support.

### Audit
Audit log browser with timestamped entries, module mapping, user mapping, search, sorting, and export support.

### Reports
Role-based export center for procurement, vendor, risk, compliance, and audit report types.

### Settings
Profile, security, preferences, and notifications tabs for avatar, personal information, password, language, timezone, and notification preferences.

### Resources
Public blogs, blog details, documentation, FAQs, privacy policy, and terms of service pages.

### Notifications
Header-level notification center powered by Redux state with mark-as-read and mark-all-as-read actions.

### Global Search
Header search component that searches permitted procurement, vendor, risk, compliance, audit, report, notification, and user data based on the current role.

## User Roles & Permissions

| Role | Scope | Key Permissions |
|---|---|---|
| Guest / Public Visitor | Public pages | View landing, blogs, documentation, FAQs, privacy policy, terms, and authentication screens. |
| Employee | Personal procurement scope | View dashboard and manage their own procurement requests. |
| Manager | Procurement and vendor operations | Review procurement requests, manage vendors, and access procurement/vendor reporting. |
| Compliance Officer | Compliance oversight | Manage compliance records, review risk-related records, and access compliance reports. |
| Auditor | Audit and review | Access audit logs and audit-related reports. |
| Administrator | Full platform access | Access all protected modules, settings, and reporting surfaces. |

## Authentication & Authorization
- **Login**: The login form uses React Hook Form and Yup validation, then dispatches a mock login thunk against the in-memory user set.
- **Forgot Password**: Simulates sending a recovery link and routes the user toward reset.
- **Reset Password**: Validates the reset form and stores the updated password in Redux state.
- **Protected routes**: `ProtectedRoute` checks authentication and role access before rendering the target module.
- **Session management**: `redux-persist` preserves auth and UI state, and a session-expired screen is available for re-entry.
- **Authorization**: Route-level checks, sidebar filtering, and role-aware global search keep users inside their permitted scope.

## State Management
Meridian uses Redux Toolkit as the central state layer. `createSlice` drives the majority of the domain state, and `createAsyncThunk` simulates asynchronous lifecycle behavior for dashboard, audit, and report workflows. Components use `useSelector` and `useDispatch` directly, which keeps state flow explicit and easy to audit.

## API & Services
The Axios client in `src/services/apiClient.js` is configured with a base URL of `VITE_API_URL` when available, or `/api` by default. It sets JSON headers, injects an authorization bearer token from the persisted auth state, and logs response conditions for 401, 403, and server-side errors.

Supporting services include:
- `exportUtils.js` for CSV, Excel, and PDF output.
- `formatUtils.js` for INR currency formatting.
- `dateUtils.js` for timezone-aware date and time formatting.
- `i18n.js` and `translations.js` for localization bootstrap.

## Mock Data Strategy
The application relies on generated and static mock data to simulate enterprise datasets without a live backend. `src/mocks/dataGenerator.js` builds structured records for users, vendors, procurements, risks, compliance entries, audit logs, and notifications. JSON fixtures in `src/mocks/` support local evaluation and development.

This approach allows the UI to behave like a real operational platform while keeping CRUD, search, filter, and export flows deterministic.

## UI / UX
- **Design System**: Material UI provides the design foundation, including AppBar, Drawer, DataGrid, Tabs, Dialogs, Cards, Menus, Snackbars, and responsive layout primitives.
- **Responsive Design**: The interface adapts across mobile, tablet, and desktop breakpoints with collapsible navigation and stacked actions.
- **Theme Support**: Light and dark modes are available through the `ui` slice and MUI theme generation.
- **Accessibility**: Semantic controls, keyboard-friendly navigation, accessible form labels, and visible interactive states are used throughout the interface.

## Performance Optimizations
- **Lazy loading**: Major routes are loaded with `React.lazy()` and rendered through `Suspense`.
- **Route splitting**: Public and protected pages are split at the router level to reduce the initial payload.
- **Memoization**: `useMemo` is used in dashboard calculations, filtering, and dialog derivations.
- **Redux Persist**: Preserves auth and UI state without reloading the full application state.
- **Loading fallback**: A centralized spinner is displayed while route chunks resolve.

## Testing Strategy
The repository contains lightweight test files in `src/tests/` that validate reducers, service configuration, formatting utilities, and component exports.

- **Reducer testing**: `authSlice.test.js` covers login, logout, profile updates, and password updates.
- **Service testing**: `apiClient.test.js` verifies Axios defaults and interceptor registration.
- **Utility testing**: `formatUtils.test.js` validates INR formatting behavior.
- **Component testing**: `Header.test.jsx` and `ProcurementForm.test.jsx` verify component signatures.

The project does not declare a full Jest or React Testing Library runtime in `package.json`, so the current test files should be treated as a lightweight foundation rather than a fully wired CI suite.

## Deployment
The project builds to a static Vite output in `dist/`, which can be deployed to static hosting platforms such as Vercel, Netlify, Azure Static Web Apps, Nginx, or Cloud Run behind a static asset server.

For deployment parity:
- Configure the hosted app URL.
- Provide `VITE_API_URL` if a real backend is added later.
- Ensure SPA fallback routing is enabled for direct links.

## Environment Variables
The repository includes `.env.example` with the following values:

- `GEMINI_API_KEY`: Runtime-injected secret for Gemini API use in AI Studio environments.
- `APP_URL`: The hosted application URL used by the platform runtime.

The current implementation also supports `VITE_API_URL` for a future backend integration.

## Roadmap
- Connect the mock CRUD flows to a real enterprise backend.
- Add a complete automated testing pipeline with coverage reporting.
- Introduce server-driven notifications and administration screens.
- Expand reporting with scheduled exports and saved report definitions.
- Replace demo authentication with a real identity provider and SSO.

## Future Enhancements
- Predictive risk analytics based on historical records.
- Scheduled and role-based report delivery.
- Server-backed notifications and activity feeds.
- Expanded localization coverage.
- Multi-tenant support for larger enterprise deployments.

## Contributing
Contributions should preserve the existing architecture, file organization, and enterprise UI language.

1. Create a focused branch.
2. Keep changes limited to the relevant module or service.
3. Follow the existing React, Redux Toolkit, and Material UI patterns.
4. Add or update tests when behavior changes.
5. Run the available validation commands before opening a pull request.

> [!NOTE]
> Because the app is mock-data driven, changes to record shape or role access should be reviewed against the router, sidebar, search, and settings flows together.

## License
No license file is present in the repository at this time.

## Author
Not specified in the repository metadata.

## Acknowledgements
Built with React, Vite, Redux Toolkit, Redux Persist, Material UI, React Router, Axios, React Hook Form, Yup, Recharts, i18next, date-fns, jsPDF, xlsx, papaparse, motion, and lucide-react.

## Support
If this repository is useful, consider starring it on GitHub and including it in your technical review or portfolio evaluation.

---

<div align="center">

## ⭐ Thank You for Visiting

**Meridian** is an enterprise-grade Governance, Risk, Compliance & Procurement platform developed to demonstrate scalable frontend architecture, modern UI/UX, and industry-standard software engineering practices.

If you found this project helpful, consider giving it a ⭐ on GitHub.

**"Guiding Enterprise Excellence."**

Made with ❤️ by **Mohammed Danish**

© 2026 Mohammed Danish. All Rights Reserved.

</div>
