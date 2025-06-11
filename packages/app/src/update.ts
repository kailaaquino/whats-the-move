import { Auth, Update } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model } from "./model";
import { Plans, Activity } from "server/models";

export default function update(
  message: Msg,
  apply: Update.ApplyMap<Model>,
  user: Auth.User
) {
  switch (message[0]) {
    case "plan/select":
      loadPlan(message[1], user).then((plans) =>
        apply((model) => ({ ...model, plans }))
      );
      break;
    case "activity/select":
      loadActivity(message[1], user).then((activity) =>
        apply((model) => ({ ...model, activity }))
      );
      break;

    default:
      throw new Error(`Unhandled message: "${message[0]}"`);
  }
}

function loadPlan(payload: { planid: string }, user: Auth.User) {
  return fetch(`/data/plans-${payload.planid}.json`, {
    headers: Auth.headers(user),
  })
    .then((response: Response) => {
      if (response.status === 200) {
        return response.json();
      }
      return undefined;
    })
    .then((json: unknown) => {
      if (json) {
        console.log("Plan:", json);
        return json as Plans[];
      }
    });
}

function loadActivity(payload: { activityId: string }, user: Auth.User) {
  return fetch(`/api/activities/${payload.activityId}`, {
    headers: Auth.headers(user),
  })
    .then((response: Response) => {
      if (response.status === 200) {
        return response.json();
      }
      return undefined;
    })
    .then((json: unknown) => {
      if (json) {
        console.log("Activity:", json);
        return json as Activity;
      }
    });
}
