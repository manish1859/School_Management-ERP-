const API_BASE = 'http://localhost:4600/api';

export const api = {
  // Auth
  login: (credentials) => fetch(`${API_BASE}/adminlogin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  }).then(r => r.json()),

  register: (userData) => fetch(`${API_BASE}/adminregister`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  }).then(r => r.json()),

  logout: (token) => fetch(`${API_BASE}/adminlogout`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  }).then(r => r.json()),

  // Courses
  getCourses: () => fetch(`${API_BASE}/courseinfo`).then(r => r.json()),
  addCourse: (course) => fetch(`${API_BASE}/course_data`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(course)
  }).then(r => r.json()),

  // Students
  getStudents: () => fetch(`${API_BASE}/student_data`).then(r => r.json()),
  getStudentById: (id) => fetch(`${API_BASE}/studentsingle/${id}`).then(r => r.json()),
  registerStudent: (formData) => fetch(`${API_BASE}/student_identify`, {
    method: 'POST',
    body: formData
  }).then(r => r.json()),

  // Fees
  getFees: () => fetch(`${API_BASE}/studentdata`).then(r => r.json()),
  createFee: (feeData) => fetch(`${API_BASE}/fees`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(feeData)
  }).then(r => r.json())
};
