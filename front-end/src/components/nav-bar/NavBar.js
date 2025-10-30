import React, { useContext, useEffect, useState } from "react";
import "./NavBar.css";
import AuthContex from "../../contex/authContex";
import { Link } from "react-router-dom";

export default function NavBar() {
  const authContex = useContext(AuthContex);
  

  const [allMenu, setAllMenu] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/v1/menus`)
      .then((res) => res.json())
      .then((data) => setAllMenu(data));
  }, []);

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
            <Link to={'/'} className="item_link">
              صفحه اصلی
            </Link>
          </li>

          {allMenu.map((menu) => (
            <li className="nav_bar_menu-item">
              <Link to={`${menu.href}/1`} className="item_link">
                {menu.title}
                {menu.submenus.length !== 0 && (
                  <>
                    <i class="fas fa-angle-down main-header__link-icon"></i>
                    <ul class="main-header__dropdown">
                      {menu.submenus.map((menu) => {
                        return (
                          <li class="main-header__dropdown-item">
                            <Link to={menu.href} class="item_link">
                              {menu.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="nav_bar-left">
        <a href="w" className="search">
          <i class="fas fa-search main-header__search-icon"></i>
        </a>
        <a href="w" className="card">
          <i class="fas fa-shopping-cart main-header__cart-icon"></i>
        </a>

        {authContex.isLogedIn ? (
          <Link to="w" className="profile">
            <span class="main-header__profile-text">
              {authContex.userInfos.name}
            </span>
          </Link>
        ) : (
          <Link to="/login" className="profile">
            <span class="main-header__profile-text">ورود/ثبت‌ نام</span>
          </Link>
        )}
      </div>
    </div>
  );
}
