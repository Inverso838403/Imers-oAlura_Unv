import 'dotenv/config';
import { ObjectId } from "mongodb"
import conectarAoBanco from "../config/dbconfig.js"

const conexao = await conectarAoBanco(process.env.STRING_CONEXÃO)

export async function getTodasS_P(){
    const db = conexao.db("Universe-fy")
    const colecao = db.collection("space_pictures")
    return colecao.find().toArray()
}

export async function criarPost(novoPost) {
    const db = conexao.db("Universe-fy")
    const colecao = db.collection("space_pictures")
    return colecao.insertOne(novoPost)

}

export async function atualizar_post(id, novoPost) {
    const db = conexao.db("Universe-fy")
    const colecao = db.collection("space_pictures")
    const objID = ObjectId.createFromHexString(id)
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost})

}