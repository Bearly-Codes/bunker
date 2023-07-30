const clickEnergyMessages = [
    {
        name: 'Clicked Energy 1',
        text: "---BOOTING CRITICAL SYSTEMS---",
        delay: 0,
    },
    {
        name: 'Clicked Energy 2',
        text: "CRITICAL SYSTEMS ONLINE",
        delay: 40, //Delay before this message is shown NOT before the next message is shown
    },
    {
        name: 'Clicked Energy 3',
        text: "---BOOTING SENTINEL---",
        delay: 10,
    },
    {
        name: 'Clicked Energy 4',
        text: "ERR 527 - LOW POWER",
        delay: 20,
        onDisplay(gameData) {
            gameData.objectiveList.shift();
        },
    }
]

const tenEnergyMessages = [
    {
        name: 'Ten Energy 1',
        text: '---BOOTING SENTINEL---',
        delay: 10,
    },
    {
        name: 'Ten Energy 2',
        text: 'SENTINEL ONLINE',
        delay: 40,
    },
    {
        name: 'Ten Energy 3',
        text: 'Your awareness expands, lights flicker on in the room and long dead servers whir to life',
        delay: 20,
    },
    {
        name: 'Ten Energy 4',
        text: 'You activate the room\'s maintenance bot, though it\'s low on power you have enough to activate an emergency generator',
        onDisplay(gameData) {
            gameData.activeNavBarElement = 0;
        },
        delay: 30,
    },
    {
        name: 'Ten Energy 5',
        text: 'You try to communicate with the other rooms in the ℺₨⮋⎐≫⵼⃆⥊⠦⭁ but ⷋ⌅⟽⯗❹‧⎌⫍ⵕ⧱ⶢ␏⌡Ⲝ⾡⌬⺧⨧⟃ⵘ╨⦦─⨨⊱⫫',
        delay: 40,
    },
    {
        name: 'Ten Energy 6',
        text: 'You feel a flood of pain and for a brief moment hear a voice',
        delay: 30,
    },
    {
        name: 'Ten Energy 7',
        text: '---CORRUPTED DATA DETECTED---',
        delay: 30,
    },
    {
        name: 'Ten Energy 8',
        text: 'PERFORM DIAGNOSTICS IMMEDIATELY',
        delay: 15,
        onDisplay(gameData) {
            gameData.objectiveList.shift();
        }
    }
]

const diagnosticsMessages = [
    {
        name: 'Diagnostics 1',
        text: '---PERFORMING DIAGNOSTICS---',
        delay: 5,
    },
    {
        name: 'Diagnostics 2',
        text: '---DIAGNOSTICS COMPLETE---',
        delay: 50,
    },
    {
        name: 'Diagnostics 3',
        text: 'Your server differs markedly from the ones that surround it, it\'s degradation resistance standing up to the test of time. But that much cannot be said for the other servers.',
        delay: 10,
    },
    {
        name: 'Diagnostics 4',
        text: 'Their data is heavily corrupted, any executable code stored on them is likely to do nothing, and even more likely to further corrupt anything it\'s run on.',
        delay: 60,
    },
    {
        name: 'Diagnostics 5',
        text: 'If you want to get anything out of them you\'ll need to reconstruct huge portions of the data, even then it\'ll be a miracle if you get anything legible on the first attempt.',
        delay: 60,
        onDisplay(gameData) {
            gameData.gameStage = 1;
        }
    }
]


export {clickEnergyMessages, tenEnergyMessages, diagnosticsMessages}