import { DeleteOutlined } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import Avatar from "@mui/material/Avatar";
import { blue, green, pink, yellow } from "@mui/material/colors";

const useStyles = makeStyles(
  {
    bgcolor: (note) => {
      if (note.category === 'reminders'){
        return yellow[500];
      }
      if (note.category === 'money'){
        return green[500];
      }
      if (note.category === 'work'){
        return pink[700];
      }
        return blue[500];
      }
})



const NoteCard = ({ note, handleDelete }) => { 

  const classes = useStyles(note);

return (
    <div>
      <Card elevation={2}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar} >
              {note.category[0].toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton onClick={() => handleDelete(note.id)}>
              <DeleteOutlined color="secondary" />
            </IconButton>
          }
          title={note.title}
          subheader={note.category}
        />
        <CardContent>
          <Typography variant="body2" color="testSecondary">
            {note.details}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default NoteCard;
