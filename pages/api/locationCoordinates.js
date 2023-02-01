const getLocation = async (req, res) => {
  const mapboxUrl = `${process.env.MAPBOX_PLACES_API_URL}/${req.body.location}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_KEY}`;
  try {
    const response = await fetch(mapboxUrl);
    const data = await response.json();
    res.status(500).send({ message: "success", data: data });
  } catch (error) {
    res.status(200).send({ message: "error", data: error.message });
  }
};

export default getLocation;
