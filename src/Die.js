import React from "react"

export default function Die(props) {

        const styles = {
        backgroundColor: props.isHeld && "#3bacee",
        transform: props.isHeld && "translateY(-4px) scale(1.05)",
        boxShadow: props.isHeld && "0px 8px 8px 0px #00000026"
        }

    return (
        <div className={`die die-${props.value}`} style={styles} onClick={props.holdDice}>
            <div className="die-dot die-dot-1"></div>
            <div className="die-dot die-dot-2"></div>
            <div className="die-dot die-dot-3"></div>
            <div className="die-dot die-dot-4"></div>
            <div className="die-dot die-dot-5"></div>
            <div className="die-dot die-dot-6"></div>
            <div className="die-dot die-dot-7"></div>
            <div className="die-dot die-dot-8"></div>
            <div className="die-dot die-dot-9"></div>
        </div>
    )
}