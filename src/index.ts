import "./style/css/style.css";
import Stage from "./Stage";
import axios from "axios";
import { Player, Kit } from "../shared/sharedModels";

async function getPlayersFromServer() {
    // using Preomie.all make it faster
    const [players, positions] = await Promise.all([
        axios.get<Player[]>("http://localhost:4000/players"),
        axios.get<Array<{ name: string; position: number }>>(
            "http://localhost:4000/positions"
        ),
    ]);

    const playersWithScore = players.data.map((player) => {
        return {
            ...player,
            startPosition: positions.data.find(
                (position) => position.name === player.name
            )!.position,
        };
    });

    return playersWithScore;
}

function getSamplePlayers() {
    return [
        {
            kit: "FDJ" as Kit,
            name: "Test player",
            startPosition: 1,
        },
    ];
}

async function renderToContainer() {
    const root = document.getElementById("root")!;

    root.innerHTML = "";

    const stage = new Stage(root, {
        maxPosition: 10000,
        players: await getPlayersFromServer(),
    });

    stage.moveCamera(0, 0);
    (window as any).stage = stage;

    stage.renderWithProps({}); // initial render
}

renderToContainer().then(() => console.log("initialized"), console.error);
