import mongoose from "mongoose";

const livroSchema = mongoose.Schema(
  {
    id: {type: String},
    titulo: {
      type: String, 
      required: [true, "O titulo do livro e Obrigatório"]
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId, 
      ref:"autores", 
      required: [true, "O(a) autor(a) é Obrigatória"]
    },
    editora: {
      type: String, 
      required: [true, "A editora é Obrigatória"],
      enum: {
        values :["Casa do Código", "Alura"],
        message: "A editora {VALUE}, não é um valor permitido"
      }
    },
    numeroPaginas: {
      type: Number,
      validate: {
        validator: (valor) => {
          return valor >=10 && valor <= 5000;
        },
        message: "O número de páginas deve estar entre 10 e 5000. Valor fornecido {VALUES}"
      }
      // required: [true, "Numero de paginas precisa ser fornecidas"],
      // min: [10, "O numero de páginas deve estar entre 10 e 5000"],
      // max: [5000, "O numero de páginas deve estar entre 10 e 5000"]
    }
  }
);

const livros = mongoose.model("livros", livroSchema);

export default livros; 