import { CharacterClass } from "shared";

const GLORY_PROGRESSION_ID = "1647151960";

const VALOR_PROGRESSION_ID = "2083746873";
const TRIALS_PROGRESSION_ID = "2755675426";

const GLORY_STREAK_ID = "2572719399";
const VALOR_STREAK_ID = "2203850209";

const TRIALS_WINS_ID = "1062449239";
const TRIALS_LOSSES_ID = "2093709363";

const TRIALS_ROUNDS_WON_ID = "3497267100";
const MERCY_FORGIVEN_ID = "1349727737";


class PlayerProfile {

    #data;
    #characters;
    #lastActiveCharacter;
    constructor() {
        this.#data = data;

        let lastActiveCharacter = undefined;

        this.#characters = [];
        for (const cId in data.characters.data) {

            console.log();
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

                //TODO: need to get the right value for this, but cant test until weekend
                let passage = manifest.getTrialsPassageDefinition(-1);

                //TODO: make this undefined if empty
                let currentCard = {
                    wins: progressions[TRIALS_WINS_ID].level,
                    losses: progressions[TRIALS_LOSSES_ID].level,
                    roundsWon: progressions[TRIALS_ROUNDS_WON_ID].level,
                    passage: passage,
                };

                trials = {
                    currentProgress: progressions[TRIALS_PROGRESSION_ID].currentProgress,
                    nextLevelAt: progressions[TRIALS_PROGRESSION_ID].nextLevelAt,
                    progressToNextLevel: progressions[TRIALS_PROGRESSION_ID].progressToNextLevel,
                    currentCard: currentCard,
                };
            }

            let char = data.characters.data[cId];

            let out = {
                characterId: char.characterId,
                classType: CharacterClass.fromId(char.classType),
                lightLevel: char.light,
                dateLastPlayed: new Date(Date.parse(char.dateLastPlayed)),
                emblem: {
                    id: char.emblemHash
                },
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
