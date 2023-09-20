const express = require('express');
const app = express();
const port = 3000;


// สร้าง API endpoint เพื่อดึงข้อมูลจากตาราง
app.get('/api/table-data', (req, res) => {
  // ทำการสอบคำขอข้อมูลจากตารางในฐานข้อมูล
  connection.query('SELECT * FROM shrturl', (error, results, fields) => {
    if (error) {
      console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
      return res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูล' });
    }
    
    // ส่งข้อมูลกลับไปยังหน้าเว็บในรูปแบบ JSON
    res.json(results);
  });
});
