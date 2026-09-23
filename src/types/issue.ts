export type IssueCategory =
  | 'package_damaged'
  | 'wrong_address'
  | 'not_received'
  | 'missing_items'
  | 'driver_issue'
  | 'late_delivery'
  | 'other';

export interface IssueOption {
  id: IssueCategory;
  label: string;
  iconName: string;
  description: string;
}

export interface IssueReportPayload {
  orderId: string;
  category: IssueCategory;
  note: string;
  contactPreference: 'email' | 'sms' | 'phone';
  hasPhoto: boolean;
  timestamp: string;
}

export interface IssueSubmissionResult {
  ticketNumber: string;
  submittedAt: string;
  estimatedResolution: string;
  status: 'received' | 'investigating' | 'resolved';
}

export interface SupportChannel {
  id: 'chat' | 'call' | 'email';
  title: string;
  subtitle: string;
  badge?: string;
  availability: string;
}
