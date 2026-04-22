const ActiveSalespeople = () => {
    const salespeople = [
      { 
        firstName: "Tanner", 
        lastName: "Finsha", 
        employeeId: "#234540HJ7YT6", 
        assignedLeads: 5, 
        closedLeads: 2, 
        status: "Active" 
      },
      { 
        firstName: "Emeto", 
        lastName: "Winner", 
        employeeId: "#234540HJ7YT6", 
        assignedLeads: 3, 
        closedLeads: 1, 
        status: "Active" 
      },
      { 
        firstName: "Tassy", 
        lastName: "Omah", 
        employeeId: "#234540HJ7YT6", 
        assignedLeads: 5, 
        closedLeads: 0, 
        status: "Inactive" 
      },
      { 
        firstName: "James", 
        lastName: "Muriel", 
        employeeId: "#234540HJ7YT6", 
        assignedLeads: 2, 
        closedLeads: 0, 
        status: "Active" 
      },
      { 
        firstName: "Emeto", 
        lastName: "Winner", 
        employeeId: "#234540HJ7YT6", 
        assignedLeads: 8, 
        closedLeads: 3, 
        status: "Active" 
      }
    ];
  
    return (
      <div style={{ height: '380px', overflowY: 'auto' }}>
        {salespeople.map((person, index) => (
          <div 
            key={index} 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '14px 0', 
              borderBottom: index !== salespeople.length - 1 ? '1px solid #f1f5f9' : 'none'
            }}
          >
            <div>
              <strong>{person.firstName} {person.lastName}</strong>
              <div style={{ fontSize: '13px', color: '#64748b' }}>{person.employeeId}</div>
            </div>
            
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 600, marginBottom: '4px' }}>
                {person.assignedLeads} / {person.closedLeads}
              </div>
              <span 
                style={{ 
                  color: person.status === 'Active' ? '#22c55e' : '#ef4444',
                  fontSize: '13px',
                  fontWeight: 600
                }}
              >
                ● {person.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default ActiveSalespeople;