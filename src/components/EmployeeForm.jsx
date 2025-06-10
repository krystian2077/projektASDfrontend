import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api";

export default function EmployeeForm() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        jobTitle: "",
        phone: "",
        imageUrl: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            api.get(`/find/${id}`)
                .then((res) => setEmployee(res.data))
                .catch((err) => {
                    console.error(err);
                    setError("Failed to load employee data.");
                });
        }
    }, [id]);

    const handleChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            if (id) {
                await api.put("/update", { ...employee, id });
            } else {
                await api.post("/add", employee);
            }
            alert("Employee saved successfully.");
            navigate("/");
        } catch (err) {
            console.error("Save error:", err);
            alert("Error saving employee: " + (err.response?.data?.message || err.message));
            setError("Error saving employee.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 bg-white shadow rounded p-6">
            {Object.entries(employee).map(([key, value]) => (
                key !== "id" && (
                    <div key={key}>
                        <label className="block text-sm font-medium capitalize mb-1">{key}</label>
                        <input
                            name={key}
                            value={value}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                            required={key !== "imageUrl"}
                        />
                    </div>
                )
            ))}
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex justify-end space-x-2">
                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    disabled={loading}
                >
                    {loading ? "Saving..." : "Save"}
                </button>
                <button type="button" onClick={() => navigate("/")} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
            </div>
        </form>
    );
}
