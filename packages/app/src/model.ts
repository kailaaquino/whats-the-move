import {
  Activity,
  Availability,
  Credential,
  Group,
  Plans,
  User,
} from "server/models";

export interface Model {
  activities?: Activity[];
  activity?: Activity;

  availability?: Availability;
  credential?: Credential;
  group?: Group;
  plans?: Plans[];
  user?: User;
}

export const init: Model = {};
