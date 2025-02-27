import express from "express";
import multer from "multer";
import path from "path";
import fieldRoutes from "./routes/Field-routes"
import cropRoutes from "./routes/Crop-routes";
import staffRoutes from "./routes/Staff-routes";
import vehicleRoutes from "./routes/Vehicle-routes";
import equipmentRoutes from "./routes/Equipment-routes";
import logRoutes from "./routes/Log-routes";
import authRoutes, {authenticateToken} from "./routes/auth-routes";
import dotenv from "dotenv";
import cors from 'cors';

dotenv.config();
const app = express();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.use(express.json());
//app.use(cors());

// const corsOption={
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true,
//
// }
// app.use(cors(corsOption));
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
console.log("Loaded SECRET_KEY:", process.env.SECRET_KEY);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/auth",authRoutes)
app.use(authenticateToken);
app.use("/Field",fieldRoutes(upload));
app.use("/Crop",cropRoutes(upload));
app.use("/Staff",staffRoutes);
app.use("/Vehicle",vehicleRoutes);
app.use("/Equipment",equipmentRoutes);
app.use("/Log",logRoutes(upload));


app.listen(3002,(err=>{
    console.log("server port 3002");
}))