import { Suspense } from "react";
import ScrollTop from "~shared/lib/react-router/scroll-top";
import { Outlet } from "react-router-dom";
import { Header } from "~widgets/header";
import { Footer } from "~widgets/footer";
import { Loader } from "~shared/ui/loader";

export function GenericLayout() {
  return (
    <>
      <ScrollTop />
      <div className="min-h-screen flex flex-col justify-between overflow-x-hidden">
        <Header />
        <main className="w-full px-6 md:px-3 mt-20 flex-grow">
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </main>
        <Footer />
      </div>
    </>
  );
}
