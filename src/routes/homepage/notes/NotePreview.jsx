import { useNavigate } from "react-router-dom";

export default function NotePreview({
  id,
  title,
  body,
  createdAt,
  onDelete,
}) {
  const navigate = useNavigate();
  const formattedDate = new Date(
    createdAt
  ).toLocaleString();

  const formattedBody = () => {
    if (body.includes("\n")) {
      return body.split("\n")[0] + "...";
    }
    if (body.length > 60) {
      return body.slice(0, 60) + "...";
    }
    return body;
  };
  const handleDeleteNote = async (noteId) => {
    console.log(noteId);
    let isDelete = confirm(
      "Вы действительно хотите удалить заметку?"
    );
    if (!isDelete) {
      return;
    }
    onDelete(noteId);
  };

  return (
    <div className="flex flex-row w-[80vw] items-center justify-between bg-slate-300 px-4 py-1 h-11">
      <div
        className="w-full pr-3"
        onClick={() => navigate(`/notes/${id}`)}
      >
        <div className="font-medium text-sm">{title}</div>
        <div className="flex flex-row items-center gap-2">
          <div className="text-xs text-slate-700">
            {formattedDate}
          </div>
          <div className="text-xs text-slate-700">
            {formattedBody()}
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-1">
        <button onClick={() => handleDeleteNote(id)}>
          🗑️
        </button>
        <button
          onClick={() => {
            navigate(`/notes/edit/${id}`);
          }}
        >
          ✍️
        </button>
      </div>
    </div>
  );
}
