import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import InventoryForm from './components/InventoryForm';
import InventoryActions from './components/InventoryActions';
import InventoryTable from './components/InventoryTable';
import './index.css';

const App = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const baseUrl = 'http://localhost:8080';

  const fetchInventoryData = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/inventory/all?ts=${Date.now()}`, { cache: "no-store" });
      if (!response.ok) throw new Error('Failed to fetch inventory');
      const data = await response.json();
      setInventoryData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchInventoryData();
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-10 bg-gray-100">
        <section id="addInventorySection" className="mb-10">
          <h1 className="text-3xl font-bold text-center mb-6">Inventory Dashboard</h1>
          <h1 className="text-xl font-bold ">Add Inventory</h1>
          <InventoryForm onSuccess={fetchInventoryData} />
        </section>
        <section id="inventoryActionsSection" className="mb-10">
            <h1 className="text-xl font-bold ">Inventory Actions</h1>
          <InventoryActions onSuccess={fetchInventoryData} />
        </section>
        <section id="inventoryTableSection">
          <h1 className="text-xl font-bold mb-4">Inventory Table</h1>
          <InventoryTable inventoryData={inventoryData} />
        </section>
      </main>
    </div>
  );
};

export default App;