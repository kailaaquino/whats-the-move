export interface Activity {
  activityName: string;
  location: string;
  notes?: string;
  groupId: string;
  createdBy: string; // userId
}
