import React from "react"

function Header(props) {
    const winnerCongrats = [
        "🎉 You did it!",
        "🎊 Nice Job!",
        "✨ Good Game!"
    ]
    const rndNum =  Math.floor(Math.random() * winnerCongrats.length)
    let headerContent = ""
    let subHeaderContent = ""
    
    if(!props.isActive && !props.tenzies) {
        headerContent = "Tenzies"
    } else if(props.isActive) {
        headerContent = `Time: ${props.time} - Rolls: ${props.rolls}`
    } else {
        headerContent = winnerCongrats[rndNum]
    }
    
    if (!props.tenzies) {
        subHeaderContent = "Roll until all dice are the same. Click each die to freeze it at its current value between rolls."
    } else {
        subHeaderContent = "If you enjoyed my version of Tenzies, I would like to hear your feedback!"
    }

    return (
        <>
            <h1 className="title"> 
                {headerContent}
            </h1>
            <p className="description">
                {subHeaderContent}
            </p>
        </>
    )
}
export default React.memo(Header)