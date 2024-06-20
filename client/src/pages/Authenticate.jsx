import { Outlet } from "react-router-dom";

const Authenticate = () => {
  return (
    <main className="min-w-full min-h-screen relative flex items-center bg-primary bg-authenticate bg-no-repeat bg-center bg-cover">
      <div className="absolute right-0 -translate-x-1/4">
        <div className="w-[520px] h-[760px] flex flex-col bg-white/95 px-12 pt-14 rounded-lg">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default Authenticate;
