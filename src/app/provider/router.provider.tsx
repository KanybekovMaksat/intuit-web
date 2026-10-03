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
import { dissertationPageRoute } from "~pages/dissertation";
import {
  dissertationEditPageRoute,
  dissertationSubmitPageRoute,
} from "~pages/dissertation-submit";

import { NotFoundPage } from "~pages/page404";

function RouteErrorBoundary() {
  const error = useRouteError();
  console.error("Route error:", error);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8">
      <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">Что-то пошло не так</h2>
      <p className="text-sm text-gray-600 max-w-md mb-6">
        Произошла непредвиденная ошибка при загрузке данных. Попробуйте обновить страницу или вернуться на главную.
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-[#00956F] text-white rounded-lg text-sm font-semibold hover:bg-[#007f5e] transition-colors"
        >
          Обновить страницу
        </button>
        <a
          href="/"
          className="px-4 py-2 border border-gray-300 text-[#2A2172] rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors"
        >
          На главную
        </a>
      </div>
    </div>
  );
}

const router = createBrowserRouter([
  {
    errorElement: <RouteErrorBoundary />,
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
          dissertationPageRoute,
          dissertationSubmitPageRoute,
          dissertationEditPageRoute,
          {
            path: "*",
            element: <NotFoundPage />,
          },
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
