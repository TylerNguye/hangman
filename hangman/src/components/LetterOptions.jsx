import clsx from 'clsx';

export default function LetterOptions(props) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const keyboardElems = alphabet.split("").map(letter => {
        const isGuessed = props.guesses.includes(letter);
        const isCorrect = isGuessed && props.word.includes(letter);
        const isWrong = isGuessed && !props.word.includes(letter);
        return (
        <button
            className={clsx({'green-bg': isCorrect, 'red-bg': isWrong})}
            onClick={() => props.click(letter)}
            key={letter}
            disabled={props.isGameOver}
            aria-disabled={props.guesses.includes(letter)}
            aria-label={`Letter ${letter}`}
        >
            {letter.toUpperCase()}
        </button>
        )
    });
    return (
        <section className="keyboard">
            {keyboardElems}
        </section>
    )
}