import * as React from "react";

function BetChip(props: { playOf: string, betAmount: number, handleBetChipClick: Function, roundPlayed: boolean }) {
    const { playOf, betAmount, handleBetChipClick, roundPlayed } = props
    return (
        <div style={{
            width: "48px",
            height: "48px",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            flexWrap: "wrap",
            alignItems: "center",
            backgroundColor: "white",
            color: "black",
            border: "4px solid #225eff",
            borderRadius: "50%",
            marginBottom: "10px",
            cursor: roundPlayed ? "inherit" : "pointer",
        }}
            onClick={(e) => { e.stopPropagation(); !roundPlayed && handleBetChipClick(playOf) }}
        >
            {betAmount}
        </div>
    );
}

export default BetChip;