import express from "express";
import LivroController from "../controllers/livrosController.js";
import paginar from "../middlewares/paginar.js";

const router = express.Router();

router
  .get("/livros", LivroController.listarLivro, paginar)
  .get("/livros/busca", LivroController.listarLivroPorFiltros, paginar)
  .get("/livros/:id", LivroController.listarLivrosId)
  .post("/livros", LivroController.cadastrarLivros)
  .put("/livros/:id", LivroController.atualizarLivros)
  .delete("/livros/:id", LivroController.excluirLivros);

export default router;