// /src/components/vehicle-templates/TemplateSelector.jsx

import Template01 from './Template01';
import Template02 from './Template02';
import Template03 from './Template03';
import Template04 from './Template04';

const TEMPLATES = {
  1: Template01,
  2: Template02,
  3: Template03,
  4: Template04,
};

export default function TemplateSelector({ vehiculo }) {
  console.log('TemplateSelector recibió:', vehiculo);
  
  if (!vehiculo) {
    return <div className="text-center py-20 text-xl text-gray-600">No hay datos del vehículo</div>;
  }

  const templateNumber = vehiculo.plantilla || 1;
  const TemplateComponent = TEMPLATES[templateNumber] || Template01;
  
  // ✅ Pasar todos los datos necesarios como props
  // Determinar el nombre de la plantilla para la tipografía
  let plantillaMarca = 'plantilla1';
  if (vehiculo.plantilla === 2) plantillaMarca = 'plantilla2';
  else if (vehiculo.plantilla === 3) plantillaMarca = 'plantilla3';
  // Si en el futuro hay más plantillas, agregar aquí

  return (
    <TemplateComponent 
      vehiculo={vehiculo}
      caracteristicas={vehiculo.caracteristicas || []}
      colores={vehiculo.colores || []}
      plantillaMarca={plantillaMarca}
    />
  );
}