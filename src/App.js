import { useState, useEffect} from 'react';
import './App.css';
import { Button, FormControl, Typography, Container, TextField, List, Paper } from '@material-ui/core'
import Todo from './Todo';
import db from './firebase';
import firebase from 'firebase'

function App() {
  // Use States
  const [todos,setTodos] = useState([]);
  const [input,setInput] = useState('');

  //useEffect - Runs once when app loads;
  useEffect(() => {
    //this code runs when the component gets loaded
    db.collection('todoList').orderBy('timestamp','desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({ id:doc.id , todo: doc.data().todo})))
    });
  },[]);

  //Handlers
  const onInputChange = (e) => {
    setInput(e.target.value);
  }

  const addTodo = (e) =>{
    e.preventDefault();
    if(input){

      db.collection('todoList').add({
        todo:input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp() ,
      });

      setTodos([...todos,input]);
      setInput('');
    }
    
  }

  return (
    <Paper className="App">

      <Typography variant="h2">Todo App</Typography>
      <br/>
      <form className='inpForm' type='submit'>
        <FormControl >
          <TextField label='write to do' variant='outlined' autoFocus={true} onChange={onInputChange} value={input} />
        </FormControl>
        <Button onClick={addTodo} variant="contained" color='primary' type='submit'>Add Todo</Button>
      </form>
      <br/>
      <Container maxWidth='md'>
        <List>
        {todos.map((todo) => <Todo todoText={todo.todo} todo={todo}/> )}
        </List>
      </Container>
     
    </Paper>
  );
}

export default App;
