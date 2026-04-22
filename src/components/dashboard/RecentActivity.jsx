const RecentActivity = () => {
    const activities = [
      "You assigned a lead to Priya — 1 hour ago",
      "Jay closed a deal — 2 hours ago",
      "New employee Sarthak Pai was created — Yesterday",
      "Lead status updated to Hot for John Smith — Yesterday",
      "You assigned 3 leads via CSV upload — 2 days ago",
      "Tanner Finsha closed 2 leads — 3 days ago",
      "Employee status changed for Emeto Winner — 4 days ago"
    ];
  
    return (
      <div className="card" style={{ height: '420px' }}>
        <h3 style={{ marginBottom: '20px', fontWeight: 600 }}>Recent Activity Feed</h3>
        <div className="scroll-container" style={{ height: 'calc(100% - 60px)', overflowY: 'auto' }}>
          {activities.map((activity, index) => (
            <div 
              key={index} 
              style={{ 
                padding: '14px 0', 
                borderBottom: index !== activities.length - 1 ? '1px solid #f1f5f9' : 'none',
                fontSize: '14.5px',
                lineHeight: '1.5'
              }}
            >
              {activity}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default RecentActivity;