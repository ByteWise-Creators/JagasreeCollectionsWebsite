import { Outlet } from "react-router-dom";

const PolicyLayout = () => (
  <div className="pt-20 min-h-[75vh]">
    <Outlet />
  </div>
);

export default PolicyLayout;