import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";

export default function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-100">
                <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between">
                    <span className="text-xl font-semibold">Employee Manager</span>
                    <Link to="/add" className="text-sm bg-blue-500 px-3 py-1 rounded hover:bg-blue-600">Add Employee</Link>
                </nav>
                <main className="container mx-auto px-4 py-6">
                    <Routes>
                        <Route path="/" element={<EmployeeList />} />
                        <Route path="/add" element={<EmployeeForm />} />
                        <Route path="/edit/:id" element={<EmployeeForm />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}
