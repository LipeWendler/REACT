export function randomNumber(max) { // Função para apresentar número aleatório com base no teto definido
    const number = Math.floor(Math.random() * max); // Cálcula um número aleatório
    return  number.toString();
}