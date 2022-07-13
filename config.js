require('dotenv').config();
const firebaseConfig = require('./bd/segundaentregafinal-firebase-adminsdk-y8ueh-a8458d6245.json');

module.exports = {
  ENV: {
    PORT: process.env.PORT || 8080,
    PERS: process.env.PERS || 'mongo', // Puede cambiar entre firebase, mongo 
  },
  DB_CONFIG: {
    mongodb: {
      uri: process.env.URI_MONGODB
    },
    firebase: {
        credential: admin.credential.cert(firebaseConfig),
        databaseURL: "https://segundaentregafinal.firebaseio.com"
    }
  }
}