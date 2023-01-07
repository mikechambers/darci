/* MIT License
 *
 * Copyright (c) 2023 Mike Chambers
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { CharacterClass } from "shared";

const GLORY_PROGRESSION_ID = "1647151960";

const VALOR_PROGRESSION_ID = "2083746873";
const TRIALS_PROGRESSION_ID = "2755675426";
const IRON_BANNER_PROGRESSION_ID = "599071390";

const GLORY_STREAK_ID = "2572719399";
const VALOR_STREAK_ID = "2203850209";

//IB streak? 4271189086

/*
                        "599071390": {
                            "progressionHash": 599071390,
                            "dailyProgress": 669,
                            "dailyLimit": 0,
                            "weeklyProgress": 669,
                            "weeklyLimit": 0,
                            "currentProgress": 3722,
                            "level": 9,
                            "levelCap": 16,
                            "stepIndex": 9,
                            "progressToNextLevel": 372,
                            "nextLevelAt": 525,
                            "currentResetCount": 2
                        },
*/

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

const parseCharacterFromProfile = (data, manifest) => {
    let emblem = manifest.getEmblemDefinition(data.emblemHash);

    let character = {
        characterId: data.characterId,
        classType: CharacterClass.fromId(data.classType),
        lightLevel: data.lightLevel,
        dateLastPlayed: new Date(Date.parse(data.dateLastPlayed)),
        emblem: emblem,
    };

    return character;
};

class PlayerProfile {
    //#data;
    #characterProfiles;
    #lastActiveCharacterProfile;

    constructor(data, manifest) {
        //this.#data = data;

        let lastActiveCharacterProfile = undefined;
        this.#characterProfiles = [];

        for (const cId in data.characters.data) {
            let progressions =
                data.characterProgressions.data[cId].progressions;

            let valor = {};
            let glory = {};
            let ironBanner = {};
            let trials = {};

            if (progressions) {
                valor = {
                    currentProgress:
                        progressions[VALOR_PROGRESSION_ID].currentProgress,
                    nextLevelAt: progressions[VALOR_PROGRESSION_ID].nextLevelAt,
                    progressToNextLevel:
                        progressions[VALOR_PROGRESSION_ID].progressToNextLevel,
                    streak: progressions[VALOR_STREAK_ID].currentProgress,
                    currentResetCount:
                        progressions[VALOR_STREAK_ID].currentResetCount,
                };

                glory = {
                    currentProgress:
                        progressions[GLORY_PROGRESSION_ID].currentProgress,
                    nextLevelAt: progressions[GLORY_PROGRESSION_ID].nextLevelAt,
                    progressToNextLevel:
                        progressions[GLORY_PROGRESSION_ID].progressToNextLevel,
                    streak: progressions[GLORY_STREAK_ID].currentProgress,
                };

                ironBanner = {
                    currentProgress:
                        progressions[IRON_BANNER_PROGRESSION_ID]
                            .currentProgress,
                    nextLevelAt:
                        progressions[IRON_BANNER_PROGRESSION_ID].nextLevelAt,
                    progressToNextLevel:
                        progressions[IRON_BANNER_PROGRESSION_ID]
                            .progressToNextLevel,
                    streak: progressions[IRON_BANNER_PROGRESSION_ID]
                        .currentProgress,
                    currentResetCount:
                        progressions[IRON_BANNER_PROGRESSION_ID]
                            .currentResetCount,
                };

                let trialsPassageIds = manifest.trialsPassageIds;

                let currentCard;
                const uninstancedItemObjectives =
                    data.characterProgressions.data[cId][
                        "uninstancedItemObjectives"
                    ];
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
                                isFlawless = obj.progress === 1;
                                break;
                            default:
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
                    currentProgress:
                        progressions[TRIALS_PROGRESSION_ID].currentProgress,
                    nextLevelAt:
                        progressions[TRIALS_PROGRESSION_ID].nextLevelAt,
                    progressToNextLevel:
                        progressions[TRIALS_PROGRESSION_ID].progressToNextLevel,
                    currentCard: currentCard,
                };
            }

            let char = data.characters.data[cId];

            let character = parseCharacterFromProfile(char, manifest);

            let out = {
                character: character,
                progressions: {
                    trials: trials,
                    valor: valor,
                    glory: glory,
                    ironBanner: ironBanner,
                },
            };

            this.#characterProfiles.push(out);

            if (
                !lastActiveCharacterProfile ||
                out.character.dateLastPlayed.getTime() >
                    lastActiveCharacterProfile.character.dateLastPlayed.getTime()
            ) {
                lastActiveCharacterProfile = out;
            }
        }

        this.#lastActiveCharacterProfile = lastActiveCharacterProfile;
    }

    get lastActiveCharacterProfile() {
        return this.#lastActiveCharacterProfile;
    }

    get charactersProfiles() {
        return this.#characterProfiles;
    }

    get member() {
        return undefined;
    }
}

export default PlayerProfile;
