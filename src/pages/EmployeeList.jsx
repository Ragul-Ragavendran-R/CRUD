// EmployeeList.jsx
import axios from "axios";
import { useEffect, useState } from "react";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/employees")
      .then(res => setEmployees(res.data));
  }, []);

  return (
    <div>
      {employees.map(emp => (
        <div key={emp._id}>
          <img
            src={`http://localhost:5000/uploads/${emp.photo}`}
            width="100"
          />
          <h3>{emp.name}</h3>
          <p>{emp.email}</p>
        </div>
      ))}
    </div>
  );
}

export default EmployeeList;
