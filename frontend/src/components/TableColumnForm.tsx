import React, { useState } from "react";
import api from "../api";

const TableColumnForm: React.FC = () => {
  const [tables, setTables] = useState<
    { table_name: string; description: string }[]
  >([]);
  const [columns, setColumns] = useState<
    { table_name: string; column_name: string; description: string }[]
  >([]);
  const [selectedTable, setSelectedTable] = useState<string>("");
  const [tableDescription, setTableDescription] = useState<string>("");
  const [columnDescription, setColumnDescription] = useState<string>("");

  const handleGetTables = async () => {
    try {
      const response = await api.get("/tables");
      setTables(response.data);
    } catch (error) {
      console.error("Error fetching tables:", error);
    }
  };

  const handleGetColumns = async (tableName: string) => {
    try {
      const response = await api.get(`/columns/${tableName}`);
      setColumns(response.data);
    } catch (error) {
      console.error("Error fetching columns:", error);
    }
  };

  const handleUpdateTableDescription = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await api.post("/tables", {
        table_name: selectedTable,
        description: tableDescription,
      });
      console.log("Table description updated:", response.data);
    } catch (error) {
      console.error("Error updating table description:", error);
    }
  };

  const [selectedColumn, setSelectedColumn] = useState<string>("");

  const handleUpdateColumnDescription = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await api.post("/columns", {
        table_name: selectedTable,
        column_name: selectedColumn,
        description: columnDescription,
      });
      console.log("Column description updated:", response.data);
    } catch (error) {
      console.error("Error updating column description:", error);
    }
  };

  return (
    <div>
      <button onClick={handleGetTables}>Get Tables</button>
      <ul>
        {tables.map((table, index) => (
          <li key={index} onClick={() => {
            setSelectedTable(table.table_name);
            handleGetColumns(table.table_name);
          }}>
            {table.table_name}: {table.description}
          </li>
        ))}
      </ul>
      
      <form onSubmit={handleUpdateTableDescription}>
        <div>
          <label htmlFor="tableDescription">Table Description for {selectedTable}:</label>
          <input
            type="text"
            id="tableDescription"
            value={tableDescription}
            onChange={(e) => setTableDescription(e.target.value)}
            disabled={!selectedTable}
          />
        </div>
        <button type="submit" disabled={!selectedTable}>Update Table Description</button>
      </form>
      
      <form onSubmit={handleUpdateColumnDescription}>
        <div>
          <label htmlFor="columnName">Column Name:</label>
          <select
            id="columnName"
            value={selectedColumn}
            onChange={(e) => setSelectedColumn(e.target.value)}
            disabled={!selectedTable}
          >
            <option value="">Select a column</option>
            {columns.map((column, index) => (
              <option key={index} value={column.column_name}>
                {column.column_name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="columnDescription">Column Description:</label>
          <input
            type="text"
            id="columnDescription"
            value={columnDescription}
            onChange={(e) => setColumnDescription(e.target.value)}
            disabled={!selectedColumn}
          />
        </div>
        <button type="submit" disabled={!selectedColumn}>Update Column Description</button>
      </form>
      
      <h3>Columns</h3>
      <ul>
        {columns.map((column, index) => (
          <li 
            key={index}
            onClick={() => {
              setSelectedColumn(column.column_name);
              setColumnDescription(column.description || "");
            }}
            style={{cursor: 'pointer', fontWeight: selectedColumn === column.column_name ? 'bold' : 'normal'}}
          >
            {column.column_name}: {column.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableColumnForm;
