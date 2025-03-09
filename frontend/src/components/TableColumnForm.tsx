import React, { useState, useEffect } from "react";
import api from "../api";
import TableList from "./TableList";
import TableDetail from "./TableDetail";

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

  const handleTableDescriptionChange = (description: string) => {
    if (selectedTable) {
      setSelectedTable({ ...selectedTable, description });
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
        setSelectedTable(null);
        setSearchQuery("");
        fetchTables();
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

      {!selectedTable ? (
        <TableList
          tables={filteredTables}
          loading={loading}
          error={error}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onTableClick={handleTableClick}
        />
      ) : (
        <TableDetail
          table={selectedTable}
          columns={columns}
          onTableDescriptionChange={handleTableDescriptionChange}
          onColumnDescriptionChange={handleColumnDescriptionChange}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default TableColumnForm;
