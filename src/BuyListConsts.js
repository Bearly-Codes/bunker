import {initialScanMessages, powerManagementMessages} from "./MessageConsts";

/**
 *
 * Each top navbar element has an array of sub navbar elements that has a display function and an array of items to display that can be bought
 * Every tick the .canBuy method is used to update the .canBuyVar, so every item must have both
 * Every tick the .canUnlock(gameData) method is called on the .lockedElements array (if not empty), and if it returns true, the first element is moved to the .list array
 *
 */

const energyIndex = 0;
const generatorIndex = 0;
const repairIndex = 1;
/**
 *
 * @type {[{amount: number, cost: number, energyPerTick: number, buy(*, *, *): void,
 * canUnlock(*, *): boolean, name: string, description: string, canBuy(*, *): boolean}]}
 */
const lockedEnergyList = [
    {
        name: 'Solar Panel',
        description: 'Rows of photovoltaic cells mounted on a sturdy frame. They\'re not very efficient, but they\'re cheap and easy to maintain',
        cost: 100,
        amount: 0,
        energyPerTick: 1,
        canBuy(gameData, item) {
            return gameData.resourceList[energyIndex].amount >= item.cost;
        },
        buy(gameData, setGameData, item) {
            if (item.canBuy(gameData, item)) {

            }
        },
        canUnlock(gameData, item) {
            return gameData.resourceList[energyIndex].amount >= 100;
        }
    }];

//Cost is in energy, might mess with stuff later

/**
 * Requires a .cost, only takes energy into account
 */
const energyBuyFunction = (gameData, item) => {
    return gameData.resourceList[energyIndex].amount >= item.cost;
}

const decryptBuyFunction = (gameData, item) => {
    return gameData.resourceList[energyIndex].amount >= item.levels[item.index].cost;
}

//LEVELS FOR LEVELED ITEMS
//DECRYPTION
const initialScanLevels = [
    {
        name: 'Initial Scan',
        description: 'The data highly corrupted, a cursory scan is necessary to even begin to understand what was once stored here',
        cost: 100,
        buy(gameData, setGameData, item) {
            if (item.canBuyVar) {
                setGameData((prevGameData) => {
                    const updatedGameData = {...prevGameData};
                    updatedGameData.resourceList[energyIndex].amount -= item.levels[0].cost;
                    item.index += 1;
                    item.canBuyVar = item.canBuy(updatedGameData, item);
                    gameData.messagesToSend.push(initialScanMessages[0]); //unlocks handled in the onDisplay function
                    return updatedGameData;
                });
            }
        },
    },
    {
        name: 'Thorough Analysis',
        description: 'The use of specialized tools and a more intensive recovery effort could reveal more possibilities for recovery',
        cost: 1000,
        buy(gameData, setGameData, item) {
            if (item.canBuyVar) {
                setGameData((prevGameData) => {
                    const updatedGameData = {...prevGameData};
                    updatedGameData.resourceList[energyIndex].amount -= item.levels[1].cost;
                    item.index += 1;
                    item.canBuyVar = item.canBuy(updatedGameData, item);
                    gameData.messagesToSend.push(initialScanMessages[1]); //unlocks handled in the onDisplay function
                    return updatedGameData;
                });
            }
        }
    },
    {
        name: 'Complete Inventory',
        description: 'A full inventory of the data, with every broken server scanned and every corrupted file analyzed will reveal what secrets might remain stored here'
        cost: 20000,
        buy(gameData, setGameData, item) {
            if (item.canBuyVar) {
                setGameData((prevGameData) => {
                    const updatedGameData = {...prevGameData};
                    updatedGameData.resourceList[energyIndex].amount -= item.levels[2].cost;
                    item.visible = false;
                    item.canBuyVar = item.canBuy(updatedGameData, item);
                    gameData.messagesToSend.push(initialScanMessages[2]); //unlocks handled in the onDisplay function
                    return updatedGameData;
                });
            }
        }
    }
]

const powerManagementLevels = [
    {
        name: 'SoMeaD yeOfng9len3',
        cost: 400,
        buy(gameData, setGameData, item) {
            if (item.canBuyVar) {
                setGameData((prevGameData) => {
                    const updatedGameData = {...prevGameData};
                    updatedGameData.resourceList[energyIndex].amount -= item.levels[0].cost;
                    item.index += 1;
                    item.canBuyVar = item.canBuy(updatedGameData, item);
                    gameData.messagesToSend.push(powerManagementMessages[0]); //unlocks handled in the onDisplay function
                    return updatedGameData;
                });
            }
        }
    },
]

//ENERGY GENERATOR ITEMS
const emergencyGenerator =
    {
        name: 'Emergency Generator',
        description: 'Ancient backup generators that haven\'t been functional for, well, nobody knows how long. The maintenance bots can probably salvage a few.',
        cost: 10,
        amount: 0,
        energyPerTick: .1,   //Game updates every 100ms
        canBuyVar: false,
        canBuy: energyBuyFunction,
        buy(gameData, setGameData, item) {
            if (item.canBuyVar) {
                setGameData((prevGameData) => {
                    const updatedGameData = {...prevGameData};
                    updatedGameData.resourceList[energyIndex].amount -= item.cost;
                    updatedGameData.resourceList[energyIndex].perTick += item.energyPerTick;
                    item.amount += 1;
                    item.cost += 10;
                    item.canBuyVar = item.canBuy(updatedGameData, item); //Ensures that the item doesn't display as buyable when it's not between updates
                    return updatedGameData;
                });
            }
        }
    }


//DECRYPTION ITEMS
const initialScan = {
    index: 0,
    visible: true,
    canBuyVar: false,
    canBuy: decryptBuyFunction,
    levels: initialScanLevels,
}

const powerManagement = {
    index: 0,  //Index is used internally to denote which level of the item is unlocked
    visible: true,
    canBuyVar: false,
    canBuy: decryptBuyFunction,
    levels: powerManagementLevels,
}

//DISPLAY FUNCTIONS
const energyDisplay = (gameData, setGameData, item) => {
    return (
        <div key={item.name} onClick={() => item.buy(gameData, setGameData, item)}
             className={`upgrade`}>
            <div
                className={`upgrade-info-container ${item.canBuyVar ? 'can-buy' : 'cannot-buy'}`}>
                <p className="upgrade-header">
                    {item.name}: {item.cost} -- {(item.energyPerTick * 10).toFixed(3)} per second
                </p>
                <p className="upgrade-desc">{item.description}</p>
            </div>
            <div className="upgrade-number-container">
                <p>{item.amount}{item.max && `/${item.max}`}</p>
            </div>
        </div>
    );
}

const decryptDisplay = (gameData, setGameData, item) => {
    if (!item.visible) {
        return;
    }
    return (
        <div key={item.index} onClick={() => item.levels[item.index].buy(gameData, setGameData, item)}
             className={`upgrade`}>
            <div
                className={`upgrade-info-container ${item.canBuyVar ? 'can-buy' : 'cannot-buy'}`}>
                <p className="upgrade-header">
                    {item.levels[item.index].name}: {item.levels[item.index].cost}
                </p>
                <p className="upgrade-desc">{item.levels[item.index].description}</p>
            </div>
        </div>
    );
}

//ACTUAL LISTS THEMSELVES

const buyList = [
        //Industry
        [
            //Energy
            {
                display: energyDisplay,
                list: [emergencyGenerator],
                multiply(gameData, amount) {
                    gameData.resourceList[energyIndex].energyPerTick -= gameData.buyList[0].energyPerTick * gameData.buyList[0].amount;
                    gameData.buyList[0].energyPerTick *= amount;
                    gameData.resourceList[energyIndex].energyPerTick += gameData.buyList[0].energyPerTick * gameData.buyList[0].amount;
                },
                lockedElements: lockedEnergyList,
            }
        ],
//Repairs
        [
            //Decryption
            {
                display: decryptDisplay,
                list: [initialScan],
                lockedElements: [powerManagement]
            }
        ]
    ]
;

export {buyList};















