
let NoteIcon = document.getElementById("NoteIcon")
let EggIcon = document.getElementById("EggIcon")
let TimerIcon = document.getElementById("TimerIcon")

let InfoPageContainer = document.getElementById("InfoPageContainer")
let DecisionPageContainer = document.getElementById("DecisionPageContainer")
let TimerPageContainer = document.getElementById("TimerPageContainer")

NoteIcon.addEventListener("click", () => {
    ActivatePage(InfoPageContainer)
    InactivePage(DecisionPageContainer)
    InactivePage(TimerPageContainer)
})

EggIcon.addEventListener("click", () => {
    ActivatePage(DecisionPageContainer)
    InactivePage(InfoPageContainer)
    InactivePage(TimerPageContainer)
})

TimerIcon.addEventListener("click", () => {
    ActivatePage(TimerPageContainer)
    InactivePage(DecisionPageContainer)
    InactivePage(InfoPageContainer)
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
