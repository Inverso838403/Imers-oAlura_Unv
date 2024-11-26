import {getTodasS_P, criarPost, atualizar_post} from "../models/S_P_Model.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/gemini_service.js";


export async function listarPictures(req, res) {
    const space_pictures = await getTodasS_P();
    res.status(200).json(space_pictures);

}

export async function postar_n_post(req,res){
    const novoPost = req.body;
    try {
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);
    } catch(ERRO) {
        console.error(ERRO.message);
        res.status(500).json({"Erro":"Falha na requisição espacial"})
    }
}

export async function uploadImg(req,res){
    const novoPost = {
    descricao: "",
    imgUrl: req.file.originalname,
    alt:""    
    };
    
    try {
        const postCriado = await criarPost(novoPost);
        const imgAtualizada = `uploads/${postCriado.insertedId}.png`
        
        fs.renameSync(req.file.path, imgAtualizada)
        
        res.status(200).json(postCriado);
    } catch(ERRO) {
        console.error(ERRO.message);
        res.status(500).json({"Erro":"Falha na requisição espacial"})
    }
}

export async function atualizar_n_post(req,res){
    const id = req.params.id;
    const urlIMG = `http://localhost:3000/${id}.png`
    try {
        const imageBuffer = fs.readFileSync(`uploads/${id}.png`)
        const descricao = await gerarDescricaoComGemini(imageBuffer)

        const post = {
            imgUrl: urlIMG,
            descricao: descricao,
            alt: req.body.alt
        }

        const postCriado = await atualizar_post(id,post);
        res.status(200).json(postCriado);
    } catch(ERRO) {
        console.error(ERRO.message);
        res.status(500).json({"Erro":"Falha na requisição espacial"})
    }
}
