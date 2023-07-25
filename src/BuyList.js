import './App.css'
import {useEffect, useState} from 'react'

const energyIndex = 0;

function BuyList({gameData, setGameData}) {
    //Should never be empty aside from the beginning of the game
    if (gameData.buyList.length === 0 || gameData.activeNavBarElement === -1) {
        return;
    }

    return (
        <div>
            <NavBar gameData={gameData} setGameData={setGameData}/>
            {gameData.buyList.map((item) => (
                <div key={item.name} onClick={() => item.buy(gameData, setGameData, item)}
                     className={`upgrade ${item.canBuy(gameData) ? 'can-buy' : 'cannot-buy'}`}>
                    <div className="upgrade-info-container">
                        <p className="upgrade-header">
                            {item.name}: {item.cost}
                        </p>
                        <p className="upgrade-desc">{item.description}</p>
                    </div>
                    <div className="upgrade-number-container">
                        <p>{item.amount} / 10</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

function NavBar({gameData, setGameData}) {
    return (
        <div className="navbar">
            {gameData.navBarList.map((item) => (
                <div key={item.name} onClick={() => item.onClick(gameData, setGameData, item)} className='nav-item'>
                    <p>{item.name}</p>
                </div>
            ))}
        </div>
    )
}

let generator = {
    name: 'Emergency Generator',
    description: 'Ancient backup generators that haven\'t been functional for, well, nobody knows how long. The maintenance bots can probably salvage a few',
    cost: 10,
    amount: 0,
    energyPerTick: .1,   //Game updates every 100ms
    canBuy(gameData) {
        return gameData.resourceList[energyIndex].amount >= this.cost && this.amount < 10;
    },
    unlockCondition: (gameData) => {
        return gameData.resourceList[energyIndex].amount >= 10;
    },
    buy: (gameData, setGameData, item) => {
        if (item.canBuy(gameData)) {
            item.amount += 1;
            item.cost += 10;
            setGameData((prevGameData) => {
                const updatedGameData = {...prevGameData};
                updatedGameData.resourceList[energyIndex].amount -= 10;
                updatedGameData.resourceList[energyIndex].perTick += item.energyPerTick;
                return updatedGameData;
            });
        }
    }
};

//This unlock method works for when you know the order in which things will be unlocked
//NOT GOOD for something like a tech tree where you don't know the order
function updateUnlockedList(gameData) {
    if (gameData.lockedBuyList.length !== 0 && gameData.lockedBuyList[0].unlockCondition(gameData)) {
        gameData.buyList.push(gameData.lockedBuyList[0]);
        gameData.lockedBuyList.shift();
    }
}

function initializeLists(gameData) {
    gameData.lockedBuyList.push(generator);
    initializeNavbar(gameData);
}

function initializeNavbar(gameData) {
    let power = {
        name: 'Energy',
        index: 0,
        onClick: (gameData, setGameData, item) => {
            setGameData((prevGameData) => {
                const updatedGameData = {...prevGameData};
                updatedGameData.activeNavBarElement = item.index;
                return updatedGameData;
            });
        }
    }
    gameData.navBarList.push(power);
}

//All the stuff that can be bought declared down here


export {BuyList, updateUnlockedList, initializeLists};
