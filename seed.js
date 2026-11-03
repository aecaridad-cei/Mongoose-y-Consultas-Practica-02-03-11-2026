import mongoose from "mongoose"
import dotenv from 'dotenv'
import Curso from './models/Curso.js'

dotenv.config()

const cursosIniciales = [
    {
        codigo: "MERN-101",
        titulo: "Fundamentos de React y Estado Moderno",
        categoria: "Frontend",
        precio: 39.99,
        duracionHoras: 18,
        etiquetas: ["react", "javascript", "hooks","ui"],
        instructor: {nombre: "Tonino Palomino", experienciaAnios: 6},
        publicado: true
    },
    {
        codigo: "EXTA-101",
        titulo: "Base de datos e Infraestructura",
        categoria: "Backend",
        precio: 29.99,
        duracionHoras: 36,
        etiquetas: ["mongodb"],
        instructor: {nombre: "Tonino Palomino", experienciaAnios: 6},
        publicado: true
    }
]

async function poblarBaseDatos() {
    try {

        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Conectado a MongoDB")

        await Curso.deleteMany({})
        console.log("Coleccion anterior limpiada")

        const insertados = await Curso.insertMany(cursosIniciales)
        console.log(`Se insertaron ${insertados.length} cursos correctamente`)

        try {

            await Curso.create({
                codigo: "ERR-404",
                titulo: "UX",
                categoria: "UX",
                precio: -39.99,
                duracionHoras: 2,
                instructor: {nombre: "Toni Kroos"}
            })

        } catch(errorValidacion) {

            console.log("Mongoose bloqueo el documento invalido con exito")
            Object.values(errorValidacion.errors).forEach((err) => {
                console.log(`- Campo [${err.path}: ${err.message}]`)
            })

        }

    } catch(error) {
    
        console.error("Erro General:", error.message)
    } finally {
        
        await mongoose.disconnect()
        console.log("\n Desconectado con exito de MONGODB")

    }
}

poblarBaseDatos()