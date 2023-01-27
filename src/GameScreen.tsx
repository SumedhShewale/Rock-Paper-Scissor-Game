import * as React from "react";
import { plays } from "./literals";
import PositionBox from "./PositionBox";

function GameScreen() {
  const [totalBetPriceAvailable, setTotalBetPriceAvailable] = React.useState(5000)
  const [userSelections, setUserSelections] = React.useState([])
  const [currentBets, setCurrentBets] = React.useState({ "ROCK": 0, "PAPER": 0, "SCISSOR": 0 })
  const [currentRoundResult, setCurrentRoundResult] = React.useState(false)
  const [wins, setWins] = React.useState(0)
  const choiceOfplays = ['ROCK', 'PAPER', 'SCISSOR']
  const minimumBet = 500

  const handleButtonClick = (playRound: boolean) => {
    if (!playRound) {
      setUserSelections([])
      setTotalBetPriceAvailable(5000)
    }
    else {
      let botPlay: string = choiceOfplays[Math.floor(Math.random() * choiceOfplays.length)]
      let hasUserWon: boolean = false;

      for (let i = 0; i < userSelections.length; i++) {
        if (userSelections.length === 2) {
          if (hasUserWon) {
            break;
          }
        }
        if (botPlay === "ROCK") {
          if (userSelections[i] === "ROCK") {
            hasUserWon = false
          }
          else if (userSelections[i] === "PAPER") {
            hasUserWon = true
          }
          else {
            hasUserWon = false
          }
        }
        else if (botPlay === "PAPER") {
          if (userSelections[i] === "ROCK") {
            hasUserWon = false
          }
          else if (userSelections[i] === "PAPER") {
            hasUserWon = false
          }
          else {
            hasUserWon = true
          }
        }
        else
          if (userSelections[i] === "ROCK") {
            hasUserWon = true
          }
          else if (userSelections[i] === "PAPER") {
            hasUserWon = false
          }
          else {
            hasUserWon = false
          }
      }
      alert(hasUserWon ? "User won" : "User Lost")
      if (hasUserWon) {
        setWins(wins + 1)
      }
      setCurrentRoundResult(hasUserWon)
    }
  }

  const handleUserSelection = (currentSelection: plays) => {
    if (userSelections.length < 2 && !userSelections.includes(currentSelection)) {
      setUserSelections([...userSelections, currentSelection])
      // handleBetChipClick(currentSelection)
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
        <span style={{ paddingLeft: "30px", color: "#c7a878" }}>BALANCE: </span><span style={{ paddingRight: "30px", color: "white" }}>{totalBetPriceAvailable}</span>
        <span style={{ paddingLeft: "30px", color: "#c7a878" }}>BET: </span><span style={{ paddingRight: "30px", color: "white" }}>{"currentBets"}</span>
        <span style={{ paddingLeft: "30px", color: "#c7a878" }}>WIN: </span><span style={{ paddingRight: "30px", color: "white" }}>{wins}</span>
      </div>
      {userSelections.length === 0 && <div style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginBottom: "40px"
      }}>
        <span style={{ color: "#cbab7b", fontWeight: "bold" }}>PICK YOUR POSITIONS</span>
      </div>}
      <PositionBox key={0} backgroundColor={"#211f4f"} borderColor={"#2e4b90"} textColor={"#2680ea"} isPositionSelected={userSelections.includes(choiceOfplays[0])} handleUserSelection={handleUserSelection} playOf={choiceOfplays[0]} currentBet={currentBets['ROCK']} handleBetChipClick={handleBetChipClick} />
      <PositionBox key={1} backgroundColor={"#1a381d"} borderColor={"#187e3a"} textColor={"#16c158"} isPositionSelected={userSelections.includes(choiceOfplays[1])} handleUserSelection={handleUserSelection} playOf={choiceOfplays[1]} currentBet={currentBets['PAPER']} handleBetChipClick={handleBetChipClick} />
      <PositionBox key={2} backgroundColor={"#50091e"} borderColor={"#9a0e30"} textColor={"#e01541"} isPositionSelected={userSelections.includes(choiceOfplays[2])} handleUserSelection={handleUserSelection} playOf={choiceOfplays[2]} currentBet={currentBets['SCISSOR']} handleBetChipClick={handleBetChipClick} />
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
          onClick={() => handleButtonClick(true ? true : false)}>{true ? "PLAY" : "CLEAR"}</button>
      </div>
    </div >
  );
}

export default GameScreen;
