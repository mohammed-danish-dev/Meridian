import { v4 as uuidv4 } from 'uuid';
import { subDays } from 'date-fns';

const generateArray = (length, generator) =>
  Array.from({ length }, (_, i) => generator(i));

export const mockUsers = [
  { id: 'u1', name: 'Alice Smith', email: 'employee@company.com', role: 'Employee', department: 'IT' },
  { id: 'u2', name: 'Bob Jones', email: 'manager@company.com', role: 'Manager', department: 'Procurement' },
  { id: 'u3', name: 'Carol White', email: 'compliance@company.com', role: 'Compliance Officer', department: 'Legal' },
  { id: 'u4', name: 'Dave Brown', email: 'auditor@company.com', role: 'Auditor', department: 'Finance' },
  { id: 'u5', name: 'Eve Black', email: 'admin@company.com', role: 'Administrator', department: 'IT' },
];

export const mockVendors = generateArray(50, (i) => ({
  id: `v${i + 1}`,
  name: `Vendor Corp ${i + 1}`,
  category: ['Software', 'Hardware', 'Services', 'Consulting'][Math.floor(Math.random() * 4)],
  status: Math.random() > 0.2 ? 'Active' : (Math.random() > 0.5 ? 'Under Review' : 'Inactive'),
  riskLevel: ['Low', 'Medium', 'High', 'Critical'][Math.floor(Math.random() * 4)],
  spendYTD: Math.floor(Math.random() * 1000000),
  contactEmail: `contact@vendor${i+1}.com`,
  rating: Number((Math.random() * 4 + 1).toFixed(1)),
  createdAt: subDays(new Date(), Math.floor(Math.random() * 365)).toISOString(),
}));

export const mockProcurements = generateArray(100, (i) => ({
  id: `pr${i + 1}`,
  title: `Software License Renewal ${i + 1}`,
  description: 'Annual renewal for enterprise software.',
  amount: Math.floor(Math.random() * 50000) + 1000,
  currency: 'USD',
  department: ['IT', 'HR', 'Finance', 'Marketing'][Math.floor(Math.random() * 4)],
  requesterId: mockUsers[Math.floor(Math.random() * mockUsers.length)].id,
  status: ['Draft', 'Pending Approval', 'Approved', 'Rejected', 'In Progress', 'Completed'][Math.floor(Math.random() * 6)],
  createdAt: subDays(new Date(), Math.floor(Math.random() * 100)).toISOString(),
  updatedAt: subDays(new Date(), Math.floor(Math.random() * 10)).toISOString(),
  vendorId: mockVendors[Math.floor(Math.random() * mockVendors.length)].id,
}));

export const mockRisks = generateArray(20, (i) => ({
  id: `r${i + 1}`,
  title: `Enterprise Risk Event ${i + 1}`,
  category: ['Security', 'Financial', 'Operational', 'Compliance'][Math.floor(Math.random() * 4)],
  level: ['Low', 'Medium', 'High', 'Critical'][Math.floor(Math.random() * 4)],
  impact: Math.floor(Math.random() * 5) + 1,
  likelihood: Math.floor(Math.random() * 5) + 1,
  status: ['Open', 'Mitigated', 'Closed'][Math.floor(Math.random() * 3)],
  ownerId: mockUsers[1].id,
  createdAt: subDays(new Date(), Math.floor(Math.random() * 100)).toISOString(),
}));

export const mockCompliance = generateArray(20, (i) => ({
  id: `c${i + 1}`,
  title: `ISO 27001 Certification ${i + 1}`,
  vendorId: mockVendors[Math.floor(Math.random() * mockVendors.length)].id,
  type: ['Certification', 'Audit', 'Policy'][Math.floor(Math.random() * 3)],
  status: ['Compliant', 'Non-Compliant', 'Expired', 'Pending'][Math.floor(Math.random() * 4)],
  expirationDate: subDays(new Date(), Math.floor(Math.random() * 365) - 180).toISOString(),
}));

export const mockAuditLogs = generateArray(100, (i) => ({
  id: `al${i + 1}`,
  action: ['Created Request', 'Approved Request', 'Updated Vendor', 'Logged in', 'Exported Report'][Math.floor(Math.random() * 5)],
  userId: mockUsers[Math.floor(Math.random() * mockUsers.length)].id,
  module: ['Procurement', 'Vendor', 'Auth', 'Report'][Math.floor(Math.random() * 4)],
  timestamp: subDays(new Date(), Math.floor(Math.random() * 30)).toISOString(),
  details: 'Action completed successfully.',
}));

export const mockNotifications = generateArray(20, (i) => ({
  id: `n${i + 1}`,
  title: `New Notification ${i + 1}`,
  message: 'This is a system notification requiring your attention.',
  read: Math.random() > 0.5,
  type: ['info', 'warning', 'success', 'error'][Math.floor(Math.random() * 4)],
  createdAt: subDays(new Date(), Math.floor(Math.random() * 5)).toISOString(),
}));
