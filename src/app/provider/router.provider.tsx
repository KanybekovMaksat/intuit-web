import {
  RouterProvider,
  createBrowserRouter,
  useRouteError,
} from "react-router-dom";
import { teacherPageRoute } from "~pages/teacher";
import { degreePageRoute } from "~pages/degree/degree-page.route";
import { homePageRoute } from "~pages/home/home-page.route";
import { GenericLayout } from "~app/layout";
import { enrollPageRoute } from "~pages/enroll";
import { institutesPageRoute } from "~pages/institutes";
import { newsPageRoute } from "~pages/news";
import { paymentsPageRoute } from "~pages/payments";
import { institutePageRoute } from "~pages/institute";
import { specializationPageRoute } from "~pages/specialization";
import { historyPageRoute } from "~pages/history";
import { visionPageRoute } from "~pages/vision";
import { aboutPageRoute } from "~pages/about";
import { collegesPageRoute } from "~pages/colleges";
import { studentsPageRoute } from "~pages/students";
import { applicantsPageRoute } from "~pages/applicants";
import { admissionsPageRoute } from "~pages/admissions";
import { windowPageRoute } from "~pages/window/window-page.route";
import { teapunPageRoute } from "~pages/teapun";
import { headPageRoute } from "~pages/head";
import { documentPageRoute } from "~pages/document";
import { teacherPageCvRoute } from "~pages/teacher/teacher-page.route";
import { eventPageRoute } from "~pages/event";
import { expoPageRoute } from "~pages/expo";
import { tandaPageRoute } from "~pages/tanda";
import { TestPageRoute } from "~pages/tandaTestPage";
import { LoginPageRoute } from "~pages/tandaLoginPage/tandaLogin.route";
import { ResultPageRoute } from "~pages/tandaResultPage";
import { TandaLayout } from "~pages/tandalayout";
import { internationalPageRoute } from "~pages/international";
import { scheduleDetailGroupsRoute } from "~pages/students/scheduleDetailsGroups";
import { scheduleDetailTeacherRoute } from "~pages/students/scheduleTeacherDetails";
import { timeTablePageRoute } from "~pages/timetable";

function BubbleError() {
  const error = useRouteError();
  if (error) throw error;
  return null;
}

const router = createBrowserRouter([
  {
    errorElement: <BubbleError />,
    children: [
      {
        element: <GenericLayout />,
        children: [
          homePageRoute,
          degreePageRoute,
          enrollPageRoute,
          institutesPageRoute,
          teacherPageRoute,
          newsPageRoute,
          paymentsPageRoute,
          institutePageRoute,
          specializationPageRoute,
          historyPageRoute,
          visionPageRoute,
          aboutPageRoute,
          collegesPageRoute,
          // schedule
          studentsPageRoute,
          scheduleDetailGroupsRoute,
          scheduleDetailTeacherRoute,
          // timeTable
          timeTablePageRoute,
          // ----------
          applicantsPageRoute,
          admissionsPageRoute,
          windowPageRoute,
          teapunPageRoute,
          headPageRoute,
          documentPageRoute,
          teacherPageCvRoute,
          eventPageRoute,
          expoPageRoute,
          internationalPageRoute,
        ],
      },
      {
        element: <TandaLayout />,
        children: [
          tandaPageRoute,
          TestPageRoute,
          LoginPageRoute,
          ResultPageRoute,
        ],
      },
    ],
  },
]);

export function BrowserRouter() {
  return <RouterProvider router={router} />;
}
