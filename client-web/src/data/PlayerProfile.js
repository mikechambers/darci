import { CharacterClass } from "shared";

const GLORY_PROGRESSION_ID = "1647151960";

const VALOR_PROGRESSION_ID = "2083746873";
const TRIALS_PROGRESSION_ID = "2755675426";

const GLORY_STREAK_ID = "2572719399";
const VALOR_STREAK_ID = "2203850209";

/*
const TRIALS_WINS_ID = "1062449239";
const TRIALS_LOSSES_ID = "2093709363";
const TRIALS_ROUNDS_WON_ID = "3497267100";
const FLAWLESS_ID = "1349727737";
*/

const TRIALS_WINS_ID = 1586211619;
const TRIALS_LOSSES_ID = 2369244651;
const TRIALS_ROUNDS_WON_ID = 984122744;
const TRIALS_FLAWLESS_ID = 2211480687;

class PlayerProfile {

    #data;
    #characters;
    #lastActiveCharacter;
    #player;

    constructor(data, manifest) {
        this.#data = data;

        let lastActiveCharacter = undefined;
        this.#characters = [];

        for (const cId in data.characters.data) {

            let progressions = data.characterProgressions.data[cId].progressions;

            let valor = {};
            let glory = {};
            let trials = {};

            if (progressions) {

                valor = {
                    currentProgress: progressions[VALOR_PROGRESSION_ID].currentProgress,
                    nextLevelAt: progressions[VALOR_PROGRESSION_ID].nextLevelAt,
                    progressToNextLevel: progressions[VALOR_PROGRESSION_ID].progressToNextLevel,
                    streak: progressions[VALOR_STREAK_ID].currentProgress,
                };

                glory = {
                    currentProgress: progressions[GLORY_PROGRESSION_ID].currentProgress,
                    nextLevelAt: progressions[GLORY_PROGRESSION_ID].nextLevelAt,
                    progressToNextLevel: progressions[GLORY_PROGRESSION_ID].progressToNextLevel,
                    streak: progressions[GLORY_STREAK_ID].currentProgress,
                };


                let trialsPassageIds = manifest.trialsPassageIds;

                let currentCard;
                const uninstancedItemObjectives = data.characterProgressions.data[cId]["uninstancedItemObjectives"];
                for (const id of trialsPassageIds) {

                    //This is an Array of objects
                    let trialsData = uninstancedItemObjectives[id];
                    if (!uninstancedItemObjectives[id]) {
                        continue;
                    }

                    let wins;
                    let losses;
                    let roundsWon;
                    let isFlawless;

                    for (const obj of trialsData) {
                        switch (obj.objectiveHash) {
                            case TRIALS_WINS_ID:
                                wins = obj.progress;
                                break;
                            case TRIALS_LOSSES_ID:
                                losses = obj.progress;
                                break;
                            case TRIALS_ROUNDS_WON_ID:
                                roundsWon = obj.progress;
                                break;
                            case TRIALS_FLAWLESS_ID:
                                isFlawless = (obj.progress == 1);
                                break;
                        }
                    }


                    const passage = manifest.getTrialsPassageDefinition(id);
                    currentCard = {
                        wins: wins,
                        losses: losses,
                        roundsWon: roundsWon,
                        isFlawless: isFlawless,
                        passage: passage,
                    };
                }

                trials = {
                    currentProgress: progressions[TRIALS_PROGRESSION_ID].currentProgress,
                    nextLevelAt: progressions[TRIALS_PROGRESSION_ID].nextLevelAt,
                    progressToNextLevel: progressions[TRIALS_PROGRESSION_ID].progressToNextLevel,
                    currentCard: currentCard,
                };
            }

            let char = data.characters.data[cId];

            let character = {
                characterId: char.characterId,
                classType: CharacterClass.fromId(char.classType),
                lightLevel: char.light,
                emblem: manifest.getEmblem(char.emblemHash),
                dateLastPlayed: new Date(Date.parse(char.dateLastPlayed)),
            };

            let out = {
                character: character,
                progressions: {
                    trials: trials,
                    valor: valor,
                    glory: glory,
                }
            };

            this.#characters.push(out);

            if (!lastActiveCharacter || out.dateLastPlayed.getTime() > lastActiveCharacter.dateLastPlayed.getTime()) {
                lastActiveCharacter = out;
            }


        }

        this.#lastActiveCharacter = lastActiveCharacter;
    }

    get lastActiveCharacter() {
        return this.#lastActiveCharacter;
    }

    get characters() {
        return this.#characters;
    }

    get member() {
        return undefined;
    }
}

export default PlayerProfile;
