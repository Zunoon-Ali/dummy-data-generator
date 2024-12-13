import mongoose from "mongoose";
import express from "express";
import { Employee } from "./models/Employee.js";

const app = express();
const port = 3000;

// Middleware
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.json());  // Middleware to parse JSON request body


const getRand = (arr)=>{
    let rn = Math.floor(Math.random() *(arr.length))
    return arr[rn]
}

// Connect to MongoDB
async function connectDB() {
    try {
        let conn = await mongoose.connect("mongodb+srv://Zunoon:pirzada786@cluster0.eoign.mongodb.net/company");
        console.log("Database connected successfully!");
    } catch (err) {
        console.error("Database connection failed", err);
    }
}

// Call the connectDB function to establish the database connection
connectDB();

// Route to render the homepage (index.ejs)
app.get('/', (req, res) => {
    res.render('index');  // Render index.ejs on visiting root route
});


// Route to handle the employee data insertion
app.post('/generate', async (req, res) => {
    const randName = ["Zunoon", "Riaz", "Ali"];
    const randCity = ["Islamabad", "Jaipur", "Quetta"];
    const randLang = ["Chapri", "Python", "Urdu"];
    
    const employees = []; // Array to store multiple employee objects

    // Generate 10 employee objects
    for (let index = 0; index < 10; index++) {
        const employee = new Employee({
            name: getRand(randName),
            language: getRand(randLang),
            salary: Math.floor(Math.random() * 30000),
            city: getRand(randCity),
            isManager: Math.random() > 0.5
        });
        employees.push(employee); // Add each employee to the array
    }

    try {
        await Employee.insertMany(employees); // Save all employees in one operation
        res.json({ message: 'Employee data inserted successfully!' });
    } catch (err) {
        res.status(500).json({ message: 'Error inserting employee data', error: err });
    }
});


// Route to check the stored employees in the database
app.get('/check', async (req, res) => {
    try {
        const employees = await Employee.find();  // Find all employees in the database
        res.json(employees);  // Send the employees data back to the client
    } catch (err) {
        res.status(500).json({ message: 'Error fetching employees', error: err });
    }
});

// Start the Express server
app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});
