import { useState } from "react";
import Instructions from "./components/Instructions";
import Status from "./components/Status";
import Languages from "./components/Languages";
import Word from "./components/Word";
import LetterOptions from "./components/LetterOptions"
import { languages } from "./languages";
import { getRandomWord } from "./utils";
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use'

export default function AssemblyEndgame() {
    const [guesses, setGuesses] = useState([]);
    const [currentWord, setCurrentWord] = useState(() => getRandomWord());
    
    let wrongGuessCount = guesses.filter(letter => !currentWord.includes(letter)).length;
    const remainingGuesses = languages.length - 1;
    const isGameWon = guesses.length - wrongGuessCount == currentWord.length;
    const isGameLost = wrongGuessCount >= remainingGuesses;
    const isGameOver =  isGameWon || isGameLost;
    const lastGuessedLetter = guesses[guesses.length - 1];
    const isWrongGuess = !currentWord.includes(lastGuessedLetter);

    const {width, height} = useWindowSize()
    
    function addGuess(letter) {
        setGuesses(guesses => 
            guesses.includes(letter) ? [...guesses] : [...guesses, letter]);
    }

    function resetGame() {
        wrongGuessCount = 0;
        setCurrentWord(getRandomWord());
        setGuesses([]);
    }

    return (
        <main>
            <Instructions />
            <Status
                isGameWon={isGameWon}
                isGameLost={isGameLost}
                isGameOver={isGameOver}
                isWrongGuess={isWrongGuess}
                wrongGuessCount={wrongGuessCount}
            />
            <Languages wrongGuessCount={wrongGuessCount}/>
            <Word 
                currentWord={isGameOver ? currentWord : currentWord.split("").map(letter => guesses.includes(letter) ? letter : ' ').join('')}
                guesses={guesses}
            />
            {/* Combined visually-hidden aria-live region for status updates */}
            <section
                className="sr-only"
                aria-live="polite"
                role="status">
                <p>
                    {
                        !isWrongGuess ? `Correct! The letter ${lastGuessedLetter} is in the word!`
                        : `Sorry, the letter ${lastGuessedLetter} is not in the word.`
                    }
                    You have {remainingGuesses} attempts left.
                </p>
                <p>Current word: {currentWord.split("").map(letter =>
                    guesses.includes(letter) ? letter + "." : "blank.").join(" ")}</p>
            </section>
            <LetterOptions guesses={guesses} word={currentWord} click={addGuess} isGameOver={isGameOver}/>
            {isGameWon && <Confetti width={width} height={height} recycle={false} numberOfPieces={1000}/>}
            <section id="new-game-section">
                {isGameOver && <button id="new-game" onClick={resetGame}>New Game</button>}
            </section>
        </main>
    )
}