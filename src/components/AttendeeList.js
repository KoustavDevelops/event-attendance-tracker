// AttendeeList.js
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { format } from "date-fns";

function AttendeeList() {
    const [attendees, setAttendees] = useState([]);
    const [filteredEvent, setFilteredEvent] = useState("");

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "attendances"), (snapshot) => {
            const attendeesData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setAttendees(attendeesData);
        });
        return unsubscribe;
    }, []);

    const handleFilterChange = (e) => {
        setFilteredEvent(e.target.value);
    };

    const filteredAttendees = attendees.filter((attendee) =>
        filteredEvent ? attendee.event.includes(filteredEvent) : true
    );

    return (
        <div>
            <h2>Attendees</h2>

            <label>Filter by Event:</label>
            <input 
                type="text" 
                value={filteredEvent} 
                onChange={handleFilterChange} 
                placeholder="Enter event name" 
            />

            <ul>
                {filteredAttendees.map((attendee) => (
                    <li key={attendee.id}>
                        <strong>{attendee.name}</strong> - {attendee.event}
                        <br />
                        <small>
                            Checked in on:{" "}
                            {format(attendee.timestamp.toDate(), "MMMM dd, yyyy h:mm a")}
                        </small>
                        <br />
                        <img 
                            src={attendee.photoURL} 
                            alt={`${attendee.name}'s photo`} 
                            width="100" 
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AttendeeList;
