'use client'
import {Box, Button, List, ListItem, ListItemText, TextField, IconButton, Dialog,DialogTitle,DialogContent,DialogActions, Fab} from "@mui/material";
import * as React from 'react';
import { useState } from "react";
import ListItemButton from '@mui/material/ListItemButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import useGetSets from "./useSets";
import { Set } from "../_settings/interfaces";

export default function SetList() {
    const [Sets, addSets, deleteSet, updateSet, isLoading] = useGetSets();
    //const [newProduct, setNewProduct] = useState({ visible: false, desc: "", price: 0 })
    const [newProduct, setNewProduct] = useState<Set>({ id: "", desc: "", price: 0, });
    const [status, setStatus] = useState({ visible: false });
    const resetSet = () => {
      setNewProduct({ id: "", desc: "", price: 0, })
    }
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
    
    function update() {
        //setSets(() => [...Sets, newProduct]);
        setNewProduct({ ...newProduct, visible: false })
        console.log(Sets);
    }
    function addOrUpdate() {
      if (newProduct.id === "") {
        addSets(newProduct);
      }
      else {
        updateSet(newProduct);
      }
      setStatus({ ...status, visible: false })
      resetSet()
    }

    function setUpdateSet(set: Set) {
      setNewProduct({ ...set })
      setStatus({ visible: true })
    }

    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
    };
    const handleDelete = (index:number) => {
        const updatedProducts = [...Sets];
        updatedProducts.splice(index,1);
        //setSets(updatedProducts);
    };
    
    const [editingIndex, setEditingIndex] = React.useState(-1);
    const [isEditing, setIsEditing] = React.useState(false);;

    /*const handleEditProduct = (indexToEdit:number) => {
      const setToEdit = Sets[indexToEdit];
        setNewProduct({
          ...setToEdit,
          visible: true,
        });
        setIsEditing(true);
        setEditingIndex(indexToEdit);
    };

    const handleSaveEdit = () => {
      const updatedProducts = [...Sets];
      updatedProducts[editingIndex] = newProduct;
      //setSets(updatedProducts);
      setNewProduct({ ...newProduct, visible: false });
      setIsEditing(false)
    };
    */

  }