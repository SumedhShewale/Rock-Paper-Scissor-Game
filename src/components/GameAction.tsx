import * as React from "react";
import { plays } from "../utils/literals";

function GameAction(props: { userSelections: plays[]; roundPlayed: boolean; clearStages: Function; handlePlay: Function }) {
    const { userSelections, roundPlayed, clearStages, handlePlay } = props
    return (
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
                onClick={() => roundPlayed ? clearStages() : handlePlay()}>{roundPlayed ? "CLEAR" : "PLAY"}
            </button>
        </div>
    );
}

export default GameAction;