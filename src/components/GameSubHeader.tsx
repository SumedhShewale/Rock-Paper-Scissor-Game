import * as React from "react";
import { plays } from "../utils/literals";

function GameSubHeader(props: { userSelections: plays[]; roundPlayed: boolean; currentRoundResult: boolean; winningPosition: plays; getWinningAmount: Function; botPosition: plays }) {
    const { userSelections, roundPlayed, currentRoundResult, winningPosition, getWinningAmount, botPosition } = props

    return (userSelections.length === 0 ?
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
    );
}

export default GameSubHeader;