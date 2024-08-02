import express from "express";
import cors from "cors";
import { config } from "dotenv";

config();

const app = express();

app.use(express.json());

const allowedOrigins = ["http://localhost:5173", "*", "http://localhost:3000"];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes("*")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;
    const numbers = data.filter((item) => !isNaN(item));
    const alphabets = data.filter((item) => /^[a-zA-Z]+$/.test(item));
    const highest_alphabet = alphabets.reduce((highest, current) => {
      return current.toUpperCase() > highest.toUpperCase() ? current : highest;
    }, "");
    const response = {
      is_success: true,
      user_id: "G_Raghuram_04082003",
      email: "rg1046@srmist.edu.in",
      roll_number : "RA2111003020546",
      numbers,
      alphabets,
      highest_alphabet,
    };
    res.json(response);
  } catch (err) {
    res.json({ is_success: false });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`server runnning at ${process.env.PORT}`);
});

app.get("/bfhl",(req,res)=>{
    res.json({
        operation_code : 1
    })
})