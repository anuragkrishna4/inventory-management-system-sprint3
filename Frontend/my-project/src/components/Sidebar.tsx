import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-blue-900 text-white p-6">
      <h2 className="text-xl font-bold mb-4">Inventory Management System</h2>
      <ul>
        <li className="mb-3">
          <a href="#addInventorySection" className="hover:underline">Add Inventory</a>
        </li>
        <li className="mb-3">
          <a href="#inventoryActionsSection" className="hover:underline">Inventory Actions</a>
        </li>
        <li>
          <a href="#inventoryTableSection" className="hover:underline">Inventory Table</a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
