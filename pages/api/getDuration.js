const getDuration = async (req, res) => {
  const mapBoxUrl = `${process.env.MAPBOX_DURATION_API}/${req.body.pickupcoordinates};${req.body.dropcoordinates}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_KEY}`;
  try {
    const response = await fetch(mapBoxUrl);
    const data = await response.json();
    res.status(200).send({ message: "success", data: data.routes[0].duration });
  } catch (error) {
    res.status(500).send({ message: "error", data: error.message });
  }
};
export default getDuration;
