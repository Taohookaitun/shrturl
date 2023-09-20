import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';

const app = express();
const port = 3000;


app.use(bodyParser.json());

// กำหนดการเชื่อมต่อกับ MySQL
const connection = mysql.createConnection({
  host: 'localhost',  // หรือที่อยู่ของ MySQL Server
  user: 'root',       // ชื่อผู้ใช้ของ MySQL
  password: 'Taohookaitun', // รหัสผ่านของ MySQL
  database: 'shorturl'    // ชื่อฐานข้อมูลที่คุณต้องการเชื่อมต่อ
});

// เรียกใช้งานเมื่อเชื่อมต่อกับฐานข้อมูลสำเร็จ
connection.connect((err) => {
  if (err) {
    console.error('เกิดข้อผิดพลาดในการเชื่อมต่อกับ MySQL:', err);
  } else {
    console.log('เชื่อมต่อกับ MySQL สำเร็จ');
    // สามารถดำเนินการกับฐานข้อมูล MySQL ได้ที่นี่
  }
});

// สร้าง Short URL
app.post('/api/create-short-url', (req, res) => {
    const { originalUrl } = req.body;
  
// ตรวจสอบว่า originalUrl ถูกส่งมาหรือไม่
  if (!originalUrl) {
  return res.status(400).json({ error: 'กรุณาใส่ Original URL' });
}


    // สร้าง Short URL และบันทึกลงในฐานข้อมูล
  const shortUrl = generateShortUrl(); // สร้าง Short URL ตามต้องการ
  const sql = 'INSERT INTO shrturl (original, short) VALUES (?, ?)';
  connection .query(sql, [originalUrl, shortUrl], (err, result) => {
    if (err) {
      console.error('เกิดข้อผิดพลาดในการบันทึก Short URL:', err);
      return res.status(500).json({ error: 'เกิดข้อผิดพลาดในการบันทึก Short URL' });
    }
    console.log('Short URL ถูกสร้างและบันทึกเรียบร้อย');
    res.json({ shortUrl });
  });
});

// เริ่มต้นเซิร์ฟเวอร์

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
  app.listen(port, () => {
  console.log(`เซิร์ฟเวอร์ทำงานที่พอร์ต ${port}`);
  });
});

function generateShortUrl() {
    // สร้างรหัสสุ่ม
    const randomCode = Math.random().toString(36).substring(2, 8);

    // นำรหัสสุ่มมาต่อกับ URL หลักเพื่อสร้าง Short URL
    const shortUrl = `http://taohoo.com/${randomCode}`;

    return shortUrl;
}
connection.end();
