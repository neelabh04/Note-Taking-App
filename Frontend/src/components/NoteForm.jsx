import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const NoteForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchNote = async () => {
        try {
          const response = await axios.get(`/api/v1/notes/${id}`);
          setTitle(response.data.title);
          setContent(response.data.content);
        } catch (error) {
          console.error('Fetch note failed:', error);
        }
      };

      fetchNote();
    }
  }, [id]);

  const handleSaveNote = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`/api/v1/notes/${id}`, { title, content });
      } else {
        await axios.post('/api/v1/notes', { title, content });
      }
      navigate('/dashboard');
    } catch (error) {
      console.error('Save note failed:', error);
    }
  };

  return (
    <div className="container">
      <h2>{id ? 'Edit Note' : 'Create Note'}</h2>
      <form onSubmit={handleSaveNote}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">Content</label>
          <textarea
            className="form-control"
            id="content"
            rows="3"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">{id ? 'Update Note' : 'Save Note'}</button>
      </form>
    </div>
  );
};

export default NoteForm;