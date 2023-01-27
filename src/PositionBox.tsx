import * as React from "react";
import BetChip from "./BetChip";

function PositionBox(props: { backgroundColor: string; borderColor: string; textColor: string; isPositionSelected: boolean; handleUserSelection: Function; playOf: string; currentBet: number; handleBetChipClick: Function; }) {
    const { backgroundColor, borderColor, textColor, isPositionSelected, handleUserSelection, playOf, currentBet, handleBetChipClick } = props
    return (
        <div
            style={{
                width: "200px",
                height: "150px",
                backgroundColor: backgroundColor,
                display: "flex",
                alignContent: "center",
                justifyContent: "space-evenly",
                flexWrap: "wrap",
                border: isPositionSelected ? `4px solid ${borderColor}` : "",
                borderRadius: "10px",
                color: textColor,
                fontWeight: "bold",
                cursor: "pointer"
            }}
            onClick={() => handleUserSelection(playOf)}
        >
            <BetChip playOf={playOf} betAmount={currentBet} handleBetChipClick={handleBetChipClick} />
            <div style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignContent: "center"
            }}>
                {playOf}
            </div>
        </div>
    );
}

export default PositionBox;