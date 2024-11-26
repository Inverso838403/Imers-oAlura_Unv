import express from "express";
import multer from "multer";
import { listarPictures, postar_n_post, uploadImg, atualizar_n_post } from "../controllers/S_P_Controller.js";
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads" , storage})



const routes = (app) => {
    app.use(express.json());
    app.use(cors(corsOptions));
    app.get("/space_pictures", listarPictures);  
    app.post("/space_pictures", postar_n_post);
    app.post("/upload", upload.single("imagem"), uploadImg)

    app.put("/upload/:id", atualizar_n_post)
};

export default routes;