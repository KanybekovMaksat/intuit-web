import ScrollTop from "~shared/lib/react-router/scroll-top";
import { Outlet } from "react-router-dom";
import { Header } from "~widgets/header";
import { Footer } from "~widgets/footer";

export function GenericLayout() {
  return (
    <>
      <ScrollTop />
      <div className="min-h-screen flex flex-col justify-between">
        <Header />
        <div className="px-6 md:px-2 mt-20">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}
