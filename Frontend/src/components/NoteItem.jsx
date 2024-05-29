import { useNavigate } from 'react-router-dom';

const NoteItem = ({ note, onDeleteNote }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await onDeleteNote(note.id);
      navigate('/dashboard');
    } catch (error) {
      console.error('Delete note failed:', error);
    }
  };

  const handleEdit = () => {
    navigate(`/edit-note/${note.id}`);
  };

  return (
    <div className="list-group-item mb-3">
      <h5>{note.title}</h5>
      <p>{note.content}</p>
      <button onClick={handleEdit} className="btn btn-secondary me-2">Edit</button>
      <button onClick={handleDelete} className="btn btn-danger">Delete</button>
    </div>
  );
};

export default NoteItem;
