import React from "react";
import "./ArticleBox.css";
import { Link } from "react-router-dom";

export default function ArticleBox({title , desc , img , shortName}) {
  return (
    <div class="col-4">
      <div class="article-card">
        <div class="article-card__header">
          <Link to={shortName} class="article-card__link-img">
            <img
              src={img}
              class="article-card__img"
              alt="Article Cover"
            />
          </Link>
        </div>
        <div class="article-card__content">
          <Link to={shortName} class="article-card__link">
            {title}
          </Link>
          <p class="article-card__text">
            {desc}
          </p>
          <Link to={shortName} class="article-card__btn">
            بیشتر بخوانید
          </Link>
        </div>
      </div>
    </div>
  );
}
