import { inspect } from 'util'
function print(objeto) {
  console.log(inspect(objeto, false, 12, true))
}



import { normalize, schema } from 'normalizr'


export default async function normalizeChat(mensajes) {
  const objetoMensajes = { id: 'idMensajes', originalMensajes: mensajes }
  // print(objetoMensajes)
  

  // Declaramos las variables schema
  const schemaAuthor = new schema.Entity('authors', {}, { idAttribute: 'mail' });
  const schemaMensaje = new schema.Entity('mensajes', {
    author: schemaAuthor
  });


  // Definimos un esquema de organigrama
  const esquemaChat = new schema.Entity('chat', {
    originalMensajes: [schemaMensaje],
  });
  

  // console.log( "Normalizado......................................................................... ")
  // print(await normalize(objetoMensajes, esquemaChat))
  
  return normalize(objetoMensajes, esquemaChat)
}



