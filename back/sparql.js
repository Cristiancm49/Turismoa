const SparqlClient = require('sparql-client-2');
const endpoint = 'http://localhost:3030/OntologiaTursimo/query';
const client = new SparqlClient(endpoint, { defaultParameters: { format: 'json' } }).register({
  rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
  ontologiaTurista: 'http://www.semanticweb.org/cristianm/ontologies/2024/3/ontologiaTurista#'
});

async function getAllActivities() {
  const query = `
  PREFIX ontologiaTurista: <http://www.semanticweb.org/cristianm/ontologies/2024/3/ontologiaTurista#>
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  
  SELECT DISTINCT ?id ?actividad ?nombre ?nombreCategoria ?nombreOfrecidoPor ?nombreUbicacion ?capacidad ?descripcion ?dificultad ?imagen ?precio
  WHERE {
    ?actividad rdf:type ontologiaTurista:actividadturistica .
    ?actividad ontologiaTurista:id ?id .
    ?actividad ontologiaTurista:nombre ?nombre .
    ?actividad ontologiaTurista:TieneCategoria ?categoria .
    ?categoria ontologiaTurista:nombre ?nombreCategoria .
    ?actividad ontologiaTurista:ofrecidoPor ?ofrecidoPor .
    ?ofrecidoPor ontologiaTurista:nombre ?nombreOfrecidoPor .
    ?actividad ontologiaTurista:ubicadoEn ?ubicacion .
    ?ubicacion ontologiaTurista:nombre ?nombreUbicacion .
    ?actividad ontologiaTurista:capacidad ?capacidad .
    ?actividad ontologiaTurista:descripcion ?descripcion .
    ?actividad ontologiaTurista:dificultad ?dificultad .
    ?actividad ontologiaTurista:imagen ?imagen .
    ?actividad ontologiaTurista:precio ?precio .
  }
  GROUP BY ?id ?actividad ?nombre ?nombreCategoria ?nombreOfrecidoPor ?nombreUbicacion ?capacidad ?descripcion ?dificultad ?imagen ?precio
  HAVING (COUNT(?id) = 1)
  `;

  try {
    const response = await client.query(query).execute();
    return response.results.bindings.map(binding => ({
      id: binding.id.value,
      actividad: binding.actividad.value,
      nombre: binding.nombre.value,
      nombreCategoria: binding.nombreCategoria.value,
      nombreOfrecidoPor: binding.nombreOfrecidoPor.value,
      nombreUbicacion: binding.nombreUbicacion.value,
      capacidad: binding.capacidad.value,
      descripcion: binding.descripcion.value,
      dificultad: binding.dificultad.value,
      imagen: binding.imagen.value,
      precio: binding.precio.value
    }));
  } catch (error) {
    console.error('Error executing SPARQL query:', error);
    throw error;
  }
}



async function getAllAccommodations() {
  const query = `
    PREFIX ontologiaTurista: <http://www.semanticweb.org/cristianm/ontologies/2024/3/ontologiaTurista#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>

    SELECT DISTINCT ?id ?nombre ?categoriaNombre ?ubicacionNombre ?nombreOfrecidoPor ?descripcion ?imagen ?precio
    WHERE {
      ?alojamiento rdf:type ontologiaTurista:alojamiento .
      ?alojamiento ontologiaTurista:id ?id .
      ?alojamiento ontologiaTurista:nombre ?nombre .
      ?alojamiento ontologiaTurista:TieneCategoria ?categoria .
      ?categoria ontologiaTurista:nombre ?categoriaNombre .
      ?alojamiento ontologiaTurista:ubicadoEn ?ubicacion .
      ?ubicacion ontologiaTurista:nombre ?ubicacionNombre .
      ?alojamiento ontologiaTurista:ofrecidoPor ?ofrecidoPor .
      ?ofrecidoPor ontologiaTurista:nombre ?nombreOfrecidoPor .
      ?alojamiento ontologiaTurista:descripcion ?descripcion .
      ?alojamiento ontologiaTurista:imagen ?imagen .
      ?alojamiento ontologiaTurista:precio ?precio .
    }
    GROUP BY ?id ?nombre ?categoriaNombre ?ubicacionNombre ?nombreOfrecidoPor ?descripcion ?imagen ?precio
    HAVING (COUNT(?id) = 1)
  `;

  try {
    const response = await client.query(query).execute();
    return response.results.bindings.map(binding => ({
      id: binding.id.value,
      nombre: binding.nombre.value,
      categoriaNombre: binding.categoriaNombre.value,
      ubicacionNombre: binding.ubicacionNombre.value,
      nombreOfrecidoPor: binding.nombreOfrecidoPor.value,
      descripcion: binding.descripcion.value,
      imagen: binding.imagen.value,
      precio: binding.precio.value
    }));
  } catch (error) {
    console.error('Error executing SPARQL query:', error);
    throw error;
  }
}

async function getAll() {
  const query = `
    PREFIX ontologiaTurista: <http://www.semanticweb.org/cristianm/ontologies/2024/3/ontologiaTurista#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    
    SELECT DISTINCT ?id ?nombre ?categoriaNombre ?ubicacionNombre ?nombreOfrecidoPor ?descripcion ?imagen ?precio
    WHERE {
      { 
        ?alojamiento rdf:type ontologiaTurista:alojamiento .
        ?alojamiento ontologiaTurista:id ?id .
        ?alojamiento ontologiaTurista:nombre ?nombre .
        ?alojamiento ontologiaTurista:TieneCategoria ?categoria .
        ?categoria ontologiaTurista:nombre ?categoriaNombre .
        ?alojamiento ontologiaTurista:ubicadoEn ?ubicacion .
        ?ubicacion ontologiaTurista:nombre ?ubicacionNombre .
        ?alojamiento ontologiaTurista:ofrecidoPor ?ofrecidoPor .
        ?ofrecidoPor ontologiaTurista:nombre ?nombreOfrecidoPor .
        ?alojamiento ontologiaTurista:descripcion ?descripcion .
        ?alojamiento ontologiaTurista:imagen ?imagen .
        ?alojamiento ontologiaTurista:precio ?precio .
      }
      UNION
      { 
        ?actividad rdf:type ontologiaTurista:actividadturistica .
        ?actividad ontologiaTurista:id ?id .
        ?actividad ontologiaTurista:nombre ?nombre .
        ?actividad ontologiaTurista:TieneCategoria ?categoria .
        ?categoria ontologiaTurista:nombre ?categoriaNombre .
        ?actividad ontologiaTurista:ofrecidoPor ?ofrecidoPor .
        ?ofrecidoPor ontologiaTurista:nombre ?nombreOfrecidoPor .
        ?actividad ontologiaTurista:ubicadoEn ?ubicacion .
        ?ubicacion ontologiaTurista:nombre ?ubicacionNombre .
        ?actividad ontologiaTurista:capacidad ?capacidad .
        ?actividad ontologiaTurista:descripcion ?descripcion .
        ?actividad ontologiaTurista:dificultad ?dificultad .
        ?actividad ontologiaTurista:imagen ?imagen .
        ?actividad ontologiaTurista:precio ?precio .
      }
      UNION
      { 
        ?alimento rdf:type ontologiaTurista:alimento .
        ?alimento ontologiaTurista:id ?id .
        ?alimento ontologiaTurista:nombre ?nombre .
        ?alimento ontologiaTurista:TieneCategoria ?categoria .
        ?categoria ontologiaTurista:nombre ?categoriaNombre .
        ?alimento ontologiaTurista:ubicadoEn ?ubicacion .
        ?ubicacion ontologiaTurista:nombre ?ubicacionNombre .
        ?alimento ontologiaTurista:ofrecidoPor ?ofrecidoPor .
        ?ofrecidoPor ontologiaTurista:nombre ?nombreOfrecidoPor .
        ?alimento ontologiaTurista:descripcion ?descripcion .
        ?alimento ontologiaTurista:imagen ?imagen .
        ?alimento ontologiaTurista:precio ?precio .
      }
    }
    GROUP BY ?id ?nombre ?categoriaNombre ?ubicacionNombre ?nombreOfrecidoPor ?descripcion ?imagen ?precio
    HAVING (COUNT(?id) = 1)
  `;

  try {
    const response = await client.query(query).execute();
    return response.results.bindings.map(binding => ({
      id: binding.id.value,
      nombre: binding.nombre.value,
      categoriaNombre: binding.categoriaNombre.value,
      ubicacionNombre: binding.ubicacionNombre.value,
      nombreOfrecidoPor: binding.nombreOfrecidoPor.value,
      descripcion: binding.descripcion.value,
      imagen: binding.imagen.value,
      precio: binding.precio.value
    }));
  } catch (error) {
    console.error('Error executing SPARQL query:', error);
    throw error;
  }
}



async function getAllFood() {
  const query = `
    PREFIX ontologiaTurista: <http://www.semanticweb.org/cristianm/ontologies/2024/3/ontologiaTurista#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    SELECT DISTINCT ?id ?nombre ?categoriaNombre ?ubicacionNombre ?nombreOfrecidoPor ?descripcion ?imagen ?precio
    WHERE {
      ?alimento rdf:type ontologiaTurista:alimento .
      ?alimento ontologiaTurista:id ?id .
      ?alimento ontologiaTurista:nombre ?nombre .
      ?alimento ontologiaTurista:TieneCategoria ?categoria .
      ?categoria ontologiaTurista:nombre ?categoriaNombre .
      ?alimento ontologiaTurista:ubicadoEn ?ubicacion .
      ?ubicacion ontologiaTurista:nombre ?ubicacionNombre .
      ?alimento ontologiaTurista:ofrecidoPor ?ofrecidoPor .
      ?ofrecidoPor ontologiaTurista:nombre ?nombreOfrecidoPor .
      ?alimento ontologiaTurista:descripcion ?descripcion .
      ?alimento ontologiaTurista:imagen ?imagen .
      ?alimento ontologiaTurista:precio ?precio .
    }
    GROUP BY ?id ?nombre ?categoriaNombre ?ubicacionNombre ?nombreOfrecidoPor ?descripcion ?imagen ?precio
    HAVING (COUNT(?id) = 1)
  `;

  try {
    const response = await client.query(query).execute();
    return response.results.bindings.map(binding => ({
      id: binding.id.value,
      nombre: binding.nombre.value,
      categoriaNombre: binding.categoriaNombre.value,
      ubicacionNombre: binding.ubicacionNombre.value,
      nombreOfrecidoPor: binding.nombreOfrecidoPor.value,
      descripcion: binding.descripcion.value,
      imagen: binding.imagen.value,
      precio: binding.precio.value
    }));
  } catch (error) {
    console.error('Error executing SPARQL query:', error);
    throw error;
  }
}


  module.exports = { getAllActivities, getAllAccommodations, getAllFood, getAll };