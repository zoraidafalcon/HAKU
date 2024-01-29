//nombrar a haku
function Haku (){
    var self=this
    this.posicion = [{x:x, y:y}] // sabemos que la posición va por eje y cordenada
    this.direccion = null // direccion al comienzo es nula
    this.render = function(){
        this.posicion.forEach(function(coordinadas){
            celda = document.querySelector(`.row${coordinadas.y} .col${coordinadas.x}`)//estoy llamando celda a los valores de x e y
            celda.classList.add('haku') 
        })
    }
//ahora movimiento es decir las posiciones
//se guarda en una function
    this.x = function(){
        v= {x:this.posicion[0].x}, //si la posicion es x: 50, y: 50 para haku
           {y:this.posicion[0].y}

        // direccion de haku
        switch (this.direccion) { //DUDAS PREGUNTAR 
            case 'up':
                v.y = (v.y === 1) ? 50 : v.y - 1; //se mueve hacia arriba
                break;
            case 'down':
                v.y = (v.y === 50) ? 1 : v.y + 1; //se mueve hacia abajo
                break;
            case 'left':
                v.x = (v.x === 1) ? 50 : v.x - 1; // se mueve hacia la izquierda
                break;
            case 'right':
                v.x = (v.x === 50) ? 1 : v.x + 1; // se mueve hacia la derecha
                break;
        }
    }
    this.posicion.unshift(v) // agrega a posicion las direciones de v 

}

// Teclado
var teclado = {
    'w': 'up',
    's': 'down',
    'a': 'left',
    'd': 'right'
}

window.addEventListener('keydown', function(evento){
    direccion = teclado[evento.key]
    if(direccion){haku.direccion}
})

//aviones de papel
