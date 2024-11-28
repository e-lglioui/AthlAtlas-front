import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute';
import { DashboardLayout } from '@/features/dashboard/layouts/DashboardLayout';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { RegisterForm } from '@/features/auth/components/RegisterForm';
import { EventsListPage } from '@/features/events/pages/EventsListPage';
import { CreateEventPage } from '@/features/events/pages/CreateEventPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm/>} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <DashboardLayout />
           </PrivateRoute> 
        }>
          <Route index element={<Navigate to="events" replace />} />
          <Route path="events" element={<EventsListPage />} />
          <Route path="events/create" element={<CreateEventPage />} />
        </Route>

        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
