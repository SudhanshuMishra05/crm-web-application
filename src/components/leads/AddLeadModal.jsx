import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import API from '../../utils/api';

const AddLeadModal = ({ onClose, onSuccess, editData }) => {
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (editData) {
      reset({
        name: editData.name || '',
        email: editData.email || '',
        source: editData.source || '',
        date: editData.date ? editData.date.split('T')[0] : '',
        location: editData.location || '',
        language: editData.language || 'English'
      });
    } else {
      reset({
        name: '',
        email: '',
        source: '',
        date: '',
        location: '',
        language: 'English'
      });
    }
  }, [editData, reset]);

  const onSubmit = async (data) => {
    try {
      if (editData) {
        await API.put(`/leads/${editData._id}`, data);
      } else {
        await API.post('/leads/manual', data);
      }

      reset();
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert(editData ? 'Error updating lead' : 'Error adding lead');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content" style={{
        width: '520px',
        borderRadius: '12px',
        overflow: 'hidden'
      }}>

        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600' }}>
            {editData ? 'Edit Lead' : 'Add New Lead'}
          </h2>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer'
            }}
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} style={{ padding: '20px 24px' }}>

          {/* Name */}
          <div style={{ marginBottom: '18px' }}>
            <label style={labelStyle}>Name</label>
            <input
              {...register('name')}
              style={inputStyle}
              placeholder="Enter name"
              required
            />
          </div>

          {/* Email */}
          <div style={{ marginBottom: '18px' }}>
            <label style={labelStyle}>Email</label>
            <input
              {...register('email')}
              type="email"
              style={inputStyle}
              placeholder="Enter email"
              required
            />
          </div>

          {/* Source */}
          <div style={{ marginBottom: '18px' }}>
            <label style={labelStyle}>Source</label>
            <input
              {...register('source')}
              style={inputStyle}
              placeholder="Referral"
            />
          </div>

          {/* Date */}
          <div style={{ marginBottom: '18px' }}>
            <label style={labelStyle}>Date</label>
            <input
              type="date"
              {...register('date')}
              style={inputStyle}
            />
          </div>

          {/* Location */}
          <div style={{ marginBottom: '18px' }}>
            <label style={labelStyle}>Location</label>
            <input
              {...register('location')}
              style={inputStyle}
              placeholder="Mumbai"
            />
          </div>

          {/* Language */}
          <div style={{ marginBottom: '24px' }}>
            <label style={labelStyle}>Preferred Language</label>
            <select
              {...register('language')}
              style={inputStyle}
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Marathi">Marathi</option>
              <option value="Kannada">Kannada</option>
              <option value="Bengali">Bengali</option>
            </select>
          </div>

          {/* Buttons */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px'
          }}>
            <button
              type="button"
              onClick={() => {
                reset();
                onClose();
              }}
              style={cancelBtn}
            >
              Cancel
            </button>

            <button type="submit" style={saveBtn}>
              {editData ? 'Update' : 'Save'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

/* Styles */
const labelStyle = {
  display: 'block',
  marginBottom: '6px',
  fontSize: '13px',
  color: '#374151',
  fontWeight: '500'
};

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  border: '1px solid #d1d5db',
  borderRadius: '6px',
  fontSize: '14px',
  outline: 'none'
};

const cancelBtn = {
  padding: '8px 16px',
  background: '#6b7280',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer'
};

const saveBtn = {
  padding: '8px 16px',
  background: '#2563eb',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer'
};

export default AddLeadModal;