const express=require("express");
const cors=require("cors");
const path=require("path");
const itemRoute=require("./routes/itemRoute");
const enquiryRoutes = require("./routes/enquiryRoute")
require("dotenv").config();
const app= express();

app.use(cors());
app.use(express.json());
app.use("/uploads",express.static(path.join(__dirname,"uploads")));

const PORT= process.env.PORT || 5000;

app.use("/api/items",itemRoute);
app.use("/api/enquiry", enquiryRoutes)

app.listen(PORT,()=> console.log(`Server running on http://localhost:${PORT}`))