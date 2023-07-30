import './App.css'
import {clickEnergy, diagnostics, tenEnergy} from "./ObjectiveConsts.js";
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
    gameData.objectiveList.push(clickEnergy);
    gameData.objectiveList.push(tenEnergy);
    gameData.objectiveList.push(diagnostics);
}

export {Objective, updateGameStage, initializeObjectives}