import { MongoClient, ObjectId } from "mongodb"; // See https://www.mongodb.com/docs/drivers/node/current/quick-start/
import { DB_URI } from "$env/static/private";

const client = new MongoClient(DB_URI);

await client.connect();
const db = client.db("FootballManagerDB");

//////////////////////////////////////////
// Team
//////////////////////////////////////////

// Get all teams
async function getTeams() {
  let teams = [];
  try {
    const collection = db.collection("teams");

    // You can specify a query/filter here
    // See https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/query-document/
    const query = {};

    // Get all objects that match the query
    teams = await collection.find(query).toArray();
    teams.forEach((team) => {
      team._id = team._id.toString(); // convert ObjectId to String
    });
  } catch (error) {
    console.log(error);
  }
  return teams;
}

// Get team by id
async function getTeam(id) {
  let team = null;
  try {
    const collection = db.collection("teams");
    const query = { _id: new ObjectId(id) }; // filter by id
    team = await collection.findOne(query);

    if (!team) {
      console.log("No Team with id " + id);
    } else {
      team._id = team._id.toString(); // convert ObjectId to String
    }
  } catch (error) {
    console.log(error.message);
  }
  return team;
}

// create team
// Example team object:
/* 
{ 
  name: "FC Barcelona",
  league: "La Liga"
} 
*/
async function createTeam(team) {
  team.players = [];
  try {
    const collection = db.collection("teams");
    const result = await collection.insertOne(team);
    return result.insertedId.toString(); // convert ObjectId to String
  } catch (error) {
    console.log(error.message);
  }
  return null;
}

// update team
// Example team object:
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
async function updateTeam(team) {
  try {
    let id = team._id;
    delete team._id; // delete the _id from the object, because the _id cannot be updated
    const collection = db.collection("teams");
    const query = { _id: new ObjectId(id) }; // filter by id
    const result = await collection.updateOne(query, { $set: team });

    if (result.matchedCount === 0) {
      console.log("No team with id " + id);
    } else {
      console.log("Team with id " + id + " has been updated.");
      return id;
    }
  } catch (error) {
    console.log(error.message);
  }
  return null;
}

// delete movie by id
// returns: id of the deleted movie or null, if movie could not be deleted
async function deleteTeam(id) {
  try {
    const collection = db.collection("teams");
    const query = { _id: new ObjectId(id) }; // filter by id
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      console.log("No team with id " + id);
    } else {
      console.log("Team with id " + id + " has been successfully deleted.");
      return id;
    }
  } catch (error) {
    console.log(error.message);
  }
  return null;
}

// export all functions so that they can be used in other files
export default {
  getTeams,
  getTeam,
  createTeam,
  updateTeam,
  deleteTeam,
};
