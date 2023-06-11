import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import c from "./shoppingList.module.scss";
import axios from "axios";
import Notes from "../../components/notes/Notes";

const ShoppingLists = () => {
  const [notes, setNotes] = useState<any>();
  const [createForm, setCreateForm] = useState({ title: "", body: "" });
  const [updateForm, setUpdateForm] = useState({
    _id: "",
    title: "",
    body: "",
  });
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const res = await axios.get("http://localhost:3006/notes");
    setNotes(res.data.notes);
  };
  const updateCreateFormField = (e: any) => {
    const { name, value } = e.target;
    setCreateForm({ ...createForm, [name]: value });
  };
  const createNote = async (e: any) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:3006/notes", createForm);

    setNotes([...notes, res.data.note]);

    setCreateForm({
      title: "",
      body: "",
    });
  };
  const deleteNote = async (_id: any) => {
    const res = await axios.delete(`http://localhost:3006/notes/${_id}`);

    const newNotes = [...notes].filter((note) => {
      return note._id !== _id;
    });

    setNotes(newNotes);
  };

  const handleUpdateFieldChange = (e: any) => {
    const { value, name } = e.target;

    setUpdateForm({
      ...updateForm,
      [name]: value,
    });
  };

  const toggleUpdate = (note: any) => {
    setUpdateForm({ title: note.title, body: note.body, _id: note._id });
  };

  const updateNote = async (e: any) => {
    e.preventDefault();

    const { title, body } = updateForm;

    const res = await axios.put(
      `http://localhost:3005/notes/${updateForm._id}`,
      {
        title,
        body,
      }
    );

    const newNotes = [...notes];
    const noteIndex = notes.findIndex((note: any) => {
      return note._id === updateForm._id;
    });
    newNotes[noteIndex] = res.data.note;

    setNotes(newNotes);

    setUpdateForm({
      _id: "",
      title: "",
      body: "",
    });
  };
  const sweetalertFunc = () => {
    Swal.fire({
      title: `Your Note was saved.`,
      icon: "success",
    });
  };

  return (
    <div id={c.listDiv}>
      <h2 id={c.listHeader}>Recipes Notes</h2>
      <h4>
        Add your favorite recipes, grocery lists or any cooking information you
        like
      </h4>
      {!updateForm._id && (
        <div>
          <form onSubmit={createNote} id={c.createNote}>
            <input
              placeholder="Title"
              id={c.noteInput}
              onChange={updateCreateFormField}
              value={createForm.title}
              name="title"
            />
            <br />

            <textarea
              placeholder="Description"
              onChange={updateCreateFormField}
              value={createForm.body}
              name="body"
            />
            <button
              onClick={() => sweetalertFunc()}
              id={c.createNoteBtn}
              className="btn"
              type="submit"
            >
              Create note
            </button>
          </form>
        </div>
      )}
      {updateForm._id && (
        <div>
          <form
            id={c.updateForm}
            className="input-group mb-3"
            onSubmit={updateNote}
          >
            <input
              placeholder="Title"
              id={c.noteInput}
              onChange={handleUpdateFieldChange}
              value={updateForm.title}
              name="title"
            />
            <textarea
              placeholder="Description"
              onChange={handleUpdateFieldChange}
              value={updateForm.body}
              name="body"
            />
            <button
              onClick={() => sweetalertFunc()}
              className="btn btn-info"
              type="submit"
            >
              Update note
            </button>
          </form>
        </div>
      )}
      <Notes
        deleteNote={deleteNote}
        toggleUpdate={toggleUpdate}
        notes={notes}
      />
    </div>
  );
};

export default ShoppingLists;
