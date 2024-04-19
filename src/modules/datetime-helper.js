import moment from 'moment'

class DateTimeHelper {
    isDate = (fecha) => {
        return moment(fecha).isValid() ? true : false
    };

    getOnlyDate = (fecha = new Date()) => { 
        return fecha.toLocaleDateString()
    };

    getEdadActual = (fechaNacimiento) => {
        let hoy = new Date();
        let nacimiento = new Date(fechaNacimiento);
        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        let meses = hoy.getMonth() - nacimiento.getMonth();

        if (meses < 0 || (meses === 0 && hoy.getDate() < nacimiento.getDate())) {
            edad--;
        }

        return edad
    };

    getDiasHastaMiCumple = (fechaNacimiento) => { 
        let fechaCumpleaños = new Date(fechaNacimiento)
        let fechaActual = new Date()
        let nextBirthday = new Date(fechaActual.getFullYear(), fechaCumpleaños.getMonth(), fechaCumpleaños.getDate())
        if (nextBirthday < fechaActual) {
            nextBirthday.setFullYear(fechaActual.getFullYear() + 1)
        }
        let diasRestantes = Math.ceil((nextBirthday - fechaActual) / (1000 * 60 * 60 * 24))
        return {"diasRestantes": diasRestantes}
    };

    getDiaTexto = (fecha, retornarAbreviacion = false) => {
        const semana = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"]
        const semanaAbr = semana.map(element => { return element.substring(0,3)})
        let fechaParse = new Date(fecha)
        const day = fechaParse.getDay();
        return retornarAbreviacion == "true" ? {"dia" : semanaAbr[day]} : {"dia" : semana[day]}
    };

    getMesTexto = (fecha, retornarAbreviacion = false) => { 
        const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
        const mesesAbr = meses.map(element => {return element.substring(0,3)})
        let fechaParse = new Date(fecha)
        const month = fechaParse.getMonth();
        return retornarAbreviacion == "true" ? {"mes" : mesesAbr[month]} : {"mes" : meses[month]}
    };
}
export default new DateTimeHelper();