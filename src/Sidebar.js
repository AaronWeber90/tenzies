import React from "react"
import Scoreboard from "./Scoreboard"
import Controls  from "./Controls"

export default function Sidebar(props) {

    return (
        <aside className={`sidebar ${props.isActive ? "sidebar-controle" : "sidebar-scoreboard"}`}>
            {props.isActive ? 
            <Controls 
                handlePause={props.handlePause}
                handleStop={props.handleStop} 
                isPaused={props.isPaused}
            /> :
            <Scoreboard 
                scoreData={props.scoreData}
                sortRolls={props.sortRolls}
                sortTime={props.sortTime}
                sortDay={props.sortDay}
                sorting={props.sorting}
                deleteScore={props.deleteScore}
            />}
        </aside>
    )
}

//https://www.geeksforgeeks.org/create-a-stop-watch-using-reactjs/