var haku = [
    {x:500, y:500}, //"posicion" cabeza
    {x:450, y:500}, //"posicion" cuerpo
    {x:400, y:500}  //"posicion" cola
]

var cabeza = document.getElementById('cabeza')
var cuerpo = document.getElementById('cuerpo')
var cola = document.getElementById('cola')

var xHaku = 500
var yHaku = 500


function changePosition(){
    haku[0]['x'] = 550 
}