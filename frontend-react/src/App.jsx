import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { api } from './services/api';

// Modular Component Imports
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import StudentList from './components/StudentList';
import NewAdmission from './components/NewAdmission';
import CourseCatalog from './components/CourseCatalog';
import FeeBilling from './components/FeeBilling';
import Settings from './components/Settings';
import {
  StudentProfileModal,
  AddCourseModal,
  CollectFeeModal,
  InvoiceModal,
  AuthModal
} from './components/Modals';

export function MainLayout() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [fees, setFees] = useState([]);
  const [backendOnline, setBackendOnline] = useState(true);

  // Modal States
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [activeInvoice, setActiveInvoice] = useState(null);
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [isCollectFeeOpen, setIsCollectFeeOpen] = useState(false);
  const [feeStudentId, setFeeStudentId] = useState('');

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      const [cRes, sRes, fRes] = await Promise.allSettled([
        api.getCourses(),
        api.getStudents(),
        api.getFees()
      ]);

      if (cRes.status === 'fulfilled' && cRes.value?.success && Array.isArray(cRes.value.data) && cRes.value.data.length > 0) {
        setCourses(cRes.value.data);
      } else {
        setCourses([
          { _id: 'c1', name: 'Computer Science & Engineering', totalfees: 65000, duration: '4 Years', description: 'Comprehensive B.Tech curriculum covering Software, AI & Databases.' },
          { _id: 'c2', name: 'Full Stack Web Development', totalfees: 45000, duration: '6 Months', description: 'Intensive React, Node.js, Express & MongoDB training.' },
          { _id: 'c3', name: 'Data Science & Machine Learning', totalfees: 55000, duration: '1 Year', description: 'Python, Deep Learning, Statistics & Big Data analytics.' },
          { _id: 'c4', name: 'Cyber Security & Ethical Hacking', totalfees: 40000, duration: '6 Months', description: 'Network defense, threat analysis, and cryptography.' }
        ]);
      }

      if (sRes.status === 'fulfilled' && sRes.value?.success && Array.isArray(sRes.value.data) && sRes.value.data.length > 0) {
        setStudents(sRes.value.data);
      } else {
        setStudents([
          { _id: 's1', student_id: 'TIPSG100234', fullName: 'Aarav Sharma', email: 'aarav@example.com', contact: 9876543210, course: 'Full Stack Web Development', fees: 45000, scholarship: 10, finalAmount: 40500, city: 'Jaipur', category: 'General', gender: 'Male', courseStatus: 'Active' },
          { _id: 's2', student_id: 'TIPSG100567', fullName: 'Priya Patel', email: 'priya@example.com', contact: 9822334455, course: 'Data Science & Machine Learning', fees: 55000, scholarship: 20, finalAmount: 44000, city: 'Ahmedabad', category: 'OBC', gender: 'Female', courseStatus: 'Active' },
          { _id: 's3', student_id: 'TIPSG100890', fullName: 'Rohan Verma', email: 'rohan@example.com', contact: 9711223344, course: 'Computer Science & Engineering', fees: 65000, scholarship: 0, finalAmount: 65000, city: 'Delhi', category: 'General', gender: 'Male', courseStatus: 'Active' },
          { _id: 's4', student_id: 'TIPSG100912', fullName: 'Ananya Gupta', email: 'ananya@example.com', contact: 9655443322, course: 'Full Stack Web Development', fees: 45000, scholarship: 15, finalAmount: 38250, city: 'Bangalore', category: 'General', gender: 'Female', courseStatus: 'Active' }
        ]);
      }

      if (fRes.status === 'fulfilled' && fRes.value?.success && Array.isArray(fRes.value.data) && fRes.value.data.length > 0) {
        setFees(fRes.value.data);
      } else {
        setFees([
          { _id: 'f1', invoiceNumber: 'INV-2026-101', student_id: 'TIPSG100234', fullName: 'Aarav Sharma', amount: 20000, paymentMode: 'UPI', transactionId: 'UPI98471203', createdAt: '2026-04-11T10:00:00Z', description: '1st Semester Fee' },
          { _id: 'f2', invoiceNumber: 'INV-2026-102', student_id: 'TIPSG100567', fullName: 'Priya Patel', amount: 44000, paymentMode: 'Card', transactionId: 'CARD556102', createdAt: '2026-04-12T14:30:00Z', description: 'Full Program Fee' },
          { _id: 'f3', invoiceNumber: 'INV-2026-103', student_id: 'TIPSG100890', fullName: 'Rohan Verma', amount: 30000, paymentMode: 'Cash', transactionId: 'CASH-REC-01', createdAt: '2026-04-16T11:15:00Z', description: 'Admission Deposit' }
        ]);
      }
      setBackendOnline(true);
    } catch (e) {
      setBackendOnline(false);
    }
  };

  const totalRevenue = fees.reduce((sum, f) => sum + (Number(f.amount) || 0), 0);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      
      {/* 1. Top Floating Pill Navbar - Matches the reference image */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        backendOnline={backendOnline}
      />

      {/* 2. Main Container with Max Width & Padding */}
      <main className="flex-1 max-w-[1440px] mx-auto w-full px-4 sm:px-6 py-4 pb-12">
        
        {/* Dashboard View */}
        {activeTab === 'dashboard' && (
          <Dashboard
            students={students}
            courses={courses}
            fees={fees}
            totalRevenue={totalRevenue}
            onNavigate={setActiveTab}
            onOpenAddCourse={() => setIsAddCourseOpen(true)}
            onSelectStudent={setSelectedStudent}
          />
        )}

        {/* Student List View */}
        {activeTab === 'students' && (
          <StudentList
            students={students}
            courses={courses}
            onNavigate={setActiveTab}
            onSelectStudent={setSelectedStudent}
            onCollectFee={(id) => {
              setFeeStudentId(id);
              setIsCollectFeeOpen(true);
            }}
          />
        )}

        {/* New Admission Form View */}
        {activeTab === 'new-admission' && (
          <NewAdmission
            courses={courses}
            onCancel={() => setActiveTab('students')}
            onAdmissionSuccess={(newStu) => {
              setStudents(prev => [newStu, ...prev]);
              setActiveTab('students');
            }}
          />
        )}

        {/* Course Catalog View */}
        {activeTab === 'courses' && (
          <CourseCatalog
            courses={courses}
            onOpenAddCourse={() => setIsAddCourseOpen(true)}
            onEnrollCourse={(courseName) => {
              setActiveTab('new-admission');
            }}
          />
        )}

        {/* Fees Billing View */}
        {activeTab === 'fees' && (
          <FeeBilling
            fees={fees}
            onOpenCollectFee={() => setIsCollectFeeOpen(true)}
            onViewInvoice={setActiveInvoice}
          />
        )}

        {/* Settings View */}
        {activeTab === 'settings' && (
          <Settings />
        )}

      </main>

      {/* 3. Modals */}
      <StudentProfileModal
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
        onCollectFee={(id) => {
          setFeeStudentId(id);
          setIsCollectFeeOpen(true);
        }}
      />

      <AddCourseModal
        isOpen={isAddCourseOpen}
        onClose={() => setIsAddCourseOpen(false)}
        onCourseAdded={(newCourse) => setCourses(prev => [...prev, newCourse])}
      />

      <CollectFeeModal
        isOpen={isCollectFeeOpen}
        onClose={() => setIsCollectFeeOpen(false)}
        students={students}
        defaultStudentId={feeStudentId}
        onFeeCollected={(newFee) => {
          setFees(prev => [newFee, ...prev]);
          setActiveInvoice(newFee);
        }}
      />

      <InvoiceModal
        invoice={activeInvoice}
        onClose={() => setActiveInvoice(null)}
      />

      <AuthModal />

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}
