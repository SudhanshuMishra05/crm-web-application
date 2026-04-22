const LeadRow = ({ lead }) => {
    return (
      <tr>
        <td>{lead.name}</td>
        <td>{lead.email}</td>
        <td>{lead.source}</td>
        <td>{lead.date}</td>
        <td>{lead.location}</td>
        <td>{lead.language}</td>
        <td>{lead.assignedTo ? lead.assignedTo.firstName + " " + lead.assignedTo.lastName : '-'}</td>
        <td><span className="status-active">Ongoing</span></td>
        <td>{lead.type || 'Warm'}</td>
        <td>{lead.scheduledDate || '12-04-2026'}</td>
        <td>⋯</td>
      </tr>
    );
  };
  
  export default LeadRow;