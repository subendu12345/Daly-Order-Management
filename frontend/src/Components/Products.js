// src/pages/Products.js
import React, { useState, useEffect } from 'react';
import { Button, Typography, Container, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({});

    useEffect(()=>{
        axios.get("http://localhost:8080/get-all-products").then(res=>{
            console.log("success "+ JSON.stringify(res));
            setProducts(res.data);
        })
    },[])
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleOpenBackdrop = () => {
        setOpenBackdrop(true);
    }

    const handleCloseBackdrop = () => {
        setOpenBackdrop(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        if (currentProduct.id) {
            setProducts(products.map(product => product.id === currentProduct.id ? currentProduct : product));
        } else {
            setProducts([...products, { ...currentProduct, id: uuidv4() }]);
        }
        setCurrentProduct({});
        console.log("currentProduct " + JSON.stringify(currentProduct));
        handleOpenBackdrop();
        axios.post("http://localhost:8080/new-product", {
            "productname": currentProduct.name,
            "price": currentProduct.price,
            "test": currentProduct.test
        }).then(res => {
            console.log('product succesfully save..' + JSON.stringify(res));
        }).catch(err => {
            console.log("error occure " + JSON.stringify(err));
        })
        handleClose();
    };

    const handleDelete = (id) => {
        setProducts(products.filter(product => product.id !== id));
    };

    const handleEdit = (id) => {
        const productToEdit = products.find(product => product.id === id);
        setCurrentProduct(productToEdit);
        handleClickOpen();
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'productname', headerName: 'Product Name', width: 150 },
        { field: 'price', headerName: 'Price', width: 110 },
        { field: 'test', headerName: 'Product Test', width: 110 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 250,
            renderCell: (params) => (
                <>
                    <Button onClick={() => handleEdit(params.row.id)}>Edit</Button>
                    <Button onClick={() => handleDelete(params.row.id)}>Delete</Button>
                </>
            ),
        },
    ];

    return (

        <Container>
           
            <Typography variant="h4" component="h1" gutterBottom>
                Products
            </Typography>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Add Product
            </Button>

            <div style={{ height: 400, width: '100%', marginTop: 20 }}>
                <DataGrid rows={products} columns={columns} pageSize={5} />
            </div>

            <Dialog open={open} onClose={handleClose}>
            <div>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={openBackdrop}
                    onClick={handleCloseBackdrop}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
                <DialogTitle>{currentProduct.id ? 'Edit Product' : 'Add Product'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Product Name"
                        fullWidth
                        value={currentProduct.name || ''}
                        onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Price"
                        type="number"
                        fullWidth
                        value={currentProduct.price || ''}
                        onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Product Test"
                        fullWidth
                        value={currentProduct.test || ''}
                        onChange={(e) => setCurrentProduct({ ...currentProduct, test: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Image URL"
                        fullWidth
                        value={currentProduct.image || ''}
                        onChange={(e) => setCurrentProduct({ ...currentProduct, image: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Products;
