import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Work from './pages/Work';
import About from './pages/About';
import Contact from './pages/Contact';
import CaseStudy from './pages/CaseStudy';
import Lithos from './pages/Lithos';
import './styles/globals.css';
import './styles/section-theme.css'; // after globals.css - reads its variables

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppLayout() {
  const { pathname } = useLocation();
  const isLithos = pathname === '/lithos';

  return (
    <>
      {!isLithos && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/about" element={<About />} />
        <Route path="/work/:slug" element={<CaseStudy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/lithos" element={<Lithos />} />
      </Routes>
      {!isLithos && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppLayout />
    </BrowserRouter>
  );
}