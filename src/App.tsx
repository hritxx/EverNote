import Header from "./components/Header";
import CreateNote from "./components/CreateNote";
import Notes from "./components/Notes";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { NoteObject } from "./models/note";
function App() {
  const [notes, setNotes] = useState<NoteObject[]>([]);

  useEffect(() => {
    if (sessionStorage.getItem("notes")) {
      setNotes(JSON.parse(sessionStorage.getItem("notes") as string));
    }
  }, []);
  const addNotes = (note: NoteObject) => {
    setNotes([note, ...notes]);
    sessionStorage.setItem("notes", JSON.stringify([note, ...notes]));
  };
  const deleteNote = (id: number) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    sessionStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  return (
    <>
      <Header />
      <Box style={{ padding: 20 }}>
        <CreateNote addNotes={addNotes} />
        <Notes notes={notes} deleteNote={deleteNote} />
      </Box>
    </>
  );
}

export default App;
