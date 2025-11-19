import React from "react";
import "./InfoBox.css";

export default function InfoBox({title , count , icon , desc}) {
  return (
    <div className="col-4">
      <div className="info-box">
        <div className="info-box-title">
          <span className="box-title">{title}</span>
        </div>
        <div className="info-box-detail">
          <div className="detail-count">{count}</div>
          <div className="detail-icon">
            {icon}
          </div>
        </div>
        <span className="detail-text">{desc}</span>
      </div>
    </div>
  );
}
