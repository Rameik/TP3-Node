import Alumno from "./models/alumno.js"
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
    res.send(`Hola ${req.params.nombre}`);
})

app.get('/validarfecha/:ano/:mes/:dia', (req, res) => {
    Date.parse(`${req.params.dia}/${req.params.mes}/${req.params.ano}`) ? res.status(200).send('Fecha valida! (200)') : res.status(400).send('Fecha no valida! (400)');
})

// Modulo matematica

app.get('/matematica/sumar', (req, res) => {
    let suma = sumar(parseInt(req.query.n1), parseInt(req.query.n2))
    // res.status(200).send('Todo OK!');
    res.send(`El resultado de la suma es: ${suma}`)
})

app.get('/matematica/restar', (req, res) => {
    let resta = restar(parseInt(req.query.n1), parseInt(req.query.n2))
    res.send(`El resultado de la resta es: ${resta}`)
})

app.get('/matematica/multiplicar', (req, res) => {
    let multiplicacion = multiplicar(parseInt(req.query.n1), parseInt(req.query.n2))
    res.send(`El resultado de la multiplicacion es: ${multiplicacion}`)
})

app.get('/matematica/dividir', (req, res) => {
    if(req.query.n2 == 0){
        res.status(400).send('El divisor no puede ser cero.')
        return;
    }
    else{
        let division = dividir(parseInt(req.query.n1), parseInt(req.query.n2))
        res.send(`El resultado de la division es: ${division}`)
    }
})

// Modulo wrapper

app.get('/omdb/searchbypage', async (req, res) => {
    let resultado = await OMDBSearchByPage(req.query.search, parseInt(req.query.p))
    res.send(resultado)
})

app.get('/omdb/searchcomplete', async (req, res) => {
    let resultado = await OMDBSearchComplete(req.query.search)
    res.send(resultado)
})

app.get('/omdb/getbyomdbid', async (req, res) => {
    let resultado = await OMDBGetByImdbID(req.query.i)
    res.send(resultado)
})

// Modulo Alumno

app.get('/alumnos', (req, res) => {
    res.send(alumnosArray)
})

app.get('/alumnos/:dni', (req, res) => {
    let alumno = alumnosArray.find((element) => element.dni === req.params.dni)
    res.send(alumno)
})

app.post('/alumnos', (req, res) => {
    alumnosArray.push(new Alumno(req.body.username , req.body.dni, req.body.edad));
    res.status(201).send('Created (201)');
})

app.delete('/alumnos', (req, res) => {
    const index = alumnosArray.findIndex((element) => element.dni === req.body.dni);

    if(index === -1){
        res.status(400).send('No existe ese alumno! (400)');
        return;
    }
    else{
        alumnosArray.splice(index, 1);
        res.status(200).send('Alumno encontrado y eliminado! (200)')
    }
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
