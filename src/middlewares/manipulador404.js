import NaoEncontrado from "../erros/NaoEncontrado.js";

function manipulador404(req, res, next) {
    const erro404 = new NaoEncontrado();
// Quando executamos função "next", encaminhamos a responsabilidade direto para nosso manipulador de erros
    next(erro404); 
}


export default manipulador404;