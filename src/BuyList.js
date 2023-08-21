import './App.css'
import {useEffect, useState} from 'react'
import {mainNavBar, lockedMainNavBar} from "./NavBarConsts";
import {NavBar, SubNavBar} from "./NavBar";
import {buyList} from "./BuyListConsts";
//ALL UNLOCKING is handled in the NAVBAR, NO UNLOCKING LOGIC IN BUYLIST

const energyIndex = 0;


//

function BuyList({gameData, setGameData}) {
    //Should never be empty aside from the beginning of the game
    if (gameData.buyList.length === 0 || gameData.activeNavBarElement === -1) {
        return;
    }

    if (!gameData.buyList[gameData.activeNavBarElement]) {
        return (
            <div>
                <p>Err no main element</p>
            </div>
        )
    }

    if (!gameData.buyList[gameData.activeNavBarElement][gameData.activeSubBarElement]) {
        return (
            <div>
                <p>Err no sub element</p>
            </div>
        )
    }

    if (!gameData.buyList[gameData.activeNavBarElement][gameData.activeSubBarElement].list) {
        return (
            <div>
                <p>Err no list</p>
            </div>
        )
    }


    return (
        <div>
            <NavBar gameData={gameData} setGameData={setGameData} elements={gameData.navBarList}/>
            {gameData.navBarList[gameData.activeNavBarElement].subNavBar &&
                <SubNavBar gameData={gameData} setGameData={setGameData}
                           elements={gameData.navBarList[gameData.activeNavBarElement].subNavBar}/>}
            {
                gameData.buyList[gameData.activeNavBarElement][gameData.activeSubBarElement].list.map((item) => (
                    gameData.buyList[gameData.activeNavBarElement][gameData.activeSubBarElement].display(gameData, setGameData, item)))
            }
        </div>
    )
}


//This unlock method works for when you know the order in which things will be unlocked
//NOT GOOD for something like a tech tree where you don't know the order
function updateUnlockedList(gameData) {
    updateNavBar(gameData);
    updateBuyList(gameData);
}

function initializeLists(gameData) {
    gameData.buyList = buyList;
    initializeNavBar(gameData);

}

function initializeNavBar(gameData) {
    gameData.navBarList = mainNavBar;
    gameData.lockedNavBarList = lockedMainNavBar;
}

function updateNavBar(gameData) {
    if (gameData.activeNavBarElement !== -1) {
        //Some navBar elements don't have canUnlock functions, they'll manually in response to player actions, threshold based unlocks will use canUnlock
        while (gameData.lockedNavBarList.length !== 0 && gameData.lockedNavBarList[0].canUnlock && gameData.lockedNavBarList[0].canUnlock(gameData)) {
            gameData.navBarList.push(gameData.lockedNavBarList[0]);
            gameData.lockedNavBarList.shift();
        }
        while (gameData.navBarList[gameData.activeNavBarElement].lockedNavElements.length !== 0 && gameData.navBarList[gameData.activeNavBarElement].lockedNavElements[0].canUnlock
        && gameData.navBarList[gameData.activeNavBarElement].lockedNavElements[0].canUnlock(gameData)) {
            gameData.navBarList[gameData.activeNavBarElement].subNavBar.push(gameData.navBarList[gameData.activeNavBarElement].lockedNavElements[0]);
            gameData.navBarList[gameData.activeNavBarElement].lockedNavElements.shift();
        }
    }
}

//Updates the items that are currently displayed
//WILL crash if lists are improperly initialized
function updateBuyList(gameData) {
    if (gameData.activeNavBarElement !== -1) {
        gameData.buyList[gameData.activeNavBarElement][gameData.activeSubBarElement].list.forEach((item) => {
            item.canBuyVar = item.canBuy(gameData, item);
        })
        //Similar to above, some locked elements don't have canUnlock functions, they're manually unlocked elsewhere in the code
        while (gameData.buyList[gameData.activeNavBarElement][gameData.activeSubBarElement].lockedElements.length !== 0 && gameData.buyList[gameData.activeNavBarElement][gameData.activeSubBarElement].lockedElements[0].canUnlock
        && gameData.buyList[gameData.activeNavBarElement][gameData.activeSubBarElement].lockedElements[0].canUnlock(gameData)) {
            gameData.buyList[gameData.activeNavBarElement][gameData.activeSubBarElement].list.push(gameData.buyList[gameData.activeNavBarElement][gameData.activeSubBarElement].lockedElements[0]);
            gameData.buyList[gameData.activeNavBarElement][gameData.activeSubBarElement].lockedElements.shift();
        }
    }
}

//All the stuff that can be bought declared down here


export {BuyList, updateUnlockedList, initializeLists};
