import { useState, useEffect } from 'react';
import axios from 'axios';
import { InventoryItem } from '../types';
import { Link } from 'react-router-dom';

const InventoryList = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await axios.get<InventoryItem[]>('http://localhost:5000/api/items');
    setItems(response.data);
  };

  return (
    <div className="p-4 w-[50%] place-self-center">
      <h2 className="text-xl font-semibold mb-4">Inventory List</h2>
      <Link
        to="/add"
        className="mb-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Add New Item
      </Link>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item._id}
            className="bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow flex justify-between items-center"
          >
            <div>
              <span className="font-medium">{item.name}</span> - {item.quantity}
            </div>
            <Link
              to={`/edit/${item._id}`}
              className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition-colors"
            >
              Edit
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryList;