const messageQueue = [];
let dialogueActive = false;
export let dialoguePromise;

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
            if(messageQueue.length > 0){
                let content = messageQueue.shift();
                document.getElementById("dialogue").innerHTML = content;
            }else{
                document.getElementById("dialogue").innerHTML = "";
                document.getElementById("nextButton").remove();
                resolve();
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