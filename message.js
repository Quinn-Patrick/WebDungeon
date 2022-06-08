const messageQueue = [];
let dialogueActive = false;
export let dialoguePromise;

export function initiateMessages(){
    if(!dialogueActive && messageQueue.length > 0){
        dialogueActive = true;
        dialoguePromise = displayMessage();
    }
    return dialoguePromise;
}

async function displayMessage(){
    return new Promise(function(resolve){
        setTextToMessage();
        document.getElementById("advanceDialogue").innerHTML = '<button id = "nextButton">Next</button>';

        //This button has an event listener which advances text as long as there is text in the message queue,
        //and will resolve the promise when the message queue is empty.
        //This is so that all of the battle actions will wait until the messages have been advanced.
        document.getElementById("nextButton").addEventListener("click", function() {
            if(typeof messageQueue[0] !== 'undefined'){
                setTextToMessage();
            }else{
                document.getElementById("dialogue").innerHTML = "";
                document.getElementById("nextButton").remove();
                resolve();
                dialogueActive = false;
            }
        });
    })
}

function setTextToMessage(){
    let content = messageQueue.shift();
        document.getElementById("dialogue").innerHTML = content;
}

export function appendMessage(content){
    messageQueue.push(content);
}

export function isDialogueActive(){
    return dialogueActive;
}