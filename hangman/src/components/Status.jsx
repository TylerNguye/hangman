import clsx from "clsx";
import { getFarewellText } from "../utils";
import { languages } from "../languages";

function renderGameStatus(props) {
    if (!props.isGameOver) {
        if (props.isWrongGuess && props.wrongGuessCount > 0) {
            return (
                <p className="farewell-message">{getFarewellText(languages[props.wrongGuessCount - 1].name)}</p>
            );
        }
        else {
            return null;
        }
    }
    if (props.isGameWon) {
        return (
            <>
                <h2>You win!</h2>
                <p>Well done! 🎉</p>  
            </>
        )
    }
    else {
        return (
            <>
                <h2>Game over!</h2>
                <p>You lose! Better start learning Assembly 😭</p>
            </>
        )
    }
}

export default function Status(props) {
    const gameStatusClass = clsx("game-status", {
        won: props.isGameWon,
        lost: props.isGameLost,
        farewell: !props.isGameOver && props.isWrongGuess && props.wrongGuessCount > 0
    })
    return (
        <section aria-live="polite" role="status" className={gameStatusClass}>
            {renderGameStatus(props)}
        </section>
    );
}