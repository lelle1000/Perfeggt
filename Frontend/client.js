
let InformationIcon = document.getElementById("InformationIcon")
let EggIcon = document.getElementById("EggIcon")
let TimerIcon = document.getElementById("TimerIcon")

let InfoPageContainer = document.getElementById("InfoPageContainer")
let DecisionPageContainer = document.getElementById("DecisionPageContainer")
let TimerPageContainer = document.getElementById("TimerPageContainer")

let SoftBoiled = document.getElementById("soft")
let MediumBoiled = document.getElementById("medium")
let HardBoiled = document.getElementById("hard")

let SmallEgg = document.getElementById("Small")
let MediumEgg = document.getElementById("Medium")
let LargeEgg = document.getElementById("Large")
let XLargeEgg = document.getElementById("XLarge")

let HowManyEggsInput = document.getElementById("HowManyEggsInput")

let SaveChoicesButton = document.getElementById("SaveChoicesButton")

let CompleteChoicesText = document.getElementById("CompleteChoicesText")

let AudioButton = document.getElementById("AudioButton")
let SignalContainer = document.getElementById("SignalContainer")
let TimerSignalExit = document.getElementById("TimerSignalExit")

let EggTimerTime = document.getElementById("EggTimerTime")

let AlarmAudio = document.getElementById("Alarm")
let BeepAudio = document.getElementById("Beep")
let BuzzerAudio = document.getElementById("Buzzer")
let ChimeAudio = document.getElementById("Chime")
let ClickAudio = document.getElementById("Click")
let DingAudio = document.getElementById("Ding")
let TickAudio = document.getElementById("Tick")
let QuackAudio = document.getElementById("Quack")

let AlarmPlayButtonImage = document.getElementById("AlarmPlayButtonImage")
let BeepPlayButtonImage = document.getElementById("BeepPlayButtonImage")
let BuzzerPlayButtonImage = document.getElementById("BuzzerPlayButtonImage")
let ChimePlayButtonImage = document.getElementById("ChimePlayButtonImage")
let ClickPlayButtonImage = document.getElementById("ClickPlayButtonImage")
let DingPlayButtonImage = document.getElementById("DingPlayButtonImage")
let TickPlayButtonImage = document.getElementById("TickPlayButtonImage")
let QuackPlayButtonImage = document.getElementById("QuackPlayButtonImage")

let StartTimer = document.getElementById("StartTimerButton")

let SaveSignalButton = document.getElementById("SaveSignalButton")

let allAudioChoices = [AlarmAudio, BeepAudio, BuzzerAudio, ChimeAudio, ClickAudio, DingAudio, TickAudio, QuackAudio]
let allAudioPlayButtons = [AlarmPlayButtonImage, BeepPlayButtonImage, BuzzerPlayButtonImage, ChimePlayButtonImage, ClickPlayButtonImage, DingPlayButtonImage, TickPlayButtonImage, QuackPlayButtonImage]

const EggCookTimes = {
  soft: { Small: 270000, Medium: 300000, Large: 330000, XLarge: 390000 },
  medium: { Small: 360000, Medium: 390000, Large: 420000, XLarge: 510000 },
  hard: { Small: 480000, Medium: 540000, Large: 600000, XLarge: 720000 }
};

const EggProtein = {Small: 6, Medium: 7, Large: 8, XLarge: 12};

const EggSizes = [SmallEgg, MediumEgg, LargeEgg, XLargeEgg]
const EggCookGrade = [SoftBoiled, MediumBoiled, HardBoiled]

let SavedSignal;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Eventlisteners //

InformationIcon.addEventListener("click", () => {
    ActivatePage(InfoPageContainer)
    InactivePage(DecisionPageContainer)
    InactivePage(TimerPageContainer)

    InformationIcon.src = "./Images-Fonts/SelectedIconNote.png"

    EggIcon.src = "./Images-Fonts/eggIcon.png"

    TimerIcon.src = "./Images-Fonts/three-o-clock-clock.png"
})

EggIcon.addEventListener("click", () => {
    ActivatePage(DecisionPageContainer)
    InactivePage(InfoPageContainer)
    InactivePage(TimerPageContainer)

    InformationIcon.src = "./Images-Fonts/notes.png"

    EggIcon.src = "./Images-Fonts/SelectedIconEgg.png"

    TimerIcon.src = "./Images-Fonts/three-o-clock-clock.png"

})

TimerIcon.addEventListener("click", () => {
    ActivatePage(TimerPageContainer)
    InactivePage(DecisionPageContainer)
    InactivePage(InfoPageContainer)

    InformationIcon.src = "./Images-Fonts/notes.png"

    EggIcon.src = "./Images-Fonts/eggIcon.png"

    TimerIcon.src = "./Images-Fonts/SelectedIconTimer.png"

})

AudioButton.addEventListener("click", () => {
    SignalContainer.classList.remove("Inactive")
    SignalContainer.classList.add("Active")
})

TimerSignalExit.addEventListener("click", () => {
    SignalContainer.classList.remove("Active")
    SignalContainer.classList.add("Inactive")
})


EggCookGrade.forEach(choice => choice.addEventListener("click", () => HandleBoilingClick(choice)))

EggSizes.forEach(egg => egg.addEventListener("click", () => HandleEggClicks(egg)))

allAudioChoices.forEach(choice => choice.addEventListener("click", () => handleAudio(choice)))

SaveChoicesButton.addEventListener("click", () => {

        SaveChoicesButton.style.backgroundColor = "rgb(227, 144, 10)"

        setTimeout(() => {
            SaveChoicesButton.style.backgroundColor = "white" 

            let selectedSize = document.querySelector(".UserSizeChoice")
            let selectedBoil = document.querySelector(".UserBoiledChoice")
            let selectedAmount = Number(HowManyEggsInput.value)

            ChoicesInformation(selectedSize, selectedBoil, selectedAmount)

            ActivatePage(TimerPageContainer)
            InactivePage(DecisionPageContainer)
            InactivePage(InfoPageContainer)

            InformationIcon.src = "./Images-Fonts/notes.png"

            EggIcon.src = "./Images-Fonts/eggIcon.png"

            TimerIcon.src = "./Images-Fonts/SelectedIconTimer.png"

            HowManyEggsInput.value = ""

            EggSizes.forEach(element => element.style.backgroundImage = 'url("./Images-Fonts/EggBasic.png")')
            EggCookGrade.forEach(element => element.style.backgroundColor = "")
        }, 500)
})

SaveSignalButton.addEventListener("click", () => {
    
    let chosenAudio = allAudioChoices.filter(element => element.style.backgroundColor == "rgb(227, 144, 10)")
    
    
    if(SavedSignal) {
        return
    }

    if (chosenAudio.length > 0) {
        let audioElement = chosenAudio[0].querySelector("audio")
        SavedSignal = audioElement;
    }



})

let TimerRunning = false
let TimerInterval;
let CountDownTime = 150

StartTimer.addEventListener("click", () => {
    StartTimer.style.backgroundColor = "rgb(227, 144, 10)"
    setTimeout(() => {
        StartTimer.style.backgroundColor = ""
    }, 500)

    if(TimerRunning) {
        return
    } 
    TimerRunning = true
    
    let TimeArray = EggTimerTime.textContent.split(":");
    let stringToNumber = TimeArray.map(string => Number(string))

    let minutes = stringToNumber[0]
    let seconds = stringToNumber[1]
    
    let totalTime = minutes * 60 + seconds



    TimerInterval = setInterval(() => {
        if (totalTime <= 0) {
            clearInterval(TimerInterval);
            EggTimerTime.textContent = "00:00"
            SavedSignal.play();
            TimerRunning = false;

            return
        }
        
        
        EggTimerTime.textContent = `${minutes}:${seconds}`
        if(seconds <= 0) {
            minutes = minutes - 1
            seconds = 59
        }
        if (seconds < 10) {
            EggTimerTime.textContent = `0${minutes}:0${seconds}`
        } else {
            EggTimerTime.textContent = `0${minutes}:${seconds}`
        }
        seconds = seconds - 1
        totalTime = totalTime - 1
    }, CountDownTime)    
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Functions //


function ActivatePage (page) {
    if(page.classList.contains("Inactive")) {
        page.classList.add("Active")
        page.classList.remove("Inactive")
    }
}

function InactivePage (page) {
    if(page.classList.contains("Active")) {
        page.classList.add("Inactive")
        page.classList.remove("Active")
    }
}

function HandleEggClicks(clickedEgg) {
    const clickedImage = 'url("./Images-Fonts/ClickedEgg.png")';
    const basicImage = 'url("./Images-Fonts/EggBasic.png")'

    if(clickedEgg.style.backgroundImage === clickedImage) {
        clickedEgg.style.backgroundImage = basicImage
        clickedEgg.classList.remove("UserSizeChoice")
    } else {
        EggSizes.forEach(egg => {
            egg.classList.remove("UserSizeChoice")
            egg.style.backgroundImage = basicImage
        })
    }

    clickedEgg.style.backgroundImage = clickedImage
    clickedEgg.classList.add("UserSizeChoice")
}

function HandleBoilingClick(clickedGrade) {
    const clickedStyle = "rgb(227, 144, 10)"
    const regularStyle = ""

    if(clickedGrade.style.backgroundColor == clickedStyle) {
        clickedGrade.style.backgroundColor = regularStyle
        clickedGrade.classList.remove("UserBoiledChoice")
    } else {
        EggCookGrade.forEach(boilGrade =>  {
            boilGrade.style.backgroundColor = regularStyle
            boilGrade.classList.remove("UserBoiledChoice")
        })
        
    }

    clickedGrade.style.backgroundColor = clickedStyle;
    clickedGrade.classList.add("UserBoiledChoice")

}

function handleAudio(audioChoice) {

    let clickedAudio = "rgb(227, 144, 10)"
    let regular = "white"

    let PlayButtonImage = "./Images-Fonts/play.png"
    let PaueButtonImage = "./Images-Fonts/pause.png"

    if(audioChoice.style.backgroundColor == clickedAudio) {
        audioChoice.style.backgroundColor = regular
    } else {
        allAudioChoices.forEach(button => {
        button.style.backgroundColor = regular
        let img = button.querySelector('img')
        if (img) {
            img.src = PlayButtonImage
        }

        })
    }

    audioChoice.style.backgroundColor = clickedAudio
    const clickedImage = audioChoice.querySelector('img')
    const audioFile = audioChoice.querySelector('audio')
    if(clickedImage) {
        clickedImage.src = PaueButtonImage
        audioFile.play()
    }

    
}

function ChoicesInformation (eggSize, boiled, amount) {

    if (eggSize && boiled && typeof amount == "number" && amount > 0) {
        let size = eggSize.id
        let boilType = boiled.id.toLowerCase()
        let amountOfEggs = amount

        let cookTime = EggCookTimes[boilType][size]

        EggTimerTime.textContent = msToTime(cookTime)

        let ProteinCount = EggProtein[size] * amountOfEggs

        CompleteChoicesText.textContent = `You are ${boilType}-boiling ${amountOfEggs} ${size} eggs, which containts roughly ${ProteinCount} grams of protein!`

    } else {
        CompleteChoicesText.textContent = "Please fill in all the requirements before starting them timer (also put a digit in the amount of eggs)!"
    }

}


function msToTime (ms) {
    let s = ms / 1000;
    let m = s / 60;
    let minutes = Math.trunc(m);
    let seconds = (m % 1) * 60;

    let FullNumberMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
    let FullNumberSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
    return `${FullNumberMinutes}:${FullNumberSeconds}`;
}