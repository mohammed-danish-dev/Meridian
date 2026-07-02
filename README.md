## MERIDIAN - Guiding Enterprise Excellence.

<p align="center">
  <img src="https://img.shields.io/badge/Enterprise-SaaS-blue?style=for-the-badge&logo=enterprise" alt="Enterprise SaaS" />
  <img src="https://img.shields.io/badge/React-Vite-61DAFB?style=for-the-badge&logo=react" alt="React Vite" />
  <img src="https://img.shields.io/badge/Redux-Toolkit-764ABC?style=for-the-badge&logo=redux" alt="Redux Toolkit" />
  <img src="https://img.shields.io/badge/Material--UI-007FFF?style=for-the-badge&logo=mui" alt="Material UI" />
  <img src="https://img.shields.io/badge/Status-Production--Ready-success?style=for-the-badge" alt="Status" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
</p>

<p align="center">
  <strong>Guiding Enterprise Excellence.</strong><br />
  A Next-Generation Enterprise Governance, Risk, Compliance, and Procurement Platform.
</p>

---

## 📑 Table of Contents

- [🌟 Project Highlights](#-project-highlights)
- [📖 Project Overview](#-project-overview)
- [🏢 Business Background](#-business-background)
- [⚙ Technology Stack](#-technology-stack)
- [📂 Project Structure](#-project-structure)
- [🏗 System Architecture](#-system-architecture)
- [🔄 Redux Architecture](#-redux-architecture)
- [🛣 Routing Architecture](#-routing-architecture)
- [🧩 Component Hierarchy](#-component-hierarchy)
- [🔄 Application Workflow](#-application-workflow)
- [📦 Application Modules](#-application-modules)
- [👨‍💼 User Roles & Permissions](#-user-roles--permissions)
- [🔐 Authentication & Security](#-authentication--security)
- [🗄 State Management](#-state-management)
- [🌐 API & Services](#-api--services)
- [📊 Mock Data Strategy](#-mock-data-strategy)
- [🎨 UI / UX](#-ui--ux)
- [⚡ Performance Optimizations](#-performance-optimizations)
- [🧪 Testing](#-testing)
- [📸 Application Screenshots](#-application-screenshots)
- [🚀 Quick Start](#-quick-start)
- [🌍 Deployment](#-deployment)
- [🔧 Environment Variables](#-environment-variables)
- [🛣 Roadmap](#-roadmap)
- [🚀 Future Enhancements](#-future-enhancements)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)
- [👨‍💻 Author](#-author)
- [⭐ Support](#-support)

---

## 🌟 Project Highlights

- ✅ **Enterprise SaaS Architecture** – Role-aware unified application shell designed for modern enterprise scaling.
- ✅ **React + ```ts / Vite** – High-performance rendering pipeline and full type safety.
- ✅ **Redux Toolkit & Persist** – Global decoupled state architecture with state preservation across sessions.
- ✅ **Role-Based Access Control (RBAC)** – Dynamic layout and capability routing tailored to authenticated organizational profiles.
- ✅ **Procurement Workspace** – Comprehensive purchase requisition execution and automated vendor onboarding.
- ✅ **Risk & Compliance Centers** – Integrated matrix engines for organizational risk analysis and mitigation records.
- ✅ **Executive Dashboards** – Advanced data reporting frameworks utilizing comprehensive mock telemetry.
- ✅ **Dark / Light Modes** – Built-in accessible Material UI thematic overrides.

---

## 📖 Project Overview

**Meridian** provides an enterprise-ready, role-aware front-end shell built to integrate complex operations across global business units. It consolidates segmented internal toolsets—specifically Procurement, Vendor Management, Risk Assessment, Compliance, and Internal Audits—into an optimized single-page application (SPA).

---

## 🏢 Business Background

### ❗ Problem Statement
Large corporations lose millions annually to operational fragmentation. Procurement pipelines operate isolated from legal compliance registries, while risk tracking happens inside siloed static spreadsheets. This lack of centralized data transparency causes multi-role visibility blackouts, audit delays, and regulatory penalties.

### 🎯 Product Vision
Meridian solves organizational fragmentation by delivering a consolidated application shell. It acts as a single pane of glass, synthesizing workflows across lines of business (LoB) while offering secure, auditable, and role-specific access control maps.

### 🎯 Objectives
- **Centralize Workflows:** Replace disconnected SaaS solutions with a clean, unified dashboard layout.
- **Enforce Governance:** Bridge the visibility gap between corporate procurement actions and internal risk matrices.
- **Optimize UI Performance:** Keep client-side interactions highly responsive using a robust state management layer.

---

## ⚙ Technology Stack

| Technology | Purpose | Version |
| :--- | :--- | :--- |
| **React** | Component declarative composition layer | `^18.x` / `^19.x` |
| **Vite** | Build toolchain and fast HMR development server | `^5.x` |
| **Redux Toolkit** | Centralized global state management layer | `^2.x` |
| **Material UI (MUI)** | Enterprise-grade accessible design library | `^5.x` / `^6.x` |
| **React Router** | Declarative client-side routing and layout guards | `^6.x` |
| **Axios** | Interceptor-driven HTTP client layer | `^1.x` |
| **i18next** | Multi-language localization subsystem | `^23.x` |
| **Redux Persist** | Client storage synchronization lifecycle manager | `^6.x` |

---

## 📂 Project Structure


meridian/
├── .github/                # CI/CD Workflows
├── public/                 # Static Assets & Locales
└── src/
    ├── assets/             # Brand logos and global media
    ├── components/         # Shared presentation layer UI controls
    ├── config/             # Theme configurations, environment constants
    ├── hooks/              # Reusable custom React hooks
    ├── layouts/            # Authentication & Application shell wrappers
    ├── modules/            # Domain-isolated functional workspaces
    │   ├── audit/          # Audit tracking records
    │   ├── compliance/     # Regulatory criteria registers
    │   ├── dashboard/      # Executive analytics dashboards
    │   ├── procurement/    # PR/PO creation & tracking engines
    │   ├── risk/           # Risk logs & matrix assessments
    │   └── vendor/         # Vendor lifecycles & performance scores
    ├── routes/             # RBAC guard configurations & engine mappings
    ├── services/           # Axios engine instances & data endpoint contracts
    ├── store/              # Redux slices, middlewares & persisted configuration
    ├── utils/              # Pure functions & formatting helpers
    ├── App.tsx             # Application bootstrap orchestration entrypoint
    └── main.tsx            # DOM initialization node
    
---

🏗 System ArchitectureThe frontend is engineered around a clean, layered architectural pattern, establishing strict boundaries between data mutation, business operations, and the user interface.```text


+-------------------------------------------------------------+
|                      Presentation UI Layer                  |
|          [MUI Theme Engine]  <--->  [React Components]      |
+-------------------------------------------------------------+
                              | (Dispatches Actions / Selectors)
                              v
+-------------------------------------------------------------+
|                     State Orchestration                     |
|           [Redux Toolkit Store] <-> [Redux Persist]         |
+-------------------------------------------------------------+
                              | (Triggers Side-Effects)
                              v
+-------------------------------------------------------------+
|                     Service Abstraction                     |
|          [Axios Interceptors] <---> [Mock Data Engine]      |
+-------------------------------------------------------------+
📌 Architecture Diagram[Insert Architecture Diagram Here]Presentation Layer: Built with Material UI (MUI) components configured to run seamlessly under both dynamic light and dark theme contexts.Routing Layer: Guarded structure powered by react-router-dom. Evaluates state privileges before mounting child layouts.Redux State Layer: Serves as the single source of truth, isolating UI configurations and temporary business workflows from volatile component lifecycles.Service Layer: Axios wrapper layer featuring automated interceptors designed to attach authorization headers and standardize response envelopes.🔄 Redux ArchitectureMeridian handles client-side updates through an event-driven Redux state architecture that isolates global variables from the UI layout.📌 Redux Flow Diagram[Insert Redux Flow Diagram Here]Store: Central instance configured with serialization overrides allowing execution synchronization with redux-persist.Slices: Features domain-separated states managing authentication (authSlice), system configurations (themeSlice), and cache modules.Dispatch Flow: Direct visual tracking where views emit strict descriptive payloads across middleware barriers to update state stores synchronously.🛣 Routing ArchitectureThe application uses an immutable routing registry configuration that builds the routing workspace tree dynamically based on roles.📌 Router Flow Diagram[Insert Router Flow Diagram Here]Public Routes: Open landing spaces and the /login gateway. Authenticated profiles hitting these endpoints are automatically forwarded back to internal modules.Protected Routes: Shielded layout boundaries that check for valid auth tokens in state before rendering children.Role-Based Routing: Validates active profile strings (Admin, ProcurementManager, ComplianceAuditor) against an allowed module array. Unauthorized requests trigger a safe redirection fallback.🧩 Component Hierarchy``text[App Entry]
   │
   └── [Redux Provider & Theme Context Providers]
          │
          └── [Router Orchestrator]
                 ├── PublicLayout -> Login / Landing Pages
                 └── PrivateLayout (Sidebar / Top Navbar / Content Shell)
                        │
                        ├── [Role-Based Guards]
                        └── [Lazy Loaded Module Core Views]
📌 Component Hierarchy Diagram[Insert Component Hierarchy Diagram Here]🔄 Application Workflow```text[User Login Request] ──> [Axios Sign-in Service] ──> [Store Encoded Session state]
                                                               │
                                                               v
[Render Workspace Shell] <── [Verify RBAC Router Permissions] <───┘
          │
          ├──> [Procurement View] ──> Raise Requisitions ──> Mutate Redux Store Cache
          └──> [Risk Center Matrix] ──> Update Mitigation Status ──> Real-time Dashboard Analytics
📦 Application Modules📊 Executive DashboardProvides critical oversight through aggregated business unit statistics, open risk indexes, processing bottlenecks, and real-time ledger metrics.🛒 Procurement WorkspaceManages purchasing operations. Features full requisition drafting controls, purchase order progress trackers, and budget cap warning indicators.🤝 Vendor GovernanceTracks partner lifecycle lifespans, recording compliance standings, security assessment metrics, and active contract details.⚠️ Risk CenterHouses institutional risk registers, complete with custom priority scoring matrices and mitigation assignment tools.📜 Compliance CenterMonitors adherence to international standards like ISO 27001, SOC2, and GDPR via clear tracking checklists.🔍 Audit CenterProvides a transparent audit trail detailing historical operations, change records, and past policy adjustments.👨‍💼 User Roles & PermissionsPlatform ModuleGlobal AdministratorProcurement ManagerCompliance AuditorRisk AnalystSystem Settings✅ Full Access❌ No Access❌ No Access❌ No AccessProcurement Hub✅ View Only✅ Full Access❌ No Access❌ No AccessVendor Governance✅ Full Access✅ Full Access✅ View Only❌ No AccessRisk Matrix Center✅ Full Access❌ No Access✅ Full Access✅ Full AccessCompliance Logs✅ Full Access❌ No Access✅ Full Access🔬 Write OnlyAudit Trails✅ Full Access❌ No Access✅ Full Access❌ No Access🔐 Authentication & Security```json Web Token (JWT) Handling: Session tokens are stored securely in memory, backed by encrypted browser storage layers.Route Authorization Interceptors: Automatically runs state authorization checks before rendering protected interface layouts.Cross-Site Scripting (XSS) Protections: Uses strict native data-binding methods within React combined with custom sanitize filters to clean rich incoming mock text objects.🗄 State ManagementGlobal state mutations follow an optimized Redux Toolkit architecture.```tsimport { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  user: null | { name: string; role: string; email: string };
  token: string | null;
}

const initialState: AuthState = { isAuthenticated: false, user: null, token: null };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: any; token: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logOut: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
  },
});
🌐 API & ServicesThe network communication infrastructure is managed by a centralized Axios engine instance that automates global request headers, keeps track of processing timeouts, and handles error responses gracefully.[!NOTE]All outgoing data requests are formatted with standard application/json metadata headers. If an active session token is found in the Redux store, a global security interceptor automatically injects it into the request.📊 Mock Data StrategyTo maintain isolation and allow standalone execution without an active backend infrastructure, Meridian uses a robust local mocking layer. This setup mirrors authentic HTTP responses and introduces intentional network latency to test loading states and UI spinners.```ts// Latency injection wrapper utility for mock services
export const mockDelay = <T>(data: T, delayMs = 600): Promise<T> => {
  return new Promise((resolve) => setTimeout(() => resolve(data), delayMs));
};
🎨 UI / UXTheming Architecture: Built on Material UI's design framework, utilizing customized color palettes, modern typography scales, and unified border-radius styles.Light & Dark Adaptation: Implements explicit palette shifting that adjusts background contrasts and keeps readability high without requiring structural code updates.Responsive Layout Design: Uses dynamic flexible grid wrappers and adaptive viewport containers, ensuring high operational efficiency on screen sizes from mobile viewports to ultra-wide displays.⚡ Performance OptimizationsComponent Code Splitting: Uses React.lazy() and Suspense chunk splitting boundaries to lower initial JavaScript bundle footprints.Optimized Memoization: Uses useMemo and useCallback inside high-frequency tabular lists to avoid redundant component re-renders.Asset Optimization: Delivery optimization using inline vector asset formats (SVGs) instead of heavy legacy raster image structures where applicable.🧪 TestingThe platform maintains reliable unit and interaction test tracking via integrated testing tools.Jest – Primary orchestration testing runner engine framework.React Testing Library – Evaluates structural rendering outputs by verifying user interactions rather than implementation details.```bash# Execute full testing pipeline suites across code bases
npm run test

# Run test runner coverage suites mapping analytical files
npm run test:coverage
📸 Application ScreenshotsSystem View Workspace ScreenVisual Mock Interface Capture ReferenceLanding Presentation Hub📷 [Insert Application Landing View Screenshot Here]Secure Authentication Gateway📷 [Insert Application Login View Screenshot Here]Executive Management Dashboard📷 [Insert Application Central Dashboard View Screenshot Here]Procurement Lifecycle Center📷 [Insert Application Procurement Component View Screenshot Here]Risk Assessment & Matrix Register📷 [Insert Application Risk Analysis View Screenshot Here]🚀 Quick Start📋 PrerequisitesEnsure your local environment has Node.js (v18.x or newer) and npm installed.🛠️ Installation & Execution```bash# 1. Clone the repository framework files
git clone [https://github.com/your-organization/meridian.git](https://github.com/your-organization/meridian.git)

# 2. Change workspace directories into root locations
cd meridian

# 3. Install external module lock dependencies
npm install

# 4. Spin up high performance local Vite development configurations
npm run dev
🏗️ Production Compilations```bash# Build optimized production-ready client bundles
npm run build

# Local preview testing preview allocations prior to deployment distribution
npm run preview
🌍 DeploymentMeridian is configured for optimized deployment across enterprise static hosting infrastructures like AWS S3 + CloudFront, Azure Static Web Apps, Vercel, or Netlify.```textBuild output artifacts compile default targeted outputs into the isolated /dist directory.
🔧 Environment VariablesCreate a .env file in the root directory to customize configuration settings:```envVITE_APP_NAME=Meridian
VITE_API_BASE_URL=[https://api.meridian-enterprise.com/v1](https://api.meridian-enterprise.com/v1)
VITE_ENABLE_MOCK_SERVICES=true
🛣 Roadmap[x] Configure core React Vite application shell with full ```ts integration.[x] Set up Redux state slices along with Redux Persist storage integration.[x] Build out layouts for the Procurement, Risk, and Compliance dashboards.[ ] Connect production microservices to replace the temporary mock data layer.[ ] Add support for multiple languages using internationalization (i18n) workflows.[ ] Implement multi-tenant capability partitioning for enterprise deployments.🚀 Future EnhancementsPredictive Risk Analytics: Machine learning modules that flag supply chain bottlenecks before they happen.Automated Audit Logs: Immutable logging integrations using ledger services to secure corporate tracking history.Third-Party Integrations: Built-in connection layers for ERP platforms like SAP, Oracle Cloud, and Salesforce.🤝 ContributingWe welcome contributions to the Meridian platform. Please follow our contributing guidelines:Fork the repository.Create your feature branch (git checkout -b feature/AmazingFeature).Commit your changes (git commit -m 'Add some AmazingFeature').Push to the branch (git push origin feature/AmazingFeature).Open a Pull Request for review.📜 LicenseDistributed under the MIT Enterprise License. Review accompanying LICENSE files for legal information.👨‍💻 AuthorMohammed Danish Principal Enterprise Architect & UI Engineer🌐 Professional Portfolio💼 LinkedIn Profile📧 Enterprise Support Email⭐ SupportIf you found this project useful, please consider giving it a ⭐ on GitHub.
