import { useState } from 'react';
import axios from 'axios';
import { InventoryItem } from '../types';
import { useNavigate } from 'react-router-dom';

const AddItemForm = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: InventoryItem = { name, quantity: Number(quantity) };
    await axios.post('http://localhost:5000/api/items', newItem);
    navigate('/'); // Redirect to the main page after adding
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Add Item
        </button>
      </div>
    </form>
  );
};

export default AddItemForm;