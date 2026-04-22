import { useState, useEffect } from 'react';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import Pagination from '../components/common/Pagination';
import AddLeadModal from '../components/leads/AddLeadModal';
import CSVUploadModal from '../components/leads/CSVUploadModal';
import API from '../utils/api';
import ThreeDotMenu from '../components/common/ThreeDotMenu';

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCSVModal, setShowCSVModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [editLead, setEditLead] = useState(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await API.get('/leads');
      setLeads(res.data);
    } catch (err) {
      console.log("Error fetching leads");
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    fetchLeads();
    setShowAddModal(false);
    setEditLead(null);
  };

  const formatDate = (date) => {
    if (!date) return '-';
    return new Date(date)
      .toLocaleDateString('en-GB')
      .replace(/\//g, '-');
  };

  if (loading) {
    return (
      <div style={{
        marginLeft: '20vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        Loading leads...
      </div>
    );
  }

  const filteredLeads = leads.filter(l =>
    l.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageSize = 10;
  const totalPages = Math.ceil(filteredLeads.length / pageSize);

  const paginatedLeads = filteredLeads.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div style={{
        marginLeft: '20vw',
        padding: '20px',
        maxWidth: '80vw',
        overflow: 'hidden'
      }}>

        <Navbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          title="Leads"
        />

        {/* Buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '12px',
          marginBottom: '20px'
        }}>
          <button
            className="btn btn-secondary"
            onClick={() => {
              setEditLead(null);
              setShowAddModal(true);
            }}
          >
            Add Manually
          </button>

          <button
            className="btn btn-primary"
            onClick={() => setShowCSVModal(true)}
          >
            Add CSV
          </button>
        </div>

        {/* Card Container */}
        <div style={{
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          padding: '12px',
          background: '#fff'
        }}>

          {/* Header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '40px 1fr 1.5fr 1fr 1fr 1fr 1fr 1.2fr 1fr 0.8fr 1.2fr 40px',
            fontSize: '12px',
            color: '#64748b',
            padding: '8px',
            gap: '8px'
          }}>
            {['No.', 'Name', 'Email', 'Source', 'Date', 'Location', 'Language', 'Assigned To', 'Status', 'Type', 'Scheduled Date', ''].map((h, i) => (
              <div key={i} style={{ overflow: 'hidden' }}>{h}</div>
            ))}
          </div>

          {/* Rows */}
          {paginatedLeads.map((lead, i) => (
            <div key={lead._id} style={{
              display: 'grid',
              gridTemplateColumns: '40px 1fr 1.5fr 1fr 1fr 1fr 1fr 1.2fr 1fr 0.8fr 1.2fr 40px',
              alignItems: 'center',
              padding: '10px',
              marginBottom: '10px',
              border: '1px solid #e5e7eb',
              borderRadius: '10px',
              fontSize: '12px',
              background: '#fff',
              gap: '8px',
              minWidth: 0
            }}>
              <div>{i + 1}</div>
              <div style={{ overflow: 'hidden' }}>{lead.name}</div>
              <div style={{ wordBreak: 'break-word' }}>{lead.email}</div>
              <div>{lead.source}</div>
              <div>{formatDate(lead.date)}</div>
              <div>{lead.location}</div>
              <div>{lead.language}</div>
              <div>{lead.assignedTo?.firstName || '-'}</div>
              <div style={{ color: 'green' }}>{lead.status}</div>
              <div>{lead.type}</div>
              <div>{formatDate(lead.scheduledDate)}</div>

              <ThreeDotMenu
                id={lead._id}
                type="leads"
                onDeleteSuccess={(id) => {
                  setLeads(prev => prev.filter(l => l._id !== id));
                }}
                onEdit={() => {
                  setEditLead(lead);
                  setShowAddModal(true);
                }}
              />
            </div>
          ))}

        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />

        {/* Modals */}
        {showAddModal && (
          <AddLeadModal
            onClose={() => {
              setShowAddModal(false);
              setEditLead(null);
            }}
            onSuccess={handleSuccess}
            editData={editLead}
          />
        )}

        {showCSVModal && (
          <CSVUploadModal
            onClose={() => setShowCSVModal(false)}
            onSuccess={fetchLeads}
          />
        )}

      </div>
    </div>
  );
};

export default Leads;