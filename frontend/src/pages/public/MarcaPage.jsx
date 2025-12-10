import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { marcasApi } from '../../api/marcas.api';

const MarcaPage = () => {
  const { slug } = useParams();
  const [marca, setMarca] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    marcasApi.getBySlug(slug)
      .then(data => {
        setMarca(data.marca || null);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Error al cargar la marca');
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div>Cargando marca...</div>;
  if (error) return <div style={{color:'red',padding:'2rem'}}>{error}</div>;
  if (!marca) return <div>No se encontró la marca.</div>;

  // Selección de plantilla según marca.plantilla (número)
  let PlantillaComponent;
  switch (Number(marca.plantilla)) {
    case 2:
      PlantillaComponent = React.lazy(() => import('./plantilla2'));
      break;
    case 3:
      PlantillaComponent = React.lazy(() => import('./plantilla3'));
      break;
    case 1:
    default:
      PlantillaComponent = React.lazy(() => import('./plantilla1'));
  }

  return (
    <React.Suspense fallback={<div>Cargando plantilla...</div>}>
      <PlantillaComponent marca={marca} />
    </React.Suspense>
  );
};

export default MarcaPage;
