// /src/hooks/useVehiculos.js 

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { vehiculosApi } from '../api/vehiculos.api';
import toast from 'react-hot-toast';

export const useVehiculos = (filters = {}) => {
  return useQuery({
    queryKey: ['vehiculos', filters],
    queryFn: () => vehiculosApi.getAll(filters)
  });
};

export const useVehiculo = (id) => {
  return useQuery({
    queryKey: ['vehiculo', id],
    queryFn: () => vehiculosApi.getById(id),
    enabled: !!id
  });
};

export const useVehiculoBySlug = (slug) => {
  return useQuery({
    queryKey: ['vehiculo', 'slug', slug],
    queryFn: () => vehiculosApi.getBySlug(slug),
    enabled: !!slug
  });
};

export const useCreateVehiculo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: vehiculosApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries(['vehiculos']);
      toast.success('Vehículo creado exitosamente');
    },
    onError: (error) => {
      toast.error(error.message || 'Error al crear vehículo');
    }
  });
};

export const useUpdateVehiculo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => vehiculosApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['vehiculos']);
      queryClient.invalidateQueries(['vehiculo', variables.id]);
      toast.success('Vehículo actualizado exitosamente');
    },
    onError: (error) => {
      toast.error(error.message || 'Error al actualizar vehículo');
    }
  });
};

export const useDeleteVehiculo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: vehiculosApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries(['vehiculos']);
      toast.success('Vehículo eliminado exitosamente');
    },
    onError: (error) => {
      toast.error(error.message || 'Error al eliminar vehículo');
    }
  });
};

export const useAddImages = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ vehiculoId, images, options }) => 
      vehiculosApi.addImages(vehiculoId, images, options),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['vehiculo', variables.vehiculoId]);
      toast.success('Imágenes agregadas exitosamente');
    },
    onError: (error) => {
      toast.error(error.message || 'Error al agregar imágenes');
    }
  });
};

export const useDeleteImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: vehiculosApi.deleteImage,
    onSuccess: () => {
      queryClient.invalidateQueries(['vehiculo']);
      toast.success('Imagen eliminada exitosamente');
    },
    onError: (error) => {
      toast.error(error.message || 'Error al eliminar imagen');
    }
  });
};

export const useAddVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ vehiculoId, video, metadata }) => 
      vehiculosApi.addVideo(vehiculoId, video, metadata),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['vehiculo', variables.vehiculoId]);
      toast.success('Video agregado exitosamente');
    },
    onError: (error) => {
      toast.error(error.message || 'Error al agregar video');
    }
  });
};

export const useDeleteVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: vehiculosApi.deleteVideo,
    onSuccess: () => {
      queryClient.invalidateQueries(['vehiculo']);
      toast.success('Video eliminado exitosamente');
    },
    onError: (error) => {
      toast.error(error.message || 'Error al eliminar video');
    }
  });
};

export const useAssignCaracteristicas = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ vehiculoId, caracteristicasIds }) => 
      vehiculosApi.assignCaracteristicas(vehiculoId, caracteristicasIds),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['vehiculo', variables.vehiculoId]);
      toast.success('Características asignadas exitosamente');
    },
    onError: (error) => {
      toast.error(error.message || 'Error al asignar características');
    }
  });
};