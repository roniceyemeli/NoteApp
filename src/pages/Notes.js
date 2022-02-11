import { Container } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NoteCard from '../components/NoteCard';
import Masonry from 'react-masonry-css'


export default function Notes() {
  const [notes, setNotes] = useState([])

  //fetch notes froom the json server
  useEffect(() => {
    const getNotes = async() =>{
      try {
        const res = await axios.get("http://localhost:3004/notes")
        setNotes(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getNotes();
  }, []);

  //delete note from the server
  const handleDelete = async(id) =>{
    await axios.delete("http://localhost:3004/notes/" + id)
    const newNotes = notes.filter(note => note.id !== id)
    setNotes(newNotes)
  }

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1
  }

  return (

    <Container>

      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
      {
        notes.map(note => (
          <div key={note.id}>
            <NoteCard note={note} handleDelete={handleDelete}/>
          </div>
        ))
      }
      </Masonry>
      
    </Container>
  )
}
