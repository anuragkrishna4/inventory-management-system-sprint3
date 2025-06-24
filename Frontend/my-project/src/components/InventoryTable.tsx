import React from 'react';

interface InventoryTableProps {
  inventoryData: InventoryItem[];
}

interface InventoryItem {
  sku: string;
  location: string;
  quantity: number;
  reserved: number;
  allocated: number;
}

const InventoryTable: React.FC<InventoryTableProps> = ({ inventoryData }) => {
  return (
    <table className="w-full border-collapse bg-white shadow-md rounded overflow-hidden">
      <thead className="bg-blue-900 text-white">
        <tr>
          <th className="p-3 text-left">SKU</th>
          <th className="p-3 text-left">Location</th>
          <th className="p-3 text-right">Quantity</th>
          <th className="p-3 text-right">Reserved Qty</th>
          <th className="p-3 text-right">Allocated Qty</th>
        </tr>
      </thead>
      <tbody>
        {inventoryData.length === 0 ? (
          <tr>
            <td colSpan={5} className="text-center p-4 text-gray-500">
              No inventory data available
            </td>
          </tr>
        ) : (
          inventoryData.map((item, idx) => (
            <tr
              key={idx}
              className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
            >
              <td className="p-3">{item.sku}</td>
              <td className="p-3">{item.location}</td>
              <td className="p-3 text-right">{item.quantity}</td>
              <td className="p-3 text-right">{item.reserved}</td>
              <td className="p-3 text-right">{item.allocated}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default InventoryTable;
