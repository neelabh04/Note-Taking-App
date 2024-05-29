import { useState, useEffect } from 'react';
import axios from 'axios';
import NoteItem from './NoteItem';

const NoteList = () => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const response = await axios.get('/api/v1/notes');
      setNotes(response.data.data);
    } catch (error) {
      console.error('Fetch notes failed:', error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await axios.delete(`/api/v1/notes/${id}`);
      setNotes(notes.filter(note => note.id !== id));
    } catch (error) {
      console.error('Delete note failed:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  if (notes.length === 0) {
    return <p>No notes present, create a new note</p>;
  }

  return (
    <div className="list-group">
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} onDeleteNote={handleDeleteNote} />
      ))}
    </div>
  );
};

export default NoteList;
