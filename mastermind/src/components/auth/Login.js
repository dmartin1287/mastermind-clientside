import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Login = () => {
    const [username, set] = useState("Master1287")
    const [password, setPassword] = useState("duranduran")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/users?username=${username}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("master_user", JSON.stringify({
                        id: user.id
                    }))

                    navigate("/")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    
    }
        

    return (
        <div className="no_border" style={{ 
        backgroundImage: `url("https://media.istockphoto.com/vectors/digital-technology-gaming-abstract-background-vector-id1164222265?k=20&m=1164222265&s=170667a&w=0&h=IVofCowQw51bHMHrh7FYP6K8TWUu2opeZN6iQ3HmGPg=")`,
    height:1024,
    width:1900
    }}>
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Mastermind</h1>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputUsername"> Username:</label>
                        <input type="username"
                            value={username}
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Username"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="password"> Password:</label>
                        <input type="password"
                            value={password}
                            onChange={evt => setPassword(evt.target.value)}
                            className="form-control"
                            placeholder="password" />
                    </fieldset>
                    <fieldset>
                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
        </main>
    </div>
    )

}

