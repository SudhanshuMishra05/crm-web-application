import { useState, useEffect } from 'react';
import Sidebar from '../components/common/Sidebar';

const Settings = () => {
  const [adminData, setAdminData] = useState({
    firstName: "Admin",
    lastName: "Canova",
    email: "admin@canovacrm.com",
    password: ""
  });

  const [formData, setFormData] = useState({ ...adminData });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('adminProfile');
    if (saved) {
      const parsed = JSON.parse(saved);
      setAdminData(parsed);
      setFormData(parsed);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    setAdminData({ ...formData });
    localStorage.setItem('adminProfile', JSON.stringify(formData));
    setMessage('Profile updated successfully!');
    setIsEditing(false);

    setTimeout(() => setMessage(''), 3000);
  };

  const handleCancel = () => {
    setFormData({ ...adminData });
    setIsEditing(false);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      
      <div className="main-content">
        <div className="card" style={{ maxWidth: '680px', margin: '0' }}>
          <div style={{ padding: '32px' }}>

           
            <div style={{
              fontSize: '18px',
              color: '#6b7280',
              marginBottom: '12px'
            }}>
              Home &gt; <span style={{ color: '#111827', fontWeight: 500 }}>Settings</span>
            </div>

            <h2 style={{ marginBottom: '8px', fontWeight: 600 }}>
              Admin Profile
            </h2>

            {message && (
              <div style={{
                padding: '14px 20px',
                background: '#ecfdf5',
                color: '#10b981',
                borderRadius: '8px',
                marginBottom: '24px',
                fontWeight: 500
              }}>
                {message}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

              {/* First Name */}
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: '#374151' }}>
                  First Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      border: '1px solid #cbd5e1',
                      borderRadius: '8px',
                      fontSize: '15px'
                    }}
                  />
                ) : (
                  <div style={{
                    padding: '14px 16px',
                    background: '#f8fafc',
                    borderRadius: '8px',
                    fontSize: '15px'
                  }}>
                    {adminData.firstName}
                  </div>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: '#374151' }}>
                  Last Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      border: '1px solid #cbd5e1',
                      borderRadius: '8px',
                      fontSize: '15px'
                    }}
                  />
                ) : (
                  <div style={{
                    padding: '14px 16px',
                    background: '#f8fafc',
                    borderRadius: '8px',
                    fontSize: '15px'
                  }}>
                    {adminData.lastName}
                  </div>
                )}
              </div>

              {/* Email (read-only) */}
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: '#374151' }}>
                  Email
                </label>
                <div style={{
                  padding: '14px 16px',
                  background: '#f1f5f9',
                  borderRadius: '8px',
                  fontSize: '15px'
                }}>
                  {adminData.email}
                </div>
              </div>

              {/* Password */}
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: '#374151' }}>
                  Password
                </label>
                {isEditing ? (
                  <input
                    type="password"
                    name="password"
                    value={formData.password || ''}
                    onChange={handleChange}
                    placeholder="Enter new password"
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      border: '1px solid #cbd5e1',
                      borderRadius: '8px',
                      fontSize: '15px'
                    }}
                  />
                ) : (
                  <div style={{
                    padding: '14px 16px',
                    background: '#f8fafc',
                    borderRadius: '8px',
                    fontSize: '15px'
                  }}>
                    ********
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              {isEditing && (
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: '#374151' }}>
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword || ''}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      border: '1px solid #cbd5e1',
                      borderRadius: '8px',
                      fontSize: '15px'
                    }}
                  />
                </div>
              )}

            </div>

            {/* Buttons */}
            <div style={{ marginTop: '40px', display: 'flex', gap: '12px' }}>
              {isEditing ? (
                <>
                  <button onClick={handleCancel} className="btn btn-secondary" style={{ flex: 1, padding: '14px' }}>
                    Cancel
                  </button>
                  <button onClick={handleSave} className="btn btn-primary" style={{ flex: 1, padding: '14px' }}>
                    Save Changes
                  </button>
                </>
              ) : (
                <button onClick={() => setIsEditing(true)} className="btn btn-primary" style={{ flex: 1, padding: '14px' }}>
                  Edit Profile
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;