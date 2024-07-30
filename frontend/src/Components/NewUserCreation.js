import React, { useState } from 'react';
import {
    TextField,
    Button, Dialog, DialogContent, DialogTitle, DialogActions
} from '@mui/material';
import bcrypt from 'bcryptjs';
import axios from 'axios';


const NewUserCreation = ({ open, onClose }) => {
    const[newUserObj, setNewUserObj] = useState({
        firstname:'',
        lastname :'',
        username:'',
        password:'',
        confrimpassword:''
    })

    const[error, setError] = useState({
        firstname:false,
        lastname :false,
        username:false,
        password:false
    })

    const  handleSubmit = async (e)=>{
        e.preventDefault();
        const newError = {
            firstname:newUserObj.firstname==='',
            lastname :newUserObj.lastname==='',
            username:newUserObj.username==='',
            password:newUserObj.password===''
        }
        setError(newError)
        if(!error.firstname && !error.lastname && !error.username && !error.password){
            const saltRounds = 10;
            const hashedPassword = bcrypt.hashSync(newUserObj.password, saltRounds);
            const hash = await bcrypt.hash(newUserObj.password, saltRounds);
            const match = await bcrypt.compare(newUserObj.password, hash);
            console.log("is match "+match);
            newUserObj.password = hashedPassword;
            delete newUserObj.confrimpassword;
            axios.post('http://localhost:8080/signup',newUserObj).then(res=>{
                console.log("User ",JSON.stringify(res));
            }).catch(err=>{
                console.log('errr '+JSON.stringify(err));
            })
            console.log("newUserObj---> "+ JSON.stringify(newUserObj));
        }
        
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Create new User</DialogTitle>
            <DialogContent>
            <TextField
                        autoFocus
                        margin="dense"
                        label="First Name"
                        fullWidth
                        error={error.firstname}
                        helperText={error.firstname && 'First Name is required'}
                        value={newUserObj.firstname || ''}
                        onChange={(e) => setNewUserObj({ ...newUserObj, firstname: e.target.value })}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Last Name"
                        fullWidth
                        value={newUserObj.lastname || ''}
                        error={error.lastname}
                        helperText={error.lastname && 'Last name is required'}
                        onChange={(e) => setNewUserObj({ ...newUserObj, lastname: e.target.value })}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="User Name"
                        fullWidth
                        error={error.username}
                        helperText={error.username && 'Username is required'}
                        value={newUserObj.username || ''}
                        onChange={(e) => setNewUserObj({ ...newUserObj, username: e.target.value })}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Password"
                        fullWidth
                        type='password'
                        error={error.password}
                        helperText={error.password && 'Password is required'}
                        value={newUserObj.password || ''}
                        onChange={(e) => setNewUserObj({ ...newUserObj, password: e.target.value })}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Confrim Password"
                        fullWidth
                        type='password'
                        value={newUserObj.confrimpassword || ''}
                        onChange={(e) => setNewUserObj({ ...newUserObj, confrimpassword: e.target.value })}
                    />

            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default NewUserCreation;