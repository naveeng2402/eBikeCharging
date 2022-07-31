const getRoute = async (
  start: number[],
  dest: number[]
): Promise<number[][]> => {
  const query = await fetch(
    `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${
      start[1]
    };${dest[0]},${dest[1]}?steps=true&geometries=geojson&access_token=${
      import.meta.env.VITE_API_KEY
    }`,
    { method: "GET" }
  );
  const json = await query.json();
  const route = json.routes[0].geometry.coordinates;

  return route;
};

export default getRoute;
