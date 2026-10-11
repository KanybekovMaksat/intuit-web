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
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[1100] -translate-y-24 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-transform focus:translate-y-0"
        >
          К содержимому
        </a>
        <Header />
        <main id="main-content" className="w-full px-6 md:px-3 mt-[72px] flex-grow">
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </main>
        <Footer />
      </div>
    </>
  );
}
