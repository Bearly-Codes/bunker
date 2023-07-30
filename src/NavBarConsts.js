//ALL UNLOCKING is handled in the NAVBAR, NO UNLOCKING LOGIC IN BUYLIST

//Constants for use in the industry list

//TODO: Move click function into NavBar?
const clickFunction = (gameData, setGameData, item) => {
    setGameData((prevGameData) => {
        const updatedGameData = {...prevGameData};
        updatedGameData.activeSubBarElement = item.index;
        return updatedGameData;
    });
}
const industryNavElements = [
    //Initial unlocked industry nav elements
    {
        name: 'Energy',
        index: 0,
        onClick: clickFunction,
    },
]

const lockedIndustryNavElements = [
    //Nav elements that will unlock as the game progresses
    {
        name: 'SET ME',
        index: 1,
        onClick: clickFunction,
        canUnlock(gameData) {
        return false;   //Add condition for unlocking here, RETURNS does not automatically unlock
        },
    },
]

//Constants for the main nav bar
const mainClickFunction = (gameData, setGameData, item) => {
    setGameData((prevGameData) => {
        const updatedGameData = {...prevGameData};
        updatedGameData.activeNavBarElement = item.index;
        return updatedGameData;
    });
}
const mainNavBar = [
    {
        name: 'Industry',
        index: 0,
        onClick: mainClickFunction,
        canUnlock(gameData) {
            return true;
        },
        subNavBar: industryNavElements,
        lockedNavElements: lockedIndustryNavElements
    },
]

const lockedMainNavBar = [
    {
        name: 'Repairs',
        index: 1,
        onClick: mainClickFunction,
        canUnlock(gameData) {
            if (gameData.gameStage === 1) {
                gameData.navBarList[gameData.navBarList.length] = this;
                gameData.lockedNavBarList.shift();
            }
        },
        lockedNavElements: [],

    },
]

export {mainNavBar, lockedMainNavBar};