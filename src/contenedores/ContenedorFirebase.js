import admin from "firebase-admin"
import config from './configContenedores.js'


admin.initializeApp({
    credential: admin.credential.cert(config.firebase)
})
const db = admin.firestore();


class ContenedorFirebase {

    constructor(nombreColeccion) {
        this.coleccion = db.collection(nombreColeccion)
    }


    getAll = async () => {
        let arrayItems = []

        // Obtenemos coleccion desde firebase
        const snapshot = await this.coleccion.get();

        // La recorremos y tomamos .data()
        snapshot.forEach(doc => {
            arrayItems.push(doc.data())
        })

        // Devolvemos array con Items
        return arrayItems
    }


    getById = async (id) => {
        let item = null

        // Obtenemos objeto desde firebase
        const items = await this.coleccion.where('id', '==', id).limit(1).get();

        // unica menra q encontre de extrear informacion, aunque sea solo un dato
        items.forEach(doc => {
            item = doc.data()
        })

        // Devolvemos Item
        return item
    }


    save = async (item) => {
        // Utilizamos Funcion getAll
        const arrayItems = await this.getAll()

        // Definimos nuevo Id
        const Ids = arrayItems.map(e => e.id)
        const nuevoId = Math.max(...Ids, 0) + 1

        // Construimos Nuevo Item
        const nuevoItem = { id: nuevoId, ...item }

        // Incluimos el nuevo item en firebase
        await this.coleccion.add(nuevoItem)

        // Devolvemos el nuevo Id
        return nuevoId
    }

    deleteById = async (id) => {
        // Obtenemos objeto desde firebase
        const items = await this.coleccion.where('id', '==', id).get();

        // unica manera q encontre de extrear informacion, aunque sea solo un dato
        const ids = []
        items.forEach(doc => {
            ids.push(doc.id)
        })

        for (const i of ids) {
            await this.coleccion.doc(i).delete()
        }

        // Devolvemos nada
    }


    saveById = async (id, nuevoItem) => {
        // Eliminamos el item de la base si es que existe
        await this.deleteById(id)

        // Incluimos el nuevo item en firebase
        await this.coleccion.add({ id: id, ...nuevoItem })

        // Devolvemos el nada
    }


    deleteAll = async () => {
        // Obtenemos objeto desde firebase
        const items = await this.coleccion.get();

        const ids = []
        items.forEach(doc => {
            ids.push(doc.id)
        })

        for (const i of ids) {
            await this.coleccion.doc(i).delete()
        }

        // Devolvemos nada
    }

}

export default ContenedorFirebase





