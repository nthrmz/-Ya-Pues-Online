# ¡Ya Pues! App Companion

App web de apoyo para el juego de mesa físico **¡Ya Pues!**, creado con HTML, CSS, Bootstrap y JavaScript.

## Objetivo

La página acompaña las partidas físicas del juego: explica cómo se juega, muestra la identidad visual, permite usar un temporizador de debate, sortear el orden de argumentación y guardar un ranking local de jugadores.

## Secciones

- **Inicio:** presentación del juego y su propósito turístico-cultural.
- **Cómo se juega:** reglas visuales por pasos.
- **Temporizador:** nombres de jugadores, personajes, tiempo de debate, sorteo de orden y ranking.
- **Merchandising:** productos del universo gráfico del juego: portanaipes, abanicos, separadores y calendarios.
- **Foro:** comentarios, sugerencias, nuevas cartas, lugares y reacciones.

## Tecnologías usadas

- HTML5
- CSS3
- Bootstrap 5
- JavaScript
- LocalStorage
- Animaciones CSS
- Diseño responsive

## Identidad visual

El proyecto respeta la identidad visual del juego de mesa:

- Fondo crema/beige.
- Azul fuerte como color principal.
- Ondas orgánicas.
- Colores secundarios: celeste, amarillo, naranja, morado y verde.
- Estilo flat design y editorial-lúdico.
- Uso de recursos gráficos reales dentro de la carpeta `recursos/`.

## Cómo probar

1. Abrir la carpeta del proyecto en Visual Studio Code.
2. Abrir `index.html`.
3. Ejecutar con **Go Live**.
4. Navegar por las secciones.

## Funciones con LocalStorage

El temporizador y el foro guardan datos localmente en el navegador. Esto permite mantener jugadores, ranking y comentarios demo sin base de datos externa.

## Nota

Esta web no reemplaza el juego físico. Funciona como una **app companion** para apoyar las rondas, ordenar debates y reforzar la experiencia visual del juego.


## Últimos ajustes de diseño

- Se agregó una sección visual para mostrar el juego físico dentro del inicio.
- Para usar tu imagen principal del juego físico, colócala como `recursos/identidad.png`. Si no existe, la página usa una imagen de portanaipes como respaldo.
- Se mejoró el contraste del header en modo oscuro para que la navegación sea legible.
- El botón de modo claro/oscuro conserva animación tipo switch.


## Ajuste final
- El inicio fue corregido para no dejar espacios vacíos: ahora muestra el logo central, botones principales, datos del juego y personajes.
- La imagen `recursos/identidad.png` se usa en la página **Cómo se juega** para mostrar el juego físico. Si no existe, aparece un recurso de respaldo.
