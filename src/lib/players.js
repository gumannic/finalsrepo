import { MongoClient, ObjectId } from "mongodb"; // See https://www.mongodb.com/docs/drivers/node/current/quick-start/
import { DB_URI } from "$env/static/private";

const client = new MongoClient(DB_URI);

await client.connect();
const db = client.db("FootballManagerDB");

// Get player by id
async function getPlayer(id) {
  let player = null;
  try {
    const collection = db.collection("players");
    const query = { _id: new ObjectId(id) }; // filter by id
    player = await collection.findOne(query);

    if (!player) {
      console.log("No player with id " + id);
    } else {
      player._id = player._id.toString(); // convert ObjectId to String
    }
  } catch (error) {
    console.log(error.message);
  }
  return player;
}


// export all functions so that they can be used in other files
export default {
  getPlayer
};
