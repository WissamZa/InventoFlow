import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import InventoryList from './components/InventoryList';
import AddItemForm from './components/AddItemForm';
import EditItemForm from './components/EditItemForm';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<InventoryList />} />
            <Route path="/add" element={<AddItemForm />} />
            <Route path="/edit/:id" element={<EditItemForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;