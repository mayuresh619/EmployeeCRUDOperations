import "./Home.css";
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import * as serv from '../services/ApiService'


export default function Home() {
    const location = useLocation();
    const navigate = useNavigate();
    const username = location.state?.loggedInUsername;
    const [employees, setEmployees] = useState([]);

    const [editId, setEditId] = useState(null);
    const [editFormData, setEditFormData] = useState({ emp_UserName: "", emp_EmailId: "" });


    // Fetch Data from API
    const fetchEmployees = async () => {
            try {
                const data = await serv.getEmployeeList();
                setEmployees(data); 
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };

    useEffect(() => {
        if (!username) {
            navigate("/"); 
        }

        fetchEmployees();
    }, [username, navigate]);

    const handleLogoff = () => {
        navigate("/"); // Redirect to login
    };

    // --- CRUD Operations ---

    // Handle Delete
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            const updatedList = employees.filter((emp) => emp.emp_Id !== id);
            
            const apiResponse = await serv.deleteEmployee(id); 

            setEmployees(updatedList);
        }
    };

    // Start Editing
    const handleEditClick = (event, employee) => {
        event.preventDefault();
        setEditId(employee.emp_Id);
        setEditFormData({ emp_UserName: employee.emp_UserName, emp_EmailId: employee.emp_EmailId});
    };

    // Handle Input Change during Edit
    const handleEditFormChange = (event) => {
        event.preventDefault();
        
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        setEditFormData({ ...editFormData, [fieldName]: fieldValue });
    };
    // Save Changes
    const handleSaveClick = async (id) => {
        const employeeToUpdate = {
            emp_Id: id,
            ...editFormData
        };

        try {

            const apiResponse = await serv.updateEmployee(employeeToUpdate); 

            const editedEmployees = employees.map((emp) => {
                if (emp.emp_Id === id) {
                    return { ...emp, ...editFormData }; 
                }
                return emp;
            });
            setEmployees(editedEmployees);
            setEditId(null); // Exit edit mode
            
        } catch (error) {
            console.error("Error updating employee:", error);
            alert("Failed to save changes. Please try again."); 

        }
    };

    // Cancel Editing
    const handleCancelClick = () => {
        setEditId(null);
    };

    // If username is missing, don't render the UI (useEffect will redirect)
    if (!username) return null;

    return (
        <div className="home-container">
            <header className="home-header">
                <h2>Welcome, {username}</h2>
                <button className="btn-logout" onClick={handleLogoff}>Logoff</button>
            </header>

            <div className="grid-container">
                <h3>Employee List</h3>
                <table className="employee-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((emp) => (
                            <tr key={emp.emp_Id}>
                                {editId === emp.emp_Id ? (
                                    // --- EDIT MODE ROW ---
                                    <>
                                        <td><input type="text" name="emp_UserName" value={editFormData.emp_UserName} onChange={handleEditFormChange} /></td>
                                        <td><input type="email" name="emp_EmailId" value={editFormData.emp_EmailId} onChange={handleEditFormChange} /></td>
                                        <td>
                                            <button className="btn-save" onClick={() => handleSaveClick(emp.emp_Id)}>Save</button>
                                            <button className="btn-cancel" onClick={handleCancelClick}>Cancel</button>
                                        </td>
                                    </>
                                ) : (
                                    // --- VIEW MODE ROW ---
                                    <>
                                        <td>{emp.emp_UserName}</td>
                                        <td>{emp.emp_EmailId}</td>
                                        <td>
                                            <button className="btn-edit" onClick={(e) => handleEditClick(e, emp)}>Edit</button>
                                            <button className="btn-delete" onClick={() => handleDelete(emp.emp_Id)}>Delete</button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
                {employees.length === 0 && <p className="no-data">No employees found.</p>}
            </div>
        </div>
    );
}