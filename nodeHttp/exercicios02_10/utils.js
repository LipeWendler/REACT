export function randomNumber(max) { // Função para apresentar número aleatório com base no teto definido
    const number = Math.floor(Math.random() * max); // Cálcula um número aleatório
    return  number.toString();
}


export function customHello() {
    return "Seja bem vindo" + userName + ", aproveite os nossos serviços de forma gratuita!"
}