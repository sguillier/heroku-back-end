import dotenv from 'dotenv'
dotenv.config({ path: '.env' })


export default {
    txt: {
        path: './src/contenedores/data/'
    },
    mongoDb: {
        uri: "mongodb://localhost:27017/coderhouse",
        // uri = "mongodb+srv://coderhouse:coderhouse@cluster0.o0eqf.mongodb.net/coderhouse?retryWrites=true&w=majority",
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    },
    mongoose: {
        stringConexion: 'srv+mongodb://localhost/coderhouse',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        }
    },
    firebase: {
        type: process.env.FIREBASE_type,
        project_id: process.env.FIREBASE_project_id,
        private_key_id: process.env.FIREBASE_private_key_id,
        private_key: process.env.FIREBASE_private_key,
        client_email: process.env.FIREBASE_client_email,
        client_id: process.env.FIREBASE_client_id,
        auth_uri: process.env.FIREBASE_auth_uri,
        token_uri: process.env.FIREBASE_token_uri,
        auth_provider_x509_cert_url: process.env.FIREBASE_auth_provider_x509_cert_url,
        client_x509_cert_url: process.env.FIREBASE_client_x509_cert_url,

    }
}
