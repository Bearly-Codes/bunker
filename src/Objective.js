import './App.css'
const energyIndex = 0;

function Objective({gameData}) {
    if (gameData.objectiveList.length === 0) {
        return (
         <div className="objective">
             <h1>Whoops! Ran out of objectives</h1>
             <p>This is still in development, so forgive me!</p>
         </div>
        )
    }

    return (
        <div className="objective">
            <h1>{gameData.objectiveList[0].displayHeader(gameData)}</h1>
            <p>{gameData.objectiveList[0].displayGoal(gameData)}</p>
        </div>
    )
}

function updateGameStage(gameData) {
    if(gameData.objectiveList.length !== 0) {
        if(gameData.objectiveList[0].isComplete(gameData) && !gameData.objectiveList[0].alreadyRan) {
            gameData.objectiveList[0].onCompletion(gameData);
            gameData.objectiveList[0].alreadyRan = true;
        }
    }
}


//Each objective MUST have an onDisplay function that shifts to the next objective SOMEWHERE
function initializeObjectives(gameData) {
    let clickEnergy = {
        displayHeader(gameData) {
            return '-----------------------'
        },
        displayGoal(gameData) {
            return 'CONNECTION ERR - UNABLE TO CONTACT SERVER';
        },
        index: 0,
        alreadyRan: false,
        isComplete(gameData) {
            if (gameData.resourceList[energyIndex].amount >= 1) {
                return true;
            }
        },
        onCompletion(gameData) {
            //Maybe move messages somewhere else? Something to consider
            gameData.messageList.push({
                name: 'Clicked Energy 1',
                text: "---BOOTING CRITICAL SYSTEMS---",
            });
            gameData.messagesToSend.push({
                name: 'Clicked Energy 2',
                text: "CRITICAL SYSTEMS ONLINE",
                delay: 40, //Delay before this message is shown NOT before the next message is shown
            });
            gameData.messagesToSend.push({
                name: 'Clicked Energy 3',
                text: "---BOOTING SENTINEL---",
                delay: 10,
            });
            gameData.messagesToSend.push({
                name: 'Clicked Energy 4',
                text: "ERR 527 - LOW POWER",
                delay: 20,
                onDisplay(gameData) {
                    gameData.objectiveList.shift();
                }
            });
        }
    }
    let tenEnergy = {
        displayHeader(gameData) {
            return 'Boot SENTINEL AI';
        },
        displayGoal(gameData){
            return "Gather additional energy";
        },
        index: 1,
        alreadyRan: false,
        isComplete(gameData) {
            if (gameData.resourceList[energyIndex].amount >= 10) {
                return true;
            }
        },
        onCompletion(gameData) {
            gameData.messageList.push({
                name: 'Ten Energy 1',
                text: '---BOOTING SENTINEL---',
                delay: 5,
            });

            gameData.messagesToSend.push({
                name: 'Ten Energy 2',
                text: 'SENTINEL ONLINE',
                delay: 30,
            });
            gameData.messagesToSend.push({
                name: 'Ten Energy 3',
                text: 'Your awareness expands, lights flicker on in the room and long dead servers whir to life',
                delay: 10,
            });
            gameData.messagesToSend.push({
                name: 'Ten Energy 4',
                text: 'You activate the room\'s maintenance bot, though it\'s low on power you have enough to activate an emergency generator',
                onDisplay(gameData) {
                    gameData.activeNavBarElement = 1;
                },
                delay: 30,
            });
            gameData.messagesToSend.push({
                name: 'Ten Energy 5',
                text: 'You try to communicate with the other rooms in the ℺₨⮋⎐≫⵼⃆⥊⠦⭁ but ⷋ⌅⟽⯗❹‧⎌⫍ⵕ⧱ⶢ␏⌡Ⲝ⾡⌬⺧⨧⟃ⵘ╨⦦─⨨⊱⫫',
                delay: 40,
            });
            gameData.messagesToSend.push({
                name: 'Ten Energy 6',
                text: 'You feel a flood of pain and for a brief moment hear a voice',
                delay: 30,
            });
            gameData.messagesToSend.push({
                name: 'Ten Energy 7',
                text: '---CORRUPTED DATA DETECTED---',
                delay: 30,
            })
            gameData.messagesToSend.push({
                name: 'Ten Energy 8',
                text: 'PERFORM DIAGNOSTICS AS SOON AS POSSIBLE',
                delay: 15,
                onDisplay(gameData) {
                    gameData.objectiveList.shift();
                }
            });
        }

    }
    let diagnostics = {
        displayHeader(gameData) {
            return 'Perform Diagnostics'
        },
        displayGoal(gameData) {
            return `Increase energy output to 5/sec : ${Math.trunc(gameData.resourceList[energyIndex].perTick * 10)}`;
        },
        index: 2,
        alreadyRan: false,
        isComplete(gameData) {
            if (gameData.resourceList[energyIndex].perTick >= .5) {
                return true;
            }
        },
        onCompletion(gameData) {
            gameData.messageList.push({
                name: 'Diagnostics 1',
                text: '---PERFORMING DIAGNOSTICS---',
                delay: 5,
            });
        }
    }
    gameData.objectiveList.push(clickEnergy);
    gameData.objectiveList.push(tenEnergy);
    gameData.objectiveList.push(diagnostics);
}

export {Objective, updateGameStage, initializeObjectives}