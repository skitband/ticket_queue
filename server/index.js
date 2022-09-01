const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const { response } = require('express');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "ticket_queue",
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.listen(5000, () => {
    console.log("Server is running.")
})

app.get("/", (req, res) => {
    res.send("hello");
})

// List All The Counter
app.get("/api/listCounter", (req, res) => {
    const sql = "SELECT * FROM counter";
    db.query(sql, (err, result) => {
        res.send(result)
    })
})


// Client
//
// Get Take Ticket Number
app.post("/api/takeNumber", (req, res) => {
    
    const sql = "INSERT INTO queue (queue_number) SELECT queue_number + 1 FROM queue ORDER BY id DESC LIMIT 1";
    db.query(sql, [1, 1, 1], (err, result) => {
        res.send(result);
        console.log(result);
    });
    
})

// Get now serving ticket
app.get("/api/nowServing", (req, res) => {
    const sql = "SELECT on_queue FROM counter WHERE counter_status = 0 ORDER BY on_queue DESC LIMIT 1";
    db.query(sql, (err, result) => {
        res.send(result)
    })
})

// Get last queue ticket
app.get("/api/lastTicket", (req, res) => {
    const sql = "SELECT queue_number FROM queue  ORDER BY queue_number DESC LIMIT 1";
    db.query(sql, (err, result) => {
        res.send(result)
    })
})

// Admin Counter Management
//
// Take a Ticket From Queue
app.get("/api/callNext/:counter", (req, res) => {

    const counter_no = req.params.counter

    const sql = `UPDATE counter, queue SET counter.on_queue = (SELECT queue.queue_number FROM queue WHERE queue.ticket_status = 1 LIMIT 1), 
    counter.counter_status = 0, queue.assigned_counter = ?, queue.ticket_status = ? 
    WHERE queue.ticket_status = 1 AND counter.counter_no = ? LIMIT 1`;
    db.query(sql, [counter_no, 2, counter_no], (err, result) => {
        // console.log(result);
    })

    const sql_queue = `SELECT queue.queue_number FROM queue WHERE queue.ticket_status = 1 LIMIT 1`;
    db.query(sql_queue, (err, result) => {
        res.send(result)
        console.log(result);
    })
})

// Update Counter Status
app.put("/api/updateCounter", (req, res) => {
    
  const status = req.body.status;
  const counter_no = req.body.counter_no;

  const sql = `UPDATE counter SET counter_status = ?, isOnline = ? WHERE counter_no = ?`;

  db.query(sql, [status, status, counter_no], (err, result) => {
    res.send(result)
    console.log(result);
  })
});

// Complete Ticket
app.get("/api/completeTicket/:counter", (req, res) => {

    const counter_no = req.params.counter

    const sql = `UPDATE queue,counter SET queue.ticket_status = 0, counter.on_queue = 0, counter.counter_status = 1 WHERE queue.assigned_counter = ${counter_no} AND queue.ticket_status = 2 AND counter.counter_no = ${counter_no} LIMIT 1`;
    db.query(sql, (err, result) => {
        res.send(result)
        console.log(result);
    })
})



