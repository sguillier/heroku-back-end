
async function denormalizeChat(normalizedMensajes) {

    // Declaramos las variables schema
    const schemaAuthor = new normalizr.schema.Entity('authors', {}, { idAttribute: 'mail' });
    const schemaMensaje = new normalizr.schema.Entity('mensajes', {
        author: schemaAuthor
    });


    // Definimos mismo esquema que antes
    const esquemaChat = new normalizr.schema.Entity('chat', {
        originalMensajes: [schemaMensaje],
    });

    return await normalizr.denormalize(normalizedMensajes.result, esquemaChat, normalizedMensajes.entities)
}


