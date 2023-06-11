import Swal from "sweetalert2";
import c from "./notes.module.scss";

const Notes = ({ deleteNote, toggleUpdate, notes }: any) => {
  const sweetalertDelete = () => {
    Swal.fire({
      title: `Your Note was deleted.`,
      icon: "success",
    });
  };

  return (
    <div id={c.notesSection}>
      {notes &&
        notes.map((note: any) => {
          return (
            <div id={c.notesLists} key={note._id}>
              <h4>{note.title}</h4>
              <p>{note.body}</p>
              <div id={c.buttonsSection}>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    deleteNote(note._id);
                    sweetalertDelete();
                  }}
                >
                  Delete note
                </button>
                <button
                  className="btn btn-warning"
                  onClick={() => {
                    toggleUpdate(note);
                  }}
                >
                  Update note
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Notes;
