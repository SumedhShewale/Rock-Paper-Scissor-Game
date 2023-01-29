import * as React from "react";
import { plays } from "./literals";
import PositionBox from "./PositionBox";

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

  React.useEffect(() => {
    setTotalBetPriceAvailable(totalBetPriceAvailable - getAmountInAllBets())
  }, [currentBets])

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
    else {
      setTotalBetPriceAvailable(totalBetPriceAvailable)
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
      setUserSelections([...userSelections, currentSelection])
      setCurrentBets({ ...currentBets, [currentSelection]: currentBets[currentSelection] + minimumBet })
    }
    else {
      alert("You can only select maximum of two different positions.")
    }
  }

  const handleBetChipClick = (playOf: plays) => {
    if (userSelections.includes(playOf)) {
      let isBetAvailable = (currentBets["ROCK"] + currentBets["PAPER"] + currentBets["SCISSOR"] + minimumBet) <= totalBetPriceAvailable
      if (isBetAvailable) {
        setCurrentBets({ ...currentBets, [playOf]: currentBets[playOf] + minimumBet })
      }
      else {
        alert("Not enough balance available.")
      }
    }
  }

  const getAmountInAllBets = () => {
    return currentBets["ROCK"] + currentBets["PAPER"] + currentBets["SCISSOR"]
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
      <div style={{
        width: "100%",
        textAlign: "center",
        position: "absolute",
        top: "0px",
        left: "0px",
        right: "0px",
        backgroundColor: "black"
      }}>
        <span style={{ paddingLeft: "30px", color: "#c7a878" }}>BALANCE: </span><span style={{ paddingRight: "30px", color: "white" }}>{totalBetPriceAvailable /* getAvailableBetAmount() */}</span>
        <span style={{ paddingLeft: "30px", color: "#c7a878" }}>BET: </span><span style={{ paddingRight: "30px", color: "white" }}>{getAmountInAllBets()}</span>
        <span style={{ paddingLeft: "30px", color: "#c7a878" }}>WIN: </span><span style={{ paddingRight: "30px", color: "white" }}>{wins}</span>
      </div>
      {userSelections.length === 0 ?
        <div style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginBottom: "40px"
        }}>
          <span style={{ color: "#cbab7b", fontWeight: "bold" }}>PICK YOUR POSITIONS</span>
        </div>
        :
        roundPlayed ?
          (currentRoundResult ?
            <div style={{
              width: "100%",
              marginBottom: "80px",
              textAlign: "center"
            }}>
              <h1 style={{ color: "#16c359", fontWeight: "bolder" }}>{`${winningPosition} WON`}</h1>
              <span><h2 style={{ color: "#d4b37f", fontWeight: "bold", display: "inline" }}>YOU WIN </h2><h2 style={{ color: "white", fontWeight: "bold", display: "inline" }}>{getWinningAmount(winningPosition)}</h2></span>
            </div>
            :
            <div style={{
              width: "100%",
              marginBottom: "80px",
              textAlign: "center"
            }}>
              <span><h2 style={{ color: "white", fontWeight: "bold", display: "inline", padding: "0 30px" }}>{botPosition}</h2><h2 style={{ color: "#d4b37f", display: "inline", padding: "0 30px" }}>vs</h2><h2 style={{ color: "white", fontWeight: "bold", display: "inline", padding: "0 30px" }}>{userSelections[0]}</h2></span>
            </div>)
          :
          null
      }
      <PositionBox key={0} backgroundColor={"#211f4f"} borderColor={"#2e4b90"} textColor={"#2680ea"} isPositionSelected={userSelections.includes(choiceOfplays[0])} handleUserSelection={handleUserSelection} playOf={choiceOfplays[0]} currentBet={currentBets[choiceOfplays[0]]} handleBetChipClick={handleBetChipClick} roundPlayed={roundPlayed} />
      <PositionBox key={1} backgroundColor={"#1a381d"} borderColor={"#187e3a"} textColor={"#16c158"} isPositionSelected={userSelections.includes(choiceOfplays[1])} handleUserSelection={handleUserSelection} playOf={choiceOfplays[1]} currentBet={currentBets[choiceOfplays[1]]} handleBetChipClick={handleBetChipClick} roundPlayed={roundPlayed} />
      <PositionBox key={2} backgroundColor={"#50091e"} borderColor={"#9a0e30"} textColor={"#e01541"} isPositionSelected={userSelections.includes(choiceOfplays[2])} handleUserSelection={handleUserSelection} playOf={choiceOfplays[2]} currentBet={currentBets[choiceOfplays[2]]} handleBetChipClick={handleBetChipClick} roundPlayed={roundPlayed} />
      <div style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: "80px"
      }}>
        <button style={{
          backgroundColor: "black",
          color: userSelections.length > 0 ? "#c6a776" : "#4d463b",
          border: `3px solid ${userSelections.length > 0 ? "#c6a776" : "#4d463b"}`,
          height: "90px",
          width: "180px",
          borderRadius: "50px",
          fontWeight: "bold",
          cursor: userSelections.length > 0 ? "pointer" : "inherit"
        }}
          disabled={userSelections.length === 0}
          onClick={() => roundPlayed ? clearStages() : handlePlay()}>{roundPlayed ? "CLEAR" : "PLAY"}</button>
      </div>
    </div >
  );
}

export default GameScreen;
