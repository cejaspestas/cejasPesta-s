export async function obtenerDatos() {
  // Realizamos la petición de forma asíncrona
  const fetchData = await fetch("/api/datosdatos", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Esperamos que la respuesta sea convertida a formato JSON
  const data = await fetchData.json();
  const { contactos, imagenes, servicios, videos, clientes, precios, promociones, equipo, productos, dataUser, fecha } = data.info
  // Simulamos un retraso de 2 segundos utilizando Promise
  return {
    contactos,
    imagenes,
    servicios,
    videos,
    clientes,
    precios,
    promociones,
    equipo,
    productos,
    dataUser,
    fecha,
  }
}
