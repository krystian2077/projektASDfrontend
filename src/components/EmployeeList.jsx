import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";

export default function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");

    const fetchEmployees = async () => {
        try {
            const res = await api.get("/all");
            setEmployees(res.data);
        } catch (err) {
            console.error("Error fetching employees:", err);
        }
    };

    const deleteEmployee = async (id) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            try {
                await api.delete(`/delete/${id}`);
                fetchEmployees();
            } catch (err) {
                console.error("Error deleting employee:", err);
                alert("Failed to delete employee: " + (err.response?.data?.message || err.message));
            }
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const filteredEmployees = employees.filter((emp) =>
        Object.values(emp).some((val) =>
            val?.toString().toLowerCase().includes(search.toLowerCase())
        )
    );

    return (
        <div>
            <div className="flex justify-end mb-4">
                <input
                    type="text"
                    placeholder="Search employees..."
                    className="border px-3 py-1 rounded"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredEmployees.map((emp) => (
                    <div key={emp.id} className="bg-white rounded shadow p-4 flex flex-col items-center text-center">
                        <img
                            src={emp.imageUrl || "https://via.placeholder.com/100"}
                            alt={emp.name}
                            className="w-20 h-20 rounded-full mb-2 object-cover border"
                        />
                        <h2 className="text-lg font-semibold">{emp.name}</h2>
                        <p className="text-sm text-gray-500">{emp.jobTitle}</p>
                        <p className="text-sm">{emp.email}</p>
                        <p className="text-sm">Phone : {emp.phone}</p>
                        <div className="flex space-x-2 mt-3">
                            <Link
                                to={`/edit/${emp.id}`}
                                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                            >
                                ✎
                            </Link>
                            <button
                                onClick={() => deleteEmployee(emp.id)}
                                className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500"
                            >
                                ✖
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
