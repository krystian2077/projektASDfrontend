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
        if (window.confirm("Czy na pewno chcesz usunąć pracownika?")) {
            try {
                await api.delete(`/delete/${id}`);
                fetchEmployees();
            } catch (err) {
                console.error("Error deleting employee:", err);
                alert("Nie udało się usunąć pracownika: " + (err.response?.data?.message || err.message));
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
            <div className="flex flex-col items-center mb-6 space-y-4">
                <Link
                    to="/add"
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg shadow transition duration-300"
                >
                    ➕ Dodaj pracownika
                </Link>
                <input
                    type="text"
                    placeholder="Wyszukaj pracownika..."
                    className="border-2 border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-4 py-2 rounded-lg w-full max-w-md shadow transition duration-300 ease-in-out hover:shadow-md"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredEmployees.map((emp) => (
                    <div key={emp.id} className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center text-center hover:shadow-lg transition duration-300">
                        <img
                            src={emp.imageUrl || "https://via.placeholder.com/100"}
                            alt={emp.name}
                            className="w-24 h-24 rounded-full mb-2 object-cover border-4 border-blue-300"
                        />
                        <h2 className="text-lg font-semibold text-blue-800">{emp.name}</h2>
                        <p className="text-sm text-gray-500">{emp.jobTitle}</p>
                        <p className="text-sm">{emp.email}</p>
                        <p className="text-sm">Telefon: {emp.phone}</p>
                        <div className="flex space-x-2 mt-3">
                            <Link
                                to={`/edit/${emp.id}`}
                                className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded shadow"
                            >
                                ✎ Edytuj
                            </Link>
                            <button
                                onClick={() => deleteEmployee(emp.id)}
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow"
                            >
                                ✖ Usuń
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
