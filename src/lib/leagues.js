import { MongoClient, ObjectId } from "mongodb"; // See https://www.mongodb.com/docs/drivers/node/current/quick-start/
import { DB_URI } from "$env/static/private";

const client = new MongoClient(DB_URI);

await client.connect();
const db = client.db("FootballManagerDB");

//////////////////////////////////////////
// Leagues
//////////////////////////////////////////

// Get all leagues
async function getLeagues() {
  let leagues = [];
  try {
    const collection = db.collection("leagues");

    // You can specify a query/filter here
    // See https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/query-document/
    const query = {};

    // Get all objects that match the query
    leagues = await collection.find(query).toArray();
    leagues.forEach((league) => {
      league._id = league._id.toString(); // convert ObjectId to String
    });
  } catch (error) {
    console.log(error);
  }
  return leagues;
}

// Get league by id
async function getLeague(id) {
  let league = null;
  try {
    const collection = db.collection("leagues");
    const query = { _id: new ObjectId(id) }; // filter by id
    league = await collection.findOne(query);

    if (!league) {
      console.log("No league with id " + id);
    } else {
      league._id = league._id.toString(); // convert ObjectId to String
    }
  } catch (error) {
    console.log(error.message);
  }
  return league;
}

// create league
// Example league object:
/* 
{ 
  name: "FC Barcelona",
  league: "La Liga"
} 
*/
async function createLeague(league) {
  league.players = [];
  try {
    const collection = db.collection("leagues");
    const result = await collection.insertOne(league);
    return result.insertedId.toString(); // convert ObjectId to String
  } catch (error) {
    console.log(error.message);
  }
  return null;
}

// update league
// Example league object:
/* 
{ 
  _id: "6630e72c95e12055f661ff13",
  name: "FC Barcelona",
  league: "La Liga"
  players: [
    "Lamine Yamal",
    "Frenkie De Jong",
    "Marc Andre Ter Stegen"
  ],
} 
*/
// returns: id of the updated movie or null, if movie could not be updated
async function updateLeague(league) {
  try {
    let id = league._id;
    delete league._id; // delete the _id from the object, because the _id cannot be updated
    const collection = db.collection("leagues");
    const query = { _id: new ObjectId(id) }; // filter by id
    const result = await collection.updateOne(query, { $set: league });

    if (result.matchedCount === 0) {
      console.log("No league with id " + id);
    } else {
      console.log("league with id " + id + " has been updated.");
      return id;
    }
  } catch (error) {
    console.log(error.message);
  }
  return null;
}

// delete movie by id
// returns: id of the deleted movie or null, if movie could not be deleted
async function deleteLeague(id) {
  try {
    const collection = db.collection("leagues");
    const query = { _id: new ObjectId(id) }; // filter by id
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      console.log("No league with id " + id);
    } else {
      console.log("league with id " + id + " has been successfully deleted.");
      return id;
    }
  } catch (error) {
    console.log(error.message);
  }
  return null;
}

// export all functions so that they can be used in other files
export default {
  getLeagues,
  getLeague,
  createLeague,
  updateLeague,
  deleteLeague,
};
