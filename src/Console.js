import "./App.css"
import {useEffect, useRef} from 'react';


//TODO: Fix bug with text scrolling past the top of the console
function Console ({gameData}) {
    const reversedMessages = gameData.messageList.slice(0).reverse();

    return (
            <div className="console">
                {reversedMessages.map((message) => (
                    <div key={message.name} className="console-message">
                        <p>{message.text}</p>
                    </div>
                    ))}
            </div>
    )
}

//This function aids in delaying messages
//Used for thematic purposes, doesn't actually create messages
//Also runs the onDisplay function for messages
function updateMessages(gameData) {
    if (gameData.messagesToSend.length !== 0) {
        if (gameData.messagesToSend[0].delay <= 0) {
            if (gameData.messagesToSend[0].onDisplay) {
                gameData.messagesToSend[0].onDisplay(gameData);
            }
            gameData.messageList.push(gameData.messagesToSend[0]);
            gameData.messagesToSend.shift();
        } else {
            gameData.messagesToSend[0].delay -= 1;
        }
    }
}

export  {Console, updateMessages};