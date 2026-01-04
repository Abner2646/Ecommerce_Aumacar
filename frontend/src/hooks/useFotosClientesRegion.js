// src/hooks/useFotosClientesRegion.js

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fotosClientesRegionApi } from '../api/fotosClientesRegion.api';
import toast from 'react-hot-toast';

export const useFotosClientesRegion = () => {
  return useQuery({
    queryKey: ['fotos-clientes-region'],
    queryFn: () => fotosClientesRegionApi.getAll()
  });
};

export const useFotoClienteRegion = (id) => {
  return useQuery({
    queryKey: ['foto-cliente-region', id],
    queryFn: () => fotosClientesRegionApi.getById(id),
    enabled: !!id
  });
};

export const useFotosPorCiudad = (ciudad) => {
  return useQuery({
    queryKey: ['fotos-clientes-region', 'ciudad', ciudad],
    queryFn: () => fotosClientesRegionApi.getByCiudad(ciudad),
    enabled: !!ciudad
  });
};

export const useFotosPorCoordenadas = (latitud, longitud, radio) => {
  return useQuery({
    queryKey: ['fotos-clientes-region', 'coordenadas', latitud, longitud, radio],
    queryFn: () => fotosClientesRegionApi.getByCoordenadas(latitud, longitud, radio),
    enabled: !!(latitud && longitud)
  });
};

export const useCiudadesDisponibles = () => {
  return useQuery({
    queryKey: ['fotos-clientes-region', 'ciudades'],
    queryFn: () => fotosClientesRegionApi.getCiudadesDisponibles()
  });
};

export const useCreateFotoClienteRegion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fotosClientesRegionApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries(['fotos-clientes-region']);
      setTimeout(() => {
        toast.success('Foto de cliente creada exitosamente');
      }, 0);
    },
    onError: (error) => {
      setTimeout(() => {
        toast.error(error.message || 'Error al crear foto de cliente');
      }, 0);
    }
  });
};

export const useUpdateFotoClienteRegion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => fotosClientesRegionApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['fotos-clientes-region']);
      queryClient.invalidateQueries(['foto-cliente-region', variables.id]);
      setTimeout(() => {
        toast.success('Foto de cliente actualizada exitosamente');
      }, 0);
    },
    onError: (error) => {
      setTimeout(() => {
        toast.error(error.message || 'Error al actualizar foto de cliente');
      }, 0);
    }
  });
};

export const useDeleteFotoClienteRegion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fotosClientesRegionApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries(['fotos-clientes-region']);
      setTimeout(() => {
        toast.success('Foto de cliente eliminada exitosamente');
      }, 0);
    },
    onError: (error) => {
      const mensaje = error.message || 'Error al eliminar foto de cliente';
      setTimeout(() => {
        toast.error(mensaje);
      }, 0);
    }
  });
};

export const useReordenarFotos = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ ciudad, ordenes }) => fotosClientesRegionApi.reordenar(ciudad, ordenes),
    onSuccess: () => {
      queryClient.invalidateQueries(['fotos-clientes-region']);
      setTimeout(() => {
        toast.success('Orden actualizado exitosamente');
      }, 0);
    },
    onError: (error) => {
      setTimeout(() => {
        toast.error(error.message || 'Error al reordenar fotos');
      }, 0);
    }
  });
};