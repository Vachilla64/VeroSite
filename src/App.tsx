import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Pricing from './pages/Pricing';
import Dashboard from './pages/Dashboard';
import DocsLayout from './pages/docs/DocsLayout';
import Quickstart from './pages/docs/Quickstart';
import Authentication from './pages/docs/Authentication';
import LookupAPI from './pages/docs/LookupAPI';
import Webhooks from './pages/docs/Webhooks';
import Errors from './pages/docs/Errors';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-canvas text-ink font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/developer" element={<Dashboard />} />
            <Route path="/docs" element={<DocsLayout />}>
              <Route index element={<Quickstart />} />
              <Route path="authentication" element={<Authentication />} />
              <Route path="lookup" element={<LookupAPI />} />
              <Route path="webhooks" element={<Webhooks />} />
              <Route path="errors" element={<Errors />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
