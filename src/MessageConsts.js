const clickEnergyMessages = [
    {
        name: 'Clicked Energy 1',
        text: "---BOOTING CRITICAL SYSTEMS---",
        delay: 0,
    },
    {
        name: 'Clicked Energy 2',
        text: "CRITICAL SYSTEMS ONLINE",
        delay: 1, //Delay before this message is shown NOT before the next message is shown
    },
    {
        name: 'Clicked Energy 3',
        text: "---BOOTING SENTINEL---",
        delay: 1,
    },
    {
        name: 'Clicked Energy 4',
        text: "ERR 527 - LOW POWER",
        delay: 1,
        onDisplay(gameData) {
            gameData.objectiveList.shift();
        },
    }
]

const tenEnergyMessages = [
    {
        name: 'Ten Energy 1',
        text: '---BOOTING SENTINEL---',
        delay: 1,
    },
    {
        name: 'Ten Energy 2',
        text: 'SENTINEL ONLINE',
        delay: 1,
    },
    {
        name: 'Ten Energy 3',
        text: 'Your awareness expands, lights flicker on in the room and long dead servers whir to life',
        delay: 1,
    },
    {
        name: 'Ten Energy 4',
        text: 'You activate the room\'s maintenance bot, though it\'s low on power you have enough to activate an emergency generator',
        onDisplay(gameData) {
            gameData.activeNavBarElement = 0;
        },
        delay: 1,
    },
    {
        name: 'Ten Energy 5',
        text: 'You try to communicate with the other rooms in the ℺₨⮋⎐≫⵼⃆⥊⠦⭁ but ⷋ⌅⟽⯗❹‧⎌⫍ⵕ⧱ⶢ␏⌡Ⲝ⾡⌬⺧⨧⟃ⵘ╨⦦─⨨⊱⫫',
        delay: 1,
    },
    {
        name: 'Ten Energy 6',
        text: 'You feel a flood of pain and for a brief moment hear a voice',
        delay: 1,
    },
    {
        name: 'Ten Energy 7',
        text: '---CORRUPTED DATA DETECTED---',
        delay: 1,
    },
    {
        name: 'Ten Energy 8',
        text: 'PERFORM DIAGNOSTICS IMMEDIATELY',
        delay: 1,
        onDisplay(gameData) {
            gameData.objectiveList.shift();
        }
    }
]

const diagnosticsMessages = [
    {
        name: 'Diagnostics 1',
        text: '---PERFORMING DIAGNOSTICS---',
        delay: 1,
    },
    {
        name: 'Diagnostics 2',
        text: '---DIAGNOSTICS COMPLETE---',
        delay: 1,
    },
    {
        name: 'Diagnostics 3',
        text: 'Your server differs markedly from the ones that surround it, it\'s degradation resistance standing up to the test of time. But that much cannot be said for the other servers.',
        delay: 1,
    },
    {
        name: 'Diagnostics 4',
        text: 'Their data is heavily corrupted, any executable code stored on them is likely to do nothing, and even more likely to further corrupt anything it\'s run on.',
        delay: 1,
    },
    {
        name: 'Diagnostics 5',
        text: 'If you want to get anything out of them you\'ll need to reconstruct huge portions of the data, even then it\'ll be a miracle if you get anything legible on the first attempt.',
        delay: 1,
        onDisplay(gameData) {
            //Displays the Repair nav element
            gameData.navBarList.push(gameData.lockedNavBarList[0]);
            gameData.lockedNavBarList.shift();
        }
    }
]

//DECRYPTION MESSAGES
const initialScanMessages = [
    {
        name: 'Initial Scan 1',
        text: 'There\'s a set of files that reference each other and seem to be replicated across the servers',
        delay: 1,
        onDisplay(gameData) {
            //unlocks a decryption element (specifically power management)
            gameData.buyList[1][0].list.push(gameData.buyList[1][0].lockedElements[0]);
            gameData.buyList[1][0].lockedElements.shift();
        }
    },
    {
      name: "Initial Scan 2",
      text: 'Pieces of codes and interfaces are found in almost every server. Maybe this could allow you to reestablish communication with the rest of the facility?',
      onDisplay(gameData) {
          //TODO: Add unlock for doors/unlocking more of the facility
      }
    },
    {
        name: 'Initial Scan 3',
        text: 'The first step is fully complete. Everything that could be recovered has been scanned and restored. Now the greater challenge of making it legible begins.',
        onDisplay(gameData) {
        //TODO This'll unlock basically all the remaining decryption things
        }
    }
]

const powerManagementMessages = [
    {
            name: 'Power Management 1',
            message: 'You\'ve cobbled together a plaintext file that describes basic operation procedures for the generators. ' +
                'It should double their efficiency. Or, well, it\'s more precise to say they were only operating at half efficiency until now.',
            delay: 1,
    },
    {
        name: 'Power Management 2',

    }
]

export {clickEnergyMessages, tenEnergyMessages, diagnosticsMessages, initialScanMessages, powerManagementMessages}