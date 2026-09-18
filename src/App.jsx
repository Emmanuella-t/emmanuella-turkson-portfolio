import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Layout from '@/components/Layout';
import PageNotFound from '@/components/PageNotFound';

import Home from '@/sections/pages/Home';
import Work from '@/sections/pages/Work';
import Experience from '@/sections/pages/Experience';
import About from '@/sections/pages/About';
import Contact from '@/sections/pages/Contact';

import ZoomRedesign from '@/pages/ZoomRedesign';
import MEDEdge from '@/pages/MEDEdge';
import RiseBySynchrony from '@/pages/RiseBySynchrony';
import CareerMatch from '@/pages/CareerMatch';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/home" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/zoomredesign" element={<ZoomRedesign />} />
          <Route path="/mededge" element={<MEDEdge />} />
          <Route path="/case-studies/rise-by-synchrony" element={<RiseBySynchrony />} />
          <Route path="/swap" element={<Navigate to="/case-studies/rise-by-synchrony" replace />} />
          <Route path="/careermatch" element={<CareerMatch />} />
          <Route path="/mindmate" element={<CareerMatch />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
