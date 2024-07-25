// src/pages/Orders.js
import React, { useState, useEffect } from 'react';
import {
	Button, Typography, Container, Dialog, DialogActions,
	DialogContent, DialogTitle, TextField, List, Stack, Box
} from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DataGrid } from '@mui/x-data-grid';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import MultiProductSelectDialog from './MultiProductSelectDialog'
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import dayjs from 'dayjs';
import axios from 'axios';
import ViewOrder from './Util/ViewOrder';


const Orders = () => {
	const [orders, setOrders] = useState([]);
	const [contact, setContact] = useState({ firstname: '', address: '', lastname: '' });
	const [open, setOpen] = useState(false);
	const [currentOrder, setCurrentOrder] = useState({ orderdeliverdate: '', advanceamount: '', totalamount: '' });
	const [dialogOpen, setDialogOpen] = useState(false);
	const [selectedProducts, setSelectedProducts] = useState([]);
	const [totalCost, setTotalCost] = useState(0);
	const [selectedDate, setSelectedDate] = useState(null);
	const [selectedTime, setSelectedTime] = useState(null);
	const [formattedDateTime, setFormattedDateTime] = useState('');
	const [viewOrderDailog, setViewOrderDailog] = useState(false);
	const [selectedOrderId, setSelectedOrderId] = useState("");
	const [errors, setErrors] = useState({
		address: false,
		firstname: false,
		phone: false,
		address: false,
		quantity: false,
		selectedTime: false,
		selectedDate: false,
	});

	useEffect(() => {
		axios.get("http://localhost:8080/get-all-orders").then(res => {
			console.log("success " + JSON.stringify(res));
			setOrders(res.data);
		})
	}, [])

	const handleDateChange = (date) => {
		setSelectedDate(date);
	};

	const handleTimeChange = (time) => {
		setSelectedTime(time);
	};

	const handleOpenDialog = () => {
		setDialogOpen(true);
	};

	const handleCloseDialog = () => {
		setDialogOpen(false);
	};

	const handleSelectProducts = (products) => {
		setSelectedProducts(products);
		console.log('setSelectedProducts ' + JSON.stringify(selectedProducts));
		setOpen(true)
	};
	const handleClickOpen = () => {
		handleOpenDialog();
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSave = (e) => {
		e.preventDefault();
		//setOrders([...orders, currentOrder]);
		//setCurrentOrder({});
		console.log("I am here " + JSON.stringify(selectedProducts));

		const newErrors = {
			address: contact.address === '',
			firstname: contact.firstname === '',
			phone: contact.phone === ''
		};
		setErrors(newErrors);
		createNewOrder();
		//handleClose();
	};

	const handleViewOrderDailog = ()=>{
		setViewOrderDailog(true);
	};

	const handlCloseOrderDailog = ()=>{
		setViewOrderDailog(false);
	};

	// this method help to view the seleted order
	const handleViewOrder = (id)=>{
		setViewOrderDailog(false);
		console.log("IDDDDDDDDDDDDDD "+ id);
		setSelectedOrderId(id);
		handleViewOrderDailog();
	}


	const createNewOrder = () => {
		let localDateTime = '';
		if (selectedDate && selectedTime) {
			const combinedDateTime = dayjs(selectedDate)
				.hour(selectedTime.hour())
				.minute(selectedTime.minute())
				.second(0);

			localDateTime = combinedDateTime.format('YYYY-MM-DD hh:mm A');
			console.log("____ " + localDateTime);
		} else {
			//alert('Please select both date and time');
		}

		const orderObj = {
			"orderdeliverdate": localDateTime,
			"totalamount": totalCost,
			"advanceamount": currentOrder.advanceamount
		}
		const orderItems = selectedProducts.map(sp => ({
			quantity: sp.quantity,
			itemname: sp.productname,
			rupeesperitem: sp.price
		}));
		console.log("orderItems 0 " + JSON.stringify(orderItems));
		return axios.post("http://localhost:8080/new-order", orderObj).then(res => {
			console.log('order success ' + JSON.stringify(res));
			return axios.post(`http://localhost:8080/insert-products/${res.data.id}/items`, orderItems);
		}).then(res => {
			<Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
				Order succesfully created.
			</Alert>
			console.log("success from orderItem--> " + JSON.stringify(res))
		}).catch(err => {
			console.log("error occured " + JSON.stringify(err));
		})
	};

	const handleDelete = (id) => {
		setOrders(orders.filter(order => order.id !== id));
	};


	const handleQuantityChange = (id, quantity) => {
		console.log(" herro id here " + typeof quantity);
		let p = 0;
		for (const sp of selectedProducts) {
			if (sp.id === id && quantity && quantity > 0) {
				p += parseInt(quantity) * parseInt(sp.price);

			} else if (sp.quantity) {
				p += parseInt(sp.quantity) * parseInt(sp.price)
			}
		}
		setTotalCost(p);
		console.log("Total cost " + p);
		setSelectedProducts((selectedProducts) =>
			selectedProducts.map((product) =>
				product.id === id ? { ...product, quantity } : product
			)
		);

	};

	const columns = [
		{ field: 'id', headerName: 'ID', width: 90 },
		{ field: 'orderdeliverdate', headerName: 'Delivery Date & Time', width: 150 },
		{ field: 'totalamount', headerName: 'Total Amount', width: 150 },
		{ field: 'advanceamount', headerName: 'Advance Amount', width: 110 },
		{
			field: 'actions',
			headerName: 'Actions',
			width: 150,
			renderCell: (params) => (
				<>
					<Button variant="contained" size="small" onClick={() => handleViewOrder(params.row.id)}>View Detail</Button>
					<Button variant="outlined" size="small" onClick={() => handleDelete(params.row.id)}>Delete</Button>
				</>
				
				
			),
		},
	];

	return (
		<Container>
			<Typography variant="h4" component="h1" gutterBottom>
				Orders
			</Typography>
			<Button variant="contained" color="primary" onClick={handleClickOpen}>
				Create Order
			</Button>
			<div style={{ height: 400, width: '100%', marginTop: 20 }}>
				<DataGrid rows={orders} columns={columns} pageSize={5} />
			</div>
			<MultiProductSelectDialog
				open={dialogOpen}
				onClose={handleCloseDialog}
				onSelect={handleSelectProducts}
			/>

			{/* this component help to display order detail */}

			<ViewOrder 
				open={viewOrderDailog}
				onClose={handlCloseOrderDailog}
				orderId = {selectedOrderId}
					
			/>
			

			<div>
				<Dialog open={open} onClose={handleClose}>
					<DialogTitle>Create Order</DialogTitle>
					<DialogContent>

						{/* start product details Accordion  */}
						<Accordion defaultExpanded>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="Order-product"
								id="Order-product"
							>
								Product Details
							</AccordionSummary>
							<AccordionDetails>
								<List>
									{selectedProducts.map((sp) => (
										<Stack key={sp.id} direction="row" justifyContent="space-between" alignItems="center">
											<Typography gutterBottom variant="subtitle2" component="div">
												{sp.productname}
											</Typography>
											<Typography gutterBottom variant="subtitle2" component="div">
												₹{sp.price}
											</Typography>
											<Typography gutterBottom variant="subtitle2" component="div">
												<TextField size='small'
													autoFocus
													margin="dense"
													label="Quantity"
													fullWidth
													value={sp.quantity || ''}
													onChange={(e) => handleQuantityChange(sp.id, e.target.value)}
												/>
											</Typography>
										</Stack>
									))}
									<Typography variant="button" display="block" gutterBottom>Total Cost:{totalCost}</Typography>
								</List>
							</AccordionDetails>
						</Accordion>

						{/* Order information section start */}
						<Accordion defaultExpanded>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="Order-info"
								id="Order-info"
							>
								Order Information
							</AccordionSummary>
							<AccordionDetails>

								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<Typography>Selelect Delivery Date & Time</Typography>
									<Box sx={{ display: 'flex', gap: 2, maxWidth: 350, marginTop: 1, marginBottom: 1 }}>
										<DatePicker
											label="Select Date"
											value={selectedDate}
											onChange={handleDateChange}
											renderInput={(params) => <TextField {...params} />}
										/>
										<TimePicker
											label="Select Time"
											value={selectedTime}
											onChange={handleTimeChange}
											renderInput={(params) => <TextField {...params} />}
										/>
									</Box>
								</LocalizationProvider>
								<TextField size='small'
									autoFocus
									disabled
									margin="dense"
									label="Total Amount"
									fullWidth
									value={totalCost || ''}
									onChange={(e) => setContact({ ...currentOrder, totalamount: e.target.value })}
								/>
								<TextField size='small'
									autoFocus
									required
									margin="dense"
									label="Advance Amount"
									fullWidth
									value={currentOrder.advanceamount || ''}
									onChange={(e) => setContact({ ...currentOrder, advanceamount: e.target.value })}
								/>
							</AccordionDetails>
						</Accordion>
						{/* Order information section End */}

						{/* start Contact information Accordion  */}
						<Accordion defaultExpanded>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="contact-info"
								id="contact-info"
							>
								Contact Info
							</AccordionSummary>
							<AccordionDetails>

								<TextField size='small'
									autoFocus
									required
									margin="dense"
									label="First Name"
									fullWidth
									value={contact.firstname || ''}
									onChange={(e) => setContact({ ...contact, firstname: e.target.value })}
									error={errors.firstname}
									helperText={errors.firstname && "First Name is required"}
								/>
								<TextField size='small'
									autoFocus
									required
									margin="dense"
									label="Last Name"
									fullWidth
									value={contact.lastname || ''}
									onChange={(e) => setContact({ ...contact, lastname: e.target.value })}
								/>
								<TextField size='small'
									autoFocus
									required
									margin="dense"
									label="Phone"
									fullWidth
									value={contact.phone || ''}
									onChange={(e) => setContact({ ...contact, phone: e.target.value })}
									error={errors.phone}
									helperText={errors.phone && "Phone number is required"}
								/>
								<TextField size='small'
									autoFocus
									required
									margin="dense"
									label="Address"
									fullWidth
									value={contact.address || ''}
									onChange={(e) => setContact({ ...contact, address: e.target.value })}
									error={errors.address}
									helperText={errors.address && "Address is required"}
								/>
							</AccordionDetails>
						</Accordion>
						{/* end Contact information Accordion  */}

					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary">
							Cancel
						</Button>
						<Button onClick={handleClickOpen} color="primary">
							Back
						</Button>
						<Button onClick={handleSave} variant="contained" color="success">
							Save
						</Button>
					</DialogActions>
				</Dialog>

			</div>
		</Container>
	);
};

export default Orders;
