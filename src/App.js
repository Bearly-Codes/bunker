import './App.css';
import {useEffect, useState} from "react";
import {BuyList, updateUnlockedList, initializeLists} from "./BuyList";
import {initializeResourcePanel, ResourcePanel, updateResourcePanel} from "./ResourcePanel";
import {Console, updateMessages} from "./Console";
import {Objective, initializeObjectives, updateGameStage} from "./Objective";


const energyIndex = 0;

class GameData {
    constructor() {
        this.buyList = [];
        this.lockedBuyList = [];
        this.researchList = [];
        this.resourceList = [];
        this.lockedResourceList = [];
        this.messageList = [];
        this.messagesToSend = []; //Used for storing messages to delay parts of messages
        this.objectiveList = [];
        this.navBarList = [];
        this.lockedNavBarList = [];
        this.activeNavBarElement = -1; //Begins as -1 until unlocked after getting 10 energy
        this.activeSubBarElement = 0; //Specifically for the nab bar under the nav bar
        this.gameStage = 0;

        initializeResourcePanel(this);
        initializeLists(this);
        initializeObjectives(this);
    }
}

let initialData = new GameData();

function App() {
    const [gameData, setGameData] = useState(initialData);

    useEffect(() => {
        const intervalID = setInterval(update, 100);
        return () => clearInterval(intervalID);
    }, []);

    //TODO: Add in containers for the sections of the game

    return (
        <div className>
            <div className="top-container">
                <Objective gameData={gameData}/>
            </div>
            <div className="main-container">
                <div className="left-container">
                    <button onClick={addEnergy} className="energy-button" />
                    <ResourcePanel gameData={gameData}/>
                </div>
                <div className="center-container">
                    <BuyList setGameData={setGameData} gameData={gameData}/>
                </div>
                <div className="right-container">
                    <Console gameData={gameData}/>
                </div>
            </div>
        </div>
    );

    function addEnergy() {
        setGameData((prevGameData) => {
            const updatedGameData = {...prevGameData};
            updatedGameData.resourceList[energyIndex].amount += 1
            updateUnlockedList(updatedGameData);
            updateResourcePanel(updatedGameData);
            return updatedGameData;
        });
    }

    function update() {
        setGameData((prevGameData) => {
            const updatedGameData = {...prevGameData};
            updateUnlockedList(updatedGameData); //moves items from locked to unlocked
            updateResourcePanel(gameData); //Unlocks new resources if a condition is met
            updateMessages(updatedGameData); //Displays messages in the queue
            updateGameStage(updatedGameData); //Checks to see if objective is met and updates it
            return updatedGameData;
        });
    }


}

export default App;
