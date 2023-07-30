import {clickEnergyMessages, tenEnergyMessages, diagnosticsMessages} from './MessageConsts.js';
const energyIndex = 0;

const clickEnergy = {
    //Triggers upon first click, prompts player to get more energy
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
        clickEnergyMessages.forEach((item) => {
            gameData.messagesToSend.push(item);
        })
    }
}
const tenEnergy = {
    //Triggers upon user reaching 10 energy, unlocks generator, prompts player to get more energy
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
        tenEnergyMessages.forEach((item) => {
            gameData.messagesToSend.push(item);
        })
    }
}

const diagnostics = {
    displayHeader(gameData) {
        return 'Perform Diagnostics'
    },
    displayGoal(gameData) {
        return `Increase energy output to 5/sec : ${Math.round(gameData.resourceList[energyIndex].perTick * 10)}`;
    },
    index: 2,
    alreadyRan: false,
    isComplete(gameData) {
        if (gameData.resourceList[energyIndex].perTick >= .5) {
            return true;
        }
    },
    onCompletion(gameData) {
        diagnosticsMessages.forEach((item) => {
            gameData.messagesToSend.push(item);
        })
    },
}


export {clickEnergy, tenEnergy, diagnostics}