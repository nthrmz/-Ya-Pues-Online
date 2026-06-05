const FORUM_KEY = 'yaPuesForumComments';
let comments = [];
function loadComments(){ try { comments = JSON.parse(localStorage.getItem(FORUM_KEY)) || []; } catch { comments = []; } }
function saveComments(){ localStorage.setItem(FORUM_KEY, JSON.stringify(comments)); }
function publishComment(e){
  e.preventDefault();
  const name = document.querySelector('#forumName').value.trim();
  const character = document.querySelector('#forumCharacter').value;
  const type = document.querySelector('#forumType').value;
  const text = document.querySelector('#forumText').value.trim();
  if(!name || !text) return alert('Completa tu nombre y comentario.');
  comments.unshift({ id: Date.now(), name, character, type, text, date: new Date().toLocaleString('es-BO'), reactions:{like:0, idea:0, try:0} });
  saveComments(); e.target.reset(); renderComments();
}
function react(id, kind){
  const c = comments.find(x=>x.id===id); if(!c) return;
  c.reactions[kind]++; saveComments(); renderComments();
}
function deleteDemo(){ if(confirm('¿Borrar comentarios de demostración?')) { comments=[]; saveComments(); renderComments(); } }
function renderComments(){
  const list = document.querySelector('#commentsList'); if(!list) return;
  const filter = document.querySelector('#filterType')?.value || 'Todos';
  const query = (document.querySelector('#searchComment')?.value || '').toLowerCase();
  let filtered = comments.filter(c => (filter==='Todos' || c.type===filter) && (c.text.toLowerCase().includes(query) || c.name.toLowerCase().includes(query)));
  list.innerHTML = filtered.length ? filtered.map(c=>`<article class="card-yp comment-card enter-screen">
    <span class="badge-yp">${c.type}</span>
    <h3>${c.name}</h3>
    <p><strong>Personaje favorito:</strong> ${c.character}</p>
    <p>${c.text}</p>
    <small>${c.date}</small>
    <div class="reaction-row">
      <button class="react-btn" onclick="react(${c.id}, 'like')">Me gusta ${c.reactions.like}</button>
      <button class="react-btn" onclick="react(${c.id}, 'idea')">Buena idea ${c.reactions.idea}</button>
      <button class="react-btn" onclick="react(${c.id}, 'try')">Lo probaría ${c.reactions.try}</button>
    </div>
  </article>`).join('') : '<div class="empty-state">Aún no hay comentarios. Sé la primera persona en dejar una idea para el juego.</div>';
}
document.addEventListener('DOMContentLoaded', () => { loadComments(); renderComments(); document.querySelector('#forumForm')?.addEventListener('submit', publishComment); document.querySelector('#filterType')?.addEventListener('change', renderComments); document.querySelector('#searchComment')?.addEventListener('input', renderComments); });
