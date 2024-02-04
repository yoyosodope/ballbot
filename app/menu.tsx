'use client';
import { AppBar, Toolbar, Button, Container, Typography } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import styles from './page.module.css'

export default function Menu() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div>
      <AppBar position="static">
        <Toolbar className={styles.container}>
          <Button className={styles.button} color="inherit" variant={pathname === "/homepage" ? "outlined" : "text"} onClick={() => router.push("/homepage")} >
            <Typography variant="h4" className={styles.logo}>
              B.
            </Typography>
          </Button>
          <Button className={styles.button} color="inherit" variant={pathname === "/train" ? "outlined" : "text"} onClick={() => router.push("/train")}>訓練表</Button>
          <Button className={styles.button} color="inherit" variant={pathname === "/personal_training" ? "outlined" : "text"} onClick={() => router.push("/personal_training")}>個人訓練</Button>
          <Button className={styles.button} color="inherit" variant={pathname === "/data" ? "outlined" : "text"} onClick={() => router.push("/data")}>數據分析</Button>
          <Button className={styles.button} color="inherit" variant={pathname === "/calendar" ? "outlined" : "text"} onClick={() => router.push("/calendar")}>行事曆</Button>
          <Button className={styles.button} color="inherit" variant={pathname === "/account" ? "outlined" : "text"} onClick={() => router.push("/account")}>登入</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
