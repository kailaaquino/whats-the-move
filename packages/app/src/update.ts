import { Auth, Update } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model } from "./model";
import { Plans, Activity } from "server/models";

export default function update(
  message: Msg,
  apply: Update.ApplyMap<Model>,
  user: Auth.User
) {
  console.log("Received message:", message);

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
    case "activity/save":
      saveActivity(message[1], user)
        .then((activity) => apply((model) => ({ ...model, activity })))
        .then(() => {
          const { onSuccess } = message[1];
          if (onSuccess) onSuccess();
        })
        .catch((err: Error) => {
          const { onFailure } = message[1];
          if (onFailure) onFailure(err);
        });
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
    .then((res) => (res.status === 200 ? res.json() : undefined))
    .then((json) => {
      if (json) {
        console.log("Activity:", json);
        return json as Activity;
      }
    });
}

function saveActivity(
  msg: {
    activityId: string;
    activity: Activity;
  },
  user: Auth.User
): Promise<Activity> {
  return fetch(`/api/activities/${msg.activityId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...Auth.headers(user),
    },
    body: JSON.stringify(msg.activity),
  })
    .then((res) => {
      if (res.status === 200) return res.json();
      throw new Error(`Failed to save activity: ${msg.activityId}`);
    })
    .then((json) => json as Activity);
}
