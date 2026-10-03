import { createElement, lazy } from "react";
import { pathKeys } from "~shared/lib/react-router";
import { RouteObject } from "react-router-dom";

const ScheduleGroupsDetailPage = lazy(() => import('./scheduleGroups-details-page').then((m) => ({ default: m.ScheduleGroupsDetailPage })));

export const scheduleDetailGroupsRoute: RouteObject = {
  path: pathKeys.schedule.bySlugGroup(":slug"),
  element: createElement(ScheduleGroupsDetailPage),
};
