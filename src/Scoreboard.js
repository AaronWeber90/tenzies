import React from "react";

export default function Scoreboard(props) {
  const scoreBoardEl = props.scoreData.map((item, id) => (
    <tr className="scorebard__row" key={id}>
      <td className="scoreboard-date">
        {new Date(item.date).toLocaleString()}
      </td>
      <td>
        <strong>Rolls:</strong> {item.rolls}
      </td>
      <td>
        <strong>Time:</strong> {item.time}
      </td>
    </tr>
  ));

  function SortButton(props) {
    return (
      <button
        onClick={props.click}
        className={props.class ? "active-filter" : ""}
      >
        {props.icon}
      </button>
    );
  }

  return (
    <>
      <h2>Scoreboard</h2>
      {props.scoreData.length > 0 ? (
        <>
          <table className="scoreboard">
            <thead>
              <tr>
                <th>
                  <SortButton
                    click={props.sortDay}
                    class={props.sorting.date}
                    icon={"📅"}
                  />
                </th>
                <th>
                  <SortButton
                    click={props.sortRolls}
                    class={props.sorting.rolls}
                    icon={"🎲"}
                  />
                </th>
                <th>
                  <SortButton
                    click={props.sortTime}
                    class={props.sorting.time}
                    icon={"⏱️"}
                  />
                </th>
              </tr>
            </thead>
            <tbody>{scoreBoardEl}</tbody>
          </table>
          <button className="btn control-btn" onClick={props.deleteScore}>
            Delete Scores
          </button>
        </>
      ) : (
        <p>No scores</p>
      )}
    </>
  );
}
