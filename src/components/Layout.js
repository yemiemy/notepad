import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <main className="container dark">
      <div className="app">
        <Header />
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
