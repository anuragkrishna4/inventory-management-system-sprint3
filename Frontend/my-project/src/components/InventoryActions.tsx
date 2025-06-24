import React, { useState, useEffect } from 'react';

interface InventoryActionsProps {
  onSuccess: () => void; // 💡 call this after successful action
}

const InventoryActions: React.FC<InventoryActionsProps> = ({ onSuccess }) => {
  const [action, setAction] = useState('adjust');
  const [sku, setSku] = useState('');
  const [quantity, setQuantity] = useState('');
  const [orderId, setOrderId] = useState('');
  const [showOrderId, setShowOrderId] = useState(true);
  const [loading, setLoading] = useState(false);

  const baseUrl = 'http://localhost:8080';

  useEffect(() => {
    setShowOrderId(action === 'allocate' || action === 'reserve');
    if (!(action === 'allocate' || action === 'reserve')) {
      setOrderId('');
    }
  }, [action]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedSku = sku.trim();
    if (!trimmedSku) return alert('SKU is required.');

    const qty = quantity.trim() === '' ? null : Number(quantity);
    if (action !== 'cancel' && (qty === null || isNaN(qty) || qty <= 0)) {
      return alert('Quantity must be a positive number.');
    }
    if (action === 'cancel' && qty !== null && (isNaN(qty) || qty < 0)) {
      return alert('Quantity cannot be negative.');
    }

    let parsedOrderId: number | null = null;
    if (showOrderId) {
      parsedOrderId = Number(orderId);
      if (isNaN(parsedOrderId) || parsedOrderId <= 0) {
        return alert('Valid Order ID is required.');
      }
    }

    const payload = {
      action,
      sku: trimmedSku,
      quantity: qty,
      orderId: parsedOrderId,
    };

    try {
      setLoading(true);

      const response = await fetch(`${baseUrl}/api/inventory/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Request failed');
      }

      const message = await response.text();
      alert(message || 'Operation completed successfully');

     
      if (typeof onSuccess === 'function') {
        onSuccess();
      }
    } catch (err) {
      alert(`Failed to perform ${action}. ${(err as Error).message}`);
    } finally {
      setLoading(false);
      setSku('');
      setQuantity('');
      setOrderId('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-row items-end gap-3 max-w-full mx-auto flex-wrap">
      {/* Form Fields - unchanged */}
      <div className="flex flex-col">
        <label htmlFor="action">Action</label>
        <select
          id="action"
          value={action}
          onChange={e => setAction(e.target.value)}
          className="border border-gray-300 rounded p-1 min-w-[150px] text-sm"
        >
          <option value="adjust">Adjust Inventory</option>
          <option value="cancel">Cancel Inventory</option>
          <option value="reserve">Reserve Inventory For Order</option>
          <option value="allocate">Allocate Inventory For Order</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="sku_name">SKU</label>
        <input
          type="text"
          id="sku_name"
          value={sku}
          placeholder="SKU"
          onChange={e => setSku(e.target.value)}
          className="border border-gray-300 rounded p-1 min-w-[100px] text-sm"
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="quantity">Quantity</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          placeholder="Quantity"
          onChange={e => setQuantity(e.target.value)}
          className="border border-gray-300 rounded p-1 min-w-[80px] text-sm"
          min={0}
          required={action !== 'cancel'}
        />
      </div>

      {showOrderId && (
        <div className="flex flex-col">
          <label htmlFor="order">Order ID</label>
          <input
            type="number"
            id="order"
            value={orderId}
            placeholder="Order ID"
            onChange={e => setOrderId(e.target.value)}
            className="border border-gray-300 rounded p-1 min-w-[80px] text-sm"
            min={1}
            required
          />
        </div>
      )}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition whitespace-nowrap text-sm"
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Submit'}
      </button>
    </form>
  );
};

export default InventoryActions;
