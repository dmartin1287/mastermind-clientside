import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Register = (props) => {
    const [user, setUser] = useState({
        username: "",
        firstName: "",
        lastName:"",
        password: ""
    })
    let navigate = useNavigate()

    const registerNewUser = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("master_user", JSON.stringify({
                        id: createdUser.id
                    }))

                    navigate("/")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/users?username=${user.username}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate username. No good.
                    window.alert("Account with that username already exists")
                }
                else {
                    // Good username, create user.
                    registerNewUser()
                }
            })
    }

    const updateUser = (evt) => {
        const copy = {...user}
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }

    return (
        <div style={{ 
        backgroundImage: `url("https://media.istockphoto.com/vectors/digital-technology-gaming-abstract-background-vector-id1164222265?k=20&m=1164222265&s=170667a&w=0&h=IVofCowQw51bHMHrh7FYP6K8TWUu2opeZN6iQ3HmGPg=")`,
    height:1024,
    width:1500
    }}>
        <main className="register_css">
            <form className="form--login" onSubmit={handleRegister}>
                <h3 className="h3 mb-3 font-weight-normal">Please Register for Mastermind</h3>
                <fieldset>
                    <label htmlFor="firstName"> First Name: </label>
                    <input onChange={updateUser}
                            type="text" id="firstName" className="form-control"
                            placeholder="Enter your first name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name: </label>
                    <input onChange={updateUser}
                            type="text" id="lastName" className="form-control"
                            placeholder="Enter your last name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email: </label>
                    <input onChange={updateUser}
                        type="email" id="email" className="form-control"
                        placeholder="email address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="username"> Username: </label>
                    <input onChange={updateUser}
                        type="username" id="username" className="form-control"
                        placeholder="Username" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="password"> Password: </label>
                    <input onChange={updateUser}
                        type="password" id="password" className="form-control"
                        placeholder="password" required />
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
        </div>
    )
}

