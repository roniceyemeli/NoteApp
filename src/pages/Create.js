import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { makeStyles } from "@mui/styles";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useHistory } from "react-router";

// import { withStyles } from '@mui/styles';

// const styles = {
//     field:{
//     marginTop: 20,
//     marginBottom: 20,
//     display: 'block',
//   },
//   space:{
//     marginTop: 20,
//   }
// };

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
  space: {
    marginTop: 20,
  },
});

const Create = () => {
  const classes = useStyles();
  const history = useHistory()


  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState("todos");

  const handleSubmit = (e) => {
    e.preventDefault();
    setDetailsError(false);
    setTitleError(false);

    if (title === "") {
      setTitleError(true);
    }
    if (title === "") {
      setDetailsError(true);
    }
    
    //post new notes
    if (title && details) {

      const postNotes = async () => {
        try {
            await axios.post("http://localhost:3004/notes",
            { title, details, category },
          );
          history.push('/')
        } catch (error) {
          console.log(error);
        }
      };
      postNotes();
    }
  };

  return (
    <Container>
      <Typography variant="h5" color="textSecondary" gutterBottom>
        Create a new Note
      </Typography>

      <form
        noValidate
        autoComplete="off"
        className={classes.field}
        onSubmit={handleSubmit}
      >
        <div>
          <TextField
            onChange={(e) => setTitle(e.target.value)}
            label="Note Title"
            variant="outlined"
            fullWidth
            required
            error={titleError}
          />
        </div>

        <div className={classes.space}>
          <TextField
            onChange={(e) => setDetails(e.target.value)}
            label="Details"
            variant="outlined"
            fullWidth
            required
            multiline
            rows={4}
            error={detailsError}
          />
        </div>

        <div className={classes.space}>
          <FormControl>
            <FormLabel>Note Category :</FormLabel>
            <RadioGroup
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <FormControlLabel
                value="money"
                control={<Radio />}
                label="Money"
              />
              <FormControlLabel
                value="todos"
                control={<Radio />}
                label="Todos"
              />
              <FormControlLabel
                value="reminders"
                control={<Radio />}
                label="Reminders"
              />
              <FormControlLabel value="work" control={<Radio />} label="Work" />
            </RadioGroup>
          </FormControl>
        </div>

        <div className={classes.space}>
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            endIcon={<KeyboardArrowRightIcon />}
          >
            Submit
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default Create;
// export default withStyles(styles)(Create);
