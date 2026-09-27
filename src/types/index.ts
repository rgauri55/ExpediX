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

export type ExpeditionStatus = 'Active' | 'Planning' | 'Scheduled' | 'Planned' | 'Completed';

export interface ExpeditionMission {
  id: string;
  name: string;
  code: string;
  location: string;
  stationName: string;
  status: ExpeditionStatus;
  startDate: string;
  endDate: string;
  durationFormatted: string;
  expeditionLead: string;
  expeditionType?: 'Scientific Research' | 'Geological Survey' | 'Atmospheric & Climate' | 'Traverse & Logistics';
  season?: 'Winter' | 'Summer' | 'Annual';
  year?: string;
  personnelCount: number;
  cargoCount: number;
  assetCount: number;
  inventoryCount?: number;
  progressPercent: number;
  isSimulation: boolean;
  objective?: string;
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

export type PersonnelStatus = 'Active' | 'In Field' | 'Attention' | 'Off Duty' | 'Returning';

export interface MovementRecord {
  id: string;
  personnelId: string;
  personnelName: string;
  fromLocation: string;
  toLocation: string;
  timestamp: string;
  dateFormatted: string;
  transportMode: string;
  purpose: string;
}

export interface PersonnelMember {
  id: string;
  name: string;
  callsign?: string;
  role: string;
  team: string;
  expeditionId: string;
  expeditionName: string;
  station: string;
  currentLocation: string;
  assignment: string;
  status: PersonnelStatus;
  lastUpdate: string;
  safetyStatus: 'Normal' | 'Advisory' | 'High Risk' | 'Critical';
  safetyNote?: string;
  email: string;
  bloodGroup: string;
  emergencyContact: string;
  assignedAssets: string[];
  qualifications: string[];
  movementHistory: MovementRecord[];
  isSimulation: boolean;
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

export type CargoStatus = 'Prepared' | 'In Transit' | 'Received' | 'Allocated';
export type CargoPriority = 'Critical' | 'High' | 'Medium' | 'Low';

export interface CargoItem {
  id: string;
  code: string;
  description: string;
  category: 'Scientific Equipment' | 'Medical Supplies' | 'Fuel & Energy' | 'Safety & Field Gear' | 'Communications' | 'Cryo & Cold Chain' | 'Provisions';
  quantity: number;
  unit: string;
  origin: string;
  currentLocation: string;
  destination: string;
  status: CargoStatus;
  priority: CargoPriority;
  lastUpdate: string;
  expeditionId: string;
  expeditionName: string;
  handledBy?: string;
  temperatureRequirement?: string;
  hazardClass?: string;
  trackingHistory: {
    stage: 'Prepared' | 'Dispatched' | 'In Transit' | 'Received' | 'Allocated';
    location: string;
    timestamp: string;
    completed: boolean;
    current?: boolean;
    notes?: string;
  }[];
  isSimulation: boolean;
}

export type AssetStatus = 'OPERATIONAL' | 'IN USE' | 'IN TRANSIT' | 'MAINTENANCE' | 'ATTENTION';
export type AssetCondition = 'Optimal' | 'Good' | 'Fair' | 'Inspection Required' | 'Service Due';

export interface AssetActivity {
  id: string;
  route: string;
  timestamp: string;
  operator: string;
  purpose: string;
}

export interface PolarAsset {
  id: string;
  name: string;
  type: 'Snowmobile' | 'Satellite Comms' | 'Power Generator' | 'Ice Core Drill' | 'Medical Extraction Kit' | 'Heavy Traverse Tractor' | 'Skidoo' | 'Radar Beacon';
  category: 'Vehicles & Traverse' | 'Communications' | 'Power & Energy' | 'Scientific Instruments' | 'Emergency & Medical' | 'Base Infrastructure';
  currentLocation: string;
  assignedExpedition: string;
  assignedTeam: string;
  condition: AssetCondition;
  status: AssetStatus;
  lastMaintenance: string;
  usageFormatted: string;
  safetyStatus: 'Operational' | 'Advisory' | 'Attention' | 'Critical';
  safetyNote?: string;
  operator?: string;
  batteryLevel?: string;
  fuelLevel?: string;
  telemetryStatus?: string;
  recentActivities: AssetActivity[];
  isSimulation: boolean;
}

export type InventoryStatus = 
  | 'Available'
  | 'Allocated'
  | 'Field Deployed'
  | 'Low Stock'
  | 'Pending Receipt'
  | 'Damaged'
  | 'Backload Pending'
  | 'Consumed';

export type InventoryCategory =
  | 'Medical Supplies'
  | 'Communication'
  | 'Fuel'
  | 'Protective Gear'
  | 'Scientific Supplies'
  | 'Survival & Rations'
  | 'Base Hardware';

export interface InventoryMovement {
  id: string;
  dateFormatted: string;
  timestamp: string;
  title: string;
  description: string;
  fromLocation?: string;
  toLocation?: string;
  quantityChanged?: number;
  actor?: string;
  linkedCargoId?: string;
}

export interface InventoryItem {
  id: string;
  code: string;
  name: string;
  category: InventoryCategory;
  quantity: number;
  minThreshold: number;
  unit: string;
  currentLocation: string;
  status: InventoryStatus;
  lastMovement: string;
  linkedExpedition: string;
  linkedCargoConsignment?: string;
  responsibleTeam: string;
  storageBin?: string;
  batchNumber?: string;
  expiryDate?: string;
  movementHistory: InventoryMovement[];
  damageReason?: string;
  isSimulation: boolean;
}

export interface StationReceiptItem {
  id: string;
  cargoCode: string;
  cargoDescription: string;
  cargoCategory: string;
  origin: string;
  destination: string;
  status: 'Received at Station' | 'Verified & Stored';
  stagingLocation: string;
  receivedTimestamp: string;
  verifiedBy?: string;
  targetInventoryItemCode?: string;
  targetQuantity?: number;
  targetUnit?: string;
  targetCategory?: InventoryCategory;
}

export interface ResourceAlert {
  id: string;
  type: 'LOW_STOCK' | 'ALLOCATION_REQUIRED' | 'PENDING_RECEIPT' | 'BACKLOAD';
  title: string;
  subtitle: string;
  location: string;
  severity: 'Warning' | 'Attention' | 'Info';
  itemId?: string;
  cargoId?: string;
  countDetail: string;
}

// ==========================================
// FIELD OPERATIONS TYPES
// ==========================================

export interface FieldTeamMember {
  id: string;
  name: string;
  role: string;
  location: string;
  status: 'Operational' | 'Active' | 'Resting' | 'Standby';
  checkInStatus: 'CHECKED IN' | 'PENDING' | 'OVERDUE';
  batteryPercent: number;
  radioChannel: string;
  lastCheckIn: string;
  vitals: string;
  avatarInitials: string;
}

export interface FieldTask {
  id: string;
  name: string;
  location: string;
  zone: string;
  team: string[];
  equipmentCode: string;
  equipmentName: string;
  progressPercent: number;
  startTime: string;
  expectedCompletion: string;
  status: 'IN PROGRESS' | 'COMPLETED' | 'PAUSED';
  targetDepth?: number;
  currentDepth?: number;
  samplesRetrieved?: number;
  targetSamples?: number;
  leadOperator: string;
  lastUpdated: string;
  notes: string;
}

export interface FieldLogEntry {
  id: string;
  timestamp: string;
  date: string;
  actor?: string;
  type: 'CHECK_IN' | 'PROGRESS_UPDATE' | 'INCIDENT' | 'SUPPORT_REQUEST' | 'SYNC' | 'SYSTEM' | 'COMMUNICATION';
  title: string;
  description: string;
  syncStatus: 'SYNCED' | 'PENDING SYNC' | 'OFFLINE';
  offlineCreated: boolean;
  metadata?: Record<string, any>;
}

export interface OutboxRecord {
  id: string;
  code: string;
  type: 'CHECK_IN' | 'PROGRESS_UPDATE' | 'INCIDENT' | 'SUPPORT_REQUEST' | 'EQUIPMENT' | 'DOCUMENT';
  typeName: string;
  title: string;
  source: string;
  destination: string;
  timestamp: string;
  priority: 'Critical' | 'Safety' | 'Operational' | 'Routine';
  statusText: string;
  status: 'Pending' | 'Syncing' | 'Synced' | 'Failed';
  payload: Record<string, any>;
  errorReason?: string;
  retryCount: number;
}

export interface SyncHistoryEntry {
  id: string;
  timestamp: string;
  title: string;
  details: string;
  recordsCount: number;
  source: string;
  destination: string;
  status: 'SUCCESS' | 'PARTIAL' | 'FAILED';
}

export interface FieldIncident {
  id: string;
  severity: 'Low' | 'Moderate' | 'High' | 'Critical';
  category: 'Medical' | 'Weather' | 'Equipment' | 'Communication' | 'Route / Terrain' | 'Other';
  location: string;
  description: string;
  actionTaken?: string;
  reportedBy: string;
  timestamp: string;
  syncStatus: 'SYNCED' | 'PENDING SYNC';
}

export interface FieldSupportRequest {
  id: string;
  priority: 'Routine' | 'Urgent' | 'Emergency';
  requestType: 'Medical' | 'Logistics' | 'Technical' | 'Communication' | 'Transport';
  details: string;
  itemsRequested?: string[];
  status: 'Open' | 'Acknowledged' | 'Dispatched';
  requestedBy: string;
  timestamp: string;
  syncStatus: 'SYNCED' | 'PENDING SYNC';
}

export interface FieldResourceAllocated {
  id: string;
  code: string;
  name: string;
  category: string;
  quantityAllocated: number;
  unit: string;
  condition: string;
  linkedAssetCode?: string;
}

export type EmergencySeverity = 'Low' | 'Moderate' | 'High' | 'Critical';
export type EmergencyCategory = 'Medical' | 'Weather' | 'Equipment' | 'Communication' | 'Route / Terrain' | 'Other';
export type EmergencyStatus = 'Reported' | 'Acknowledged' | 'Response in progress' | 'Personnel safe' | 'Investigation' | 'Closed';

export interface IncidentTimelineEvent {
  id: string;
  timestamp: string;
  title: string;
  actor: string;
  details?: string;
  type?: 'report' | 'classification' | 'accountability' | 'first-aid' | 'support' | 'notification' | 'assignment' | 'safe' | 'escalation' | 'investigation' | 'closure';
}

export interface IncidentInvestigation {
  required: boolean;
  investigationCompleted: boolean;
  summary?: string;
  rootCause?: string;
  correctiveAction?: string;
  justificationReason?: string;
  completedAt?: string;
  closedBy?: string;
}

export interface IncidentEscalation {
  level: 'Station Response' | 'Expedition Command' | 'External Assistance';
  reason: string;
  timestamp: string;
  authorizedBy: string;
}

export interface EmergencyResource {
  id: string;
  name: string;
  quantity: string;
  location: string;
  status: string;
  inventoryId?: string;
  assetId?: string;
}

export interface AccountedPersonnel {
  id: string;
  name: string;
  role: string;
  involvement: 'Affected personnel' | 'Reporting member' | 'First responder' | 'Team member';
  accountedStatus: 'Accounted for' | 'Pending verification' | 'Assistance needed';
  actionStatus: string;
}

export interface EmergencyIncident {
  id: string;
  code: string;
  title: string;
  expedition: string;
  station: string;
  location: string;
  site: string;
  reportedBy: string;
  reporterRole: string;
  affectedPersonnel: string;
  affectedRole: string;
  timeReported: string;
  severity: EmergencySeverity;
  category: EmergencyCategory;
  status: EmergencyStatus;
  description: string;
  syncStatus: 'SYNCED' | 'PENDING SYNC';
  timeline: IncidentTimelineEvent[];
  investigation?: IncidentInvestigation | null;
  escalation?: IncidentEscalation | null;
  associatedResources: EmergencyResource[];
  accountedTeam: AccountedPersonnel[];
  offlineCreated?: boolean;
}

export interface PersonnelDeinduction {
  id: string;
  name: string;
  role: string;
  location: string;
  medicalClearance: 'Cleared' | 'Review Pending' | 'Action Required';
  equipmentReturned: 'Returned' | 'Pending' | 'Partial';
  travelStatus: 'Confirmed' | 'Pending' | 'Booked';
  departureStatus: 'Ready' | 'Action Required' | 'Departed';
  clearanceNotes?: string;
}

export interface AssetRecoveryItem {
  id: string;
  assetId: string;
  assetName: string;
  lastLocation: string;
  condition: 'Operational' | 'Needs Inspection' | 'Used' | 'Damaged';
  recoveryStatus: 'Recovered' | 'Station Retained' | 'Recovery Pending' | 'Returned for Restock' | 'Maintenance Required';
  custodian: string;
  notes?: string;
}

export interface BackloadItem {
  id: string;
  manifestId: string;
  cargo: string;
  category: 'Scientific Material' | 'Equipment' | 'Maintenance' | 'Waste' | 'Medical';
  origin: string;
  destination: string;
  handling: 'Temperature Controlled' | 'Standard Cargo' | 'Inspection Required' | 'Controlled Handling';
  status: 'Prepared' | 'Packed' | 'Pending' | 'Pending Review' | 'Dispatched';
}

export interface ScientificSampleReturn {
  id: string;
  sampleId: string;
  material: string;
  collectionSite: string;
  researcher: string;
  storage: 'Cold Storage' | 'Station Storage' | 'Ambient';
  status: 'Ready for Backload' | 'Verified' | 'Pending Validation' | 'Approved';
}

export interface StationHandoverItem {
  id: string;
  title: string;
  isCompleted: boolean;
  completedBy?: string;
  completedAt?: string;
}

export interface CloseoutDocument {
  id: string;
  docCode: string;
  title: string;
  owner: string;
  status: 'Draft' | 'Ready for Review' | 'Pending' | 'Completed';
  completedAt?: string;
  linkedIncidentId?: string;
  notes?: string;
}

// ==========================================
// KNOWLEDGE HUB TYPES
// ==========================================

export type KnowledgeType =
  | 'Dataset'
  | 'Report'
  | 'Field Observation'
  | 'Scientific Sample'
  | 'Media'
  | 'Incident Record'
  | 'Lessons Learned';

export type KnowledgeClassification = 'Public' | 'Controlled' | 'Restricted';

export type KnowledgeStatus =
  | 'Collected'
  | 'Validation'
  | 'Under Review'
  | 'Approved'
  | 'Published'
  | 'Draft';

export type KnowledgeWorkflowStage =
  | 'Collected'
  | 'Validated'
  | 'Classified'
  | 'Review'
  | 'Approved'
  | 'Published';

export type KnowledgeResearchArea =
  | 'Glaciology'
  | 'Atmospheric Science'
  | 'Oceanography'
  | 'Meteorology'
  | 'Climate Science'
  | 'Logistics'
  | 'Safety';

export interface KnowledgeValidationCheck {
  id: string;
  label: string;
  status: 'passed' | 'warning' | 'pending';
  detail?: string;
}

export interface KnowledgeReviewChecklistItem {
  id: string;
  label: string;
  checked: boolean;
}

export interface KnowledgeVersionItem {
  version: string;
  changedBy: string;
  change: string;
  date: string;
  status: string;
  summarySnapshot?: string;
}

export interface KnowledgeRelatedItem {
  id: string;
  type: 'Task' | 'Asset' | 'Sample' | 'Incident' | 'Expedition';
  title: string;
  link?: string;
}

export interface KnowledgeRecord {
  id: string;
  title: string;
  type: KnowledgeType;
  expeditionId: string;
  location: string;
  researchArea: KnowledgeResearchArea;
  owner: string;
  classification: KnowledgeClassification;
  status: KnowledgeStatus;
  createdAt: string;
  updatedAt: string;
  version: string;
  source: string;
  sourceRecord: string;
  collectionMethod: string;
  dataCompleteness: number;
  validationStatus: 'Valid' | 'Needs Review' | 'Pending';
  validationChecks: KnowledgeValidationCheck[];
  reviewer: string;
  reviewStatus: 'Pending' | 'Approved' | 'Changes Requested' | 'Rejected';
  reviewChecklist: KnowledgeReviewChecklistItem[];
  aiSummary: string;
  aiKeywords: string[];
  aiConfidence: string;
  versionHistory: KnowledgeVersionItem[];
  relatedRecords: KnowledgeRelatedItem[];
  publicationStatus: 'Not Published' | 'Published';
  publishedAt?: string;
  publishedBy?: string;
  notes?: string;
}

// ==========================================
// PUBLIC PORTAL TYPES
// ==========================================

export interface PublicExpedition {
  id: string;
  title: string;
  shortTitle: string;
  tagline: string;
  location: string;
  region: 'Antarctica' | 'Arctic' | 'Southern Ocean';
  year: string;
  dates: string;
  status: 'Active' | 'Completed' | 'Upcoming';
  researchThemes: string[];
  summary: string;
  overview: string;
  image: string;
  datasetCount: number;
  publicationCount: number;
  mediaCount: number;
  featuredScience: string[];
  publicDatasets: string[];
  publicReports: {
    title: string;
    type: string;
    date: string;
    summary: string;
  }[];
}

export interface PublicDataset {
  id: string;
  title: string;
  expeditionId: string;
  expeditionName: string;
  researchArea: string;
  location: string;
  publishedVersion: string;
  publishedDate: string;
  dataType: string;
  description: string;
  collectionMethod: string;
  fileSize: string;
  parameters: string[];
  classification: 'Public';
  license: string;
  doi: string;
}

export interface PublicMediaItem {
  id: string;
  title: string;
  type: 'Photo Gallery' | 'Video' | 'Documentary';
  durationOrCount: string;
  description: string;
  image: string;
  expedition: string;
  location: string;
  videoDuration?: string;
}

export interface PublicPublication {
  id: string;
  title: string;
  type: 'Expedition Overview' | 'Research Report' | 'Annual Review' | 'Scientific Paper';
  date: string;
  expedition: string;
  summary: string;
  status: 'Published';
  downloadSize?: string;
}

export interface PolarJourneyMilestone {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
}

// ==========================================
// RESEARCHER WORKSPACE TYPES
// ==========================================

export interface ScientificMetadata {
  collectionMethod: string;
  measurementInterval: string;
  units: string;
  coordinateReference: string;
  qualityStatus: string;
  processingLevel: string;
  lastValidation: string;
}

export interface ResearcherDataset {
  id: string;
  title: string;
  researchArea: 'Glaciology' | 'Meteorology' | 'Atmospheric Science' | 'Oceanography' | 'Geophysics' | 'Climate Science';
  expedition: string;
  location: string;
  dataType: 'Observational' | 'Measurement' | 'Geospatial' | 'Time Series' | 'Sample Metadata';
  updated: string;
  version: string;
  access: 'Public' | 'Controlled';
  status: 'Approved';
  description: string;
  collectionPeriod: string;
  year: string;
  parameters: string[];
  fileSize: string;
  metadata: ScientificMetadata;
}

export interface ResearcherCollection {
  id: string;
  name: string;
  description: string;
  datasetIds: string[];
  updatedAt: string;
}

export interface ResearcherNote {
  id: string;
  title: string;
  content: string;
  datasetId?: string;
  timestamp: string;
}

export interface ResearcherAccessRequest {
  id: string;
  datasetId: string;
  datasetTitle: string;
  reason: string;
  researchPurpose: string;
  institution: string;
  expectedUse: string;
  status: 'Pending Review' | 'Approved' | 'Rejected';
  submittedAt: string;
}

export interface ResearcherActivity {
  id: string;
  action: string;
  target: string;
  timestamp: string;
  type: 'saved' | 'download' | 'request' | 'note' | 'collection';
}



