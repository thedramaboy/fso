import { useState, useEffect } from "react";
import noteService from "./services/notes";

import { Routes, Route, Link, useMatch } from "react-router-dom";

import NoteList from "./components/NoteList";
import Home from "./components/Home";
import Footer from "./components/Footer";
import NoteForm from "./components/NoteForm";
import Note from "./components/Note";
import { AppBar, Container, Toolbar, Button } from "@mui/material";
import Notification from "./components/Notification";
import styled from "styled-components";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [notification, setNotification] = useState(null);
  const style = { "&:hover": { bgcolor: "rgba(255,255,255,0.3)" } };

  const Page = styled.div`
    padding: 1em;
    background: papayawhip;
  `;

  const Navigation = styled.div`
    background: BurlyWood;
    padding: 1em;
  `;

  const Footer = styled.div`
    background: Chocolate;
    padding: 1em;
    margin-top: 1em;
  `;

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      noteService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  const addNote = (noteObject) => {
    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNotification({
        text: `Note '${returnedNote.content}' added!`,
        type: "success",
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    });
  };

  const deleteNote = (id) => {
    noteService.remove(id).then(() => {
      setNotes(notes.filter((n) => n.id !== id));
    });
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch(() => {
        /*
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        */
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const padding = {
    padding: 5,
  };

  const match = useMatch("/notes/:id");

  const note = match ? notes.find((note) => note.id === match.params.id) : null;

  // console.log(note);

  // return (
  //   <Container>
  //     <div>
  //       {/* <div>
  //         <Link style={padding} to="/">
  //           home
  //         </Link>
  //         <Link style={padding} to="/notes">
  //           notes
  //         </Link>
  //         <Link style={padding} to="/create">
  //           new note
  //         </Link>
  //       </div> */}
  //       <AppBar position="static">
  //         <Toolbar>
  //           <Button color="inherit" component={Link} to="/" sx={style}>
  //             home
  //           </Button>
  //           <Button color="inherit" component={Link} to="/notes" sx={style}>
  //             notes
  //           </Button>
  //           <Button color="inherit" component={Link} to="/create" sx={style}>
  //             new note
  //           </Button>
  //         </Toolbar>
  //       </AppBar>

  //       <Notification notification={notification} />

  //       <Routes>
  //         <Route
  //           path="/notes/:id"
  //           element={
  //             <Note
  //               note={note}
  //               toggleImportanceOf={toggleImportanceOf}
  //               deleteNote={deleteNote}
  //             />
  //           }
  //         />
  //         <Route path="/notes" element={<NoteList notes={notes} />} />
  //         <Route path="/create" element={<NoteForm createNote={addNote} />} />
  //         <Route path="/" element={<Home />} />
  //       </Routes>

  //       <Footer />
  //     </div>
  //   </Container>
  // );
  return (
    <Page>
      <Navigation>
        <Link style={padding} to="/">
          home
        </Link>
        <Link style={padding} to="/notes">
          notes
        </Link>
        <Link style={padding} to="/create">
          new note
        </Link>
      </Navigation>

      <Routes>
        <Route
          path="/notes/:id"
          element={
            <Note
              note={note}
              toggleImportanceOf={toggleImportanceOf}
              deleteNote={deleteNote}
            />
          }
        />
        <Route path="/notes" element={<NoteList notes={notes} />} />
        <Route path="/create" element={<NoteForm createNote={addNote} />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer>
        Note app, Department of Computer Science, University of Helsinki 2026
      </Footer>
    </Page>
  );
};

export default App;
