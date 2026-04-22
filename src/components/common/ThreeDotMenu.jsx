import { useState, useEffect, useRef } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import API from '../../utils/api';

const ThreeDotMenu = ({ id, type, onDeleteSuccess, onEdit }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Delete this?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/${type}/${id}`);
      onDeleteSuccess(id);
      setOpen(false);
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div ref={menuRef} style={{ position: 'relative', display: 'inline-block' }}>
      
      {/* 3-dot icon */}
      <FiMoreVertical
        size={20}
        style={{ cursor: 'pointer' }}
        onClick={(e) => {
          e.stopPropagation();
          setOpen(prev => !prev);
        }}
      />

      {/* Dropdown */}
      {open && (
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: '28px',
            background: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            width: '120px',
            zIndex: 100
          }}
        >
          {/* EDIT */}
          <div
            style={{ padding: '10px', cursor: 'pointer' }}
            onClick={() => {
              onEdit();         
              setOpen(false);
            }}
          >
            Edit
          </div>

          {/* DELETE */}
          <div
            style={{ padding: '10px', cursor: 'pointer', color: 'red' }}
            onClick={handleDelete}
          >
            Delete
          </div>
        </div>
      )}
    </div>
  );
};

export default ThreeDotMenu;