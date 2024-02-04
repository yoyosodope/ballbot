'use client'
import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, MenuItem } from '@mui/material';

import { getFirestore, collection, getDocs } from 'firebase/firestore';
import app from "@/app/_firebase/Config"
import styles from '../page.module.css'

export default function Account() {
  const [account, setAccount] = useState({ email: "", password: "", name: "" });
  const [names, setNames] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("註冊");

  const handleChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    setAccount({ ...account, [e.target.name]: e.target.value })
  }

  const logout = function (e: React.MouseEvent<HTMLElement>) {
    // auth.signOut();
    setMessage("登出成功");
  }

  const changeStatus = function (e: React.MouseEvent<HTMLElement>) {
    if (status === "註冊") {
      setStatus("登入");
    }
    else {
      setStatus("註冊");
    }
  }

  const handleSubmit = async function (e: React.MouseEvent<HTMLElement>) {
    const formData = new FormData();
    formData.append("name", account.name);
    formData.append("email", account.email);
    formData.append("password", account.password);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setMessage(result.message); // 假設 PHP 回傳一個 JSON 物件，其中包含 message
      } else {
          // 如果伺服器回應不是 200 OK，處理錯誤
        const errorText = await response.text();
        console.error("Error in fetch:", response.status, errorText);

        // 根據實際情況進一步處理錯誤，例如顯示具體的錯誤訊息給使用者
        setMessage("發生錯誤：" + errorText);
      }
    } catch (error: any) {
        // 處理 fetch 操作本身的錯誤
      console.error("There was a problem with the fetch operation:", error);
      setMessage("發生錯誤：" + error.message);
    }
  };

  useEffect(() => {
    // 獲取 Firebase 中的名字
    const fetchData = async () => {
      const namesCollection = collection(getFirestore(app), 'data'); // 替換成你的集合名稱
      const namesSnapshot = await getDocs(namesCollection);
      const namesData = namesSnapshot.docs.map(doc => doc.data().name);
      setNames(namesData);
    };

    fetchData();
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 150,
        left: 0,
        right: 400,
        bottom: 120,

        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <form>
        <div className={styles.loginstyle1}>
          {status === '註冊' &&
            <TextField select
              name="name"
              value={account.name}
              onChange={handleChange}
              label="姓名:"
              sx={{
                width: '18%',
                marginBottom: '1px',
                position: 'fixed',
              }}
            >
              {names.map((name, index) => (
                <MenuItem key={index} value={name}>
                  {name}
                </MenuItem>
              ))}
            </TextField>
          }
        </div>
        <div className={styles.loginstyle2}>
          <TextField type="email" name="email" value={account.email}
            placeholder="帳號" label="帳號:" onChange={handleChange} autoComplete='username' />
        </div>
        <div className={styles.loginstyle3}>
          <TextField type="password" name="password" value={account.password}
            placeholder="密碼" label="密碼:" onChange={handleChange} autoComplete='current-password' />
        </div>
        <div className={styles.loginstyle4}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>{status}</Button>
        </div>
        <div className={styles.loginstyle5}>
          <Button variant="contained" color="primary" onClick={changeStatus}>
            {status === '註冊' ? "已經註冊，我要登入" : "尚未註冊，我要註冊"}</Button>
        </div>
        <div className={styles.loginstyle6}>{message}</div>
        <div className={styles.loginstyle7}>
          <Button variant="contained" color="info" onClick={logout}>登出</Button>
        </div>
      </form>
    </Box>
  )
}