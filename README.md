# Meridian

> Enterprise Governance, Risk, Compliance, and Procurement Platform

Meridian is a role-aware enterprise front-end for managing procurement, vendor oversight, risk tracking, compliance records, audit visibility, reporting, and account preferences in a single application shell.

![React](https://img.shields.io/badge/React-19.0.1-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.2.3-646CFF?logo=vite&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.12.0-764ABC?logo=redux&logoColor=white)
![Material UI](https://img.shields.io/badge/MUI-9.1.2-007FFF?logo=mui&logoColor=white)
![React Router](https://img.shields.io/badge/React%20Router-7.18.0-CA4245?logo=reactrouter&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-1.18.1-5A29E4?logo=axios&logoColor=white)
![i18next](https://img.shields.io/badge/i18next-26.3.4-26A69A)
![Redux Persist](https://img.shields.io/badge/Redux%20Persist-6.0.0-764ABC)
![Status](https://img.shields.io/badge/Status-Demo%20%2F%20Evaluation-2E7D32)

---

## Table of Contents
- [Project Overview](#project-overview)
- [Business Background](#business-background)
- [Problem Statement](#problem-statement)
- [Product Vision](#product-vision)
- [Objectives](#objectives)
- [Target Users](#target-users)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Project Folder Structure](#project-folder-structure)
- [System Architecture](#system-architecture)
- [Redux Architecture](#redux-architecture)
- [Routing Architecture](#routing-architecture)
- [Component Architecture](#component-architecture)
- [Application Workflow](#application-workflow)
- [Application Modules](#application-modules)
- [User Roles & Permissions](#user-roles--permissions)
- [Authentication & Security](#authentication--security)
- [State Management](#state-management)
- [API & Services](#api--services)
- [Mock Data Strategy](#mock-data-strategy)
- [UI & UX](#ui--ux)
- [Performance Optimizations](#performance-optimizations)
- [Testing](#testing)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Build Instructions](#build-instructions)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)
- [Acknowledgements](#acknowledgements)
- [Footer](#footer)

## Project Overview
Meridian is a single-page enterprise application built with React and Vite. It provides a structured operating model for governance, risk, compliance, procurement, vendor management, reporting, and user preferences. The implementation is front-end driven, with Redux Toolkit powering local business state and mock data used to simulate enterprise workflows.

## Business Background
Large organizations typically manage procurement, vendor risk, compliance, audit, and reporting across disconnected tools. Meridian consolidates those workflows into a unified interface so operational teams can work from one system and decision makers can see consistent information across modules.

## Problem Statement
The project addresses fragmented enterprise operations, limited visibility across business functions, and manual coordination between procurement, risk, compliance, and audit teams. The codebase demonstrates how a modern front-end can centralize these workflows without depending on a live backend during early delivery or evaluation phases.

## Product Vision
Create a professional enterprise control center where users can authenticate, navigate to role-specific modules, manage records, review dashboards, export reports, and update settings through a consistent and secure experience.

## Objectives
- Centralize procurement, vendor, risk, compliance, audit, and reporting workflows.
- Provide role-aware navigation and access control.
- Present enterprise metrics through a responsive dashboard.
- Support local editing, filtering, exporting, and inspection of records.
- Preserve session state and UI preferences across reloads.
- Support English and Hindi interface text where translations exist.

## Target Users
- **Employee**: Submits and tracks procurement requests assigned to their own account.
- **Manager**: Reviews procurement activity, manages vendors, and accesses executive-level reporting.
- **Compliance Officer**: Maintains compliance records, reviews risk signals, and accesses compliance-oriented reports.
- **Auditor**: Reviews audit logs and audit-related reporting for oversight and traceability.
- **Administrator**: Has the broadest access across operational modules, settings, and enterprise oversight.
- **Guest / Public Visitor**: Accesses the landing page and public resource pages such as blogs, documentation, FAQs, privacy policy, terms, and authentication entry points.

## Key Features
- Role-based login with demo credentials.
- Protected application shell with sidebar, header, notifications, and breadcrumbs.
- Dashboard with KPIs, charts, and contextual activity feeds.
- Procurement list, request form, details dialog, filtering, editing, deletion, and export.
- Vendor list, vendor onboarding form, profile dialog, and export.
- Risk registry with create, edit, delete, and export flows.
- Compliance registry with record management and export.
- Audit log browser with search, sorting, and export.
- Reports hub with role-based report cards and export actions.
- Settings area for profile, password, language, timezone, and notification preferences.
- Landing page with marketing sections and a contact/demo form.
- Public resource pages for blogs, documentation, FAQs, privacy policy, and terms of service.
- Theme toggle for light and dark modes.
- Persisted auth and UI preferences.
- Global search across permitted modules and records.

## Technology Stack

| Technology | Purpose | Version |
|---|---|---:|
| React | UI framework | 19.0.1 |
| Vite | Build tool and dev server | 6.2.3 |
| Redux Toolkit | Application state management | 2.12.0 |
| React Redux | React bindings for Redux | 9.3.0 |
| Redux Persist | Persisted local state | 6.0.0 |
| React Router DOM | Routing and navigation | 7.18.0 |
| Material UI | Design system and component library | 9.1.2 |
| Emotion | Styling engine for MUI | 11.14.x |
| Axios | HTTP client | 1.18.1 |
| React Hook Form | Form state management | 7.80.0 |
| Yup | Schema validation | 1.7.1 |
| Recharts | Dashboard charts | 3.9.0 |
| date-fns | Date helpers and formatting | 4.4.0 |
| jsPDF | PDF generation | 4.2.1 |
| xlsx | Excel export | 0.18.5 |
| papaparse | CSV export | 5.5.4 |
| i18next | Localization runtime | 26.3.4 |
| react-i18next | React localization bindings | 17.0.8 |
| motion | UI motion and page transitions | 12.23.24 |
| Tailwind CSS | Additional utility styling support | 4.1.14 |
| uuid | Client-side identifier generation | 14.0.1 |

## Project Folder Structure
```text
meridian-_e---grcp/
├── .env.example
├── assets/
├── index.html
├── metadata.json
├── package-lock.json
├── package.json
├── README.md
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
├── tsconfig.json
├── ts_errors.txt
└── vite.config.ts
```

## System Architecture

**Architecture Diagram**

> Insert Architecture Diagram here.

The application uses a layered front-end architecture:

- **Overall architecture**: A React 19 single-page application bootstrapped by Vite, wrapped in Redux Provider, Redux Persist, and a Material UI theme provider.
- **Application layers**: Public marketing pages, authentication pages, and protected enterprise modules are separated at the routing layer.
- **Authentication layer**: Demo login state is handled in Redux, with mock credentials, persisted tokens, password reset state, and profile updates stored locally.
- **Routing layer**: `react-router-dom` handles public routes, protected routes, and role-based access checks before rendering module views.
- **State management layer**: Redux Toolkit slices manage auth, UI preferences, domain collections, notifications, dashboard metrics, audit logs, and reports.
- **API/service layer**: `apiClient.js` configures Axios with a base URL, authorization header injection, and response handling, while utility services manage exports, formatting, dates, and localization.
- **Mock data layer**: `src/mocks/dataGenerator.js` seeds enterprise-like records for users, vendors, procurements, risks, compliance items, audit logs, and notifications.
- **UI layer**: Material UI components, theming, layout shells, DataGrid views, dialogs, cards, tabs, and charts present the user interface.
- **Data flow**: User actions dispatch Redux actions or thunks, slices update state, selectors feed components, and the UI re-renders with persisted preferences and filtered records.

## Redux Architecture

**Redux Flow Diagram**

> Insert Redux Flow Diagram here.

The Redux implementation is centered around `src/store/store.js` and the slices under `src/store/slices/`.

- **Store**: The root store combines `auth`, `ui`, `procurement`, `vendors`, `risk`, `compliance`, `notifications`, `dashboard`, `audit`, and `reports`.
- **Slices**: Each business domain owns a dedicated slice with local CRUD reducers and initial mock-backed state.
- **Actions**: Components dispatch slice actions such as login, logout, toggle theme, add/update/delete records, mark notifications read, and update settings.
- **Reducers**: Redux Toolkit reducers use Immer-powered mutation syntax, which keeps the code compact while preserving immutable updates.
- **createAsyncThunk**: Async thunks are implemented for dashboard metric loading, audit log loading, and report generation to simulate asynchronous enterprise workflows.
- **Dispatch flow**: UI events dispatch actions from forms, dialogs, menus, and buttons; async thunks then transition through pending, fulfilled, and rejected states.
- **Selectors**: Components access state directly through `useSelector`, typically reading the relevant slice at the point of use.
- **Redux Persist**: Only `auth` and `ui` are persisted, which keeps login state and UI preferences available after reload while leaving operational datasets in memory.
- **State update lifecycle**: A component action updates the slice, selectors expose the new value, derived UI logic recalculates filtered rows or metrics, and the affected views re-render.

## Routing Architecture

**Router Flow Diagram**

> Insert Router Flow Diagram here.

The router is defined in `src/routes/router.jsx` and uses lazy loading for route-level code splitting.

- **Public Routes**: `/`, `/blogs`, `/blogs/:id`, `/documentation`, `/faqs`, `/privacy`, `/terms`, `/login`, `/forgot-password`, `/reset-password`, and `/session-expired`.
- **Protected Routes**: `/dashboard`, `/procurement`, `/vendors`, `/risk`, `/compliance`, `/audit`, `/reports`, and `/settings` are wrapped in the authenticated layout.
- **Route Guards**: `ProtectedRoute` checks `isAuthenticated` and `user` from Redux before rendering protected content.
- **Role-Based Routing**: Allowed roles are enforced at route level, for example procurement, vendors, risk, compliance, audit, and reports each have explicit role constraints.
- **Nested Routes**: `AppLayout` renders the persistent shell and uses `Outlet` to display the active module page inside the shared frame.
- **Navigation Flow**: Public users enter through the landing page or login, authenticated users are redirected to role-appropriate module areas, and unauthorized access is redirected back to login or dashboard.

## Component Architecture

**Component Hierarchy Diagram**

> Insert Component Hierarchy Diagram here.

- **Root App**: `App.jsx` wraps the application in `Provider`, `PersistGate`, `ThemeProvider`, `CssBaseline`, `GlobalTranslator`, and `AppRouter`.
- **Layouts**: `AppLayout`, `Header`, `Sidebar`, and `GlobalSearch` provide the persistent enterprise shell.
- **Pages**: Feature pages under `src/features/` implement the landing page, auth screens, dashboard, module lists, reports, settings, and public resources.
- **Feature Components**: Forms, detail dialogs, stat cards, and supporting cards are co-located with their feature modules.
- **Shared Components**: `ScrollToTop` and `StatCard` are shared across the application.
- **Hooks**: `useTranslation` synchronizes the selected language with i18next, and `useHomeNavigation` routes users to the correct landing destination for their role.
- **Services**: Axios configuration, export helpers, date formatting, currency formatting, translations, and localization bootstrap live in `src/services/`.
- **Store**: Redux slices hold the operational state consumed by the layout, dashboard, forms, search, and notification surfaces.
- **Component communication**: The layout passes route content through props and outlet rendering, forms return events to slices via dispatch, and dialogs or menus communicate through local open state plus global Redux data.

## Application Workflow
1. A visitor lands on the public homepage and can navigate the marketing sections or open the sign-in screen.
2. On the login screen, the user enters demo credentials or selects a role card that maps to a preconfigured account.
3. `mockLogin` verifies the email and password against the mock user set and any saved password updates.
4. Successful authentication stores the user, token, and role in Redux and persists the auth state.
5. The app redirects into the protected shell, where the sidebar only shows modules available to the current role.
6. The header exposes theme switching, global notifications, breadcrumbs, profile actions, and logout.
7. Module pages read from the Redux slices and render filtered tables, charts, dialogs, and forms.
8. Create, update, delete, and approval actions mutate slice state locally and immediately refresh the UI.
9. Export actions produce CSV, Excel, or PDF output from the current in-memory data.
10. Settings updates adjust profile fields, language, timezone, and password state, while the UI preference state remains persisted across reloads.

## Application Modules

### Landing Page
The public landing page presents the Meridian brand, product narrative, enterprise positioning, animated hero content, platform statistics, and a contact/demo form. It is the primary entry point for unregistered visitors.

### Authentication
The authentication area includes login, forgot password, reset password, and session expired screens. Authentication is demo-driven but follows realistic form validation and redirect behavior.

### Dashboard
The dashboard is the operational home screen for authenticated users. It renders KPI cards, department spend charts, risk distributions, vendor status summaries, and recent activities that adapt to the current role.

### Procurement
The procurement module provides searchable procurement records, request creation and editing dialogs, approval and rejection actions for permitted roles, details views, deletion confirmation, and export options.

### Vendors
The vendors module supports supplier onboarding, editing, profile inspection, risk classification, performance rating display, deletion controls for authorized roles, and dataset export.

### Risk
The risk module manages enterprise risk records with severity, impact, likelihood, status, details dialogs, add/edit forms, deletion, and export functionality.

### Compliance
The compliance module tracks certifications, policies, statuses, expiration dates, record details, add/edit workflows, deletion, and export outputs.

### Audit
The audit module exposes system logs with timestamp, module, action, user mapping, search, default descending sorting, and export options.

### Reports
The reports module presents role-based report cards for procurement, vendor, risk, compliance, and audit domains, each with CSV, Excel, and PDF export actions.

### Settings
The settings module is divided into profile, security, preferences, and notification tabs. It supports profile edits, avatar upload/removal, password updates, language selection, timezone selection, and notification preference toggles.

### Resources
The resources area includes blogs, blog details, documentation, FAQs, privacy policy, and terms of service pages for public reference and evaluator review.

### Notifications
Notifications are surfaced in the header as a dropdown center backed by Redux state. Users can mark individual notifications or all notifications as read.

### Global Search
Global search is available in the header and queries permitted procurement, vendor, risk, compliance, audit, notification, report, and user records depending on role access.

## User Roles & Permissions

| Role | Scope | Key Permissions |
|---|---|---|
| Guest / Public Visitor | Public pages | View the landing page, blogs, documentation, FAQs, privacy policy, terms, and authentication screens. |
| Employee | Personal procurement scope | View the dashboard, submit procurement requests, search allowed records, and manage their own procurement items. |
| Manager | Procurement and vendor operations | Review procurement requests, approve or reject pending items, manage vendors, and access procurement and vendor reporting. |
| Compliance Officer | Compliance oversight | Manage compliance records, review vendor-related compliance data, access risk visibility, and export compliance-oriented reports. |
| Auditor | Audit and review | Access audit logs, review compliance outputs, and generate audit-related reports. |
| Administrator | Full platform access | Access all protected modules, settings, reporting, and system-wide oversight surfaces. |

## Authentication & Security

- **Login**: The login form uses React Hook Form and Yup validation, then calls the mock login thunk against the in-memory user set.
- **Forgot Password**: The forgot-password flow simulates sending a recovery email and routes users toward password reset.
- **Reset Password**: The reset-password flow validates the email and password confirmation, then stores the new password in Redux state.
- **Protected Routes**: Protected modules are gated by authentication checks and role checks before rendering the module page.
- **Session Management**: Auth state is persisted via Redux Persist, and the session-expired page provides a dedicated re-entry path.
- **Authorization**: Route-level `allowedRoles`, sidebar filtering, and role-aware global search results work together to keep users within their assigned scope.

## State Management
Meridian uses Redux Toolkit as the central state layer. `createSlice` powers the majority of domain state, while `createAsyncThunk` is used where a simulated async lifecycle is useful for dashboards, audit logs, and reports. The app relies on `useSelector` and `useDispatch` directly in components, which keeps the state flow explicit and easy to trace in an enterprise review setting.

## API & Services
The Axios client in `src/services/apiClient.js` is configured with a base URL of `VITE_API_URL` when present, or `/api` by default. It sets JSON headers, injects an authorization bearer token from the persisted auth state, and provides response error handling for 401, 403, and server-side failures.

The service layer also includes:
- `exportUtils.js` for CSV, Excel, and PDF output.
- `formatUtils.js` for INR currency formatting.
- `dateUtils.js` for timezone-aware date and time formatting.
- `i18n.js` and `translations.js` for localization bootstrap.

## Mock Data Strategy
The application uses generated and static mock data to emulate enterprise datasets without requiring a backend. `src/mocks/dataGenerator.js` builds structured records for users, vendors, procurements, risks, compliance items, audit logs, and notifications. Additional JSON fixtures exist in `src/mocks/` to support local development and evaluation workflows.

This approach allows the UI to behave like a real operational system while keeping CRUD, search, filter, and export flows deterministic during review.

## UI & UX
- **Material UI**: The interface is built primarily with Material UI components, including AppBar, Drawer, DataGrid, Dialog, Tabs, Card, Menu, Snackbar, and theme-aware typography.
- **Responsive Design**: Layouts adapt to mobile, tablet, and desktop breakpoints with collapsible side navigation, stacked action buttons, and responsive grids.
- **Dark Mode**: The UI supports a persisted dark theme through the `ui` slice and MUI theme generation.
- **Light Mode**: A separate light theme is provided with enterprise-style surfaces, borders, and contrast.
- **Accessibility**: The implementation includes ARIA labels, keyboard-friendly components, semantic tables, and visible interactive states where Material UI provides them.
- **Localization**: English and Hindi translation resources are available, with language selection controlled from settings.

## Performance Optimizations
Implemented optimizations in the current codebase include:

- **useMemo**: Used in dashboard calculations, list filtering, and detail dialog derivations to avoid unnecessary recomputation.
- **Lazy Loading**: Major routes are loaded with `React.lazy()` and rendered through `Suspense`.
- **Route Splitting**: Public and protected module pages are split at the route level, reducing the initial payload.
- **Redux Persist**: Auth and UI state survive reloads without reloading the full application state.
- **Suspense Fallbacks**: A centered loading indicator is shown while lazy modules resolve.

Not currently implemented in the repository: broad `React.memo` or `useCallback` usage.

## Testing
The repository includes lightweight Jest-style specs under `src/tests/` that focus on reducer behavior, service configuration, utility output, and component signature checks.

- **Reducer testing**: `authSlice.test.js` verifies login, logout, profile updates, and password updates.
- **Service testing**: `apiClient.test.js` verifies Axios defaults and interceptor setup.
- **Utility testing**: `formatUtils.test.js` checks currency formatting behavior.
- **Component testing**: `Header.test.jsx` and `ProcurementForm.test.jsx` confirm component exports and signatures.

React Testing Library and a dedicated Jest runner are not declared in the current `package.json`, so the existing test files should be treated as a lightweight foundation rather than a fully wired CI suite.

## Screenshots

### Landing Page
> Insert Screenshot Here

### Login
> Insert Screenshot Here

### Dashboard
> Insert Screenshot Here

### Procurement
> Insert Screenshot Here

### Vendors
> Insert Screenshot Here

### Risk
> Insert Screenshot Here

### Compliance
> Insert Screenshot Here

### Audit
> Insert Screenshot Here

### Reports
> Insert Screenshot Here

### Notifications
> Insert Screenshot Here

### Settings
> Insert Screenshot Here

### Contact Form
> Insert Screenshot Here

## Installation
```bash
npm install
```

## Running the Project
```bash
npm run dev
```

The development server runs on port `3000` and binds to `0.0.0.0`.

## Build Instructions
```bash
npm run build
```

Optional preview step after building:

```bash
npm run preview
```

## Deployment
The project builds into a static Vite output under `dist/`, which can be deployed to any static hosting platform such as Vercel, Netlify, Azure Static Web Apps, Nginx, or Cloud Run behind a static asset server.

For deployment parity:
- Set the application URL used by the hosted environment.
- Point the Axios client to a real backend by supplying `VITE_API_URL` if the project is extended beyond mock data.
- Ensure routing is configured for SPA fallback so direct links to protected routes resolve correctly.

## Environment Variables
The repository includes `.env.example` with the following values:

- `GEMINI_API_KEY`: Runtime-injected secret for Gemini API use in AI Studio environments.
- `APP_URL`: The hosted application URL used by the platform runtime.

The Axios service also supports `VITE_API_URL` if a backend is introduced later. No additional environment variables are required for the current mock-data implementation.

## Future Enhancements
- Connect mock CRUD flows to a real enterprise backend and persistence layer.
- Add a fully wired automated test runner with coverage reporting.
- Introduce server-driven notifications and role administration.
- Expand reporting to support scheduled exports and saved report definitions.
- Replace simulated authentication with a real identity provider and enterprise SSO integration.

## Contributing
Contributions should preserve the existing folder structure and enterprise UI language.

1. Create a focused branch for the change.
2. Keep edits limited to the relevant feature slice or service.
3. Follow the established Material UI and Redux Toolkit patterns already in the codebase.
4. Add or update tests when behavior changes.
5. Run the available validation commands before opening a pull request.

> [!NOTE]
> Because the application currently uses local mock data, changes to data shape or role access should be reviewed against the router, sidebar, search, and settings flows together.

## License
No license file is present in the repository at this time.

## Author
Not specified in the repository metadata.

## Acknowledgements
Built with React, Vite, Redux Toolkit, Redux Persist, Material UI, React Router, Axios, React Hook Form, Yup, Recharts, i18next, date-fns, jsPDF, xlsx, and the broader open-source JavaScript ecosystem.

## Footer
Meridian is structured to present an enterprise-ready governance, risk, compliance, and procurement experience for review, evaluation, and future backend integration.
