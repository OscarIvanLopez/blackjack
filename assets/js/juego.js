(() => {
	"use strict";

	let deck = [];
	const tipos = ["C", "D", "H", "S"],
		especiales = ["A", "J", "Q", "K"];

	// let puntosJugador = 0,
	// puntosComputadora = 0;
	let puntosJugadores = [];

	// Referencias del HTML
	const btnPedir = document.querySelector("#btnPedir"),
		btnDetener = document.querySelector("#btnDetener"),
		btnNuevo = document.querySelector("#btnNuevo"),
		puntosHTML = document.querySelectorAll("small");

	const divCartasJugadores = document.querySelector(".divCartas");

	// Esta funcion inicializa el juego
	const inicializarJuego = (numJugadores = 2) => {
		deck = crearDeck();
		for (let i = 0; i < numJugadores; i++) {
			puntosJugadores.push(0);
		}
	};

	// Esta funcion crea un nuevo deck
	const crearDeck = () => {
		deck = [];

		for (var i = 2; i < 10; i++) {
			for (let tipo of tipos) {
				deck.push(i + tipo);
			}
		}
		for (let tipo of tipos) {
			for (let esp of especiales) {
				deck.push(esp + tipo);
			}
		}
		return _.shuffle(deck);
	};

	// Esta funcion me permite tomar una carta
	const pedirCarta = () => {
		if (deck === 0) {
			throw "Ya no hay cartas en el deck";
		}

		return deck.pop();
	};

	// Esta funcion sirve para obtener el valor de la carta
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

	const crearCarta = (carta, turno) => {
		const imgCarta = document.createElement("img");
		imgCarta.src = `assets/cartas/${carta}.png`;
		imgCarta.classList.add("carta");
		divCartasJugadores[turno].append(imgCarta);
	};

	// turno: 0 = primer jugador y el ultimo la computadora
	const acumularPuntos = (carta, turno) => {
		puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
		puntosHTML[turno].innerText = puntosJugadores[turno];

		return puntosJugadores[turno];
	};

	// turno computadora
	const turnoComputadora = (puntosMinimos) => {
		do {
			const carta = pedirCarta();
			acumularPuntos(carta, puntosJugadores.length - 1);

			crearCarta(carta, puntosJugadores.length - 1);
			if (puntosMinimos > 21) {
				break;
			}
		} while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

		setTimeout(() => {
			if (puntosComputadora === puntosMinimos) {
				console.log("Nadie Gana pa!");
			} else if (puntosMinimos < 21) {
				alert("La computadora gana pa!");
			} else if (puntosComputadora > 21) {
				alert("Ganaste pa!");
			} else {
				alert("Gano la compu pa!");
			}
		}, 100);
	};

	// Eventos
	btnPedir.addEventListener("click", () => {
		const carta = pedirCarta();
		const puntosJugador = acumularPuntos(carta, 0);

		crearCarta(carta, 0);

		if (puntosJugador >= 21) {
			console.log("Lo siento mucho pa, perdiste");
			btnDetener.disabled = true;
			btnPedir.disabled = true;
			turnoComputadora(puntosJugador);
		} else if (puntosJugador === 21) {
			console.log("Ganaste pa!");
			btnDetener.disabled = true;
			btnPedir.disabled = true;
		}
	});

	btnDetener.addEventListener("click", () => {
		btnDetener.disabled = true;
		btnPedir.disabled = true;
		turnoComputadora(puntosJugador);
		// if (puntosJugador < puntosComputadora) {
		// 	console.log("Perdiste pa!");
		// } else if( puntosComputadora <= 21) {
		// 	console.log("Perdiste Pa!");
		// }else{
		// 	console.log("Ganaste pa!")
		// }
	});

	btnNuevo.addEventListener("click", () => {
		inicializarJuego();
		console.clear();
		// btnPedir.disabled = false;
		// btnDetener.disabled = false;
		// deck = [];
		// deck = crearDeck();
		// puntosJugador = 0;
		// puntosComputadora = 0;

		// puntosHTML[0].innerText = 0;
		// puntosHTML[1].innerText = 0;

		// divCartasComputadora.innerHTML = "";
		// divCartasJugador.innerHTML = "";
	});
})();
