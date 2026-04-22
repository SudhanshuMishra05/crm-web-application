import { useForm } from 'react-hook-form';
import axios from 'axios';

const AddEmployeeModal = ({ onClose, onSuccess }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post('http://localhost:5000/api/employees', data);
      onSuccess();
      onClose();
    } catch (err) {
      alert('Error creating employee');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div style={{ padding: '24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between' }}>
          <h2>Add New Employee</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '24px' }}>×</button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} style={{ padding: '24px' }}>
          <div style={{ marginBottom: '16px' }}>
            <label>First name</label>
            <input {...register('firstName')} defaultValue="Sarthak" className="modal-input" required />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label>Last name</label>
            <input {...register('lastName')} defaultValue="Pai" className="modal-input" required />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label>Email</label>
            <input {...register('email')} type="email" defaultValue="sarthakpai08@gmail.com" className="modal-input" required />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label>Location</label>
            <input {...register('location')} defaultValue="Karnataka" className="modal-input" />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label>Preferred Language</label>
            <select {...register('preferredLanguage')} defaultValue="Tamil" className="modal-input">
              <option>Marathi</option>
              <option>Kannada</option>
              <option>Hindi</option>
              <option>English</option>
              <option>Tamil</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Save</button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeModal;