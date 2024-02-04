'use client'
import {Box, Button, List, ListItem, ListItemText, TextField, IconButton, Dialog,DialogTitle,DialogContent,DialogActions, Fab} from "@mui/material";
import * as React from 'react';
import { useState } from "react";
import ListItemButton from '@mui/material/ListItemButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import useGetProducts from "./useProducts";
import { Product } from "../_settings/interfaces";

export default function ProductList() {
    const [products, addProduct, deleteProduct, updateProduct, isLoading] = useGetProducts();
    const [newProduct, setNewProduct] = useState<Product>({ id: "", desc: "", price: 0, });
    const [status, setStatus] = useState({ visible: false });
    const handleClick = function (e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.name === "price") {
            setNewProduct({ ...newProduct, [e.target.name]: parseInt(e.target.value) })
        }
        else {
            setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
        }
    }
    const show = () => {
        setStatus({ ...status, visible: true })
    }
    const hide = () => {
        setStatus({ ...status, visible: false })
    }
    
    // function update() {
    //     //setProducts(() => [...products, newProduct]);
    //     setNewProduct({ ...newProduct, visible: false })
    //     console.log(products);
    // }

    function addOrUpdate() {
        if (newProduct.id === "") {
            addProduct(newProduct);
        }
        else {
            updateProduct(newProduct);
        }
        setStatus({ ...status, visible: false })
        resetProduct();
    }

    // const [selectedIndex, setSelectedIndex] = React.useState(1);
    // const handleListItemClick = (
    //     event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    //     index: number,
    // ) => {
    //     setSelectedIndex(index);
    // };
    // const handleDelete = (index:number) => {
    //     const updatedProducts = [...products];
    //     updatedProducts.splice(index,1);
    //     //setProducts(updatedProducts);
    // };
    // const [editingIndex, setEditingIndex] = React.useState(-1);
    // const [isEditing, setIsEditing] = React.useState(false);
    // const handleEditProduct = (indexToEdit:number) => {
    //   const productToEdit = products[indexToEdit];
    //     setNewProduct({
    //       ...productToEdit,
    //       visible: true,
    //     });
    //     setIsEditing(true);
    //     setEditingIndex(indexToEdit);
    // };
    // const handleSaveEdit = () => {
    //   const updatedProducts = [...products];
    //   //updatedProducts[editingIndex] = newProduct;
    //   //setProducts(updatedProducts);
    //   setNewProduct({ ...newProduct, visible: false });
    //   setIsEditing(false)
    // };

    function setUpdateProduct(product: Product) {
        setNewProduct({ ...product })
        setStatus({ visible: true })
    }
    const resetProduct = () => {
        setNewProduct({ id: "", desc: "", price: 0, })
    }

    return (
    <Box 
        sx={{
            position: 'fixed',
            top: 200,
            left: 100,
            right: 100,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            justifyContent: 'center',
            alignItems: 'center'
    }}>
        <Fab color="primary" aria-label="Add" sx={{position: 'fixed',bottom: '16px',right: '16px',}}onClick={show}>
            <AddIcon />
        </Fab>
            <Dialog open={status.visible} onClose={hide} aria-labelledby={newProduct.id === "" ? "新增產品" : "更新產品"}>
            <DialogTitle>{newProduct.id === "" ? "新增產品" : "更新產品"}</DialogTitle>
            <DialogContent>
                <TextField label="產品描述" variant="outlined" name="desc" value={newProduct.desc} onChange={handleClick} /><p />
                <TextField type="number" label="產品價格" variant="outlined" name="price" value={newProduct.price} onChange={handleClick} /><p />
            </DialogContent>
            <DialogActions>
                <IconButton aria-label="close" onClick={hide}sx={{position: 'absolute',right: 8,top: 8,}}>
                    <CloseIcon />
                </IconButton>
                <Button variant="contained" color="primary" onClick={addOrUpdate}>{newProduct.id === "" ? "新增產品" : "更新產品"}</Button>
            </DialogActions>
        </Dialog>
            
        <div>
            {/* <button onClick={show}>新增產品</button> */}
            <List subheader="單點" aria-label="product list">
                {products.map((product, index) =>
                <ListItem divider key={product.desc}>
                    <ListItemText primary={product.desc} secondary={product.price}></ListItemText>
                    <IconButton edge="end" aria-label="edit" onClick={() => setUpdateProduct(product)}>
                        <EditIcon />
                    </IconButton> 
                    <IconButton edge="end" aria-label="delete" onClick={() => deleteProduct(product.id)}>
                        <DeleteIcon />
                    </IconButton>
                </ListItem>)}
            </List>
        </div>      
    </Box>
    )}

// to centerfish