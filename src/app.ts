import "dotenv/config"
import express from 'express';  
import cors from 'cors';    
import { router} from './routes'
import { AppDataSource } from './config/conexion'
const PORT = process.env.PORT || 3001;  

const app = express();
app.use(cors());
app.use(express.json());    
app.use(router)

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Conexión a la base de datos exitosa");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor listo en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error al conectar la base de datos:", error);
  });


