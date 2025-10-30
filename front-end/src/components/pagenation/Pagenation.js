import React, { useEffect, useState } from "react";
import "./Pagenation.css";
import { Link, useParams } from "react-router-dom";

export default function Pagenation({
  items,
  itemCount,
  pathname,
  setShowCourses,
}) {
  const [pageCount, setPageCount] = useState(null);
  const { page } = useParams();

  useEffect(() => {
    let endIndex = itemCount * page;
    let startIndex = endIndex - itemCount;
    let pagenatedItems = items.slice(startIndex, endIndex);
    setShowCourses(pagenatedItems);
    let pagesNumber = Math.ceil(items.length / itemCount);
    setPageCount(pagesNumber);
  }, [page, items]);

  return (
    <div class="courses-pagination">
      <ul class="courses__pagination-list">
        {Array(pageCount)
          .fill(0)
          .map((item, index) => {
           return <li class="courses__pagination-item">
              {index + 1 === Number(page) ? (
                <Link
                  to={`${pathname}/${index+1}`}
                  class="courses__pagination-link courses__pagination-link--active"
                >
                  {index + 1}
                </Link>
              ) : (
                <Link to={`${pathname}/${index+1}`} class="courses__pagination-link">
                  {index + 1}
                </Link>
              )}
            </li>;
          })}

        {/* <li class="courses__pagination-item">
          <a href="w" class="courses__pagination-link">
            <i class="fas fa-long-arrow-alt-right courses__pagination-icon"></i>
          </a>
        </li>


        <li class="courses__pagination-item">
          <a href="w" class="courses__pagination-link">
            <i class="fas fa-long-arrow-alt-left courses__pagination-icon"></i>
          </a>
        </li> */}
      </ul>
    </div>
  );
}
