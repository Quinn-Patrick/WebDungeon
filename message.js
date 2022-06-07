const messageQueue = [];
let dialogueActive = false;
let dialoguePromise;

export function initiateMessages(){
    if(!dialogueActive){
        dialogueActive = true;
        dialoguePromise = displayMessage();
    }
    return dialoguePromise;
}

async function displayMessage(){
    return new Promise(function(resolve){
        let content = messageQueue.shift();
        document.getElementById("dialogue").innerHTML = content;
        document.getElementById("advanceDialogue").innerHTML = '<button id = "nextButton">Next</button>';
        document.getElementById("nextButton").addEventListener("click", function() {
            resolve();
            document.getElementById("dialogue").innerHTML = "";
            document.getElementById("nextButton").remove();
            if(messageQueue.length > 0){
                displayMessage();
            }else{
                dialogueActive = false;
            }
        });
    })
}

export function appendMessage(content){
    messageQueue.push(content);
}

export function isDialogueActive(){
    return dialogueActive;
}