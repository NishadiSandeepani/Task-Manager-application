const express = require("express");
const mongoose = require("mongoose");
const taskRoutes = require("./Routes/taskRoutes"); 
const cors = require("cors");

const app = express();

app.use(express.json());  
app.use(cors());          

app.use("/tasks", taskRoutes);  

mongoose
  .connect(
    "mongodb+srv://nishadisandeepani26:root@cluster0.bx2bx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

  )
  .then(() => console.log("Connected to MongoDB"))
  .then(() => {
    
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });
