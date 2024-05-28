const NoteItem = ({note}) => {
    return (
        <div>
            <div>{note.title}</div>
            <span>{note.content}</span>
            <div>
                Delete
            </div>
        </div>
    )
}

export default NoteItem