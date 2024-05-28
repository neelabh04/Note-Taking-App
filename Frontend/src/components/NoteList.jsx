/*
    Backend pe call karenge iss user ke liye
    fetch all the notes present in the database, unhe ek notes array me store karlenge
        - Agar present toh array me loop laga ke individual note ko display karenge
        - Agar nahi toh display null
*/
import { useEffect, useState } from 'react'
import NoteItem from './NoteItem.jsx'
import axios from 'axios'

const NoteList = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchNotes = async() => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/')
                setNotes(response.data);
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        }
        console.log(fetchNotes)
    },[])
    /*
        dummy data
        const notes = [
            {
                id: 1,
                title: "Note 1",
                content: "Content 1"
            },
            {
                id: 2,
                title: "Note 2",
                content: "Content 2"
            },
        ]
    */
    if (loading) {
        return <h2>Please wait while loading...</h2>;
    }
    return (
        <div>
            {notes.length !== 0 ? (
                notes.map((note) => (
                    <NoteItem key={note.id} note={note} />
                ))
            ) : (
                <h2>No new notes</h2>
            )}
        </div>
    )
}

export default NoteList 