import React from "react";

interface Table {
  table_name: string;
  description: string;
}

interface Column {
  table_name: string;
  column_name: string;
  description: string;
}

interface TableDetailProps {
  table: Table;
  columns: Column[];
  onTableDescriptionChange: (description: string) => void;
  onColumnDescriptionChange: (index: number, description: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

const TableDetail: React.FC<TableDetailProps> = ({
  table,
  columns,
  onTableDescriptionChange,
  onColumnDescriptionChange,
  onSave,
  onCancel,
}) => {
  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Edit Table Description of {table.table_name}</h3>
      <textarea
        value={table.description}
        onChange={(e) => onTableDescriptionChange(e.target.value)}
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
                    onChange={(e) => onColumnDescriptionChange(index, e.target.value)}
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
          onClick={onSave}
          className="px-4 py-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default TableDetail;
