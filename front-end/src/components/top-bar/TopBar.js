import React, { useEffect, useState } from "react";
import "./TopBar.css";
import { Link } from "react-router-dom";

export default function TopBar() {
  const [allProductLink, setAllProductLink] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:4000/v1/menus/topbar`)
      .then((res) => res.json())
      .then((data) => setAllProductLink(data));
  }, []);

  const getRandomArrayLink = (arr, randomCount) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, randomCount);
  };

  return (
    <div className="top_bar">
      <div className="top_bar-tight">
        <ul className="top_bar-tight-ul">
          {getRandomArrayLink(allProductLink, 5).map((link) => {
            return (
              <li className="top_bar-tight-li">
                <Link href="w" className="top_bar-link">
                  {link.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="top_bar-left">
        <div className="top_bar-left_email">
          <a href="w" className="top_bar-left_email-text">
            sabz.learn@gmail.com
          </a>
          <i class="fas fa-envelope top-bar__email-icon"></i>
        </div>
        <div className="top_bar-left_phone">
          <a href="w" className="top_bar-left_phone-text">
            09216944714
          </a>
          <i class="fas fa-phone top-bar__phone-icon"></i>
        </div>
      </div>
    </div>
  );
}
