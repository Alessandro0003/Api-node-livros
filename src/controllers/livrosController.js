import NaoEncontrado from "../erros/NaoEncontrado.js";
import { livros } from "../models/index.js";

class LivroController {
 
  static listarLivros = async (req, res, next) => {
  
    try{
      
      const livroResult = await livros.find()
        .populate("autor")
        .exec();

      res.status(200).json(livroResult);

    } catch(erro){
      next(erro)
    }
    
  };

  static listarLivrosId = async (req, res, next) => {

    try {

      
      const id = req.params.id;

      const listarLivrosResult = await livros.findById(id) 
        .populate("autor", "nome")
        .exec(); 
      
      if(listarLivrosResult !== null){
        res.status(200).send(listarLivrosResult);
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
      
      
    } catch(erro){
     
      next(erro);

    }
  };

  static cadastrarLivros = async (req, res, next) =>{
    
    try {
      let livro = new livros(req.body);

      const livroRegisterResult = await livro.save();

      res.status(201).send(livroRegisterResult.toJSON());

    } catch(erro) {

      next(erro);

    }      
      
  };

  static atualizarLivros = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResult = await livros.findByIdAndUpdate(id, {$set: req.body});

      if(livroResult !== null){
        res.status(200).send({message: "Livro Atualizado com sucesso"});
      } else {
        next(new NaoEncontrado("Id do livro nao localizado"));
      }

    }catch(erro){

      next(erro);
    }
    
  };

  static excluirLivros = async (req, res, next) => {
    try{

      const id = req.params.id;

      const livroResult = await livros.findOneAndDelete(id);

      if(livroResult !== null) {
        res.status(200).send({message: "Livro removido com sucesso"});
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
      
    }catch(erro){

      next(erro);

    }
  };

  static listarLivroPorFiltro = async (req, res, next) =>{
    try{
      const { editora, titulo }  = req.query;

      const busca = {};

      if (editora){
        busca.editora = editora;
      }

      if (titulo) {
        busca.titulo = titulo;
      }

      const listarLivroResultado = await livros.find(busca);

      res.status(200).send(listarLivroResultado);

    }catch(erro){

      next(erro);
    }

  };
}

export default LivroController;