import { Kit, Player } from "../shared/sharedModels";


const createPlayerWithKit = (kit: Kit) => {
   return (name: string) => ({
       name,
       kit
   })
}

// Don't modify code below during assignment 1
// (you can modify this to add yourself to the team)
const createPlayerWithTLJKit = createPlayerWithKit("TLJ");
const createPlayerWithBOAKit = createPlayerWithKit("BOA");
const createPlayerWithFDJKit = createPlayerWithKit("FDJ");
const createPlayerWithEUCKit = createPlayerWithKit("EUC");
const createPlayerWithMOVKit = createPlayerWithKit("MOV");
const createPlayerWithCOFKit = createPlayerWithKit("COF");
const createPlayerWithTFRKit = createPlayerWithKit("TFR");

export const players: Player[] = [
    createPlayerWithTLJKit("Amin"),
    createPlayerWithTLJKit("Ralf"),
    createPlayerWithTLJKit("Ronald"),
    createPlayerWithBOAKit("Frikkie"),
    createPlayerWithBOAKit("Janie"),
    createPlayerWithBOAKit("Alla"),
    createPlayerWithFDJKit("Yousef"),
    createPlayerWithFDJKit("Alessandro"),
    createPlayerWithFDJKit("Jochem"),
    createPlayerWithEUCKit("Joris"),
    createPlayerWithEUCKit("Lex"),
    createPlayerWithEUCKit("Lee"),
    createPlayerWithMOVKit("Bryan"),
    createPlayerWithMOVKit("Laurent"),
    createPlayerWithMOVKit("Mickael"),
    createPlayerWithCOFKit("Michael"),
    createPlayerWithCOFKit("Sander"),
    createPlayerWithCOFKit("Yoeri"),
    createPlayerWithTFRKit("Yue"),
    createPlayerWithTFRKit("Marco"),
    createPlayerWithTFRKit("Felix"),
    createPlayerWithTFRKit("Niklas")
];
