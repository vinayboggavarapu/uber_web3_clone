import { client } from "../../lib/sanity";

const collectDetails = async (req, res) => {
  try {
    const tripDetails = {
      _type: "trips",
      user: req.body.user,
      pickuplocation: req.body.pickuplocation,
      droplocation: req.body.droplocation,
      price: req.body.price,
      ridetype: req.body.ridetype,
      timestamp: new Date(Date.now()).toISOString(),
    };
    await client.create(tripDetails);
    res.status(200).send({ message: "success" });
  } catch (error) {
    res.status(500).send({ message: "error" });
  }
};

export default collectDetails;
