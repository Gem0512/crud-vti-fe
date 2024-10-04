import React, { useState } from 'react'
import Header from '../components/Header'
import { Box, Button, Modal, styled, TextField, Typography } from '@mui/material'
import ListProduct from '../components/ListProduct'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
  
  
export default function Home() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [action, setAction] = useState();

    const handleAddProduct =() =>{

    }
  return (
    <Box>
        <Header></Header>
        <Box sx={{
            padding: 5
        }}>
            <Box sx={{
                display:'flex',
                justifyContent: 'space-between'
            }}>
                <Typography variant="h4">
                    List product
                </Typography>
                <Button variant="contained" onClick={()=>{setAction('add'); handleOpen()}}>
                    Add new product
                </Button>
            </Box>
            <Box sx={{
                marginTop: 4
            }}>
                <ListProduct setAction={setAction}></ListProduct>
            </Box>
        </Box>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Box sx={{
                display: 'flex', 
                justifyContent:'center',
                marginBottom: 2
            }}>
                <Typography variant='h5'>Add product</Typography>
            </Box>
            
            <TextField sx={{display:'block', marginBottom: 2, marginTop: 4}} fullWidth  id="outlined-basic" label="Product name" variant="outlined" />
            <TextField sx={{display:'block', marginBottom: 2, marginTop: 4}} fullWidth  id="outlined-basic" label="Description" variant="outlined" />
            <TextField sx={{display:'block', marginBottom: 2, marginTop: 4}} fullWidth  id="outlined-basic" label="Price" variant="outlined" />
            <Button
                component="label"
                role={undefined}
                // variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                >
                Upload image
                <VisuallyHiddenInput
                    type="file"
                    onChange={(event) => console.log(event.target.files)}
                    multiple
                />
                </Button>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 3
            }}>
                <Button variant="contained" onClick={handleAddProduct}>Add product</Button>
            </Box>
        </Box>
      </Modal>
    </Box>
  )
}
