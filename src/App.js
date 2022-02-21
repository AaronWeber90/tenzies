import React, {useState, useEffect} from "react";
import "./App.css";
import Die from "./Die";
import {nanoid} from "nanoid";
import Confetti from "react-confetti";
import Sidebar from "./Sidebar";
import Header from "./Header";

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  const [isHighscore, setIsHighscore] = useState(false);
  const [isRollsHighscore, setIsRollsHighscore] = useState(false);
  const [isTimeHighscore, setIsTimeHighscore] = useState(false);

  const [rolls, setRolls] = useState(-1);
  const [scoreData, setScoreData] = useState(
    JSON.parse(localStorage.getItem("scoreData")) || []
  );

  const [sorting, setsorting] = useState({
    date: false,
    time: false,
    rolls: false,
  });

  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);

  // CHECK FOR TENZIES AND END GAME
  useEffect(() => {
    const allHeld = dice.every((item) => item.isHeld);
    const sameValue = dice.every((item) => item.value === dice[0].value);

    if (allHeld && sameValue) {
      setTenzies(true);
      setScoreData((prevState) => {
        return [
          ...prevState,
          {
            rolls: rolls + 1,
            time: time,
            date: new Date().toString(),
          },
        ];
      });

      timerReset();
    }
  }, [dice]);

  // CHECK FOR HIGHSCORE
  useEffect(() => {
    if (tenzies && scoreData.length > 1) {
      const sortData = scoreData.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      console.log("New rolls are " + sortData[0].rolls);
      console.log("New time is " + sortData[0].time);

      const rollsArray = sortData.slice(1);
      console.log(rollsArray);

      const rollsHighscore = rollsArray.every(
        (item) => item.rolls > sortData[0].rolls
      );

      const checkTimeHighscore = rollsArray.every(
        (item) => item.time > sortData[0].time
      );

      if (rollsHighscore) {
        setIsRollsHighscore(true);
        console.log("NEW ROLLS HIGHSCORE");
      }
      if (checkTimeHighscore) {
        setIsTimeHighscore(true);
        console.log("NEW TIME HIGHSCORE");
      }
      if (rollsHighscore || checkTimeHighscore) {
        setIsHighscore(true);
      }
    }
  }, [tenzies]);

  // SET LOCALE STORAGE IF SCORE CHANGES
  useEffect(() => {
    localStorage.setItem("scoreData", JSON.stringify(scoreData));
  }, [scoreData]);

  // TIMER
  useEffect(() => {
    let interval = null;

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTime((prevState) => prevState + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  function timerStart() {
    setIsActive(true);
    setIsPaused(false);
  }

  function timerPauseResume() {
    setIsPaused(!isPaused);
  }

  function timerReset() {
    setIsActive(false);
    setTime(0);
  }

  // CREATE 10 NEW DICE
  function allNewDice() {
    let newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(createNewDie());
    }
    return newDice;
  }

  function createNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function rollDice() {
    if (tenzies) {
      setDice(allNewDice());
      setTenzies(false);
      setRolls(0);
      timerStart();
      setIsHighscore(false);
      setIsRollsHighscore(false);
      setIsTimeHighscore(false);
    } else {
      setDice((prevState) =>
        prevState.map((die) => {
          return die.isHeld ? die : createNewDie();
        })
      );
      setRolls((prevState) => prevState + 1);
      timerStart();
    }
  }

  function holdDice(id) {
    if (!tenzies && isActive && !isPaused) {
      setDice((prevState) =>
        prevState.map((die) => {
          return die.id === id ? {...die, isHeld: !die.isHeld} : die;
        })
      );
    }
  }

  const diceElements = dice.map((die) => {
    return (
      <Die
        key={die.id}
        value={die.value}
        isHeld={die.isHeld}
        holdDice={() => holdDice(die.id)}
      />
    );
  });

  function ButtonContent() {
    if (tenzies || !isActive) {
      return "New Game";
    } else {
      return "Roll";
    }
  }

  // SORTING LOGIC
  function sortTime() {
    setScoreData((prevState) => {
      const sortData = prevState.sort((a, b) => a.time - b.time);
      return sortData;
    });
    setsorting({
      date: false,
      time: true,
      rolls: false,
    });
  }

  function sortDay() {
    setScoreData((prevState) => {
      const sortData = prevState.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
      return sortData;
    });
    setsorting({
      date: true,
      time: false,
      rolls: false,
    });
  }

  function sortRolls() {
    setScoreData((prevState) => {
      const sortData = prevState.sort((a, b) => a.rolls - b.rolls);
      return sortData;
    });
    setsorting({
      date: false,
      time: false,
      rolls: true,
    });
  }

  function deleteScore() {
    setScoreData([]);
    setsorting({
      date: false,
      time: false,
      rolls: false,
    });
    localStorage.removeItem("scoreData");
  }

  return (
    <>
      <main class="main">
        <section className="playground">
          <Header
            time={time}
            rolls={rolls}
            isActive={isActive}
            tenzies={tenzies}
            isHighscore={isHighscore}
            isRollsHighscore={isRollsHighscore}
            isTimeHighscore={isTimeHighscore}
          />
          <section className="dice-grid">{diceElements}</section>
          <button className="btn roll-dice-btn" onClick={rollDice}>
            {ButtonContent()}
          </button>
        </section>
        <Sidebar
          rolls={rolls}
          scoreData={scoreData}
          tenzies={tenzies}
          isActive={isActive}
          isPaused={isPaused}
          handlePause={() => timerPauseResume()}
          handleStop={() => {
            timerReset();
            setDice(allNewDice());
          }}
          sortTime={() => sortTime()}
          sortDay={() => sortDay()}
          sortRolls={() => sortRolls()}
          sorting={sorting}
          deleteScore={() => deleteScore()}
        />
        {isHighscore && <Confetti />}
        {/* {isHighscore && console.log("NEW HIGHSCORE")} */}
      </main>
    </>
  );
}

export default App;

// save best time & lowest rolls
// improve confetti width
