import express, { type Request, type Response } from "express";

const app = express();

// Rota GetPrincipal
app.get("/", (req: Request, res: Response) => {
  res.send("Olá, Mundo!");
});


app.listen(3001, () => {
  console.log('Servidor está rodando na porta 3001: http://localhost:3001');
});