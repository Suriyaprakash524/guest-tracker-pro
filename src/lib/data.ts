
import { Visitor, Host, DashboardStats } from '../types';

// Mock hosts
export const hosts: Host[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    department: 'Marketing',
    phone: '555-123-4567',
    photo: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    department: 'Engineering',
    phone: '555-987-6543',
    photo: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@example.com',
    department: 'Human Resources',
    phone: '555-456-7890',
    photo: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'david.kim@example.com',
    department: 'Sales',
    phone: '555-789-0123',
    photo: 'https://i.pravatar.cc/150?img=4',
  },
  {
    id: '5',
    name: 'Olivia Smith',
    email: 'olivia.smith@example.com',
    department: 'Finance',
    phone: '555-321-6549',
    photo: 'https://i.pravatar.cc/150?img=5',
  },
];

// Generate a random past date within the last 24 hours
const getRandomRecentDate = (): Date => {
  const date = new Date();
  const randomHours = Math.floor(Math.random() * 24);
  date.setHours(date.getHours() - randomHours);
  return date;
};

// Generate a random future date within the next 24 hours
const getRandomFutureDate = (): Date => {
  const date = new Date();
  const randomHours = Math.floor(Math.random() * 24);
  date.setHours(date.getHours() + randomHours);
  return date;
};

// Mock visitors
export const visitors: Visitor[] = [
  {
    id: '1',
    name: 'Alex Thompson',
    email: 'alex.thompson@example.com',
    phone: '555-111-2222',
    company: 'Acme Corp',
    purpose: 'Job Interview',
    host: '3',
    checkInTime: getRandomRecentDate(),
    status: 'checked-in',
  },
  {
    id: '2',
    name: 'Jessica Wong',
    email: 'jessica.wong@example.com',
    phone: '555-333-4444',
    company: 'Tech Solutions',
    purpose: 'Meeting',
    host: '2',
    checkInTime: getRandomRecentDate(),
    status: 'checked-in',
  },
  {
    id: '3',
    name: 'Robert Garcia',
    email: 'robert.garcia@example.com',
    phone: '555-555-6666',
    company: 'Innovative Systems',
    purpose: 'Client Visit',
    host: '4',
    checkInTime: getRandomRecentDate(),
    checkOutTime: new Date(),
    status: 'checked-out',
  },
  {
    id: '4',
    name: 'Sophia Lee',
    email: 'sophia.lee@example.com',
    phone: '555-777-8888',
    company: 'Global Industries',
    purpose: 'Vendor Meeting',
    host: '1',
    checkInTime: getRandomRecentDate(),
    status: 'checked-in',
  },
  {
    id: '5',
    name: 'Daniel Miller',
    email: 'daniel.miller@example.com',
    phone: '555-999-0000',
    company: 'Startup Inc',
    purpose: 'Partnership Discussion',
    host: '5',
    checkInTime: getRandomRecentDate(), // Adding the required checkInTime property
    expectedArrivalTime: getRandomFutureDate(),
    status: 'no-show',
  },
  {
    id: '6',
    name: 'Emma Wilson',
    email: 'emma.wilson@example.com',
    phone: '555-222-3333',
    company: 'Digital Media',
    purpose: 'Presentation',
    host: '1',
    checkInTime: getRandomRecentDate(),
    status: 'checked-in',
  },
  {
    id: '7',
    name: 'James Taylor',
    email: 'james.taylor@example.com',
    phone: '555-444-5555',
    company: 'Finance Group',
    purpose: 'Interview',
    host: '3',
    checkInTime: getRandomRecentDate(),
    checkOutTime: new Date(),
    status: 'checked-out',
  },
  {
    id: '8',
    name: 'Isabella Brown',
    email: 'isabella.brown@example.com',
    phone: '555-666-7777',
    company: 'Consulting LLC',
    purpose: 'Consultation',
    host: '5',
    checkInTime: getRandomRecentDate(), // Adding the required checkInTime property
    expectedArrivalTime: getRandomFutureDate(),
    status: 'no-show',
  },
];

// Get all checked-in visitors
export const checkedInVisitors = visitors.filter(
  (visitor) => visitor.status === 'checked-in'
);

// Get all expected visitors
export const expectedVisitors = visitors.filter(
  (visitor) => visitor.status === 'no-show'
);

// Mock dashboard stats
export const dashboardStats: DashboardStats = {
  currentVisitors: checkedInVisitors.length,
  todayTotal: 15,
  weeklyTotal: 87,
  monthlyTotal: 342,
};

// Helper function to get a host by ID
export const getHostById = (id: string): Host | undefined => {
  return hosts.find((host) => host.id === id);
};

// Helper function to get a visitor by ID
export const getVisitorById = (id: string): Visitor | undefined => {
  return visitors.find((visitor) => visitor.id === id);
};
