const cronometro = document.querySelector('#cronometro');

// seleccionar los elementos del DOM con los que vamos a trabajar
const btnInicioPausa = document.querySelector('#boton-inicio-pausa');
const btnReiniciar = document.querySelector('#boton-reiniciar');

let [horas, minutos, segundos] = [0, 0, 0];
let intervaloDeTiempo;
let estadoCronometro = 'pausado';

// Esta funcion va a manejar como se va a actualizar el cronometro encuanto a segundos minutos y horas y como se va a calcular lo que se ha transcurrido.
// Cuando mandemos a llamar esta función sabemos que como minimo tuvieron que transcrurrir un segundo
function actualizarCronometro(){
  // Entonces... lo primero que debemos hacer es aumentar la variable de los segundos
  segundos++;

  // para poder calcular que ya transcurrio un minuto luego de los primeros 60segundos, vamos a utilizar esta operación.
  if(segundos / 60 === 1){
    // Si transcurrieron 60seg entonces los segundos se reiniciaran a cero, ya que comienza un minuto nuevo y se actualizarán los minutos.
    segundos = 0;
    // Y los minutos se incrementaran en 1
    minutos++


    // Y luego de que incrementamos los minutos tambien deberias verificar "si los minutos" ya también transcurrieron para agregar una hora nueva.
    if(minutos / 60 === 1){
      minutos = 0;
      horas++;
    }
  }


  // funcion que asigne formato
  const horasConFormato = asignarFormato(horas);
  const minutosConFormato = asignarFormato(minutos);
  const segundosConFormato = asignarFormato(segundos);

  // Continuar...
  // Actualizar el contenido del cronometro (lo qur se le muestra al usuario)
  // Obtendremos en este caso
  // const cronometro = document.querySelector('#cronometro');

  // Ese elemento llamado "cronometro " tiene una propiedad "innerText"
  cronometro.innerText = `${horasConFormato}:${minutosConFormato}:${segundosConFormato}`;
}


// Asiganr formato
// Esta funcion retornara una cadena de caracteres, esa cadena de caracteres estara representado los minutos, segundos y horas
function asignarFormato(unidadDeTiempo){
  return unidadDeTiempo < 10 ? '0' + unidadDeTiempo : unidadDeTiempo;
}


// EVENTOS
btnInicioPausa.addEventListener('click', () => {
  if(estadoCronometro === 'pausado'){
    intervaloDeTiempo = window.setInterval(actualizarCronometro, 1000);
    btnInicioPausa.innerHTML = '<i class="bi bi-pause-fill"></i>';
    btnInicioPausa.classList.remove('iniciar');
    btnInicioPausa.classList.add('pausar');
    estadoCronometro = 'andando'
  } else{
    window.clearInterval(intervaloDeTiempo);
    btnInicioPausa.innerHTML = '<i class="bi bi-play-fill"></i>'
    btnInicioPausa.classList.remove('pausar');
    btnInicioPausa.classList.add('iniciar');
    estadoCronometro = 'pausado';
  }
});



// BOTÓN REINICIAR
btnReiniciar.addEventListener('click', () => {
  window.clearInterval(intervaloDeTiempo);
  horas = 0;
  minutos = 0;
  segundos = 0;

  cronometro.innerText = '00:00:00';

  // ACTUALIZAR BOTONES
  btnInicioPausa.innerHTML = '<i class="bi bi-play-fill"></i>';
  btnInicioPausa.classList.remove('pausar');
  btnInicioPausa.classList.add('iniciar');

  // ESTADO
  estadoCronometro = 'pausado';
});