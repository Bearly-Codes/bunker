import './App.css'

const energyIndex = 0;

function ResourcePanel({gameData}) {
    return (
        <div className="resource-panel">
            {gameData.resourceList.map((item) => (
                <div key={item.name}>
                    <p>{item.name}: {Math.trunc(item.amount)}</p>
                </div>
            ))}
        </div>
    )
}

//Define resource types + put them in their respective lists
//These resource objects
function initializeResourcePanel(gameData) {
    let energy = {
        name: 'Energy',
        amount: 0,
        perTick: 0,
        canUnlock: (gameData) => {
            return true;
        },
        update: (gameData) => {
            gameData.resourceList[energyIndex].amount += gameData.resourceList[energyIndex].perTick;
        }
    };
    gameData.resourceList.push(energy);
}
//Same unlocking logic as the buy list
function updateResourcePanel(gameData) {
    if(gameData.lockedResourceList.length !== 0) {
        if(gameData.lockedResourceList[0].canUnlock(gameData)) {
            gameData.resourceList.push(gameData.lockedResourceList[0]);
            gameData.lockedResourceList.shift();
        }
    }
    for(let i = 0; i < gameData.resourceList.length; i++) {
        gameData.resourceList[i].update(gameData);
    }
}
export {ResourcePanel, initializeResourcePanel, updateResourcePanel};