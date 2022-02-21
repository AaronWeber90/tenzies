import React from "react";

function Header(props) {
  function HeaderContent() {
    if (!props.isActive && !props.tenzies) {
      return "Tenzies";
    } else if (props.isActive) {
      return `Time: ${props.time} - Rolls: ${props.rolls}`;
    } else if (props.isTimeHighscore && props.isRollsHighscore) {
      return "New Highscore with Time and Rolls!";
    } else if (props.isTimeHighscore) {
      return "New Highscore with Time!";
    } else if (props.isRollsHighscore) {
      return "New Highscore with Rolls!";
    } else if (!props.isActive && props.tenzies) {
      return "Good Game!";
    }
  }

  function SubHeaderContent() {
    if ((!props.isActive && !props.tenzies) || props.isActive) {
      return "Roll until all dice are the same. Click each die to freeze it at its current value between rolls.";
    } else if (props.isTimeHighscore && props.isRollsHighscore) {
      return "⏱️ Fastest run and fewest rolls! 🎲";
    } else if (props.isTimeHighscore) {
      return "⏱️ This was your fastest game. ⏱️";
    } else if (props.isRollsHighscore) {
      return "🎲 In this was game you had the fewest rolls. 🎲";
    } else if (!props.isActive && props.tenzies) {
      return "Try again to set a new record.";
    }
  }

  return (
    <>
      <h1 className="title">
        <HeaderContent />
      </h1>
      <p className="description">
        <SubHeaderContent />
      </p>
    </>
  );
}
export default React.memo(Header);
