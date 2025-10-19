
let InformationIcon = document.getElementById("InformationIcon")
let EggIcon = document.getElementById("EggIcon")
let TimerIcon = document.getElementById("TimerIcon")

let InfoPageContainer = document.getElementById("InfoPageContainer")
let DecisionPageContainer = document.getElementById("DecisionPageContainer")
let TimerPageContainer = document.getElementById("TimerPageContainer")

let SoftBoiled = document.getElementById("SoftBoiled")
let MediumBoiled = document.getElementById("MediumBoiled")
let HardBoiled = document.getElementById("HardBoiled")

let SmallEgg = document.getElementById("SmallEgg")
let MediumEgg = document.getElementById("MediumEgg")
let LargeEgg = document.getElementById("LargeEgg")
let XLargeEgg = document.getElementById("XLargeEgg")

let HowManyEggsInput = document.getElementById("HowManyEggsInput")

let SaveChoicesButton = document.getElementById("SaveChoicesButton")

let CompleteChoicesText = document.getElementById("CompleteChoicesText")

let AudioButton = document.getElementById("AudioButton")
let SignalContainer = document.getElementById("SignalContainer")
let TimerSignalExit = document.getElementById("TimerSignalExit")

const EggSizes = [SmallEgg, MediumEgg, LargeEgg, XLargeEgg]
const EggCookGrade = [SoftBoiled, MediumBoiled, HardBoiled]

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



SaveChoicesButton.addEventListener("click", () => {

        SaveChoicesButton.style.backgroundColor = "rgb(227, 144, 10)"

        setTimeout(() => {
            SaveChoicesButton.style.backgroundColor = "white" 

            let selectedSize = document.querySelector(".UserSizeChoice")
            let selectedBoil = document.querySelector(".UserBoiledChoice")
            let selectedAmount = HowManyEggsInput.value

            ChoicesInformation(selectedSize, selectedBoil, selectedAmount)

            ActivatePage(TimerPageContainer)
            InactivePage(DecisionPageContainer)
            InactivePage(InfoPageContainer)

            InformationIcon.src = "./Images-Fonts/notes.png"

            EggIcon.src = "./Images-Fonts/eggIcon.png"

            TimerIcon.src = "./Images-Fonts/SelectedIconTimer.png"

            EggSizes.forEach(element => element.style.backgroundImage = 'url("./Images-Fonts/EggBasic.png")')
            EggCookGrade.forEach(element => element.style.backgroundColor = "")
        }, 500)
    })


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

function ChoicesInformation (size, boiled, amount) {

    if (size && boiled && amount) {

    } else {
        CompleteChoicesText.textContent = "Please fill in all the requirements before starting them timer!"
    }

}