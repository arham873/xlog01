import React from 'react';

interface Column {
  key: string;
  label: string;
}

interface TableProps {
  columns: Column[];
  data: any[];
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const Table: React.FC<TableProps> = ({ columns, data, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            {columns.map((column) => (
              <th key={column.key} className="py-3 px-6 text-left">
                {column.label}
              </th>
            ))}
            {(onEdit || onDelete) && <th className="py-3 px-6 text-center">Actions</th>}
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {data.map((row, index) => (
            <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
              {columns.map((column) => (
                <td key={column.key} className="py-3 px-6 text-left">
                  {row[column.key]}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td className="py-3 px-6 text-center">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(row.id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded mr-2"
                    >
                      Edit
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(row.id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                    >
                      Delete
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;