import * as React from "react";
import PositionBox from "../PositionBox";
import { plays } from "../utils/literals";
import GameAction from "./GameAction";
import GameStats from "./GameStats";
import GameSubHeader from "./GameSubHeader";

function GameScreen() {
  const [totalBetPriceAvailable, setTotalBetPriceAvailable]: [number, Function] = React.useState(5000)
  const [userSelections, setUserSelections]: [plays[], Function] = React.useState([])
  const [currentBets, setCurrentBets]: [{ "ROCK": 0, "PAPER": 0, "SCISSOR": 0 }, Function] = React.useState({ "ROCK": 0, "PAPER": 0, "SCISSOR": 0 })
  const [currentRoundResult, setCurrentRoundResult]: [boolean, Function] = React.useState(false)
  const [winningPosition, setWinningPosition]: [plays, Function] = React.useState()
  const [wins, setWins]: [number, Function] = React.useState(0)
  const [botPosition, setBotPosition]: [plays, Function] = React.useState()
  const [roundPlayed, setRoundPlayed]: [boolean, Function] = React.useState(false)
  const choiceOfplays: plays[] = ['ROCK', 'PAPER', 'SCISSOR']
  const minimumBet = 500

  const clearStages = () => {
    setUserSelections([])
    setCurrentBets({ "ROCK": 0, "PAPER": 0, "SCISSOR": 0 })
    setCurrentRoundResult(false)
    setWinningPosition()
    setRoundPlayed(false)
    setBotPosition()
  }

  const handlePlay = () => {
    setRoundPlayed(true)
    let currentWins: boolean[] = new Array(userSelections.length)
    currentWins.fill(false)
    let currentWinningPosition: plays
    let botPlay: string = choiceOfplays[Math.floor(Math.random() * choiceOfplays.length)]
    setBotPosition(botPlay)
    for (let i = 0; i < userSelections.length; i++) {
      if (userSelections.length === 2) {
        if (currentWins[0]) {
          currentWinningPosition = userSelections[0]
          break;
        }
      }
      if (botPlay === "ROCK") {
        if (userSelections[i] === "PAPER") {
          currentWins[i] = true
        }
      }
      else if (botPlay === "PAPER") {
        if (userSelections[i] === "SCISSOR") {
          currentWins[i] = true
        }
      }
      else {
        if (userSelections[i] === "ROCK") {
          currentWins[i] = true
        }
      }
      if (currentWins[i]) {
        setWins(wins + 1)
      }
    }

    let hasUserWon: boolean = currentWins.some(win => win)
    if (hasUserWon) {
      setCurrentRoundResult(hasUserWon)
      currentWinningPosition = currentWinningPosition || (userSelections.length === 1 ? userSelections[0] : userSelections[1])
      setWinningPosition(currentWinningPosition)
      let winningAmount: number = getWinningAmount(currentWinningPosition)
      setTotalBetPriceAvailable(totalBetPriceAvailable + winningAmount)
    }
  }

  const getWinningAmount = (currentWinningPosition: plays) => {
    let winningAmount: number
    if (userSelections.length > 1) {
      winningAmount = currentBets[currentWinningPosition] * 3
    }
    else {
      winningAmount = currentBets[currentWinningPosition] * 14
    }
    return winningAmount
  }

  const handleUserSelection = (currentSelection: plays) => {
    if (userSelections.length < 2 && !userSelections.includes(currentSelection)) {
      addBet(currentSelection, true)
    }
    else {
      alert("You can only select maximum of two different positions.")
    }
  }

  const handleBetChipClick = (playOf: plays) => {
    if (userSelections.includes(playOf)) {
      addBet(playOf, false)
    }
  }

  const addBet = (playOf: plays, addUserSelection: boolean) => {
    let isBetAvailable = totalBetPriceAvailable >= minimumBet
    if (isBetAvailable) {
      addUserSelection && setUserSelections([...userSelections, playOf])
      setCurrentBets({ ...currentBets, [playOf]: currentBets[playOf] + minimumBet })
      setTotalBetPriceAvailable(totalBetPriceAvailable - minimumBet)
    }
    else {
      alert("Not enough balance available.")
    }
  }

  const getAmountInAllBets = () => {
    return currentBets["ROCK"] + currentBets["PAPER"] + currentBets["SCISSOR"]
  }

  let colors: {
    "ROCK": {
      backgroundColor: string;
      borderColor: string;
      textColor: string
    },
    "PAPER": {
      backgroundColor: string;
      borderColor: string;
      textColor: string
    },
    "SCISSOR": {
      backgroundColor: string;
      borderColor: string;
      textColor: string
    }
  } = {
    "ROCK": {
      backgroundColor: "#211f4f",
      borderColor: "#2e4b90",
      textColor: "#2680ea"
    },
    "PAPER": {
      backgroundColor: "#1a381d",
      borderColor: "#187e3a",
      textColor: "#16c158"
    },
    "SCISSOR": {
      backgroundColor: "#50091e",
      borderColor: "#9a0e30",
      textColor: "#e01541"
    }
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignContent: "center",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
      }}
    >
      <GameStats totalBetPriceAvailable={totalBetPriceAvailable} getAmountInAllBets={getAmountInAllBets} wins={wins} />
      <GameSubHeader userSelections={userSelections} roundPlayed={roundPlayed} currentRoundResult={currentRoundResult} winningPosition={winningPosition} getWinningAmount={getWinningAmount} botPosition={botPosition} />
      {
        choiceOfplays.map((position, index) => {
          return <PositionBox key={index} backgroundColor={colors[position]["backgroundColor"]} borderColor={colors[position]["borderColor"]} textColor={colors[position]["textColor"]} isPositionSelected={userSelections.includes(position)} handleUserSelection={handleUserSelection} playOf={position} currentBet={currentBets[position]} handleBetChipClick={handleBetChipClick} roundPlayed={roundPlayed} />
        })
      }
      <GameAction userSelections={userSelections} roundPlayed={roundPlayed} clearStages={clearStages} handlePlay={handlePlay} />
    </div>
  );
}

export default GameScreen;
