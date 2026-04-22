import { FiSearch } from 'react-icons/fi';

const Navbar = ({ searchTerm, setSearchTerm, title}) => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'flex-start', 
      gap: '12px',
      marginBottom: '24px',

      width: '100%',
      boxSizing: 'border-box',
      minWidth: 0   
    }}>

      {/* Search Bar */}
      <div style={{ 
        position: 'relative', 
        width: '320px',
        maxWidth: '100%'
      }}>
        <FiSearch style={{ 
          position: 'absolute', 
          left: '14px', 
          top: '12px', 
          color: '#94a3b8' 
        }} />

        <input
          type="text"
          placeholder="Search here..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px 12px 44px',
            border: '1px solid #e2e8f0',
            borderRadius: '9999px',
            fontSize: '15px',
            outline: 'none',
            boxSizing: 'border-box'
          }}
        />
      </div>

      {/* Title + Breadcrumb */}
      <div>
        <h1 style={{ 
          fontSize: '28px', 
          fontWeight: 600,
          margin: 0
        }}>
          {}
        </h1>

        <p style={{ 
          color: '#64748b',
          margin: 0
        }}>
          Home &gt; {title}
        </p>
      </div>

    </div>
  );
};

export default Navbar;