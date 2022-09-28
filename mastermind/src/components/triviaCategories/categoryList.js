import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Request } from "./Request.js"
import "./Requests.css"

export const RequestList = ({ searchTermState }) => {
        const [requests, setRequests] = useState([])
        const [interpreters, setInterpreters] = useState([])
        const [filteredRequests, setFiltered] = useState([])
        const [urgent, setUrgent] = useState(false)
        const [openOnly, updateOpenOnly] = useState(false)
        const navigate = useNavigate()

        const localUser = localStorage.getItem("master_user")
        const bmhUserObject = JSON.parse(localUser)

    //       useEffect(
    //     () => {
    //         const searchedRequests = requests.filter(request => 
    //             request.description.toLowerCase().startsWith(searchTermState.toLowerCase()))
    //         setFiltered(searchedRequests)
    //     },
    //     [requests, searchTermState]
    // )

        const getAllRequests = () => {
    fetch(
      `http://localhost:8088/serviceRequests?_embed=interpreterRequests&_expand=serviceType&_expand=eventType&_expand=timeZone`
    )
      .then((response) => response.json())
      .then((requestArray) => {
        setRequests(requestArray);
      });
        }

        useEffect(
                () => {

                    getAllRequests() //Include in if statement 

                    fetch(`http://localhost:8088/interpreters?_expand=user`)
                        .then(response => response.json())
                        .then((interpreterArray) => {
                            setInterpreters(interpreterArray)
                        })
                }, [] // When this array is empty, you are observing initial component state
            )
            // Create an if statement to determine whether the user is an interpreter or not and write a fetch statement based on that. 
        useEffect(
            () => {
                if (bmhUserObject.staff === true) {
                    //for interpreters
                    setFiltered(requests)
                } else {
                    //for clients
                    let myRequests = requests.filter(request => request.userId === bmhUserObject.id)
                    setFiltered(myRequests)
                }
            }, [bmhUserObject.id, bmhUserObject.staff, requests]
        )

        useEffect(
            () => {
                if (urgent) {
                    let urgentRequests = requests.filter(request => request.urgent === true)
                    setFiltered(urgentRequests)
                } else {
                    setFiltered(requests)
                }
            }, [urgent, requests]
        )

        useEffect(
            () => {
                if (openOnly) {
                    const openRequestArray = requests.filter(request => {
                        return request.userId === bmhUserObject.id && request.dateCompleted === ""
                    })
                    setFiltered(openRequestArray)
                } else {
                    let myRequests = requests.filter(request => request.userId === bmhUserObject.id)
                    setFiltered(myRequests)
                }
            }, [bmhUserObject.id, openOnly, requests]
        )

        return (
          <>
            {" "}
            {bmhUserObject.staff ? (
              <>
                <button
                  onClick={() => {
                    setUrgent(true);
                  }}
                  className="urgent-button"
                >
                  {" "}
                  Urgent Requests{" "}
                </button>
                <button
                  onClick={() => {
                    setUrgent(false);
                  }}
                  className="show-button"
                >
                  {" "}
                  Show All{" "}
                </button>
              </>
            ) : (
              <>
                <button className="newRequest-button" onClick={() => navigate("/request/create")}>
                  {" "}
                  New Request{" "}
                  
                </button>
                <button className="openRequest-button" onClick={() => updateOpenOnly(true)}>
                  {" "}
                  Open Requests{" "}
                  
                </button>
                <button className="allRequests-button" onClick={() => updateOpenOnly(false)}>
                  {" "}
                  All Requests{" "}
                  
                </button>
              </>
            )}
            <h2> List of Requests </h2>
            <article className="requests">
            {" "}
              {filteredRequests.map((request) => (
                <Request
                  key={`request--${request.id}`}
                  requestObject={request}
                  userObject={bmhUserObject}
                  interpreters={interpreters}
                  getRequests={getAllRequests}
                />
              ))}{" "}
              <div> </div>{" "}
            </article>
          </>
        );
        }