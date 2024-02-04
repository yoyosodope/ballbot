'use client'
import * as React from 'react';
import { MobileDateTimePicker, LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Fab, Dialog, Button, TextField, List, ListItem, ListItemText, Paper, Box, IconButton, DialogActions, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useReminders from './useCalendar';
import { Reminder } from '../_settings/interfaces';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-tw';
import { Timestamp } from '@firebase/firestore';

export default function ReminderList() {
    const { reminders, addReminder, deleteReminder, updateReminder, isLoading } = useReminders();
    const [newReminder, setNewReminder] = React.useState<Reminder>({ id: "", date: Timestamp.now(), event: "" });
    const [addOrUpdateDialogOpen, setAddOrUpdateDialogOpen] = React.useState<boolean>(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState<boolean>(false);
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

    const handleClick = function (e: React.ChangeEvent<HTMLInputElement>) {
        setNewReminder({ ...newReminder, [e.target.name]: e.target.value })
    }

    const handlePickerClick = function (value: Date | null) {
        if (value != null) {
            setNewReminder({ ...newReminder, date: Timestamp.fromDate(value) });
        }
    };

    const handleCalenderClick = (date: Date | null) => {
        setSelectedDate(date);
    };

    const filteredReminders = reminders.filter(
        (reminder) =>
            selectedDate &&
            dayjs(reminder.date.toDate()).isSame(selectedDate, 'day')
    );

    const handleOpenAddOrUpdateDialog = () => {
        setAddOrUpdateDialogOpen(true);
    };

    const handleCloseAddOrUpdateDialog = () => {
        setAddOrUpdateDialogOpen(false);
    };

    const handleOpenDeleteDialog = () => {
        setDeleteDialogOpen(true);
    };

    const handleCloseDeleteDialog = () => {
        setDeleteDialogOpen(false);
    };

    function addOrUpdate() {
        if (newReminder.id === "") {
            addReminder(newReminder);
        }
        else {
            updateReminder(newReminder);
        }
        handleCloseAddOrUpdateDialog();
        resetReminder();
    }

    const resetReminder = () => {
        setNewReminder({ id: "", date: Timestamp.now(), event: "" })
    }

    function setUpdateReminder(reminder: Reminder) {
        setNewReminder({ ...reminder })
        handleOpenAddOrUpdateDialog();
    }

    function setDeleteReminder(reminder: Reminder) {
        setNewReminder({ ...reminder })
        handleOpenDeleteDialog();
    }

    function checkDeleteReminder() {
        deleteReminder(newReminder.id);
        handleCloseDeleteDialog();
        resetReminder();
    }

    return (
        <Box sx={{ flexGrow: 1, maxWidth: 300, padding: 2 }}>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
                {/* FAB 按鈕用來觸發 Dialog */}
                <DateCalendar
                    views={['year', 'month', 'day']}
                    value={selectedDate}
                    onChange={handleCalenderClick}
                />
                <Fab color="primary" onClick={handleOpenAddOrUpdateDialog} sx={{ position: 'fixed', bottom: 16, right: 16 }}>
                    <AddIcon />
                </Fab>

                {/* Dialog 用來新增提醒 */}
                <Dialog open={addOrUpdateDialogOpen} onClose={handleCloseAddOrUpdateDialog} aria-labelledby={newReminder.id === "" ? "新增提醒" : "編輯提醒"}>
                    <Paper sx={{ padding: 2 }}>
                        <MobileDateTimePicker
                            value={newReminder.date.toDate()}
                            onChange={handlePickerClick}
                        />
                        <TextField
                            label="事件內容"
                            variant="outlined"
                            margin="normal"
                            name='event'
                            fullWidth
                            value={newReminder.event}
                            onChange={handleClick}
                        />
                        <Button variant="contained" color="primary" onClick={addOrUpdate}>{newReminder.id === "" ? "新增提醒" : "更新提醒"}
                        </Button>
                    </Paper>
                </Dialog>

                <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
                    <DialogTitle>確認刪除？</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            確定要刪除這個項目嗎？這個操作無法撤銷。
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDeleteDialog} color="primary">
                            取消
                        </Button>
                        <Button onClick={checkDeleteReminder} color="secondary">
                            確定
                        </Button>
                    </DialogActions>
                </Dialog>
                {/* 顯示提醒清單 */}
                <List>
                    {filteredReminders.map((reminder) => (
                        <ListItem divider key={reminder.id}>
                            <ListItemText
                                primary={`日期：${dayjs(reminder.date.toDate()).format('YYYY-MM-DD HH:mm')}`}
                                secondary={`事件內容：${reminder.event}`}
                            />
                            <IconButton
                                edge="end"
                                aria-label="update"
                                onClick={() => setUpdateReminder(reminder)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => setDeleteReminder(reminder)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                    ))}
                </List>
            </LocalizationProvider>
        </Box>
    );
}
