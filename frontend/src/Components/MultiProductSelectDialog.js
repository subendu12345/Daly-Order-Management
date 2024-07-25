// src/components/MultiSelectDialog.js
import React, { useState, useEffect } from 'react';
import {
    Dialog, DialogActions, DialogContent, DialogTitle,
    TextField, Button, List, ListItem, ListItemText, Checkbox,
    CircularProgress, Backdrop, Stack, Typography, Box, IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const MultiProductSelectDialog = ({ open, onClose, onSelect }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (searchQuery) {
            setLoading(true);
            axios.get(`http://localhost:8080/search/${searchQuery}`)
                .then(res => {
                    setProducts(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [searchQuery]);

    const handleToggle = (product) => {
        const currentIndex = selectedProducts.indexOf(product);
        const newSelectedProducts = [...selectedProducts];

        if (currentIndex === -1) {
            newSelectedProducts.push(product);
        } else {
            newSelectedProducts.splice(currentIndex, 1);
        }

        setSelectedProducts(newSelectedProducts);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSelect = () => {
        onSelect(selectedProducts);
        onClose();
    };

    const handleRemoveItem = (index) => {
        console.log("selectedProducts " + index);
        setSelectedProducts(selectedProducts.filter((_, i) => i !== index));
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Select Products</DialogTitle>
            <DialogContent>
                <TextField
                    size='medium'
                    autoFocus
                    margin="dense"
                    label="Search Products"
                    fullWidth
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                {loading && (
                    <Backdrop open={loading} style={{ zIndex: 1 }}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                )}
                <List>
                    {products.map((product) => (
                        <ListItem key={product.id} button onClick={() => handleToggle(product)}>
                            <Checkbox
                                size='small'
                                edge="start"
                                checked={selectedProducts.indexOf(product) !== -1}
                                tabIndex={-1}
                                disableRipple
                            />
                            <ListItemText primary={product.productname} /><span>₹{product.price}</span>
                        </ListItem>
                    ))}
                </List>

                <List>
                    {selectedProducts.map((sp, index) => (

                        <Stack key={index} direction="row" justifyContent="space-between" alignItems="center">
                            <IconButton edge="end" aria-label="delete" size='medium' onClick={() => handleRemoveItem(index)}>
                                <DeleteIcon />
                            </IconButton>
                            <Typography gutterBottom variant="subtitle2" component="div">
                                {sp.productname}
                            </Typography>
                            <Typography gutterBottom variant="subtitle2" component="div">
                                ₹{sp.price}
                            </Typography>
                        </Stack>
                    ))}
                </List>

                <Box component="span" sx={{ textDecoration: 'underline' }}>

                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSelect} color="primary">
                    Next
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default MultiProductSelectDialog;
