import "./App.css"
import {useEffect, useRef} from 'react';

function Console ({gameData}) {
    const consoleRef = useRef(null);
    const reversedMessages = [...gameData.messageList].reverse();

    const handleScroll = (e) => {
        const container = consoleRef.current;
        if (container) {
            container.scrollTop += e.deltaY;
        }
    };

    useEffect(() => {
        const container = consoleRef.current;
        container.addEventListener('wheel', handleScroll);
        return () => container.removeEventListener('wheel', handleScroll);
    }, []);

    return (
        <div className="console" ref={consoleRef}>
            {reversedMessages.map((message) => (
                <div key={message.name}>
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