
import getColeccion from "./index.js"
const coleccionUsuarios =  await getColeccion('usuarios')

class claseUsuarios {

    constructor() {
        this.usuarios = coleccionUsuarios
    }

    
    setUserRolById = async (id, rol) => {
        const usuario = await this.usuarios.getById(id)

        // Validamos que sea un rol admitido
        if( rol == 'admin' || rol == 'seller' ){
            usuario.rol = rol
        }else{
            usuario.rol = 'buyer'
        }

        await this.usuarios.saveById(id, usuario) 
    }
    
    getAllUsers = async () => {
        return await this.usuarios.getAll()
    }
    
    getUserById = async (id) => {
        return await this.usuarios.getById(id)
    }

    // getUserByUserName = async (username) => {
    //     const arrayUsuarios = await getAllUsers()
    //     return arrayUsuarios.find(e => e.username === username)
    // }

    
    saveUser = async (item) => {
        return await this.usuarios.save(item)
    }

    saveUserById = async (id, item) => {
        return await this.usuarios.saveById(id, item)
    }
    
    deleteUserById = async (id) => {
        return await this.usuarios.deleteById(id)
    }

    deleteAllUsers = async () => {
        return await this.usuarios.deleteAll()
    }
}

export default claseUsuarios