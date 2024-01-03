
let agendaCorreos = [];


const actualizarListaCorreos = () => {
  const listaCorreos = document.getElementById('listaCorreos');
  listaCorreos.innerHTML = '';  

  agendaCorreos.forEach(correo => {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item';
    listItem.textContent = correo;

    listaCorreos.appendChild(listItem);
  });
};

const agendaForm = document.getElementById('agendaForm');

agendaForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const nuevoCorreo = document.getElementById('email').value;


  agendaCorreos.push(nuevoCorreo);

  actualizarListaCorreos();
});

