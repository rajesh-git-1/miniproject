// frontend/src/api/student.js
const BASE_URL = 'http://localhost:5000/api/student';

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});

export const fetchStudentStats = async () => {
  const res = await fetch(`${BASE_URL}/dashboard/stats`, { headers: getHeaders() });
  return res.json();
};

export const fetchStudentActivity = async () => {
  const res = await fetch(`${BASE_URL}/dashboard/activity`, { headers: getHeaders() });
  return res.json();
};