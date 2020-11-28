/*
2C = Two of Clubs (Treboles)
2D = Two of Diamonds (Diamantes)
2H = Two of Hearts (Corazones)
2S = Two of Spades (Espadas)
*/

let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];

// Esta funcion crea un nuevo deck
const crearDeck = () => {
	for (var i = 0; i < 10; i++) {
		for (let tipo of tipos) {
			deck.push(i + tipo);
		}
	}
	for (let tipo of tipos) {
		for (let esp of especiales) {
			deck.push(esp + tipo);
		}
	}
	console.log(deck);
	deck = _.shuffle(deck);
	console.log(deck);
	return deck;
};

crearDeck();

// Esta funcion me permite tomar una carta
const pedirCarta = () => {
	if (deck === 0) {
		throw "Ya no hay cartas en el deck";
	}
	let carta = deck.pop();
	console.log(carta);
	return carta;
};

const valorCarta = (carta) => {
	const valor = carta.substring(0, carta.length - 1);
	return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
	// let puntos = 0;
	// 2 = 2
	// if (isNaN(valor)) {
	// 	puntos = (valor === "A") ? 11 : 10;
	// } else {
	// 	console.log("Es un numero");
	// 	puntos = valor * 1;
	// }
	// console.log(puntos);
};

const valor = valorCarta(pedirCarta());
console.log(valor);
