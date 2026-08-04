import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/layout/ScrollToTop'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

import HomePage from './pages/public/HomePage'
import AboutPage from './pages/public/AboutPage'
import EventsPage from './pages/public/EventsPage'
import EventDetailPage from './pages/public/EventDetailPage'
import SpacesPage from './pages/public/SpacesPage'
import GalleryPage from './pages/public/GalleryPage'
import NewsPage from './pages/public/NewsPage'
import NewsDetailPage from './pages/public/NewsDetailPage'
import ContactPage from './pages/public/ContactPage'
import PracticalInfoPage from './pages/public/PracticalInfoPage'
import NotFoundPage from './pages/public/NotFoundPage'

import AdminLayout from './components/admin/AdminLayout'
import LoginPage from './pages/admin/LoginPage'
import DashboardPage from './pages/admin/DashboardPage'
import EventsManagePage from './pages/admin/EventsManagePage'
import NewsManagePage from './pages/admin/NewsManagePage'
import GalleryManagePage from './pages/admin/GalleryManagePage'
import SpacesManagePage from './pages/admin/SpacesManagePage'
import UsersManagePage from './pages/admin/UsersManagePage'
import ContactsPage from './pages/admin/ContactsPage'

function PublicLayout() {
  return (
    <>
      <Navbar />
      <main>
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
      </main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <>
      <ScrollToTop />
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
    </>
  )
}

export default App
