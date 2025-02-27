
export interface Visitor {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  purpose: string;
  host: string;
  checkInTime: Date;
  checkOutTime?: Date;
  status: 'checked-in' | 'checked-out' | 'no-show';
  photo?: string;
  expectedArrivalTime?: Date;
}

export interface Host {
  id: string;
  name: string;
  email: string;
  department: string;
  phone: string;
  photo?: string;
}

export interface DashboardStats {
  currentVisitors: number;
  todayTotal: number;
  weeklyTotal: number;
  monthlyTotal: number;
}

export interface NotificationPreference {
  email: boolean;
  sms: boolean;
  desktop: boolean;
}

export interface UserSettings {
  notificationPreferences: NotificationPreference;
  autoCheckout: boolean;
  requiredFields: string[];
}
