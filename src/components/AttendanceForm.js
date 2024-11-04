// AttendanceForm.js
import React, { useState } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function AttendanceForm() {
    const [name, setName] = useState("");
    const [event, setEvent] = useState("");
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setPhoto(file);
        setPhotoPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        
        if (!name || !event || !photo) {
            setMessage("Please complete all fields and upload a photo.");
            return;
        }

        setLoading(true);

        try {
            const photoRef = ref(storage, `photos/${photo.name}`);
            await uploadBytes(photoRef, photo);
            const photoURL = await getDownloadURL(photoRef);

            await addDoc(collection(db, "attendances"), {
                name,
                event,
                photoURL,
                timestamp: Timestamp.now(),
            });

            setMessage("Attendance marked successfully!");
            setName("");
            setEvent("");
            setPhoto(null);
            setPhotoPreview(null);
        } catch (error) {
            console.error("Error adding document: ", error);
            setMessage("Failed to mark attendance.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
            />

            <label>Event:</label>
            <input 
                type="text" 
                value={event} 
                onChange={(e) => setEvent(e.target.value)} 
                required 
            />

            <label>Photo:</label>
            <input 
                type="file" 
                accept="image/*" 
                onChange={handlePhotoChange} 
                required 
            />

            {photoPreview && (
                <div>
                    <img 
                        src={photoPreview} 
                        alt="Photo Preview" 
                        width="100" 
                        style={{ marginTop: "10px" }} 
                    />
                </div>
            )}

            <button type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Mark Attendance"}
            </button>

            {message && <p>{message}</p>}
        </form>
    );
}

export default AttendanceForm;
