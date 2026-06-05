const YP_DATA = {
  personajes: [
    { id: 'cholita', nombre: 'Cholita', color: '#1c9bd1', img: 'recursos/personajes (1).png', desc: 'Representa la identidad popular, la tradición y el orgullo cochabambino.', habilidad: 'Puede iniciar una ronda de desempate cultural.' },
    { id: 'carnavalito', nombre: 'Carnavalito', color: '#d52320', img: 'recursos/personajes (2).png', desc: 'Aporta alegría, fiesta y energía a cada debate.', habilidad: 'Puede sumar un punto extra si su argumento es el más creativo.' },
    { id: 'madness', nombre: 'Chico de la Madness', color: '#7d3bb2', img: 'recursos/personajes (3).png', desc: 'Representa la vida urbana, la juventud y las nuevas formas de hablar de la ciudad.', habilidad: 'Puede cambiar una carta de su mano una vez por ronda.' },
    { id: 'limpieza', nombre: 'Trabajadora que recoge basura', color: '#f06423', img: 'recursos/personajes (4).png', desc: 'Recuerda el cuidado de la ciudad y la responsabilidad comunitaria.', habilidad: 'Puede bloquear una penalización de carta extra.' },
    { id: 'albanil', nombre: 'Albañil', color: '#0f6b43', img: 'recursos/personajes (5).png', desc: 'Simboliza el trabajo, la construcción y la ciudad que crece.', habilidad: 'Puede avanzar una casilla extra si gana con un argumento práctico.' }
  ],
  situaciones: [
    { titulo: 'Cita cochala', texto: '¿Dónde llevarías a una cita a comer?', tipo: 'situacion' },
    { titulo: 'Primera visita', texto: '¿Qué lugar mostrarías primero a alguien que visita Cochabamba?', tipo: 'situacion' },
    { titulo: 'Orgullo gastronómico', texto: '¿Qué comida representa mejor a un cochabambino?', tipo: 'situacion' },
    { titulo: 'Domingo familiar', texto: '¿Dónde llevarías a tu familia un domingo?', tipo: 'situacion' },
    { titulo: 'Lugar más bonito', texto: '¿Qué lugar defenderías como el más bonito de la ciudad?', tipo: 'situacion' },
    { titulo: 'Turista exigente', texto: '¿Qué comida elegirías para impresionar a un turista?', tipo: 'situacion' },
    { titulo: 'Salida con amigos', texto: '¿Dónde harías una salida con amigos?', tipo: 'situacion' },
    { titulo: 'Lugar olvidado', texto: '¿Qué lugar merece más reconocimiento?', tipo: 'situacion' }
  ],
  comidas: [
    { titulo: 'Silpancho', tipo: 'comida', desc: 'Plato icónico con arroz, papa, carne apanada, huevo y salsa fresca.' },
    { titulo: 'Pique macho', tipo: 'comida', desc: 'Comida intensa, compartida y muy cochabambina para grupos con hambre.' },
    { titulo: 'Salteña', tipo: 'comida', desc: 'Un clásico de media mañana, jugoso y perfecto para romper el hielo.' },
    { titulo: 'Chicharrón', tipo: 'comida', desc: 'Sabor tradicional de domingo, acompañado de mote y llajua.' },
    { titulo: 'Anticucho', tipo: 'comida', desc: 'Opción callejera, nocturna y llena de sabor popular.' },
    { titulo: 'Sopa de maní', tipo: 'comida', desc: 'Caldo cálido, familiar y representativo de la comida boliviana.' },
    { titulo: 'Charque', tipo: 'comida', desc: 'Plato contundente con tradición y carácter local.' },
    { titulo: 'Api con pastel', tipo: 'comida', desc: 'Dúo perfecto para una tarde fría o una salida sencilla.' }
  ],
  lugares: [
    { titulo: 'Cristo de la Concordia', tipo: 'lugar', desc: 'Símbolo de la ciudad y meta del recorrido del juego.' },
    { titulo: 'Laguna Alalay', tipo: 'lugar', desc: 'Espacio urbano natural para conversar, caminar y observar la ciudad.' },
    { titulo: 'Palacio Portales', tipo: 'lugar', desc: 'Lugar elegante, histórico y cultural para una experiencia distinta.' },
    { titulo: 'Jardín Botánico', tipo: 'lugar', desc: 'Un espacio verde para conectar con naturaleza y tranquilidad.' },
    { titulo: 'La Cancha', tipo: 'lugar', desc: 'Mercado vivo, diverso y lleno de historias cotidianas.' },
    { titulo: 'Plaza 14 de Septiembre', tipo: 'lugar', desc: 'Centro histórico y punto de encuentro de la ciudad.' },
    { titulo: 'El Prado', tipo: 'lugar', desc: 'Paseo urbano para caminar, conversar y reconocer la ciudad.' },
    { titulo: 'Pairumani', tipo: 'lugar', desc: 'Destino verde cercano, ideal para desconectarse y explorar.' }
  ],
  extras: [
    { titulo: 'Llajua poderosa', tipo: 'extra', desc: 'Suma +1 voto a tu argumento.' },
    { titulo: 'Buen lugar, pues', tipo: 'extra', desc: 'Si elegiste un lugar y ganas, avanzas 2 casillas.' },
    { titulo: 'Casero confiable', tipo: 'extra', desc: 'Si elegiste comida y ganas, avanzas 2 casillas.' },
    { titulo: 'Cambio de situación', tipo: 'extra', desc: 'Cambia la carta de situación de la ronda.' },
    { titulo: 'No pues', tipo: 'extra', desc: 'Cancela una carta extra rival.' },
    { titulo: 'Trufi lleno', tipo: 'extra', desc: 'Un jugador pierde una ronda.' }
  ],
  pasos: [
    'Prepara de 3 a 5 jugadores.',
    'Cada jugador elige un personaje.',
    'Se barajan las cartas de comidas, lugares y extras.',
    'Se revela una carta de situación.',
    'Cada jugador recibe 3 comidas, 3 lugares y 2 extras.',
    'Cada jugador elige una carta en secreto.',
    'Las cartas se colocan boca abajo.',
    'Todas las cartas se revelan al mismo tiempo.',
    'Cada jugador defiende su elección.',
    'Se vota quién convenció más.',
    'El ganador avanza una casilla.',
    'Las cartas extra pueden modificar la jugada.',
    'Los tres primeros en llegar a la cima ganan canastones.'
  ]
};
