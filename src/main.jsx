import { createRoot } from 'react-dom/client';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';
import './index.css';
import App from './App.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import {
  DashboardLayout,
  HeroMain,
  Login,
  Register,
  ProfilePage,
  DashboardHome,
  EditProfilePage,
  CheckEmailPage,
  VerifyPage,
  // ViewNotes,
  NoteViewer,
  AddCourse,
  AddSemester,
  AddSubject,
  SubjectList,
  ChangePasswordPage,
  ForgotPasswordPage,
  ResetPasswordPage,
} from './components';

import ProtectedRoute from './utils/ProtectedRoute.jsx';
import UploadNotes from './page/UploadNotes.jsx';
import AdminNotesManager from './components/Dashboard/AdminNoteManager.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>

      {/* Public Routes */}
      <Route index element={<HeroMain />} />
      <Route path="auth">
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="check-email" element={<CheckEmailPage />} />
        <Route path="verify" element={<VerifyPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />

      </Route>

      {/* Protected Routes */}
      <Route path="dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="profile/edit" element={<EditProfilePage />} />
        <Route path="view-notes" element={<SubjectList />} />
        <Route path="notes/:noteId" element={<NoteViewer />} />
        <Route path="settings/change-password" element={<ChangePasswordPage />} />

        {/* Admin-only Routes */}
        <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
          <Route path="upload-notes" element={<UploadNotes />} />
          <Route path="course-create" element={<AddCourse />} />
          <Route path="semester-create" element={<AddSemester />} />
          <Route path="subject-create" element={<AddSubject />} />
          <Route path="admin-notes" element={<AdminNotesManager />} />
        </Route>
      </Route>



    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
