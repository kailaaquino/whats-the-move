import { define, Auth, History, Switch, Store } from "@calpoly/mustang";
import { html } from "lit";
import { Msg } from "./messages";
import { Model, init } from "./model";
import update from "./update";

import { NavBar } from "./components/nav-bar";
import { PageHeader } from "./components/page-header";

import { GroupList } from "./components/group-list";
import { GroupCard } from "./components/group-card";
import { FriendNav } from "./components/friend-nav";
import { PlanCard } from "./components/plan-card";
import { PlanList } from "./components/plan-list";
import { AvatarCircle } from "./components/avatar-circle";
import { ActivityCard } from "./components/activity-card";
import { ActivityList } from "./components/activity-list";

import { HomeViewElement } from "./views/home-view";
import { PlansViewElement } from "./views/plans-view";
import { ActivitiesViewElement } from "./views/activities-view";

const routes = [
  {
    path: "/app",
    view: () => html`<home-view></home-view>`,
  },
  {
    path: "/app/group/:groupId/plans",
    view: (params: Switch.Params) =>
      html`<plans-view group-id=${params.groupId}></plans-view>`,
  },
  {
    path: "/app/group/:groupId/activities",
    view: (params: Switch.Params) =>
      html`<activities-view group-id=${params.groupId}></activities-view> `,
  },
  { path: "/", redirect: "/app" },
];

define({
  "wtm-nav": NavBar,
  "page-header": PageHeader,
  "mu-auth": Auth.Provider,
  "mu-history": History.Provider,
  "mu-switch": class AppSwitch extends Switch.Element {
    constructor() {
      super(routes, "wtm:history", "wtm:auth");
    }
  },
  "mu-store": class AppStore extends Store.Provider<Model, Msg> {
    constructor() {
      super(update, init, "wtm:auth");
    }
  },
  "home-view": HomeViewElement,
  "plans-view": PlansViewElement,
  "activities-view": ActivitiesViewElement,
  "group-list": GroupList,
  "group-card": GroupCard,
  "activity-list": ActivityList,
  "activity-card": ActivityCard,
  "friend-nav": FriendNav,
  "plan-card": PlanCard,
  "plan-list": PlanList,
  "avatar-circle": AvatarCircle,
});
