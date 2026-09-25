export type UserRole = 
  | 'command-center'
  | 'expedition-officer'
  | 'field-team'
  | 'researcher';

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  roleTitle: string;
  station: string;
  department: string;
  initials: string;
}

export interface ExpeditionMission {
  id: string;
  name: string;
  code: string;
  location: string;
  status: 'Active' | 'Standby' | 'Planning' | 'Scheduled' | 'Planned';
  startDate: string;
  endDate: string;
  durationFormatted: string;
  personnelCount: number;
  cargoCount: number;
  assetCount: number;
  inventoryCount?: number;
  progressPercent?: number;
  isSimulation: boolean;
  stationName: string;
}

export interface OperationalAlert {
  id: string;
  code: string;
  title: string;
  category: 'Medical' | 'Stock' | 'Sync' | 'Weather' | 'Safety';
  severity: 'Critical' | 'Warning' | 'Info' | 'Advisory';
  location: string;
  timestamp: string;
  personnelInvolved?: string;
  description: string;
  actionRequired?: string;
}

export interface FieldActivity {
  id: string;
  title: string;
  location: string;
  timestamp: string;
  status: 'Synced' | 'Pending' | 'Queued';
  type: 'Inventory' | 'Personnel' | 'Asset' | 'Cargo' | 'Emergency';
}

export interface NavItem {
  name: string;
  path?: string;
  icon: string;
  badge?: string;
  isImplemented?: boolean;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}
