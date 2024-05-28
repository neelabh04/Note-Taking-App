import axios from "axios";
import { useState } from "react"

const NoteForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const formData = {
        title: title,
        content: content
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('<http://localhost:3000/api/v1/notes>', formData)
            console.log(response);
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div>
            <h2>Create a new Note</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        placeholder="What's the note title?"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label>Description</label>
                    <textarea
                        placeholder="What's the note description?"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    )
}

export default NoteForm