import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, TextField, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
    const [showPassword, setShowPassword] = React.useState(false);
    const [showCfPassword, setShowCfPassword] = React.useState(false);
    const navigation= useNavigate()
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowCfPassword = () => setShowCfPassword((show) => !show);



  const  [user, setUser]= useState({
    name: "",
    password: "",
    confirmPassword:"",
    role: 'user'
  });

  const handleChangeName = (event) => {
    setUser((prevState) => ({
        ...prevState, 
        name: event.target.value,
      }));
  };

  const handleChangePassword = (event) => {
    setUser((prevState) => ({
        ...prevState, 
        password: event.target.value,
      }));
  };


  const handleChangeCfPassword = (event) => {
    setUser((prevState) => ({
        ...prevState, 
        confirmPassword: event.target.value,
      }));
  };


  const handleRegister= async()=>{
    console.log(user)

    if(user.password===user.confirmPassword){
        try {
            const response = await axios.post('http://localhost:3001/auth/register', {
              name: user.name,
              password: user.password,
              role: user.role
            });
      
            console.log(response.data);
            localStorage.setItem('access_token', response.data.access_token);
            navigation('/login')
          } catch (err) {
            console.error(err);
          }
    }
    else{
        console.log("Pw và CfPw không match")
    }
    
  }

  return (
    <Box sx={{
        display: 'flex', 
        justifyContent:'center',
        marginTop: 30
    }}>
        <Paper sx={{
            padding: 3,
            display: 'block',
            width: '25%'
        }}>
            <Box sx={{
                display: 'flex', 
                justifyContent:'center',
                marginBottom: 2
            }}>
                <Typography variant="h4">Register</Typography>
            </Box>
            <TextField 
            sx={{display:'block', marginBottom: 4}} 
            fullWidth  
            id="outlined-basic" 
            label="Email" 
            variant="outlined"
            value={user.name}
            onChange={handleChangeName}
             />
            <FormControl sx={{width: '100%' }}  variant="outlined" value={user.password} onChange={handleChangePassword}>
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                        >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                    </InputAdornment>
                    }
                    label="Password"
                />
            </FormControl>
            <FormControl sx={{ marginTop: 4, width: '100%' }}  variant="outlined" value={user.confirmPassword} onChange={handleChangeCfPassword}>
                <InputLabel htmlFor="outlined-adornment-password">Confirm password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showCfPassword ? 'text' : 'password'}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowCfPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                        >
                        {showCfPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                    </InputAdornment>
                    }
                    label="Password"
                />
            </FormControl>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 3
            }}>
                <Button variant="contained" onClick={handleRegister}>Register</Button>
            </Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 1
            }}>
                <Typography>Bạn đã có tài khoản? 
                    <Link to="/login" >Login</Link>
                </Typography>
                
            </Box>
            
        </Paper>
    </Box>
  )
}
