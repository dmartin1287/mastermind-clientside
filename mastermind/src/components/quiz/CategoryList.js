import { Link } from "react-router-dom"
import "./quiz.css"


export const CategoryList = () => {
    return <>
        <h2 className="trivia">Trivia Categories</h2>
        <section className="general--button">
                <Link to="/general">General</Link>
            </section>
        <section className="music--button">
                <Link to="/music">Music</Link>
            </section>
        <section className="history--button">
                <Link to="/history">History</Link>
            </section>
        <section className="art--button">
                <Link to="/art">Art</Link>
            </section>
        <section className="entertainment--button">
                <Link to="/entertainment">Entertainment</Link>
            </section>
        <section className="science--button">
                <Link to="/science">Science</Link>
            </section>
        <section className="sports--button">
                <Link to="/sports">Sports</Link>
            </section>
        <section className="literature--button">
                <Link to="/literature">Literature</Link>
            </section>
    </>
}

