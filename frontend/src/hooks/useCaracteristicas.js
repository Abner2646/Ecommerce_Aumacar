// /src/hooks/useCaracteristicas.js  

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { caracteristicasApi } from '../api/caracteristicas.api';
import toast from 'react-hot-toast';

export const useCaracteristicas = (filters = {}) => {
  return useQuery({
    queryKey: ['caracteristicas', filters],
    queryFn: () => caracteristicasApi.getAll(filters)
  });
};

export const useCaracteristica = (id) => {
  return useQuery({
    queryKey: ['caracteristica', id],
    queryFn: () => caracteristicasApi.getById(id),
    enabled: !!id
  });
};

export const useCreateCaracteristica = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: caracteristicasApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries(['caracteristicas']);
      toast.success('Característica creada exitosamente');
    },
    onError: (error) => {
      toast.error(error.message || 'Error al crear característica');
    }
  });
};

export const useUpdateCaracteristica = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => caracteristicasApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['caracteristicas']);
      queryClient.invalidateQueries(['caracteristica', variables.id]);
      toast.success('Característica actualizada exitosamente');
    },
    onError: (error) => {
      toast.error(error.message || 'Error al actualizar característica');
    }
  });
};

export const useDeleteCaracteristica = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: caracteristicasApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries(['caracteristicas']);
      toast.success('Característica eliminada exitosamente');
    },
    onError: (error) => {
      toast.error(error.message || 'Error al eliminar característica');
    }
  });
};