import React, { useState, useEffect } from "react";
import api from "../api";

// Remove inline styles and use Tailwind classes instead
interface Table {
  table_name: string;
  description: string;
}

interface Column {
  table_name: string;
  column_name: string;
  description: string;
}

const TableColumnForm: React.FC = () => {
  const [tables, setTables] = useState<Table[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);

  const fetchTables = async () => {
    try {
      setLoading(true);
      const response = await api.get('/tables');
      setTables(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tables data');
      console.error('Error fetching tables:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchColumns = async (tableName: string) => {
    try {
      setLoading(true);
      const response = await api.get(`/columns/${tableName}`);
      setColumns(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch columns data');
      console.error('Error fetching columns:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTableClick = (table: Table) => {
    setSelectedTable(table);
    fetchColumns(table.table_name);
  };

  const handleTableDescriptionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (selectedTable) {
      setSelectedTable({ ...selectedTable, description: e.target.value });
    }
  };

  const handleColumnDescriptionChange = (index: number, description: string) => {
    const updatedColumns = [...columns];
    updatedColumns[index].description = description;
    setColumns(updatedColumns);
  };

  const handleSave = async () => {
    if (selectedTable) {
      try {
        await api.post('/tables', selectedTable);
        for (const column of columns) {
          await api.post('/columns', column);
        }
        setSelectedTable(null); // Reset to initial view
        fetchTables(); // Refresh tables
      } catch (err) {
        console.error('Error updating descriptions:', err);
        alert('Failed to update descriptions');
      }
    }
  };

  const handleCancel = () => {
    setSelectedTable(null);
  };

  const filteredTables = tables.filter(table =>
    table.table_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    table.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-gray-50 dark:bg-gray-800">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Tables</h2>
      
      {/* Flowbite search input */}
      <div className="mb-4">
        <label htmlFor="table-search" className="sr-only">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input 
            type="text" 
            id="table-search" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="Search tables..." 
          />
        </div>
      </div>
      
      {loading && <p className="text-gray-600 dark:text-gray-400">Loading tables...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && !selectedTable && (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Table Name</th>
                <th scope="col" className="px-6 py-3">Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredTables.map((table, index) => (
                <tr 
                  key={index}
                  onClick={() => handleTableClick(table)}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                >
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {table.table_name}
                  </th>
                  <td className="px-6 py-4">{table.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedTable && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Edit Table Description of {selectedTable.table_name}</h3>
          <textarea
            value={selectedTable.description}
            onChange={handleTableDescriptionChange}
            className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            rows={3}
          ></textarea>
          <h3 className="text-xl font-semibold mb-3 mt-4 text-gray-900 dark:text-white">Columns</h3>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Column Name</th>
                  <th scope="col" className="px-6 py-3">Description</th>
                </tr>
              </thead>
              <tbody>
                {columns.map((column, index) => (
                  <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {column.column_name}
                    </th>
                    <td className="px-6 py-4">
                      <textarea
                        value={column.description}
                        onChange={(e) => handleColumnDescriptionChange(index, e.target.value)}
                        className="w-full p-1 text-sm text-gray-900 border border-gray-300 rounded bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        rows={2}
                      ></textarea>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex gap-2">
            <button 
              onClick={handleSave}
              className="px-4 py-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Save
            </button>
            <button 
              onClick={handleCancel}
              className="py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableColumnForm;
