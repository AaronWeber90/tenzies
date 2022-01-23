import React from "react"

export default function Controls(props) {

    return (
        <>
            <h2 className="controls">Controls</h2>
            <button className="btn control-btn" onClick={props.handlePause}>{props.isPaused ? "Resume" : "Pause"}</button>
            <button className="btn control-btn" onClick={props.handleStop}>End Game</button>
        </>
    )
}