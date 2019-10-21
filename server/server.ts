import express from "express";
import { players } from "./players";
import cors from "cors";
const app = express();

app.use(cors());

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 *
 * https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
 */
function shuffle<T>(a: T[]) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

// return a random set of 10 players for the game
app.get("/players", (_req, res) => {
    const selectedPlayers = shuffle(players).slice(0, 10);

    // simulate a slow database call using setTimeout
    setTimeout(() => {
        res.json(selectedPlayers);
    }, 1000);
});

// get the starting positions for all players
app.get("/positions", (_req, res) => {
    const positions = players.map(player => {
        return {
            name: player.name,
            position: Math.floor(Math.random() * 10)
        };
    });

    // simulate a slow database call using setTimeout
    setTimeout(() => {
        res.json(positions);
    }, 800);
});

app.listen(4000, () => {
    console.log("Listening on port 4000");
});
