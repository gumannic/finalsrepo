import db from "$lib/leagues.js"

export async function load() {
    return {
        leagues: await db.getLeagues()
    }
}