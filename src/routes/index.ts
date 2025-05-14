import { Router } from "express";
import { readdirSync } from "fs";
import path from "path";

const router = Router();

const cleanFileName = (fileName: string): string | undefined => {
  const clean = fileName.split(".").shift();
  return clean;
};

const loadRoutes = async (): Promise<void> => {
  const files = readdirSync(__dirname).filter(
    (file) => file !== "index.ts" && file !== "index.js"
  );

  await Promise.all(
    files.map(async (file) => {
      const routeName = cleanFileName(file);
      if (!routeName) return;

      try {
        const module = await import(`./${routeName}`);
        const routeRouter = module.default?.router || module.default || module.router;
        
        if (routeRouter && typeof routeRouter === "function") {
          router.use(`/${routeName}`, routeRouter);
          console.log(`✅ Ruta /${routeName} cargada`);
        } else {
          console.warn(`⚠️ El archivo ${file} no exporta un router válido`);
        }
      } catch (error) {
        console.error(`❌ Error cargando ${routeName}:`, error);
      }
    })
  );
};

loadRoutes().catch((err) => {
  console.error("Error al cargar rutas:", err);
});

export { router };