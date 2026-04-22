import { NavLink } from 'react-router-dom';
import { FiHome, FiUsers, FiUserPlus, FiSettings } from 'react-icons/fi';

const Sidebar = () => {
  return (
    <>
      

      <div className="sidebar">
        <div className="logo">
          <span className="black">Canova</span>
          <span className="blue">CRM</span>
        </div>

        <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <FiHome size={20} /> Dashboard
        </NavLink>

        <NavLink to="/leads" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <FiUserPlus size={20} /> Leads
        </NavLink>

        <NavLink to="/employees" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <FiUsers size={20} /> Employees
        </NavLink>

        <NavLink to="/settings" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <FiSettings size={20} /> Settings
        </NavLink>
      </div>
    </>
  );
};

export default Sidebar;