import { Plans, Activity } from "server/models";

export type Msg =
  | ["plan/select", { planid: string }]
  | ["plan/save", { planid: string; plan: Plans }]
  | ["activity/select", { activityId: string }]
  | ["activity/save", { activityId: string; activity: Activity }];

  
