import players_db from "$lib/players.js"

export async function load({ params }) {
    const player = await players_db.getPlayer(params.id);

    return {
        player,
    };
}