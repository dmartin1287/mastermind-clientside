import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./quiz.css"
// import {} from "react"
export const QuizForm = () => {
  /*
        TODO: Add the correct default properties to the
        initial state object
    */
  const [request, update] = useState({
    userId: 1,
    clientName: "",
    companyName: "",
    location: "",
    description: "",
    serviceTypeId: 0,
    eventTypeId: 0,
    urgent: false,
    dateCompleted: "",
  });
  const [eventTypes, setEventTypes] = useState(
    []
    // id:"",
    // eventType: ""
  );
  useEffect(() => {
    fetch(`http://localhost:8088/eventTypes`)
      .then((response) => response.json())
      .then((eventTypeArray) => {
        setEventTypes(eventTypeArray);
      });
  }, []);
   const [serviceTypes, setServiceTypes] = useState(
    []
    // id:"",
    // serviceType: ""
  );
  useEffect(() => {
    fetch(`http://localhost:8088/serviceTypes`)
      .then((response) => response.json())
      .then((serviceTypeArray) => {
        setServiceTypes(serviceTypeArray);
      });
  }, []);
  const [timeZones, setTimeZones] = useState(
    []
    // id:"",
    // timeZone: ""
  );
  useEffect(() => {
    fetch(`http://localhost:8088/timeZones`)
      .then((response) => response.json())
      .then((timeZoneArray) => {
        setTimeZones(timeZoneArray);
      });
  }, []);


  /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */
  let navigate = useNavigate();

  const localUser = localStorage.getItem("bmh_user");
  const bmhUserObject = JSON.parse(localUser);

  const handleSaveButtonClick = (event) => {
    event.preventDefault();

    // TODO: Create the object to be saved to the API
    let requestToSendToAPI = {
      userId:bmhUserObject.id,
      clientName: request.clientName,

      clientLastName: request.clientLastName,

      companyName: request.companyName,

      location: request.location,

      description: request.description,

      serviceTypeId: parseInt(request.serviceTypeId),

      eventTypeId: parseInt(request.eventTypeId),

       date: request.date,

        time: request.time,

        endtime: request.endtime,

        timeZoneId: parseInt(request.timeZoneId),

      urgent: request.urgent,

      dateCompleted: "",
    };

    // TODO: Perform the fetch() to POST the object to the API
    return fetch(
      "http://localhost:8088/serviceRequests?_embed=employeeRequests?_expand=eventType",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestToSendToAPI),
      }
    )
      .then((response) => response.json())
      .then(() => {
        navigate("/requests");
      });
  };
  

  return (
    <form className="requestForm">
      <h2 className="requestForm__title">New Service Request</h2>
      <fieldset>
        <div className="form-group">
             <div className="nameContainer">
             <div className="clientName">
               
          <label htmlFor="clientName"> Client's First Name:</label>
          <input
            required
            autoFocus
            type="text"
            className="form-control"
            placeholder="Client's First Name" 
            value={request.clientName}
            onChange={(event) => {
              const copy = { ...request };
              copy.clientName = event.target.value;
              update(copy);
            }}
          />
          
          </div>
          <div className="clientLastName">  
            <label htmlFor="clientLastName"> Client's Last Name:</label>
          <input
            required
            autoFocus
            type="text"
            className="form-control"
            placeholder="Client's Last Name" 
            value={request.clientLastName}
            onChange={(event) => {
              const copy = { ...request };
              copy.clientLastName = event.target.value;
              update(copy);
            }}
          />
          </div>
          </div>
          <div className="companyName">
          <label htmlFor="companyName">Company Name:</label>
          <input
            required
            autoFocus
            type="text" 
            className="form-control"
            placeholder="Company Name"
            value={request.companyName}
            onChange={(event) => {
              const copy = { ...request };
              copy.companyName = event.target.value;
              update(copy);
            }}
          />
          </div>
          <div className="description">
          <label htmlFor="description">Description:</label>
          <textarea
            required
            autoFocus
            className="form-control"
            placeholder="Brief description of what the client needs"
            value={request.description}
            onChange={(event) => {
              const copy = { ...request };
              copy.description = event.target.value;
              update(copy);
            }}
          />
          </div>
          <div className="location">
          <label htmlFor="location">Location:</label>
          <input
            required
            autoFocus
            type="text"
            className="form-control"
            placeholder="Location address, City, State, and zip code"
            value={request.location}
            onChange={(event) => {
              const copy = { ...request };
              copy.location = event.target.value;
              update(copy);
            }}
          />
          </div>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-groupz">
          <label htmlFor="serviceType">Service Needed:</label>
          <select
            //value={request.serviceTypeId}
            onChange={(evt) => {
              const copy = { ...request }; // Copy of existing state
              copy.serviceTypeId = parseInt(evt.target.value); 
              update(copy); 
            }}
          >
            <option value={0}>Please Select One</option>
            {serviceTypes.map((serviceType) => {
              return (
                <option key={serviceType.id} value={serviceType.id}>
                  {/* {""} */}
                  {serviceType.serviceType}
                </option>
              );
            })}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-groupz">
          <label htmlFor="eventType">Event Type:</label>
          <select
            //value={request.eventTypeId}
            onChange={(evt) => {
              const copy = { ...request }; // Copy of existing state
              copy.eventTypeId = parseInt(evt.target.value); 
              update(copy); 
            }}
          >
            <option value={0}>Please Select One</option>
            {eventTypes.map((eventType) => {
              return (
                <option key={eventType.id} value={eventType.id}>
                  {/* {""} */}
                  {eventType.eventType}
                </option>
              );
            })}
          </select>
        </div>
      </fieldset>
       <fieldset>
        <div className="date">
          <label htmlFor="eventDate">Event Date:</label>
         <input
            required
            autoFocus
            type="date"
            className="form-control"
            value={request.date}
            onChange={(evt) => {
              const copy = { ...request };
              copy.date = evt.target.value;
              update(copy);
            }}
          />
        </div>
      </fieldset>
      <div className="timeContainer">
        <fieldset>
        <div className="time">
          <label htmlFor="startTime">Start Time:</label>
         <input
            required
            autoFocus
            type="time"
            className="form-control"
            value={request.time}
            onChange={(evt) => {
              const copy = { ...request };
              copy.time = evt.target.value;
              update(copy);
            }}
          />
        </div>
      </fieldset>
        <fieldset>
        <div className="endtime">
          <label htmlFor="endTime">End Time:</label>
         <input
            required
            autoFocus
            type="time"
            className="form-control"
            value={request.endtime}
            onChange={(evt) => {
              const copy = { ...request };
              copy.endtime = evt.target.value;
              update(copy);
            }}
          />
        </div>
      </fieldset>
            <fieldset>
        <div className="form-groupz">
          <label htmlFor="timeZone">Time Zone:</label>
          <select
            //value={request.timeZoneId}
            onChange={(evt) => {
              const copy = { ...request }; // Copy of existing state
              copy.timeZoneId = parseInt(evt.target.value); 
              update(copy); 
            }}
          >
            <option value={0}>Please Select One</option>
            {timeZones.map((timeZone) => {
              return (
                <option key={timeZone.id} value={timeZone.id}>
                  {/* {""} */}
                  {timeZone.timeZone}
                </option>
              );
            })}
          </select>
        </div>
      </fieldset>
</div>

      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Urgent:</label>
          <input
            type="checkbox"
            value={request.urgent}
            onChange={(event) => {
              const copy = { ...request };
              copy.urgent = event.target.checked;
              update(copy);
            }}
          />
        </div>
      </fieldset>
      <button
        onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
        className="submit"
      >
        Submit Request
      </button>
    </form>
  );
};
