import { useState } from 'react';
import axios from 'axios';

const CSVUploadModal = ({ onClose, onSuccess }) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setIsVerifying(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://localhost:5000/api/leads/csv', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      onSuccess();
      onClose();
    } catch (err) {
      alert('Upload failed');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content" style={{ width: '520px' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid #e2e8f0' }}>
          <h2>CSV Upload</h2>
          <p>Add your documents here</p>
        </div>

        <div style={{ padding: '40px 24px', textAlign: 'center', border: '2px dashed #cbd5e1', borderRadius: '12px', margin: '24px' }}>
          {isVerifying ? (
            <div>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>⟳</div>
              <p>Verifying...</p>
            </div>
          ) : (
            <>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📁</div>
              <p>Drag your files to start uploading</p>
              <p>OR</p>
              <input type="file" accept=".csv" onChange={handleFileChange} id="csvFile" style={{ display: 'none' }} />
              <label htmlFor="csvFile" className="btn btn-secondary" style={{ cursor: 'pointer' }}>
                Browse files
              </label>
              <p style={{ marginTop: '12px', fontSize: '13px', color: '#64748b' }}>Sample File.csv</p>
            </>
          )}
        </div>

        <div style={{ padding: '0 24px 24px', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleUpload} disabled={!file || isVerifying}>
            {isVerifying ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CSVUploadModal;