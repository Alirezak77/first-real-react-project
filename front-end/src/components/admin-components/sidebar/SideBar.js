import React, { useContext } from "react";
import './Sidebar.css'
import AuthContex from "../../../contex/authContex";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

export default function Sidebar() {
    const authContex = useContext(AuthContex)
    const navigate = useNavigate()
    const logoutAdmin = (event)=>{
        event.preventDefault()
        swal({
            title: 'با موفقیت خارج شدید',
            icon: 'success',
            buttons: 'تایید'
        }).then(()=>{
            authContex.logout()
            navigate('/')
        })

    }
  return (
    <div id="sidebar" class="col-2">
      <div class="sidebar-header">
        <div class="sidebar-logo">
          <a href="w">
            <img src="/images/logo/Logo.png" alt="Logo" />
          </a>
        </div>

        <div class="sidebar-menu-btn">
          <i class="fas fa-bars"></i>
        </div>
      </div>
      <div class="sidebar-menu">
        <ul>
          <li class="active-menu">
            <a href="w">
              <span>صفحه اصلی</span>
            </a>
          </li>
          <li>
            <a href="w">
              <span>دوره ها</span>
            </a>
          </li>
          <li>
            <a href="w">
              <span>منو ها</span>
            </a>
          </li>
          <li>
            <a href="w">
              <span>مقاله ها</span>
            </a>
          </li>
          <li>
            <a href="w">
              <span>کاربران</span>
            </a>
          </li>
          <li>
            <a href="w">
              <span>کدهای تخفیف</span>
            </a>
          </li>
          <li>
            <a href="w">
              <span>دسته‌بندی‌ها</span>
            </a>
          </li>
          <li>
            <a href="#" onClick={logoutAdmin}>
              <span>خروج</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}