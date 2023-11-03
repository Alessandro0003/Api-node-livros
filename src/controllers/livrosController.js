import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autores, livros } from "../models/index.js";

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

  static listarLivroPorFiltros = async (req, res, next) =>{
    try{
      const busca = await processaBusca(req.query);

      if(busca !== null){
        const listarLivroResultado = await livros
        .find(busca)
        .populate("autor");

        res.status(200).send(listarLivroResultado);
      } else {
        next(new NaoEncontrado("Id do Autor não localizado."));
      }
    }catch(erro){
      next(erro);
    }

  };
}

async function processaBusca(parametros) {
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = parametros;

  let busca = {};

  if (editora) {
    busca.editora = { $regex: editora, $options: "i" };
  }

  if (titulo) {
    busca.titulo = { $regex: titulo, $options: "i" };
  }

  if (minPaginas || maxPaginas) {
    busca.numeroPaginas = {};
  }

  // gte = Greater Than or Equal = maior ou igual que
  if (minPaginas) {
    busca.numeroPaginas.$gte = minPaginas;
  }
  // lte = Less Than or Equal = menor ou igual que
  if (maxPaginas) {
    busca.numeroPaginas.$lte = maxPaginas;
  }

  if(nomeAutor) {
    
    const autor = await autores.findOne({nome: nomeAutor});

    if(autor !== null){
      busca.autor = autor._id;
    } else {
      busca = null;
    }
  }

  return busca;
};


export default LivroController;