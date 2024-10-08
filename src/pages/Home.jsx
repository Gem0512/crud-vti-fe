import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Modal, styled, TextField, Typography } from '@mui/material';
import ListProduct from '../components/ListProduct';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    const [open, setOpen] = useState(false);
    const [action, setAction] = useState();
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentProductId, setCurrentProductId] = useState(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        resetForm();
    };

    const resetForm = () => {
        setProductName('');
        setDescription('');
        setPrice('');
        setImage(null);
        setSelectedImage(null);
        setCurrentProductId(null);
    };

    const handleAddProduct = async () => {
        if (!productName || !description || !price || !image) {
            alert('Please fill all fields and upload an image');
            return;
        }
        const token = localStorage.getItem('access_token');

        const formData = new FormData();
        formData.append('name', productName);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('image', image);

        try {
            const response = await axios.post('http://localhost:3001/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            getProducts();
            alert('Product added successfully');
            handleClose();
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Failed to add product');
        }
    };

    const handleEditOpen = (product) => {
        setAction('edit');
        setCurrentProductId(product.id); 
        setProductName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setImage(product.imageUrl);
        setSelectedImage(product.imageUrl);
        handleOpen();
    };

    const handleFileChange = (event) => {
        setImage(event.target.files[0]);
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const getProducts = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/products`);
            setProducts(response.data);
            console.log(response.data)
            setHasMore(response.data.hasMore);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);


    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 500 && !loading && hasMore) {
            setPage((prevPage) => prevPage + 1); 
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [loading, hasMore]);

    const handleEdit = async () => {

        if (!productName || !description || !price || !image) {
          alert('Please fill all fields and upload an image');
          return;
        }
        const token = localStorage.getItem('access_token');
        const formData = new FormData();
        formData.append('name', productName);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('image', image);
    
        try {
          const response = await axios.put(`http://localhost:3001/products/${currentProductId}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          });
          handleClose()
          getProducts();
          alert('Product updated successfully');
        } catch (error) {
          console.error('Error updating product:', error);
          alert('Failed to update product');
        }
      };


      const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {

            const token = localStorage.getItem('access_token');
          try {
            await axios.delete(`http://localhost:3001/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                  },
            });
            getProducts();
            alert('Product deleted successfully');
          } catch (error) {
            console.error('Error deleting product:', error);
            alert('Failed to delete product');
          }
        }
      };

      const navigate = useNavigate();

        useEffect(() => {
            const token = localStorage.getItem('access_token');
            if (!token) {
                navigate('/login');
            }
        }, [navigate]);

    return (
        <Box>
            <Header></Header>
            <Box sx={{ padding: 5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h4">List product</Typography>
                    <Button variant="contained" onClick={() => { setAction('add'); handleOpen(); }}>
                        Add new product
                    </Button>
                </Box>
                <Box sx={{ marginTop: 4 }}>
                    {/* <ListProduct products={products} handleEditOpen={handleEditOpen} handleDelete={handleDelete}></ListProduct> */}
                    {
                        products && products.map((product) => {
                            return (
                                <Card sx={{ maxWidth: 345, margin: 2 }} key={product.id}>
                                    <CardMedia
                                        sx={{ height: 140 }}
                                        image={product.imageUrl}
                                        title={product.name} // Cập nhật title cho hình ảnh
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {product.name}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                            {product.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small"  onClick={()=>{handleEditOpen(product)}}>Edit</Button>
                                        <Button size="small"onClick={()=>{handleDelete(product.id)}}>Delete</Button>
                                    </CardActions>
                                </Card>
                            );
                        })
                    }

                </Box>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
                        <Typography variant='h5'>{action === 'edit' ? 'Edit product' : 'Add product'}</Typography>
                    </Box>
                    <TextField
                        sx={{ display: 'block', marginBottom: 2, marginTop: 4 }}
                        fullWidth
                        id="outlined-basic"
                        label="Product name"
                        variant="outlined"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                    />
                    <TextField
                        sx={{ display: 'block', marginBottom: 2, marginTop: 4 }}
                        fullWidth
                        id="outlined-basic"
                        label="Description"
                        variant="outlined"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <TextField
                        sx={{ display: 'block', marginBottom: 2, marginTop: 4 }}
                        fullWidth
                        id="outlined-basic"
                        label="Price"
                        variant="outlined"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <Button
                        component="label"
                        role={undefined}
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload image
                        <VisuallyHiddenInput
                            type="file"
                            onChange={handleFileChange}
                            multiple
                        />
                    </Button>

                    {selectedImage && ( // Hiển thị ảnh nếu có ảnh được chọn hoặc ảnh hiện tại
                        <Box sx={{ marginTop: 2 }}>
                            <img
                                src={selectedImage}
                                alt="Selected"
                                style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain' }} // Style để ảnh hiển thị đẹp
                            />
                        </Box>
                    )}
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
                        <Button variant="contained" onClick={action === 'edit' ? handleEdit : handleAddProduct}>
                            {action === 'edit' ? 'Update product' : 'Add product'}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}
