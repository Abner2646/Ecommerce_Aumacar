import { useEffect, useState } from 'react';
import { marcasApi } from '../api/marcas.api';

export default function useMarcasFooter() {
  const [marcas, setMarcas] = useState([]);
  useEffect(() => {
    marcasApi.getAll()
      .then(res => {
        if (Array.isArray(res.marcas)) setMarcas(res.marcas);
      })
      .catch(() => setMarcas([]));
  }, []);
  return marcas;
}
