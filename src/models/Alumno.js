export default class Alumno {
    constructor(username, dni, edad) {
        this.username = username;
        this.dni = dni;
        this.edad = edad;
    }
    toString() {
        return `username: ${this.username}, DNI: ${this.dni}, edad: ${this.edad}`
    }
}