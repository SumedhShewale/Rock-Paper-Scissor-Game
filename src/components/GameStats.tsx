import * as React from "react";

function GameStats(props: { totalBetPriceAvailable: number; getAmountInAllBets: Function; wins: number }) {
    const { totalBetPriceAvailable, getAmountInAllBets, wins } = props
    return (
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
            <span style={{ paddingLeft: "30px", color: "#c7a878" }}>BET: </span><span style={{ paddingRight: "30px", color: "white" }}>{getAmountInAllBets()}</span>
            <span style={{ paddingLeft: "30px", color: "#c7a878" }}>WIN: </span><span style={{ paddingRight: "30px", color: "white" }}>{wins}</span>
        </div>
    );
}

export default GameStats;