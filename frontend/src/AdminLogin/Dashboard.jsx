import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [teachers, setTeachers] = useState([]); // Stores teachers' details
  const [divisions, setDivisions] = useState([]); // Stores branch divisions
  const [selectedDivision, setSelectedDivision] = useState(""); // Selected division for assigning
  const [selectedTeacher, setSelectedTeacher] = useState(""); // Selected teacher for assigning

  const adminId = localStorage.getItem("AdminId"); // Get admin ID from localStorage

  // Fetch teachers and divisions on component mount
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const { data } = await axios.post("http://localhost:8080/dashboard/getTecherDetails", {
          admin_id: adminId,
        });
        setTeachers(data.teacher || []);
      } catch (error) {
        console.error("Error fetching teacher details:", error);
      }
    };

    const fetchDivisions = async () => {
      try {
        const { data } = await axios.post("http://localhost:8080/dashboard/getBranchDivisions", {
          admin_id: adminId 
        });
        setDivisions(data || []);
      } catch (error) {
        console.error("Error fetching branch divisions:", error);
      }
    };

    fetchTeachers();
    fetchDivisions();
  }, [adminId]);

  // Function to handle teacher assignment
  const assignTeacher = async () => {
    console.log("teachee", selectedDivision);
    if (!selectedTeacher || !selectedDivision) {
      alert("Please select both a teacher and a division!");
      return;
    }

    try {
      await axios.post("http://localhost:8080/dashboard/assignTeacherToDivision", {
        admin_id: adminId,
        teacher_id: selectedTeacher,
        division: selectedDivision,
      });
      alert("Teacher assigned successfully!");
    } catch (error) {
      console.error("Error assigning teacher:", error);
      alert("Failed to assign teacher. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Teachers Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Teachers</h2>
        <select
          className="border rounded p-2 w-full mb-4"
          value={selectedTeacher}
          onChange={(e) => setSelectedTeacher(e.target.value)}
        >
          <option value="">Select a Teacher</option>
          {teachers.map((teacher) => (
            <option key={teacher.teacher_id} value={teacher.teacher_id}>
              {teacher.teacher_name} - {teacher.teacher_branch}
            </option>
          ))}
        </select>
      </div>

      {/* Divisions Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Divisions</h2>
        <select
          className="border rounded p-2 w-full mb-4"
          value={selectedDivision}
          onChange={(e) => setSelectedDivision(e.target.value)}
        >
          <option value="">Select a Division</option>
          {divisions.map((division) => (
            <option key={division.division} value={division.division}>
              {division.year} - {division.division} ({division.branch})
            </option>
          ))}
        </select>
      </div>

      {/* Assign Button */}
      <button
        onClick={assignTeacher}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Assign Teacher to Division
      </button>
    </div>
  );
}

export default AdminDashboard;
