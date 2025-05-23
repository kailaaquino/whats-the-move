import { Activity } from "./activity";

export interface Plans {
  activity: Activity;
  date: string;
  participants: string[];
  groupId: string;
  createdBy: string;
}
