import React, { useState, useEffect } from 'react';
import {
    Dialog, DialogActions, DialogContent, Alert,
    Button, Snackbar, DialogTitle, TextField
} from '@mui/material';

import MultiProductSelectDialog from '../MultiProductSelectDialog';

const AddOrderItem = ({open, onClose, onSelect })=>{
	const [dialogOpen, setDialogOpen] = useState(false);
    const [isShowSuccessAlert, setIsShowSuccessAlert] = useState(false)
    const [severity, setSeverity] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
	const [selectedProducts, setSelectedProducts] = useState([]);
    const handleCloseDialog = () => {
		setDialogOpen(false);
	};
    const handleSelectProducts = (products) => {
		setSelectedProducts(products);
		console.log('setSelectedProducts ' + JSON.stringify(selectedProducts));
		//setOpen(true)
	};

    return(
        <Dialog open={open} onClose={onClose}  fullWidth maxWidth="md">
        <Snackbar open={isShowSuccessAlert}  autoHideDuration={5000} anchorOrigin={{vertical:"top", horizontal:"center"}}>
            <Alert variant="filled" severity={severity}  onClose={() => {setIsShowSuccessAlert(false)}}>
                {alertMessage}
            </Alert>
        </Snackbar>
        <DialogTitle>New Item</DialogTitle>
        <DialogContent>
        <MultiProductSelectDialog
				open={dialogOpen}
				onClose={handleCloseDialog}
				onSelect={handleSelectProducts}
			/>
        </DialogContent>
        </Dialog>
    )
   
}

export default AddOrderItem;