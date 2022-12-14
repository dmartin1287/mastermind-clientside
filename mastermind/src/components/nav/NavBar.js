import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
    <header>
        <ul className="navbar">
            <img className="navbar__logo" src={"/image/logo.png"} alt="logo" />
            <li className="navbar__item active">
                <Link className="navbar__link" to="/Home">Home</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/quizForm">Create Quiz</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/quiz">Trivia Categories</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/scores">Highscores</Link>
            </li>
            {
                localStorage.getItem("master_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("master_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    </header>
    )
}

