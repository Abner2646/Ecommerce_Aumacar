// /src/hooks/useColores.js

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { coloresApi } from '../api/colores.api';
import toast from 'react-hot-toast';

// ==========================================
// Colores Globales
// ==========================================

export const useColores = (params = {}) => {
  return useQuery({
    queryKey: ['colores', params],
    queryFn: () => coloresApi.getAll(params)
  });
};

export const useColor = (id) => {
  return useQuery({
    queryKey: ['color', id],
    queryFn: () => coloresApi.getById(id),
    enabled: !!id
  });
};

export const useCreateColor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: coloresApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries(['colores']);
      toast.success('Color creado exitosamente');
    },
    onError: (error) => {
      toast.error(error.message || 'Error al crear color');
    }
  });
};

export const useUpdateColor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => coloresApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['colores']);
      queryClient.invalidateQueries(['color', variables.id]);
      toast.success('Color actualizado exitosamente');
    },
    onError: (error) => {
      toast.error(error.message || 'Error al actualizar color');
    }
  });
};

export const useDeleteColor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: coloresApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries(['colores']);
      toast.success('Color eliminado exitosamente');
    },
    onError: (error) => {
      toast.error(error.message || 'Error al eliminar color');
    }
  });
};

// ==========================================
// Colores por Vehículo
// ==========================================

export const useColoresVehiculo = (vehiculoId) => {
  return useQuery({
    queryKey: ['vehiculo', vehiculoId, 'colores'],
    queryFn: () => coloresApi.getByVehiculo(vehiculoId),
    enabled: !!vehiculoId
  });
};

export const useAssignColoresVehiculo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ vehiculoId, colorIds }) => 
      coloresApi.assignToVehiculo(vehiculoId, colorIds),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['vehiculo', variables.vehiculoId]);
      queryClient.invalidateQueries(['vehiculo', variables.vehiculoId, 'colores']);
      toast.success('Colores asignados exitosamente');
    },
    onError: (error) => {
      toast.error(error.message || 'Error al asignar colores');
    }
  });
};

export const useRemoveColorVehiculo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ vehiculoId, colorId }) => 
      coloresApi.removeFromVehiculo(vehiculoId, colorId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['vehiculo', variables.vehiculoId]);
      queryClient.invalidateQueries(['vehiculo', variables.vehiculoId, 'colores']);
      toast.success('Color removido exitosamente');
    },
    onError: (error) => {
      toast.error(error.message || 'Error al remover color');
    }
  });
};