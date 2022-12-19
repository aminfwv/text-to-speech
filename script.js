const textArea = document.querySelector("#text");
let voiceList = document.querySelector("#voice");
let speechBtn = document.querySelector(".submit");

let synth = speechSynthesis;
let isSpeaking = false;

function voiceSpeech(){
    for(let voice of synth.getVoices()){
        let option = document.createElement("option");
        option.innerText = voice.name;
        voiceList = add(option);
        console.log(option);
    }
}

synth.addEventListener("voiceschanged", voiceSpeech);

function textToSpeech(text){
    let utternance = new SpeechSynthesisUtterance(text);
    for(let voice of synth.getVoices()){
        if(voice.name === voiceList.value){
            utternance.voice = voice;
        }
    }
    speechSynthesis.speak(utternance)
}

speechBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    if(textArea.value != ''){
        if(!synth.speaking){
            textToSpeech(textArea.value);
        }
        if(textArea.value.length > 100){
            if(!isSpeaking){
                synth.resume();
                isSpeaking = true;
                speechBtn.innerText = "Pause Speech";
            }else{
                synth.pause();
                isSpeaking = false;
                speechBtn.innerText = "Resume Speech";
            }
            setInterval(()=>{
                if(!synth.speaking){
                    isSpeaking = false;
                    speechBtn.innerText = "Convert To Speech";
                }
            })
        }else{
            speechBtn.innerText = "Convert To Speech";
        }
    }
});

// textArea.value = "";