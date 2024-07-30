import React, { useState, useEffect } from 'react';
import {
    Dialog, DialogActions, DialogContent,
    Button, Snackbar
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import {
    GridRowModes,
    DataGrid,
    GridActionsCellItem,
    GridRowEditStopReasons,
    GridToolbarContainer
} from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import axios from 'axios';

function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;
  
    const handleClick = () => {
      const id =''
      setRows((oldRows) => [...oldRows, { id, itemName: '', quantity: '', perPric:'' }]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: 'itemName' },
      }));
    };
  
    return (
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Add New Item
        </Button>
      </GridToolbarContainer>
    );
  }

const ViewOrder = ({ open, onClose, onSelect, orderId }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [orderItems, setOrderItems] = useState([]);
    const [rows, setRows] = React.useState([]);
    const [rowModesModel, setRowModesModel] = React.useState({});
    const [isShowSuccessAlert, setIsShowSuccessAlert] = useState(false)
    const [severity, setSeverity] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    useEffect(() => {
        if (orderId && rows.length == 0) {
            console.log("call orderItem");
            axios.get(`http://localhost:8080/get-products/${orderId}`).then(orderItems => {
                console.log("hello dear " + JSON.stringify(orderItems));
                setOrderItems(orderItems.data)
                setRows(orderItems.data);
            })
        }
    }, [orderId])


    console.log("view order is calling " + orderId);

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        const data = { ...rowModesModel, [id]: { mode: GridRowModes.View } };
        console.log("Save data is  "+ JSON.stringify(data));
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id) => () => {

        try {
            axios.delete(`http://localhost:8080/delete/order-item/${id}`).then(res=>{
                console.log("restype "+ typeof res);
                if(res.status===200){
                    setSeverity("success")
                    setAlertMessage("Record successfully deleted")
                    setIsShowSuccessAlert(true)
                    setRows(rows.filter((row) => row.id !== id));
                }else{
                    setSeverity("error")
                    setAlertMessage(JSON.stringify(res))
                    setIsShowSuccessAlert(true)
                }
            }).catch(err=>{
                setSeverity("error")
                setAlertMessage(JSON.stringify(err))
                setIsShowSuccessAlert(true)
            })
    
           
    
        } catch (error) {
            console.log("exception happen "+ error);
        }
        
       
    };



    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };
    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };
    const processRowUpdate = (newRow) => {
        console.log(" new Row "+ JSON.stringify(newRow));
        let orderItem = {
            quantity: newRow.quantity,
			itemname: newRow.itemName,
			rupeesperitem: newRow.perPrice,
            id: newRow.id
        };

        return axios.put(`http://localhost:8080/update-orderitem/${orderId}/items`, [orderItem]).then(res=>{
            
            console.log("update sucess "+JSON.stringify(res));
            const updatedRow = { ...newRow, isNew: false };
            const data  = rows.map((row) => (row.id === newRow.id ? updatedRow : row));
            console.log("process data update "+ JSON.stringify(data));
            setSeverity("success")
            
            setIsShowSuccessAlert(true)
            let datax = rows;
            if(newRow.id===''){
                console.log('into iffff');
                let updatedData = res.data[0]
                setAlertMessage("Record successfully inserted.")
                let newRec = {"itemName":updatedData.itemname,"quantity":updatedData.quantity,"perPrice":updatedData.rupeesperitem,"id":updatedData.id};
                setRows(rows.map((row) => (row.id ==='' ? newRec :  row)));
                return newRec;
            }else{
                setAlertMessage("Record successfully updated.")
                setRows(rows.map((row) => (row.id === newRow.id ? updatedRow :  row)));
                return updatedRow;
            }

        }).catch(err=>{
            setSeverity("error")
            setAlertMessage(JSON.stringify(err))
            setIsShowSuccessAlert(true)
            console.log("error from update "+ JSON.stringify(err));
        })
        
    };
    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };


    const columns = [
        { field: 'id', headerName: 'ID' },
        { field: 'itemName', headerName: 'Item Name', width: 150, editable: true },
        { field: 'quantity', headerName: 'Quantity', width: 100, editable: true },
        { field: 'perPrice', headerName: 'Rupees', width: 100, editable: true },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];


    return (
        
        <Dialog open={open} onClose={onClose} fullScreen={fullScreen} fullWidth maxWidth="md">
            <DialogContent>
            <Snackbar open={isShowSuccessAlert}  autoHideDuration={5000} anchorOrigin={{vertical:"top", horizontal:"center"}}>
                <Alert variant="filled" severity={severity}  onClose={() => {setIsShowSuccessAlert(false)}}>
                    {alertMessage}
                </Alert>
            </Snackbar>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    editMode="row"
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={handleRowModesModelChange}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
                    slots={{
                        toolbar: EditToolbar,
                    }}
                    slotProps={{
                        toolbar: { setRows, setRowModesModel },
                    }}
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )

};

export default ViewOrder;