"use client"
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '@/app/_firebase/Config'; // 導入 Firestore 實例

interface Data {
    id: number;
    calories: number;
    carbs: number;
    fat: number;
    name: string;
    protein: number;
  }

export function useTrainData() {
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(firestore, 'train')); 
      const fetchedData = querySnapshot.docs.map((doc) => {
        const firestoreData = doc.data() as {
          id: string;
          calories: any;
          carbs: any;
          fat: any;
          name: any;
          protein: any;
        }; // 將 Firestore 文檔的原始數據轉換為 Data 類型
        return {
          id: parseInt(doc.id), // 將 id 轉換為 number
          calories: firestoreData.calories || 0, // 使用默認值或適當的邏輯處理 undefined
          carbs: firestoreData.carbs || 0,
          fat: firestoreData.fat || 0,
          name: firestoreData.name || '',
          protein: firestoreData.protein || 0,
        } as Data;
      });
      setData(fetchedData);
    };

    fetchData();
  }, []); // 空依賴數組確保這僅在組件首次渲染時運行

  return data;
}
