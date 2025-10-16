import React from "react";
import "./NavBar.css";
export default function NavBar() {
  return (
    <div className="nav_bar">
      <div className="nav_bar-right">
        <img
          src="/images/logo/Logo.png"
          class="main-header__logo"
          alt="لوگوی سبزلرن"
        />
        <ul className="nav_bar_menu">
          <li className="nav_bar_menu-item">
            <a href="w" className="item_link">
              صفحه اصلی
            </a>
          </li>
          <li className="nav_bar_menu-item">
            <a href="w" className="item_link">فرانت اند
              <i class="fas fa-angle-down main-header__link-icon"></i>
              <ul class="main-header__dropdown">
                <li class="main-header__dropdown-item">
                  <a href="w" class="item_link">آموزش Html
                  </a>
                </li>
                <li class="main-header__dropdown-item">
                  <a href="w" class="item_link"> آموزش Css
                  </a>
                </li>
                <li class="main-header__dropdown-item">
                  <a href="w" class="item_link">آموزش جاوا اسکریپت
                  </a>
                </li>
                <li class="main-header__dropdown-item">
                  <a href="w" class="item_link">آموزش FlexBox
                  </a>
                </li>
                <li class="main-header__dropdown-item">
                  <a href="w" class="item_link">آموزش جامع ری‌اکت
                  </a>
                </li>
              </ul>
            </a>
          </li>
          <li class="nav_bar_menu-item">
                  <a href="w" class="item_link">امنیت
                    <i class="fas fa-angle-down main-header__link-icon"></i>
                    <ul class="main-header__dropdown">
                      <li class="main-header__dropdown-item">
                        <a href="w" class="item_link">آموزش کالی لینوکس</a>
                      </li>
                      <li class="main-header__dropdown-item">
                        <a href="w" class="item_link">آموزش پایتون سیاه</a>
                      </li>
                      <li class="main-header__dropdown-item">
                        <a href="w" class="item_link">آموزش جاوا اسکریپت سیاه</a>
                      </li>
                      <li class="main-header__dropdown-item">
                        <a href="w" class="item_link">آموزش شبکه</a>
                      </li>
                    </ul>
                  </a>
                </li>
                <li class="nav_bar_menu-item">
                  <a href="w" class="item_link">مقالات
                    <i class="fas fa-angle-down main-header__link-icon"></i>
                    <ul class="main-header__dropdown">
                      <li class="main-header__dropdown-item">
                        <a href="w" class="item_link">توسعه وب</a>
                      </li>
                      <li class="main-header__dropdown-item">
                        <a href="w" class="item_link">جاوا اسکریپت</a>
                      </li>
                      <li class="main-header__dropdown-item">
                        <a href="w" class="item_link">فرانت اند</a>
                      </li>
                    </ul>
                  </a>
                </li>
                <li class="nav_bar_menu-item">
                  <a href="w" class="item_link">پایتون
                    <i class="fas fa-angle-down main-header__link-icon"></i>
                    <ul class="main-header__dropdown">
                      <li class="main-header__dropdown-item">
                        <a href="w" class="item_link">دوره متخصص پایتون</a>
                      </li>
                      <li class="main-header__dropdown-item">
                        <a href="w" class="item_link">دوره هوش مصنوعی با پایتون</a>
                      </li>
                      <li class="main-header__dropdown-item">
                        <a href="w" class="item_link">دوره متخصص جنگو</a>
                      </li>
                    </ul>
                  </a>
                </li>
                <li class="nav_bar_menu-item">
                  <a href="w" class="item_link">مهارت های نرم</a>
                </li>
        </ul>
      </div>

      <div className="nav_bar-left">
        <a href="w" className="search">
            <i class="fas fa-search main-header__search-icon"></i>
        </a>
        <a href="w" className="card">
            <i class="fas fa-shopping-cart main-header__cart-icon"></i>
        </a>
        <a href="w" className="profile">
            <span class="main-header__profile-text">علیرضا کنگاوری</span>
        </a>
      </div>
    </div>
  );
}
