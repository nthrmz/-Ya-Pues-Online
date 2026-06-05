function cardTemplate(card) {
  const classType = card.tipo === 'comida' ? 'type-food' : card.tipo === 'lugar' ? 'type-place' : card.tipo === 'extra' ? 'type-extra' : 'type-situation';
  return `<article class="card-game ${classType} enter-screen">
    <span class="card-type">${card.tipo}</span>
    <h4>${card.titulo}</h4>
    <p>${card.desc || card.texto}</p>
  </article>`;
}

document.addEventListener('DOMContentLoaded', () => {
  const previewCards = document.querySelector('[data-preview-cards]');
  if (previewCards && window.YP_DATA) {
    const cards = [YP_DATA.situaciones[0], YP_DATA.comidas[0], YP_DATA.lugares[2], YP_DATA.extras[0]];
    previewCards.innerHTML = cards.map(cardTemplate).join('');
  }
  const previewCharacters = document.querySelector('[data-preview-characters]');
  if (previewCharacters && window.YP_DATA) {
    previewCharacters.innerHTML = YP_DATA.personajes.slice(0,5).map(p => `
      <article class="card-yp image-card enter-screen">
        <img src="${p.img}" alt="${p.nombre}">
        <div class="image-caption">
          <h3>${p.nombre}</h3>
          <p>${p.desc}</p>
        </div>
      </article>`).join('');
  }
});
