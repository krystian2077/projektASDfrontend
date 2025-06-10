import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";

export default function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
                <nav className="bg-blue-600 text-white px-6 py-4 flex justify-center">
                    <span className="text-xl font-semibold">Employee Manager</span>
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
