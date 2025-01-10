import clsx from "clsx";

export default function Word(props) {
    const wordArr = props.currentWord.split("");
    const letterElems = wordArr.map((letter, i) => {
        const letterClassName = clsx("curLetter", {"missed-letter": !props.guesses.includes(letter)})
        return <span key={i} className={letterClassName}>{letter == ' ' ? ' ' : letter.toUpperCase()}</span>
    });
    return (
        <section className="word">
            {letterElems}
        </section>
    )
}