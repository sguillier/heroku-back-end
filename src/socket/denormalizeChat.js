// No usado, solo de prueba

import { inspect } from 'util'
function print(objeto) {
  console.log(inspect(objeto, false, 12, true))
}


import { denormalize, schema } from 'normalizr'


export default async function denormalizeChat(normalizedMensajes) {

  // Declaramos las variables schema
  const schemaAuthor = new schema.Entity('authors', {}, { idAttribute: 'mail' });
  const schemaMensaje = new schema.Entity('mensajes', {
    author: schemaAuthor
  });


  // Definimos mismo esquema que antes
  const esquemaChat = new schema.Entity('chat', {
    originalMensajes: [schemaMensaje],
  });
  
  // console.log( "DesNormalizado......................................................................... ")
  // print(await denormalize(normalizedMensajes.result, esquemaChat, normalizedMensajes.entities))
  
  return await denormalize(normalizedMensajes.result, esquemaChat, normalizedMensajes.entities)
}



