import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router'
import ScrollToTop from './components/layout/ScrollToTop'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import BackToTop from './components/common/BackToTop'

import HomePage from './pages/public/HomePage'
import AboutPage from './pages/public/AboutPage'
import EventsPage from './pages/public/EventsPage'
import SpacesPage from './pages/public/SpacesPage'
import GalleryPage from './pages/public/GalleryPage'
import NewsPage from './pages/public/NewsPage'
import ContactPage from './pages/public/ContactPage'
import PracticalInfoPage from './pages/public/PracticalInfoPage'

const EventDetailPage = lazy(() => import('./pages/public/EventDetailPage'))
const NewsDetailPage = lazy(() => import('./pages/public/NewsDetailPage'))
const NotFoundPage = lazy(() => import('./pages/public/NotFoundPage'))

const AdminLayout = lazy(() => import('./components/admin/AdminLayout'))
const LoginPage = lazy(() => import('./pages/admin/LoginPage'))
const DashboardPage = lazy(() => import('./pages/admin/DashboardPage'))
const EventsManagePage = lazy(() => import('./pages/admin/EventsManagePage'))
const NewsManagePage = lazy(() => import('./pages/admin/NewsManagePage'))
const GalleryManagePage = lazy(() => import('./pages/admin/GalleryManagePage'))
const SpacesManagePage = lazy(() => import('./pages/admin/SpacesManagePage'))
const UsersManagePage = lazy(() => import('./pages/admin/UsersManagePage'))
const ContactsPage = lazy(() => import('./pages/admin/ContactsPage'))

function PageLoader() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <div className="spinner" />
    </div>
  );
}

function PublicLayout() {
  return (
    <>
      <a href="#main-content" className="skip-link">Aller au contenu principal</a>
      <Navbar />
      <main id="main-content">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="events/:slug" element={<EventDetailPage />} />
            <Route path="spaces" element={<SpacesPage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="news" element={<NewsPage />} />
            <Route path="news/:slug" element={<NewsDetailPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="practical-info" element={<PracticalInfoPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <>
      <ScrollToTop />
      <BackToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/*" element={<PublicLayout />} />
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="events" element={<EventsManagePage />} />
            <Route path="news" element={<NewsManagePage />} />
            <Route path="gallery" element={<GalleryManagePage />} />
            <Route path="spaces" element={<SpacesManagePage />} />
            <Route path="users" element={<UsersManagePage />} />
            <Route path="contacts" element={<ContactsPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}

export default App
