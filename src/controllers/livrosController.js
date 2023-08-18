import livros from "../models/Livro.js";

class LivroController {
 
  static listarLivros = async (req, res) => {
  
    try{
      const livroResult = await livros.find()
        .populate("autor")
        .exec();

      res.status(200).json(livroResult);

    } catch(erro){

      res.status(500).json({message: "Erro interno no servidor"});

    }
    
  };

  static listarLivrosId = async (req, res) => {

    try {
      const id = req.params.id;

      const listarLivrosResult = await livros.findById(id) 
        .populate("autor", "nome")
        .exec(); 
      res.status(200).send(listarLivrosResult);
      
    } catch(erro){
     
      res.status(400).send({message: `${erro.message} - Livro não encontrado`});

    }
  };

  static cadastrarLivros = async (req, res) =>{
    
    try {
      let livro = new livros(req.body);

      const livroRegisterResult = await livro.save();

      res.status(201).send(livroRegisterResult.toJSON());

    } catch(erro) {

      res.status(500).send({message: `${erro.message}
      - Erro ao Cadastrar o Livro. `});

    }      
      
  };

  static atualizarLivros = async (req, res) => {
    try {
      const id = req.params.id;

      await livros.findByIdAndUpdate(id, {$set: req.body});

      res.status(200).send({message: "Livro Atualizado com sucesso"});

    }catch(erro){

      res.status(500).send({message: erro.message});
    }
    
  };

  static excluirLivros = async (req, res) => {
    try{

      const id = req.params.id;

      await livros.findOneAndDelete(id);

      res.status(200).send({message: "Livro removido com sucesso"});

    }catch(erro){

      res.status(500).send({message: erro.message});

    }
  };

  static listarLivroPorEditora = async (req, res) =>{
    try{
      const editora = req.query.editora;

      const listarLivroEditora = await livros.find({"editora": editora});

      res.status(200).send(listarLivroEditora);

    }catch(erro){

      res.status(500).json({message: "Erro interno no Servidor"});
    }

  };

  static listarLivroPorTitulo = async (req, res) => {
    try{
      const titulo = req.query.titulo;

      const listarLivroTitulo = await livros.find({"titulo": titulo});

      res.status(200).send(listarLivroTitulo);

    }catch(erro){

      res.status(500).json({message: "Erro interno no Servidor"});
    }
    
  };
}

export default LivroController;