"use client"
import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import styles from '../page.module.css';
import { collection, getDocs} from 'firebase/firestore';
import { firestore } from '@/app/_firebase/Config';

interface RadarChartProps {
  // 這裡可以添加元件的 props 型別
}

const RadarChart: React.FC<RadarChartProps> = () => {
  const [selectedCollection, setSelectedCollection] = useState<string>('data');
  const [selectedName, setSelectedName] = useState<string>('');
  const [nameArray, setNameArray] = useState<string[]>([]);
  const [radarData, setRadarData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
    }[];
  }>({
    labels: ['助攻', '阻攻', '得分', '抄截', '進攻+防守'],
    datasets: [{
      label: '球員數據',
      data: [0, 0, 0, 0, 0], // 初始值為 0，表示還未從 Firebase 取得資料
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2
    }]
  });

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(firestore, selectedCollection)); //原本為 firestore, 'data'
    const data = querySnapshot.docs.map((doc) => doc.data());

    // 更新雷達圖的資料
    setRadarData(prevData => ({
      ...prevData,
      labels: ['助攻', '阻攻', '得分', '抄截', '進攻+防守籃板'],
      datasets: [{
        ...prevData.datasets[0],
        label: data[7]?.name || '數據',
        data: [data[7]?.AST || 0, data[7]?.BS || 0, data[7]?.PTS || 0, data[7]?.ST || 0, data[7]?.TOT || 0],
      }],
    }));
  };

  useEffect(() => {
    fetchData();
  }, [selectedCollection]);

  useEffect(() => {
    const ctx = document.getElementById('radarChart') as HTMLCanvasElement;

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      scale: {
        angleLines: {
          display: true
        },
        ticks: {
          suggestedMin: 0,
          suggestedMax: 6
        }
      }
    };

    const existingChart = Chart.getChart(ctx);
    if (existingChart) {
      existingChart.destroy();
    }

    new Chart(ctx, {
      type: 'radar',
      data: radarData,
      options: options
    });
  }, [radarData]);

  return (
    <div className={styles.centeredChart}>
      <canvas id="radarChart" width="400" height="400"></canvas>
    </div>
  );
};

export default RadarChart;
