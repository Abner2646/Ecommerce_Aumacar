// /src/pages/admin/ColoresManage.jsx

import { useState } from 'react';
import { 
  useColores, 
  useCreateColor, 
  useUpdateColor, 
  useDeleteColor 
} from '../../hooks/useColores';
import ConfirmDialog from '../../components/common/ConfirmDialog';

const ColoresManage = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingColor, setEditingColor] = useState(null);
  const [colorToDelete, setColorToDelete] = useState(null);
  const [formData, setFormData] = useState({ nombre: '', codigoHex: '#000000' });

  const { data, isLoading } = useColores();
  const createColor = useCreateColor();
  const updateColor = useUpdateColor();
  const deleteColor = useDeleteColor();

  const colores = data?.colores || [];

  const resetForm = () => {
    setFormData({ nombre: '', codigoHex: '#000000' });
    setEditingColor(null);
    setShowForm(false);
  };

  const handleEdit = (color) => {
    setEditingColor(color);
    setFormData({ nombre: color.nombre, codigoHex: color.codigoHex });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.nombre.trim() || !formData.codigoHex) {
      return;
    }

    try {
      if (editingColor) {
        await updateColor.mutateAsync({ 
          id: editingColor.id, 
          data: formData 
        });
      } else {
        await createColor.mutateAsync(formData);
      }
      resetForm();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async () => {
    if (!colorToDelete) return;
    try {
      await deleteColor.mutateAsync(colorToDelete.id);
      setColorToDelete(null);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const isSubmitting = createColor.isPending || updateColor.isPending;

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Colores</h1>
          <p className="text-gray-600 mt-1">
            Colores globales disponibles para vehículos ({colores.length})
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 flex items-center gap-2"
        >
          <i className="fa-solid fa-plus"></i>
          Nuevo Color
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold">
                {editingColor ? 'Editar Color' : 'Nuevo Color'}
              </h2>
              <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre del color
                </label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  placeholder="Ej: Blanco Perlado"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Código de color
                </label>
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={formData.codigoHex}
                    onChange={(e) => setFormData({ ...formData, codigoHex: e.target.value })}
                    className="w-16 h-10 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={formData.codigoHex}
                    onChange={(e) => setFormData({ ...formData, codigoHex: e.target.value })}
                    placeholder="#FFFFFF"
                    pattern="^#[0-9A-Fa-f]{6}$"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent font-mono"
                    required
                  />
                </div>
              </div>

              {/* Preview */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Vista previa:</p>
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-lg border border-gray-300 shadow-inner"
                    style={{ backgroundColor: formData.codigoHex }}
                  />
                  <div>
                    <p className="font-medium">{formData.nombre || 'Nombre del color'}</p>
                    <p className="text-sm text-gray-500 font-mono">{formData.codigoHex}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  ) : editingColor ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Colors Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-24">
          <i className="fa-solid fa-spinner fa-spin text-3xl text-gray-400"></i>
        </div>
      ) : colores.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-lg">
          <i className="fa-solid fa-palette text-5xl text-gray-300 mb-4"></i>
          <p className="text-gray-500">No hay colores creados</p>
          <button
            onClick={() => setShowForm(true)}
            className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg"
          >
            Crear primer color
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {colores.map(color => (
            <div 
              key={color.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden group"
            >
              {/* Color Swatch */}
              <div 
                className="w-full aspect-square"
                style={{ backgroundColor: color.codigoHex }}
              />
              
              {/* Info */}
              <div className="p-3">
                <p className="font-medium text-gray-900 truncate">{color.nombre}</p>
                <p className="text-xs text-gray-500 font-mono">{color.codigoHex}</p>
                
                {/* Actions */}
                <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(color)}
                    className="flex-1 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                  >
                    <i className="fa-solid fa-pen mr-1"></i>
                    Editar
                  </button>
                  <button
                    onClick={() => setColorToDelete(color)}
                    className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>

              {/* Status badge */}
              {!color.activo && (
                <div className="absolute top-2 right-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded">
                  Inactivo
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Confirm Delete */}
      <ConfirmDialog
        isOpen={!!colorToDelete}
        onClose={() => setColorToDelete(null)}
        onConfirm={handleDelete}
        title="¿Eliminar color?"
        message={`Esto eliminará el color "${colorToDelete?.nombre}". Si está asignado a vehículos, no se podrá eliminar.`}
        confirmText="Eliminar"
        type="danger"
      />
    </div>
  );
};

export default ColoresManage;