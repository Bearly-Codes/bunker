//Each top navbar element has an array of sub navbar elements that has a display function and an array of items to display that can be bought
const energyIndex = 0;


const buyList = [
    //Industry
    [
     //Energy
        {
            display(gameData, setGameData, item) {
                return (
                    <div key={item.name} onClick={() => item.buy(gameData, setGameData, item)}
                         className={`upgrade`}>
                        <div
                            className={`upgrade-info-container ${item.canBuy(gameData, item) ? 'can-buy' : 'cannot-buy'}`}>
                            <p className="upgrade-header">
                                {item.name}: {item.cost} -- {(item.energyPerTick * 10).toFixed(3)} per second
                            </p>
                            <p className="upgrade-desc">{item.description}</p>
                        </div>
                        <div className="upgrade-number-container">
                            <p>{item.amount}{item.max && `/${item.max}`}</p>
                        </div>
                    </div>
                )
            },
            list: [
                {
                    name: 'Emergency Generator',
                    description: 'Ancient backup generators that haven\'t been functional for, well, nobody knows how long. The maintenance bots can probably salvage a few',
                    cost: 10,
                    amount: 0,
                    max: 10,
                    energyPerTick: .1,   //Game updates every 100ms
                    canBuyVar: false,
                    canBuy(gameData, item) {
                        return gameData.resourceList[energyIndex].amount >= item.cost && item.amount < item.max;
                    },
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
                    },
                    multiply(gameData, amount) {
                        gameData.resourceList[energyIndex].energyPerTick -= gameData.buyList[0].energyPerTick * gameData.buyList[0].amount;
                        gameData.buyList[0].energyPerTick *= amount;
                        gameData.resourceList[energyIndex].energyPerTick += gameData.buyList[0].energyPerTick * gameData.buyList[0].amount;
                    },
                },
            ],
            lockedElements: [
                {
                    name: 'Solar Panel',
                    description: 'Rows of photovoltaic cells mounted on a sturdy frame. They\'re not very efficient, but they\'re cheap and easy to maintain',
                    cost: 100,
                    amount: 0,
                    energyPerTick: 1,
                    canBuy(gameData, item) {
                        return gameData.resourceList[energyIndex].amount >= item.cost;
                    },
                    buy(gameData, setGameData, item){
                        if (item.canBuy(gameData, item)) {

                        }
                    },
                    canUnlock(gameData, item) {
                        return gameData.resourceList[energyIndex].amount >= 100;
                    }
                }
            ],
        }
    ],
    //Repairs
    [
        //Decryption
        {
            display(gameData, setGameData, item) {
                return (
                    <div key={item.name} onClick={() => item.buy(gameData, setGameData, item)}
                         className={`upgrade`}>
                        <div
                            className={`upgrade-info-container ${item.canBuy(gameData, item) ? 'can-buy' : 'cannot-buy'}`}>
                            <p className="upgrade-header">
                                {item.name}: {item.cost}
                            </p>
                            <p className="upgrade-desc">{item.description}</p>
                        </div>
                    </div>
                )
            }
        }
    ]
]




export {buyList};















