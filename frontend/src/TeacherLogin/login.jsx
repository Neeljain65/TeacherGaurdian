import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 

  const verifyOTP = async () => {
  if( !email || !password){
    toast.error('All fields are required');
    return;
    }

    try {
      const response = await fetch('http://localhost:8080/TeacherLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      // console.log(response.json().then((data) => console.log(data.userId)));
      const userId = await response.json().then((data) => data.userId);
      localStorage.setItem('TeacherId', userId);
      if (!response.ok) {
        throw new Error('Invalid Password!');
      }

      toast.success('Login successful!');
      window.location.href = '/TeacherDashboard';
      // Perform further actions, such as redirecting or logging in the user
    } catch (error) {
      toast.error(error.message || 'Something went wrong!');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">Login</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
        
        {
          <div className="mt-6">
            
            <button
              onClick={verifyOTP}
              
             
            >
             Login
            </button>
          </div>
        }
       
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
