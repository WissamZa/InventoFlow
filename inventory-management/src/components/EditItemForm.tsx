import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { InventoryItem } from '../types';

const EditItemForm = () => {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchItem = async () => {
      setIsDone(true);

      try {
        const response = await axios.get<InventoryItem>(`http://localhost:5000/api/items/${id}`);
        if (isMounted) {
          setName(response.data.name);
          setQuantity(response.data.quantity.toString());
        }
      } catch (error) {
        console.error('Error fetching item:', error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    if (isDone == true) return;
    fetchItem();


    return () => {
      isMounted = false;
    };
  }, [id]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedItem: InventoryItem = { name, quantity: Number(quantity) };
      await axios.put(`http://localhost:5000/api/items/${id}`, updatedItem);
      navigate('/');
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Edit Item</h2>
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
          Update Item
        </button>
      </div>
    </form>
  );
};

export default EditItemForm;