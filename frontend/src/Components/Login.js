import React, { useState } from 'react';
import {
    Container,
    Box,
    TextField,
    Button,
    Typography,
    CssBaseline,
    Avatar,Snackbar, Alert
  } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import NewUserCreation from './NewUserCreation';
import axios from 'axios';
import bcrypt from 'bcryptjs';

const Login = ({ setIsLoggedIn }) => {
  const [isShowSuccessAlert, setIsShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [openNewUserDailog, setOpenNewUserDailog] = useState(false);
  const navigate = useNavigate();
  const handleNewUserCreation = ()=>{
    setOpenNewUserDailog(true)
  }

  const handleOnClose = ()=>{
    setOpenNewUserDailog(false)
  }

  const handleLogin = async (e)  => {
    e.preventDefault();
    // Simulate login
    const salt = 10;
    console.log('password '+ password);
    axios.get(`http://localhost:8080/get-user/${username}`).then(async res=>{
      console.log('login success '+ JSON.stringify(res.data));
      const match = await bcrypt.compare(password, res.data.password);
      console.log("is match "+match);
      if(match){
        setSeverity('success')
        setAlertMessage('Login success!');
        setIsShowSuccessAlert(true);
        navigate('/orders');
        setIsLoggedIn(true);
      }else{
        setSeverity('error')
        setAlertMessage('please provide correct password/username..!');
        setIsShowSuccessAlert(true);
      }
    }).catch(err=>{
      setSeverity('error')
      setAlertMessage(JSON.stringify(err));
      setIsShowSuccessAlert(true);
      console.log('log in error '+ JSON.stringify(err));
    })

  };

  return (
    <Container component="main" maxWidth="xs">
              <Snackbar open={isShowSuccessAlert}  autoHideDuration={5000} anchorOrigin={{vertical:"top", horizontal:"center"}}>
            <Alert variant="filled" severity={severity}  onClose={() => {setIsShowSuccessAlert(false)}}>
                {alertMessage}
            </Alert>
        </Snackbar>
      <NewUserCreation onClose={handleOnClose} open={openNewUserDailog}/>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 1 }}
          >
            Sign In
          </Button>

          <Button
            onClick={handleNewUserCreation}
            fullWidth
            variant="contained"
            sx={{ mt: .6, mb: 2 }}
          >
            Create new User
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;