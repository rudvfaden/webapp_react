import React from "react";

interface Table {
  table_name: string;
  description: string;
}

interface TableListProps {
  tables: Table[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onTableClick: (table: Table) => void;
}

const TableList: React.FC<TableListProps> = ({
  tables,
  loading,
  error,
  searchQuery,
  onSearchChange,
  onTableClick,
}) => {
  return (
    <>
      <div className="mb-4">
        <label htmlFor="table-search" className="sr-only">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="block w-full p-2 pl-10 pr-12 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search tables..."
          />
          {searchQuery && (
            <button
              className="absolute top-1/2 right-2 -translate-y-1/2 flex items-center justify-center w-6 h-6 text-white bg-gray-500 hover:bg-gray-600 dark:bg-gray-500 dark:hover:bg-gray-400 rounded-full shadow-sm z-20 transition-colors duration-200"
              onClick={() => onSearchChange("")}
              type="button"
              title="Clear search"
              aria-label="Clear search"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          )}
        </div>
      </div>

      {loading && <p className="text-gray-600 dark:text-gray-400">Loading tables...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Table Name</th>
                <th scope="col" className="px-6 py-3">Description</th>
              </tr>
            </thead>
            <tbody>
              {tables.map((table, index) => (
                <tr
                  key={index}
                  onClick={() => onTableClick(table)}
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
    </>
  );
};

export default TableList;
