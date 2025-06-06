import { define, Auth, History, Switch } from "@calpoly/mustang";
import { html } from "lit";
import { NavBar } from "./components/nav-bar";
import { PageHeader } from "./components/page-header";

import { GroupList } from "./components/group-list";
import { GroupCard } from "./components/group-card";
import { FriendNav } from "./components/friend-nav";
import { PlanList } from "./components/plan-list";
import { PlanCard } from "./components/plan-card";
import { AvatarCircle } from "./components/avatar-circle";

import { HomeViewElement } from "./views/home-view";
import { PlansViewElement } from "./views/plans-view";

const routes = [
  {
    path: "/app",
    view: () => html`<home-view></home-view>`,
  },
  // {
  //   path: "/app/group/:groupId",
  //   redirect: "/app/group/:groupId/plans",
  // },
  {
    path: "/app/group/:groupId/plans",
    view: (params: Switch.Params) =>
      html`<plans-view group-id=${params.groupId}></plans-view>`,
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
  "home-view": HomeViewElement,
  "plans-view": PlansViewElement,
  "group-list": GroupList,
  "group-card": GroupCard,
  "friend-nav": FriendNav,
  "plan-list": PlanList,
  "plan-card": PlanCard,
  "avatar-circle": AvatarCircle,
});
