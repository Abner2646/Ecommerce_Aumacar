// src/hooks/useMarcas.js 

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { marcasApi } from '../api/marcas.api';
import toast from 'react-hot-toast';

export const useMarcas = (filters = {}) => {
  return useQuery({
    queryKey: ['marcas', filters],
    queryFn: () => marcasApi.getAll(filters)
  });
};

export const useMarca = (id) => {
  return useQuery({
    queryKey: ['marca', id],
    queryFn: () => marcasApi.getById(id),
    enabled: !!id
  });
};

export const useMarcaBySlug = (slug) => {
  return useQuery({
    queryKey: ['marca', 'slug', slug],
    queryFn: () => marcasApi.getBySlug(slug),
    enabled: !!slug
  });
};

export const useCreateMarca = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: marcasApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries(['marcas']);
      toast.success('Marca creada exitosamente');
    },
    onError: (error) => {
      toast.error(error.message || 'Error al crear marca');
    }
  });
};

export const useUpdateMarca = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => marcasApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['marcas']);
      queryClient.invalidateQueries(['marca', variables.id]);
      toast.success('Marca actualizada exitosamente');
    },
    onError: (error) => {
      toast.error(error.message || 'Error al actualizar marca');
    }
  });
};

export const useDeleteMarca = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: marcasApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries(['marcas']);
      toast.success('Marca eliminada exitosamente');
    },
    onError: (error) => {
      // El backend debería devolver un mensaje específico si la marca tiene vehículos
      const mensaje = error.message || 'Error al eliminar marca';
      toast.error(mensaje);
    }
  });
};