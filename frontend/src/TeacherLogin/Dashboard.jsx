import React, { useEffect, useState } from "react";
import axios from "axios";

function TeacherDashboard() {
  const [students, setStudents] = useState([]); // Stores students assigned to the teacher
  const teacherId = localStorage.getItem("TeacherId"); // Get teacher ID from localStorage

  // Fetch students on component mount
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data } = await axios.post("http://localhost:8080/dashboard/getAssignedStudents", {
           teacher_id: teacherId ,
        });
        setStudents(data.students || []);
      } catch (error) {
        console.error("Error fetching assigned students:", error);
      }
    };

    fetchStudents();
  }, [teacherId]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Teacher Dashboard</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Assigned Students</h2>
        {students.length > 0 ? (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">UID</th>
                <th className="border border-gray-300 px-4 py-2">Student Name</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.UID}>
                  <td className="border border-gray-300 px-4 py-2">
                    {student.UID}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {student.student_name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No students assigned yet.</p>
        )}
      </div>
    </div>
  );
}

export default TeacherDashboard;
