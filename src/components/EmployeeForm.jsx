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
                    setError("Nie udało się załadować danych pracownika.");
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
            alert("Dane pracownika zapisane pomyślnie.");
            navigate("/");
        } catch (err) {
            console.error("Błąd zapisu:", err);
            alert("Wystąpił błąd: " + (err.response?.data?.message || err.message));
            setError("Błąd podczas zapisu.");
        } finally {
            setLoading(false);
        }
    };

    const labelMap = {
        name: "Imię i nazwisko",
        email: "Adres e-mail",
        jobTitle: "Stanowisko",
        phone: "Telefon",
        imageUrl: "Adres URL zdjęcia",
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6 bg-white shadow-lg rounded-xl p-8 mt-8">
            {Object.entries(employee).map(([key, value]) => (
                key !== "id" && (
                    <div key={key}>
                        <label className="block text-sm font-medium mb-1 text-gray-700">{labelMap[key]}</label>
                        <input
                            name={key}
                            value={value}
                            onChange={handleChange}
                            className="w-full border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 px-4 py-2 rounded transition duration-300 ease-in-out hover:shadow-md"
                            required={key !== "imageUrl"}
                        />
                    </div>
                )
            ))}
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex justify-end space-x-2">
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow"
                    disabled={loading}
                >
                    {loading ? "Zapisywanie..." : "Zapisz"}
                </button>
                <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded shadow"
                >
                    Anuluj
                </button>
            </div>
        </form>
    );
}
