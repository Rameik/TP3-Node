import Alumno from "./models/alumno.js"
import ValidacionesHelper from './modules/validaciones-helper.js'
import DateTimeHelper from './modules/datetime-helper.js'
import {sumar, restar, multiplicar, dividir} from "./modules/matematica.js"
import {OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID} from
"./modules/wrapper.js"
import express from "express";
import cors from "cors";


const alumnosArray = [];
alumnosArray.push(new Alumno("Esteban Dido" , "22888444", 20));
alumnosArray.push(new Alumno("Matias Queroso", "28946255", 51));
alumnosArray.push(new Alumno("Elba Calao" , "32623391", 18));

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); 

app.get('/', (req, res) => {
    res.send('Ya estoy respondiendo!');
})

app.get('/saludar/:nombre', (req, res) => {
    let nombre = ValidacionesHelper.getStringOrDefault(req.params.nombre, "")
    res.send(`Hola ${nombre}`);
})

app.get('/validarfecha/:ano/:mes/:dia', (req, res) => {
    let dia = ValidacionesHelper.getIntegerOrDefault(req.params.dia, 0)
    let mes = ValidacionesHelper.getIntegerOrDefault(req.params.mes, 0)
    let ano = ValidacionesHelper.getIntegerOrDefault(req.params.ano, 0)
    Date.parse(`${dia}/${mes}/${ano}`) ? res.status(200).send('Fecha valida! (200)') : res.status(400).send('Fecha no valida! (400)');
})

// Modulo matematica

app.get('/matematica/sumar', (req, res) => {
    let n1 = ValidacionesHelper.getIntegerOrDefault(req.query.n1, 0)
    let n2 = ValidacionesHelper.getIntegerOrDefault(req.query.n2, 0)
    let suma = sumar(n1, n2)
    res.status(200).send(`El resultado de la suma es: ${suma}`)
})

app.get('/matematica/restar', (req, res) => {
    let n1 = ValidacionesHelper.getIntegerOrDefault(req.query.n1, 0)
    let n2 = ValidacionesHelper.getIntegerOrDefault(req.query.n2, 0)
    let resta = restar(n1, n2)
    res.status(200).send(`El resultado de la resta es: ${resta}`)
})

app.get('/matematica/multiplicar', (req, res) => {
    let n1 = ValidacionesHelper.getIntegerOrDefault(req.query.n1, 0)
    let n2 = ValidacionesHelper.getIntegerOrDefault(req.query.n2, 0)
    let multiplicacion = multiplicar(n1, n2)
    res.status(200).send(`El resultado de la multiplicacion es: ${multiplicacion}`)
})

app.get('/matematica/dividir', (req, res) => {
    let n1 = ValidacionesHelper.getIntegerOrDefault(req.query.n1, 0)
    let n2 = ValidacionesHelper.getIntegerOrDefault(req.query.n2, 0)
    if(n2 == 0){
        res.status(400).send('El divisor no puede ser cero.')
        return;
    }
    else{
        let division = dividir(n1, n2)
        res.status(200).send(`El resultado de la division es: ${division}`)
    }
})

// Modulo wrapper

app.get('/omdb/searchbypage', async (req, res) => {
    let search = ValidacionesHelper.getStringOrDefault(req.query.search, '');
    let p = ValidacionesHelper.getIntegerOrDefault(req.query.p, 1);
    let resultado = await OMDBSearchByPage(search, p)
    res.status(200).send(resultado)
})

app.get('/omdb/searchcomplete', async (req, res) => {
    let search = ValidacionesHelper.getStringOrDefault(req.query.search, '');
    let resultado = await OMDBSearchComplete(search)
    res.status(200).send(resultado)
})

app.get('/omdb/getbyomdbid', async (req, res) => {
    let i = ValidacionesHelper.getStringOrDefault(req.query.i, '');
    let resultado = await OMDBGetByImdbID(i)
    res.status(200).send(resultado)
})

// Modulo Alumno

app.get('/alumnos', (req, res) => {
    res.status(200).send(alumnosArray)
})

app.get('/alumnos/:dni', (req, res) => {
    let dni = ValidacionesHelper.getStringOrDefault(req.params.dni, '');
    let alumno = alumnosArray.find((element) => element.dni === dni)
    res.status(200).send(alumno)
})

app.post('/alumnos', (req, res) => {
    let dni = ValidacionesHelper.getStringOrDefault(req.body.dni, '');
    let username = ValidacionesHelper.getStringOrDefault(req.body.username, '');
    let edad = ValidacionesHelper.getIntegerOrDefault(req.body.edad, 0);
    alumnosArray.push(new Alumno(username, dni, edad));
    res.status(201).send('Created (201)');
})

app.delete('/alumnos', (req, res) => {
    let dni = ValidacionesHelper.getStringOrDefault(req.body.dni, '');
    const index = alumnosArray.findIndex((element) => element.dni === dni);

    if(index === -1){
        res.status(400).send('No existe ese alumno! (400)');
        return;
    }
    else{
        alumnosArray.splice(index, 1);
        res.status(200).send('Alumno encontrado y eliminado! (200)')
    }
})

// Modulo Datetime

app.get('/fechas/isDate', (req, res) => {
    let fecha = req.query.fecha
    DateTimeHelper.isDate(fecha) ? res.status(200).send('Fecha valida! (OK)') : res.status(400).send('Fecha no valida! (Bad Request)');
})

app.get('/fechas/getEdadActual', (req, res) => {
    let fecha = req.query.fechaNacimiento
    let edad = DateTimeHelper.getEdadActual(fecha)
    edad ? res.status(200).send({"edad" : edad}) : res.status(400).send('Fecha no valida! (Bad Request)');
})

app.get('/fechas/getDiasHastaMiCumple', (req, res) => {
    let fecha = req.query.fecha
    let diasRestantes = DateTimeHelper.getDiasHastaMiCumple(fecha) 
    diasRestantes ? res.status(200).send(diasRestantes) : res.status(400).send('Fecha no valida! (Bad Request)');
})

app.get('/fechas/getDiaTexto', (req, res) => {
    let fecha = req.query.fecha
    let abreviado = req.query.abr
    let response = DateTimeHelper.getDiaTexto(fecha, abreviado) 
    response.length > 0 ? res.status(200).send(response) : res.status(400).send('Fecha no valida! (Bad Request)');
})

app.get('/fechas/getMesTexto', (req, res) => {
    let fecha = req.query.fecha
    let abreviado = req.query.abr
    let response = DateTimeHelper.getMesTexto(fecha, abreviado) 
    response.length > 0 ? res.status(200).send(response) : res.status(400).send('Fecha no valida! (Bad Request)');
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
