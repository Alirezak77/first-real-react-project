import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin-components/sidebar/SideBar";
import Topbar from "../../components/admin-components/top-bar/TopBar";

import "./Index.css";

export default function index() {
  return (
    <>
      <div id="content">
        <Sidebar />

        <div id="home" class="col-10">
          <Topbar />

          <div class="container-fluid" id="home-content">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
