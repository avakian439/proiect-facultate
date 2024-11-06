// merge dar imi cauzeaza o constanta nevoie de a vomita 
// TODO: rescrie asta

function buttonClickedFishing(){
    let element = document.querySelector('#fishing')
    if (element.classList.contains('selected')) {
        return
    } else 
    {
        document.querySelector('.selected').classList.remove('selected')
        element.classList.add('selected')
    }
}

function buttonClickedFarming(){
    let element = document.querySelector('#farming')
    if (element.classList.contains('selected')) {
        return
    } else 
    {
        document.querySelector('.selected').classList.remove('selected')
        element.classList.add('selected')
    }
}

function buttonClickedCooking(){
    let element = document.querySelector('#cooking')
    if (element.classList.contains('selected')) {
        return
    } else 
    {
        document.querySelector('.selected').classList.remove('selected')
        element.classList.add('selected')
    }
}

function buttonClickedCombat(){
    let element = document.querySelector('#combat')
    if (element.classList.contains('selected')) {
        return
    } else 
    {
        document.querySelector('.selected').classList.remove('selected')
        element.classList.add('selected')
    }
}

