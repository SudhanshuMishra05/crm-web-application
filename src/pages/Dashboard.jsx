import { useState, useEffect } from 'react';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import KPICards from '../components/dashboard/KPICards';
import SalesGraph from '../components/dashboard/SalesGraph';
import RecentActivity from '../components/dashboard/RecentActivity';
import API from '../utils/api';

const Dashboard = () => {
  const [kpiData, setKpiData] = useState({
    unassignedLeads: 0,
    assignedThisWeek: 0,
    activeSalespeople: 0,
    conversionRate: '0%'
  });

  const [activeSalesData, setActiveSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await API.get('/dashboard');

      setKpiData({
        unassignedLeads: res.data.unassignedLeads || 12,
        assignedThisWeek: res.data.assignedThisWeek || 24,
        activeSalespeople: res.data.activeSalespeople || 5,
        conversionRate: res.data.conversionRate || '32%'
      });

      setActiveSalesData(res.data.activeSalesList || []);
    } catch (error) {
      console.log("Backend not responding yet, using mock data");
      // Fallback mock data (remove later)
      setKpiData({
        unassignedLeads: 12,
        assignedThisWeek: 24,
        activeSalespeople: 5,
        conversionRate: '32%'
      });
      setActiveSalesData([
        { firstName: "Tanner", lastName: "Finsha", email: "@tannerfinsha@gmail.com", employeeId: "#234540HJ7YT6", assignedLeads: 5, closedLeads: 2, status: "Active" },
        { firstName: "Emeto", lastName: "Winner", email: "Emetowinner@gmail.com", employeeId: "#234540HJ7YT6", assignedLeads: 3, closedLeads: 1, status: "Active" },
        { firstName: "Tassy", lastName: "Omah", email: "Tassyomah@gmail.com", employeeId: "#234540HJ7YT6", assignedLeads: 5, closedLeads: 0, status: "Inactive" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <Sidebar />
      
      <div className="main-content">
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} title="Dashboard" />

        <KPICards data={kpiData} />

        <div className="analytics-row">
          <div className="card">
            <h3 style={{ marginBottom: '20px' }}>Sale Analytics</h3>
            <div style={{ height: '380px' }}>
              <SalesGraph />
            </div>
          </div>
          <RecentActivity />
        </div>

        {/* Active Sales People - Connected */}
        <div className="card">
          <h3 style={{ marginBottom: '20px' }}></h3>
          
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Employee ID</th>
                    <th>Assigned Leads</th>
                    <th>Closed Leads</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {activeSalesData.map((person, index) => (
                    <tr key={index}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#3b82f6', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px' }}>
                            {person.firstName?.[0]}
                          </div>
                          <div>
                            <div style={{ fontWeight: 600 }}>{person.firstName} {person.lastName}</div>
                            <div style={{ fontSize: '13px', color: '#64748b' }}>{person.email}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ fontFamily: 'monospace' }}>{person.employeeId}</td>
                      <td><strong>{person.assignedLeads}</strong></td>
                      <td>{person.closedLeads}</td>
                      <td>
                        <span className={person.status === 'Active' ? 'status-active' : 'status-inactive'}>
                          ● {person.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;