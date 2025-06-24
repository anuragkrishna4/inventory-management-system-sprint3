import React, { useState } from 'react';

interface InventoryFormProps {
  onSuccess: () => void; 
}

const InventoryForm: React.FC<InventoryFormProps> = ({ onSuccess }) => {
  const [sku, setSku] = useState('');
  const [productId, setProductId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [location, setLocation] = useState('');
  const [quantity, setQuantity] = useState('');
  const [loading, setLoading] = useState(false);

  const contextPath = window.location.pathname.split('/')[1];
  const baseUrl = 'http://localhost:8080';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!sku.trim() || !location.trim() || isNaN(Number(quantity)) || Number(quantity) < 0) {
      alert('Please fill all fields correctly.');
      return;
    }

    const payload = {
      sku: sku.trim(),
      productId: Number(productId),
      categoryId: Number(categoryId),
      location: location.trim(),
      quantity: Number(quantity),
      orderId: null,
      cancelled: false,       
      allocated: 0,           
      reserved: 0             
    };

    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/api/inventory/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to add inventory.');

      alert('Inventory added successfully!');

      if (typeof onSuccess === 'function') {
        setTimeout(() => onSuccess(), 1000);
      }
    } catch (err) {
      alert((err as Error).message || 'Failed to add inventory.');
    } finally {
      setLoading(false);
      setSku('');
      setProductId('');
      setCategoryId('');
      setLocation('');
      setQuantity('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-row items-end gap-3 max-w-full mx-auto flex-wrap">
      <div className="flex flex-col">
        <label htmlFor="sku_add">SKU</label>
        <input
          id="sku_add"
          type="text"
          value={sku}
          placeholder="SKU"
          onChange={e => setSku(e.target.value)}
          className="border border-gray-300 rounded p-1 min-w-[80px] text-sm"
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="product">Product ID</label>
        <input
          id="product"
          type="number"
          value={productId}
          placeholder="Product ID"
          onChange={e => setProductId(e.target.value)}
          className="border border-gray-300 rounded p-1 min-w-[80px] text-sm"
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="category">Category ID</label>
        <input
          id="category"
          type="number"
          value={categoryId}
          placeholder="Category ID"
          onChange={e => setCategoryId(e.target.value)}
          className="border border-gray-300 rounded p-1 min-w-[80px] text-sm"
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="location">Location</label>
        <input
          id="location"
          type="text"
          value={location}
          placeholder="Location"
          onChange={e => setLocation(e.target.value)}
          className="border border-gray-300 rounded p-1 min-w-[80px] text-sm"
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="quantity_add">Quantity</label>
        <input
          id="quantity_add"
          type="number"
          value={quantity}
          placeholder="Quantity"
          onChange={e => setQuantity(e.target.value)}
          className="border border-gray-300 rounded p-1 min-w-[60px] text-sm"
          min={0}
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition whitespace-nowrap text-sm"
        disabled={loading}
      >
        {loading ? 'Adding...' : 'Add Inventory'}
      </button>
    </form>
  );
};

export default InventoryForm;
