import mongoose from "mongoose"
import dotenv from "dotenv"
import Curso from "./models/Curso.js"

dotenv.config()

async function ejecutarConsultas(){
    try {

        await mongoose.connect(process.env.MONGODB_URI)
        console.log("=== Laboratorio de Consultas ===")

        const cursosFrontend = await Curso.find({
            categoria: "Frontend",
            publicado: true
        })
        console.log("1. Cursos de Frontend publicados: ", cursosFrontend.length)
        console.log(cursosFrontend)

        const cursosEconomicos = await Curso.find({
            precio: {$lte: 40},
        }).select("Codigo titulo precio -_id")
        console.log("\n2.Cursos por 40EUR o menos(solo codigo, titulo y precio)")
        console.table(cursosEconomicos.map(c =>  c.toObject()))
        console.log(cursosEconomicos)

        const cursoPorTag = await Curso.find({
            etiquetas: {$in: "mongodb"}
        }).select("titulo etiquetas -_id")
        console.log("\n3. Cursos con etiquetas mongodb")
        console.log(cursoPorTag)

        const cursosAvanzado = await Curso.find({
            "instructor.experienciaAnios": {$gte: 6},
        })
        .sort({duracionsHoras: -1})
        .limit(2)
        .select("titulo duracionHoras instructor.nombre -_id")
        console.log("\n4. Top cursos de instructores Senior ordenados por duracions:")
        console.log(cursosAvanzado)

        const cursoEspecifico = await Curso.findOne({
            codigo: "MERN-101"
        })
        console.log("\n5. Busqueda exacta con findOne de (MERN-101)")
        console.log(`Titulo: ${cursoEspecifico.titulo} | Creado el: ${cursoEspecifico.createdAt}`)

    } catch (error) {
        console.error("Error en las consultas: ", error.menssage)
    } finally {
        await mongoose.disconnect()
        console.log("\n Desconectado con exito de MONGODB")
    }
}

ejecutarConsultas()