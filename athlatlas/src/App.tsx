import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute';
import { DashboardLayout } from '@/features/dashboard/layouts/DashboardLayout';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { RegisterForm } from '@/features/auth/components/RegisterForm';
import { EventsListPage } from '@/features/events/pages/EventsListPage';
import { CreateEventPage } from '@/features/events/pages/CreateEventPage';
import { EventDetailPage } from '@/features/events/pages/EventDetailPage';
import { UpdateEventPage } from '@/features/events/pages/UpdateEventPage';
import { UpdateParticipantPage } from '@/features/events/pages/UpdateParticipantPage';
import { ParticipantSearchPage } from '@/features/events/pages/ParticipantSearchPage';
import { RegisterParticipantPage } from '@/features/events/pages/RegisterParticipantPage';
import {MyEventsPage}from '@/features/events/pages/MyEventsPage'
import {DashboardHome}from '@/features/dashboard/pages/DashboardHome'
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
          <Route index element={<Navigate to="statistiques" replace />} />
          <Route path="statistiques" element={<DashboardHome />} />
          <Route path="my-events" element={<MyEventsPage/>} />
          <Route path="events" element={<EventsListPage />} />
          <Route path="events/create" element={<CreateEventPage />} />
          <Route path="events/:id" element={<EventDetailPage />} />
          <Route path="events/edit/:id" element={<UpdateEventPage />} />
          <Route path="events/:eventId/participants/edit/:participantId" element={<UpdateParticipantPage />} />
          <Route path="events/:eventId/participants/search" element={<ParticipantSearchPage />} />
          <Route path="events/:eventId/participants/new" element={<RegisterParticipantPage />} />
        </Route>

        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
