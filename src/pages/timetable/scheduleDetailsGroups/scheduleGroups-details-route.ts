import { createElement } from "react";
import { pathKeys } from "~shared/lib/react-router";
import { RouteObject } from "react-router-dom";
import { ScheduleGroupsDetailPage } from "./scheduleGroups-details-page";

export const scheduleDetailGroupsRoute: RouteObject = {
  path: pathKeys.schedule.bySlugGroup(":slug"),
  element: createElement(ScheduleGroupsDetailPage),
};
