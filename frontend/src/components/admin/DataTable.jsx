// /src/components/admin/DataTable.jsx

import { useState } from 'react';

/**
 * DataTable reutilizable para el admin
 * 
 * @param {Array} data - Datos a mostrar
 * @param {Array} columns - Configuración de columnas
 * @param {Function} onEdit - Callback para editar
 * @param {Function} onDelete - Callback para eliminar
 * @param {Function} onDuplicate - Callback para duplicar (opcional)
 * @param {Function} onRowClick - Callback para click en fila (opcional)
 * @param {Boolean} isLoading - Estado de carga
 * @param {String} emptyMessage - Mensaje cuando no hay datos
 */
const DataTable = ({
  data = [],
  columns = [],
  onEdit,
  onDelete,
  onDuplicate,
  onRowClick,
  isLoading = false,
  emptyMessage = 'No hay datos para mostrar'
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Ordenar datos
  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue < bValue) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Cambiar ordenamiento
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  if (isLoading) {
    return (
      <div className="adm-table-loading">
        <i className="fa-solid fa-spinner fa-spin text-4xl text-gray-400"></i>
        <p className="text-gray-600 mt-4">Cargando datos...</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="adm-table-empty">
        <i className="fa-solid fa-inbox text-6xl text-gray-300"></i>
        <p className="text-gray-600 mt-4">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="adm-table-container">
      <table className="adm-table">
        <thead className="adm-table-header">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="adm-table-th"
                style={{ width: column.width }}
              >
                {column.sortable ? (
                  <button
                    onClick={() => handleSort(column.key)}
                    className="adm-table-sort-btn"
                  >
                    {column.label}
                    {sortConfig.key === column.key && (
                      <i
                        className={`fa-solid fa-chevron-${
                          sortConfig.direction === 'asc' ? 'up' : 'down'
                        } ml-2`}
                      ></i>
                    )}
                  </button>
                ) : (
                  column.label
                )}
              </th>
            ))}
            <th className="adm-table-th" style={{ width: '150px' }}>
              Acciones
            </th>
          </tr>
        </thead>

        <tbody className="adm-table-body">
          {sortedData.map((row, index) => (
            <tr 
              key={row.id || index} 
              className={`adm-table-row ${onRowClick ? 'adm-table-row-clickable' : ''}`}
              onClick={() => onRowClick && onRowClick(row)}
            >
              {columns.map((column) => (
                <td key={column.key} className="adm-table-td">
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
              
              <td className="adm-table-td">
                <div className="adm-table-actions">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(row)}
                      className="adm-action-btn adm-action-btn-edit"
                      title="Editar"
                    >
                      <i className="fa-solid fa-pen"></i>
                    </button>
                  )}
                  
                  {onDuplicate && (
                    <button
                      onClick={() => onDuplicate(row)}
                      className="adm-action-btn adm-action-btn-duplicate"
                      title="Duplicar"
                    >
                      <i className="fa-solid fa-copy"></i>
                    </button>
                  )}
                  
                  {onDelete && (
                    <button
                      onClick={() => onDelete(row)}
                      className="adm-action-btn adm-action-btn-delete"
                      title="Eliminar"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;