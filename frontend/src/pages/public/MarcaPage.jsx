// /src/pages/public/MarcaPage.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { marcasApi } from '../../api/marcas.api';

const MarcaPage = () => {
  const { t } = useTranslation();
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
        setError(err.message || t('marcaPage.error'));
        setLoading(false);
      });
  }, [slug, t]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-white"><div className="text-2xl text-gray-400 font-light tracking-wider animate-pulse">{t('marcaPage.loading')}</div></div>;
  if (error) return <div style={{color:'red',padding:'2rem'}}>{error}</div>;
  if (!marca) return <div className="min-h-screen flex items-center justify-center bg-white"><div className="text-2xl text-gray-600">{t('marcaPage.notFound')}</div></div>;

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
    <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white"><div className="text-2xl text-gray-400 font-light tracking-wider animate-pulse">{t('marcaPage.loadingTemplate')}</div></div>}>
      <PlantillaComponent marca={marca} />
    </React.Suspense>
  );
};

export default MarcaPage;