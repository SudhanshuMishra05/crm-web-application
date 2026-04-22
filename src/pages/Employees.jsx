import { useState, useEffect } from 'react';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import AddEmployeeModal from '../components/employees/AddEmployeeModal';
import API from '../utils/api';
import ThreeDotMenu from '../components/common/ThreeDotMenu';
import Pagination from '../components/common/Pagination';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editEmployee, setEditEmployee] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 8;

  const [selectedEmployees, setSelectedEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await API.get('/employees');
      setEmployees(res.data);
    } catch (err) {
      console.log("Error fetching employees");
    }
  };

  const handleSuccess = () => {
    fetchEmployees();
    setShowAddModal(false);
    setEditEmployee(null);
  };

  // PAGINATION
  const totalPages = Math.ceil(employees.length / employeesPerPage);
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  // SELECT ALL
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const ids = currentEmployees.map(emp => emp._id);
      setSelectedEmployees(ids);
    } else {
      setSelectedEmployees([]);
    }
  };

  // SELECT ONE
  const handleSelectOne = (id) => {
    if (selectedEmployees.includes(id)) {
      setSelectedEmployees(prev => prev.filter(empId => empId !== id));
    } else {
      setSelectedEmployees(prev => [...prev, id]);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />

      <div className="main-content">
        <Navbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          title="Employees"
        />

        {/* Only Add Button (Figma Match) */}
        <div className="top-actions">
          <button
            className="btn btn-primary"
            onClick={() => {
              setEditEmployee(null);
              setShowAddModal(true);
            }}
          >
            Add Employees
          </button>
        </div>

        {/* Table */}
        <div className="table-card">
          <table className="custom-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={
                      currentEmployees.length > 0 &&
                      currentEmployees.every(emp =>
                        selectedEmployees.includes(emp._id)
                      )
                    }
                  />
                </th>
                <th>Name</th>
                <th>Employee ID</th>
                <th>Assigned Leads</th>
                <th>Closed Leads</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {currentEmployees.map(emp => (
                <tr key={emp._id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedEmployees.includes(emp._id)}
                      onChange={() => handleSelectOne(emp._id)}
                    />
                  </td>

                  {/* NAME */}
                  <td>
                    <div className="employee-cell">
                      <div className="avatar">
                        {emp.firstName?.[0]}
                      </div>
                      <div>
                        <div className="name">
                          {emp.firstName} {emp.lastName}
                        </div>
                        <div className="email">{emp.email}</div>
                      </div>
                    </div>
                  </td>

                  <td>{emp.employeeId}</td>
                  <td>{emp.assignedLeads}</td>
                  <td>{emp.closedLeads}</td>

                  {/* STATUS */}
                  <td>
                    <div className="status">
                      <span
                        className={`dot ${
                          emp.status === 'Active' ? 'active' : 'inactive'
                        }`}
                      ></span>
                      {emp.status}
                    </div>
                  </td>

                  <td>
                    <ThreeDotMenu
                      id={emp._id}
                      type="employees"
                      onDeleteSuccess={(deletedId) => {
                        setEmployees(prev =>
                          prev.filter(e => e._id !== deletedId)
                        );
                      }}
                      onEdit={() => {
                        setEditEmployee(emp);
                        setShowAddModal(true);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {showAddModal && (
          <AddEmployeeModal
            onClose={() => {
              setShowAddModal(false);
              setEditEmployee(null);
            }}
            onSuccess={handleSuccess}
            editData={editEmployee}
          />
        )}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Employees;