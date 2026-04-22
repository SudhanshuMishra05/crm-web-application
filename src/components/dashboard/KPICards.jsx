import React from "react";
import "./KPICards.css"

const KPICards = ({ data }) => {
  return (
    <div className="kpi-grid">
      <div className="card">
        <p className="card-title">Unassigned Leads</p>
        <h2 className="card-value">{data.unassignedLeads}</h2>
      </div>

      <div className="card">
        <p className="card-title">Assigned This Week</p>
        <h2 className="card-value">{data.assignedThisWeek}</h2>
      </div>

      <div className="card">
        <p className="card-title">Active Salespeople</p>
        <h2 className="card-value">{data.activeSalespeople}</h2>
      </div>

      <div className="card">
        <p className="card-title">Conversion Rate</p>
        <h2 className="card-value">{data.conversionRate}</h2>
      </div>
    </div>
  );
};

export default KPICards;