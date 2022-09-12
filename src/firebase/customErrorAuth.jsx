export const translateError = ( errorCode )=>{
    switch (errorCode) {
        case 'auth/user-not-found':
            return 'No existe ningún registro de usuario que corresponda al email proporcionado.'
        case 'auth/wrong-password':
            return 'El email o la contraseña es incorrecta'
        case 'auth/phone-number-already-exists':
            return 'Otro usuario ya utiliza el número de teléfono proporcionado'
        case 'auth/operation-not-allowed':
            return 'Su cuenta no esta autorizada para realizar esta acción'
        case 'auth/invalid-phone-number':
            return 'El formato de número de teléfono ingresado no es el correcto'
        case 'auth/invalid-password-salt':
            return 'Hubo un error en el formato de la contraseña'
        case 'auth/invalid-password-hash':
            return 'Hubo un error en el formato de la contraseña'
        case 'auth/invalid-password':
            return 'El email o la contraseña es incorrecta'
        case 'auth/invalid-email':
            return 'El formato de email ingresado no es valido'
        case 'auth/invalid-email-verified':
            return 'El valor que se proporcionó para la propiedad del usuario email verificado no es válido. Debe ser un booleano. '
        case 'auth/invalid-dynamic-link-domain':
            return 'El dominio del vínculo dinámico proporcionado no se configuró o no se autorizó para el proyecto actual.'
        case 'auth/invalid-credential':
            return 'Las propiedades de configuración de firebase son incorrectas'
        case 'auth/invalid-creation-time':
            return 'La hora de creación debe ser una string de fecha en formato UTC válida.'
        case 'auth/invalid-argument':
            return 'Se proporcionó un argumento no válido para un método de autenticación.'
        case 'auth/internal-error':
            return 'Sucedio un error interno, por favor inténtelo más tarde'
        case 'auth/insufficient-permission':
            return 'Sucedio un error interno en cuanto a permisos, inténtelo más tarde'
        case 'auth/email-already-exists':
            return 'El email ingresado ya se encuentra registrado'
        default:
            return 'Se ha presentado un error, vuelva a intentarlo más tarde'
    }
}