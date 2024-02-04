// DataTable.tsx
'use client'
import * as React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {TextField,Button,Dialog,DialogTitle,DialogContent,FormControl,InputLabel,Select,MenuItem,Fab,} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const apiPath = '/api/personal_train'; // 相對路徑

const columns = [
//   { field: 'p_id', headerName: 'ID', width: 70 },
  { field: 'content', headerName: '訓練內容', width: 130 },
  { field: 'data', headerName: '訓練日期', type: 'date', width: 130 },
  { field: 'time', headerName: '訓練時間', type: 'time', width: 130 },
  { field: 'note', headerName: '備註', width: 130 },
  { field: 'finish', headerName: '完成/未完成', width: 130 },
];

export default function DataTable() {
  const [rows, setRows] = useState([]);
  const [newData, setNewData] = React.useState({
    content: '',
    data: '',
    time: '',
    note: '',
    finish: '',
  });

  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);

    const fetchData = async () => {
      try {
        const response = await fetch(apiPath);
        const result = await response.json();
        setRows(result);
      } catch (error) {
        console.error('Error fetching data from API:', error);
      }
    };

    useEffect(() => {
    fetchData();
  }, []);

  const handleAddData = async () => {
    try {
      const response = await fetch('/api/personal_train', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });

      if (response.ok) {
        // 清空輸入欄位
        setNewData({
          content: '',
          data: '',
          time: '',
          note: '',
          finish: '',
        });

        // 重新加載數據
        fetchData();

        // 關閉對話框
        setIsDialogOpen(false);
      } else {
        console.error('Error adding data:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} checkboxSelection pagination autoPageSize/>
      {/* 新增 FAB */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => setIsDialogOpen(true)}
      >
        <AddIcon />
      </Fab>
      {/* 新增對話框 */}
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>新增訓練計劃</DialogTitle>
        <DialogContent>
          {/* 訓練內容 */}
          <TextField
            label="訓練內容"
            value={newData.content}
            onChange={(e) => setNewData({ ...newData, content: e.target.value })}
            fullWidth
            margin="normal"
          />
          {/* 訓練日期 */}
          <TextField
            label="訓練日期"
            type="date"
            value={newData.data}
            onChange={(e) => setNewData({ ...newData, data: e.target.value })}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          {/* 訓練時間 */}
          <TextField
            label="訓練時間"
            type="time"
            value={newData.time}
            onChange={(e) => setNewData({ ...newData, time: e.target.value })}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          {/* 備註 */}
          <TextField
            label="備註"
            value={newData.note}
            onChange={(e) => setNewData({ ...newData, note: e.target.value })}
            fullWidth
            margin="normal"
          />
          {/* 完成/未完成 */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="finish-label">完成/未完成</InputLabel>
            <Select
              labelId="finish-label"
              value={newData.finish}
              onChange={(e) => setNewData({ ...newData, finish: e.target.value as string })}
              label="完成/未完成"
            >
              <MenuItem value="完成">完成</MenuItem>
              <MenuItem value="未完成">未完成</MenuItem>
            </Select>
          </FormControl>
          {/* 新增按鈕 */}
          <Button variant="contained" color="primary" onClick={handleAddData}>
            新增
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
