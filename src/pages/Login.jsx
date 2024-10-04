import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, TextField, Typography } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link, useNavigate, useNavigation } from 'react-router-dom';
import axios from "axios"

export default function Login() {
    const [showPassword, setShowPassword] = React.useState(false);
    const [name, setName] = useState();
    const [password, setPassword]= useState();
    const navigation = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  
    const handleMouseUpPassword = (event) => {
      event.preventDefault();
    };

    const handleChangeName = (event) => {
        setName(event.target.value); 
      };

      const handleChangePassword = (event) => {
        setPassword(event.target.value); 
      };
    const handleLogin =async ()=>{
        try {
            const response = await axios.post('http://localhost:3001/auth/login', {
              name,
              password,
            });
      
            console.log(response.data);
            localStorage.setItem('access_token', response.data.access_token);
            navigation('/')
          } catch (err) {
            console.error(err);
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
                <Typography variant="h4">Login</Typography>
            </Box>
            <TextField 
            sx={{display:'block', marginBottom: 4}} 
            fullWidth 
            value={name}  
            id="outlined-basic" 
            label="Name" 
            variant="outlined" 
             onChange={handleChangeName}
            />
            <FormControl sx={{ width: '100%' }}  variant="outlined" value={password} onChange={handleChangePassword}>
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
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 3
            }}>
                <Button variant="contained" onClick={handleLogin}>Login</Button>
                
            </Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 1
            }}>
                <Typography>Bạn chưa có tài khoản? 
                    <Link to="/register">Register</Link>
                </Typography>
                
            </Box>
        </Paper>
    </Box>
  )
}
