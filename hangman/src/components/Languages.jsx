import {languages} from "../languages.js"
import clsx from "clsx";

export default function Languages(props) {
    const languagesElements = languages.map((language, index) => {
        const styles = {
            backgroundColor: language.backgroundColor,
            color: language.color
        }
        return <span key={language.name} className={clsx({chip: true, lost: index < props.wrongGuessCount})} style={styles}>{language.name}</span>
    });

    return (
        <section className="language-chips">
            {languagesElements}
        </section>
    )
}