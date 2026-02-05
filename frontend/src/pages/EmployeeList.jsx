import axios from "axios";
import { useEffect, useState } from "react";
import API_URL from "../config/apiConfig";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/employees`)
      .then(res => setEmployees(res.data));
  }, []);

  return (
    <div>
      {employees.map(emp => (
        <div key={emp._id}>
          <img
            src={emp.photo?.startsWith('http') ? emp.photo : `${API_URL}/../../uploads/${emp.photo}`}
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
