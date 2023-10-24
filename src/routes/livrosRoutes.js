import express from "express";
import LivroController from "../controllers/livrosController.js";

const router = express.Router();

router
  .get("/livros", LivroController.listarLivros)
  .get("/livros/busca", LivroController.listarLivroPorFiltro)
  .get("/livros/:id", LivroController.listarLivrosId)
  .post("/livros", LivroController.cadastrarLivros)
  .put("/livros/:id", LivroController.atualizarLivros)
  .delete("/livros/:id", LivroController.excluirLivros);

export default router;