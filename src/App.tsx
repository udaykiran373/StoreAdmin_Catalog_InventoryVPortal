import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import InventoryOverview from './pages/InventoryOverview';
import ProductDetails from './pages/ProductDetails';
import CatalogueOverview from './pages/CatalogueOverview';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/inventory" element={<InventoryOverview />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/catalogue" element={<CatalogueOverview />} />
            <Route path="/catalogue/:category" element={<InventoryOverview />} />
          </Routes>
        </Layout>
      </Router>
    </ErrorBoundary>
  );
}

export default App;

