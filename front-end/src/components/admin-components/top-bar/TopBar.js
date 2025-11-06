import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

export default function Topbar() {
  const localStorageData = JSON.parse(localStorage.getItem("user"));
  const [adminInfo, setAdminInfo] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`http://localhost:4000/v1/auth/me`, {
      headers: {
        Authorization: `Bearer ${localStorageData}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAdminInfo(data);
      });
  }, []);
  if (adminInfo.role === "USER") {
    navigate("/");
  } else {
    return (
      <div class="container-fluid">
        <div class="container">
          <div class="home-header">
            <div class="home-right">
              <div class="home-searchbar">
                <input type="text" class="search-bar" placeholder="جستجو..." />
              </div>
              <div class="home-notification">
                <button type="button">
                  <i class="far fa-bell"></i>
                </button>
              </div>
              <div class="home-notification-modal">
                <ul class="home-notification-modal-list">
                  <li class="home-notification-modal-item">
                    <span class="home-notification-modal-text">پیغام ها</span>
                    <label class="switch">
                      <input type="checkbox" checked />
                      <span class="slider round"></span>
                    </label>
                  </li>
                  <li class="home-notification-modal-item">
                    <span class="home-notification-modal-text">پیغام ها</span>
                    <label class="switch">
                      <input type="checkbox" checked />
                      <span class="slider round"></span>
                    </label>
                  </li>
                  <li class="home-notification-modal-item">
                    <span class="home-notification-modal-text">پیغام ها</span>
                    <label class="switch">
                      <input type="checkbox" checked />
                      <span class="slider round"></span>
                    </label>
                  </li>
                  <li class="home-notification-modal-item">
                    <span class="home-notification-modal-text">پیغام ها</span>
                    <label class="switch">
                      <input type="checkbox" checked />
                      <span class="slider round"></span>
                    </label>
                  </li>
                </ul>
              </div>
            </div>
            <div class="home-left">
              <div class="home-profile">
                <div class="home-profile-image">
                  <a href="w">
                    <img src={adminInfo.profile} alt="" />
                  </a>
                </div>
                <div class="home-profile-name">
                  <a href="w">{adminInfo.name}</a>
                </div>
                <div class="home-profile-icon">
                  <i class="fas fa-angle-down"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
