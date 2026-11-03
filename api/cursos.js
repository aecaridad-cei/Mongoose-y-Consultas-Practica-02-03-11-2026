import mongoose from "mongoose";
import Curso from "../models/Curso.js"

export default async function handler(req, res) {
    try {

        if(mongoose.connection.readyState === 0){
            await mongoose.connect(process.env.MONGODB_URI)
        }

        const { categoria, precioMax, tag} = req.query

        const filtro = { publicado: true}

        if(categoria) {
            filtro.precio = categoria
        }

        if(precioMax){
            filtro.precio = {$lte: Number(precioMax)}
        }

        if(tag){
            filtro.etiquetas = {$in: [tag.toLowerCase()]}
        }

        const cursos = await Cursos.find(filtro)
        .select(
            "codigo titutlo categoria precio duracionHoras etiquetas instructor"
        )

    } catch (error) {
        
    }
}