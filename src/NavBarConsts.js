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

const repairNavElement = [
    //Initial unlocked industry nav elements
    {
        name: 'Restore',
        index: 0,
        onClick: clickFunction,
    },
]

const lockedRepairNavElements = [
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
//Include a canUnlock function to unlock the function if there's no player event that unlocks it
//EG use a canUnlock if a threshold needs to be met, manually unlock if the player buying an upgrade unlocks it
const mainClickFunction = (gameData, setGameData, item) => {
    setGameData((prevGameData) => {
        const updatedGameData = {...prevGameData};
        updatedGameData.activeSubBarElement = 0;
        updatedGameData.activeNavBarElement = item.index;
        return updatedGameData;
    });
}
const mainNavBar = [
    {
        name: 'Industry',
        index: 0,
        onClick: mainClickFunction,
        subNavBar: industryNavElements,
        lockedNavElements: lockedIndustryNavElements
    },
]

const lockedMainNavBar = [
    {
        name: 'Repairs',
        index: 1,
        onClick: mainClickFunction,
        subNavBar: repairNavElement,
        lockedNavElements: lockedRepairNavElements,

    },
]

export {mainNavBar, lockedMainNavBar};