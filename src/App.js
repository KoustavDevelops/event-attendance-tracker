// App.js
import React from "react";
import AttendanceForm from "./components/AttendanceForm";
import AttendeeList from "./components/AttendeeList";
import "./App.css";

function App() {
    return (
        <div className="App">
            <h1>Event Attendance Tracker</h1>
            <AttendanceForm />
            <AttendeeList />
        </div>
    );
}

export default App;
