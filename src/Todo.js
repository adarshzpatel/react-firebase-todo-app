import { Button,Card,Input, ListItem, ListItemText, Modal, Paper } from '@material-ui/core'
import React,{useState} from 'react';
import db from './firebase';
import { makeStyles } from '@material-ui/core/styles';


function Todo({todoText,todo}) {
    const [open,setOpen] = useState(false);
    const [input,setInput] = useState('');
    const handleOpen = () =>{
        setOpen(true);
    };

    const useStyles = makeStyles((theme) => ({
        paper: {
          position: 'absolute',
          width: 400,
          backgroundColor: theme.palette.background.paper,
          border: '2px solid #000',
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
      
      
        },
      }));
    const classes = useStyles();

    const updateTodo = () =>{
          
        //update the todo with the new input text
        db.collection('todoList').doc(todo.id).set({
            todo: input,
        },{merge:true})
        setOpen(false);
      }

    return (
        <>
        
        <Modal
        style={{ display:'flex', alignItems: "center", justifyContent: "center" }}
        open={open}
        onClose={e => setOpen(false)}
        >
            <div className={classes.paper} >
                <Input autoFocus={true} placeholder={todoText} value={input} onChange={e => setInput(e.target.value)} />
                <Button color='primary' onClick={e => updateTodo(e)}>Update</Button>
            </div>
        </Modal>
        <Card>
        <ListItem >
            <ListItemText primary={todoText} key={todo.id}/>
            <Button color='primary' onClick={handleOpen}> EDIT </Button>
            <Button style={{color:'red'}}  color='secondary' onClick={e => db.collection('todoList').doc(todo.id).delete()}> DELETE </Button>
        </ListItem>
        
        </Card>
        </>
    )
}

export default Todo;
