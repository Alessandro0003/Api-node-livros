import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autores } from "../models/index.js";


class AutorController {
 
  static listarAutores = async (req, res, next) => {
    try{

      const autoresResultado = await autores.find();

      res.status(200).json(autoresResultado);

    } catch (erro) {

      next(erro);
    }
  };

  static listarAutorPorId  = async (req, res, next) => {
    try {
      const id =  req.params.id;

      const autoresResultado = await autores.findById(id);

      if (autoresResultado !== null) {
        res.status(200).send(autoresResultado);
      } else {
        next(new NaoEncontrado("Id do Autor não localizado."))
      }

    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarAutor =  async (req, res, next) =>{

    try {
      
      let autor = new autores(req.body);

      const autorResultadoSave = await autor.save();

      res.status(201).send(autorResultadoSave.toJSON());

    } catch (erro) {
      next(erro);
    }
  };

  static atualizarAutor= async (req, res, next) => {
    try{

      const id = req.params.id;

      const autorResultado =  await autores.findByIdAndUpdate(id, {$set: req.body}); 

      if (autorResultado !== null){
        res.status(200).send({message: "Autor Atualizado com sucesso"});
      } else {
        next(new NaoEncontrado("Id do Autor não localizado."));
      }

    } catch (erro) {
          
      next(erro);
    }
    
  };

  static excluirAutor = async (req, res, next) => {
    try {
      const id = req.params.id;

      const autorResultado = await autores.findByIdAndDelete(id);

      if(autorResultado !== null){
        res.status(200).send({message: "Autor removido com sucesso"});
      } else {
        next(new NaoEncontrado("Id do Autor não localizado."));
      }
      
    } catch (erro) {
      next(erro);  
    }
  };


  static listarAutoresPorFiltro = async (req, res, next) => {
    try{
      const nome = req.query.nome;

      const busca = {}

      if(nome){
        busca.nome = {$regex: nome, $options: "i"};
      }

      const listarAutoresPorNomeResult = await autores.find(busca); 

      res.status(200).send(listarAutoresPorNomeResult);

    } catch(erro){
      
      next(erro);
    }
    
  };
}

export default AutorController;