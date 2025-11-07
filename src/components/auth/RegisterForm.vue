<template>
    <div class = "background">
        <div class="shape"></div>
        <div class="shape"></div>    
    </div>
    <form>
        <h3>Registrate PAPU :></h3>
        
        <label for="nombre"> Nombre </label>
        <input type="text" placeholder="Nombre Completo" id="nombre" v-model="nombre">

        <label for="apellido"> Apellido </label>
        <input type="text" placeholder="Apellido Completo" id="apellido" v-model="apellido">

        <label for="type"> Tipo </label>
        <input type="text" placeholder="Tipo" id="type" v-model="type">

        <!-- Fecha de nacimiento: input tipo date que despliega calendario pequeño y guarda YYYY-MM-DD -->
        <label for="fechaNacimiento"> Fecha de nacimiento </label>
        <input type="date" id="fechaNacimiento" v-model="fechaNacimiento">

        <label for="country"> Pais </label>
        <input type="text" placeholder="Pais" id="country" v-model="country">

        <label for="address"> Direccion </label>
        <input type="text" placeholder="Direccion" id="address" v-model="address">

        <label for="email"> Email </label>
        <input type="email" placeholder="Email" id="email" v-model="email">

        <label for="password"> Password </label>
        <input type="password" placeholder="Password" id="password" v-model="password">

        <label for="confirmPassword"> Confirm Password </label>
        <input type="password" placeholder="Confirm Password" id="confirmPassword" v-model="confirmPassword">

        <button @click="register"> Register </button>
    <!-- Párrafo con una palabra clicable que crea una variable y lleva al login -->
    <p class="hint">¿Ya tienes cuenta? <span class="clickable" @click="goToLogin">Inicia sesión</span></p>
    </form>
</template>
<style>
/* Reset and base */
*, *:before, *:after { box-sizing: border-box; margin: 0; padding: 0 }
body { background-color: #080710; font-family: 'Poppins', sans-serif }

/* Clickable hint */
.clickable { cursor: pointer; color: #6ec1ff; text-decoration: underline }
.hint { margin-top: 14px; font-size: 0.95rem; color: #d8eefe }

/* Background decorative shapes */
.background{ width: 460px; height: 520px; position: absolute; transform: translate(-50%,-50%); left: 50%; top: 50%; pointer-events: none; z-index: 0 }
.background .shape{ height: 200px; width: 200px; position: absolute; border-radius: 50% }
.shape:first-child{ background: linear-gradient(#1845ad,#23a2f6); left: -90px; top: -90px; filter: blur(4px); opacity: .95 }
.shape:last-child{ background: linear-gradient(to right,#ff512f,#f09819); right: -40px; bottom: -90px; filter: blur(2px); opacity: .95 }

/* Card / form */
form{
    width: 420px; /* match card nicely */
    max-width: 94%;
    margin: 56px auto; /* allow page to scroll */
    background-color: rgba(255,255,255,0.06);
    position: relative; /* normal flow so page scrolls */
    border-radius: 12px;
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.08);
    box-shadow: 0 8px 30px rgba(2,6,23,0.7);
    padding: 34px 28px;
    z-index: 2; /* above background shapes */
}

form * { color: #eef6ff }
form h3{ font-size: 24px; font-weight: 600; text-align: center; margin-bottom: 8px }

label{ display:block; margin-top: 16px; font-size: 13px; font-weight: 500; color: #cfe9ff }
input{ display:block; height:44px; width:100%; background-color: rgba(255,255,255,0.04); border-radius:6px; padding: 8px 12px; margin-top:8px; font-size:14px; color:#e7f6ff; border:1px solid rgba(255,255,255,0.03) }
input:focus{ outline: none; box-shadow: 0 0 0 4px rgba(36,132,255,0.08); border-color: rgba(110,193,255,0.9) }
::placeholder{ color: rgba(230,230,230,0.35) }

/* Style specific for date input to align nicely */
input[type="date"]{ padding-right: 36px }

button{ margin-top: 22px; width:100%; background-color:#ffffff; color:#080710; padding:12px 0; font-size:16px; font-weight:700; border-radius:8px; cursor:pointer; border:none }
button:hover{ transform: translateY(-1px); box-shadow: 0 6px 18px rgba(0,0,0,0.25) }

/* small social area (if used) */
.social{ margin-top: 18px; display:flex }

/* Responsive tweaks */
@media (max-width: 520px){
  .background{ display:none }
  form{ width: 92%; padding: 22px; left: 50%; top: 46%; transform: translate(-50%,-46%) }
  label{ margin-top: 12px }
  button{ margin-top: 20px }
}
</style>

<script>
export default {
    name: 'RegisterForm',
    data () {
        return {
            nombre: '',
            apellido: '',
            type: '',
            fechaNacimiento: '',
            country: '',
            address: '',
            email: '',
            password: '',
            confirmPassword: '',
            // variable que se crea cuando se hace click en el texto
            clickedLogin: false
        }
    },
    methods: {
        goToLogin () {
            // se marca la variable y luego se navega al login
            this.clickedLogin = true
            this.$router.push('/login')
        },
        register (e) {
            // Asegurarse de usar el path correcto y empezar con '/'
            let endppointURL = '/api/User/signup'

            // Mapear los campos al JSON que tu API espera
            let userData = {
                firstName: this.nombre,
                lastName: this.apellido,
                dateOfBirth: this.fechaNacimiento, // 'YYYY-MM-DD' desde <input type="date">
                country: this.country,
                address: this.address,
                email: this.email,
                password: this.password,
                type: this.type
            }

            // opcional: ver en consola lo que se enviará
            console.log('POST', endppointURL, userData)

            this.$api.post(endppointURL, userData)
            .then(response => {
                console.log('Registro exitoso:', response.data)
                this.$q.notify({
                    type: 'positive',
                    message: 'Registro exitoso!',
                    position: 'top',
                    timeout: 2000
                })
            })
            .catch(error => {
                console.error('Error en el registro:', error)
                this.$q.notify({
                    type: 'negative',
                    message: 'Error en el registro. Intenta de nuevo.',
                    position: 'top',
                    timeout: 2000
                })
            })
            // previene el submit por defecto; la lógica de registro la puedes poner aquí
            if (e && e.preventDefault) { e.preventDefault() }
            // ejemplo: console.log('register', this.nombre, this.fechaNacimiento)
        }
    }
}
</script>