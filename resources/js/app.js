// Views
import Navbar from "./components/global/Navbar";
import Footer from "./components/global/Footer";
import Sidebar from "./components/global/Sidebar";
import Container from "./components/Container";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import PasswordReset from "./components/auth/PasswordReset";
import PasswordUpdate from "./components/auth/PasswordUpdate";

import Registro_usuario from "./components/formularios/registro_usuario.vue";

require("./bootstrap");

window.Vue = require("vue").default;
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
    {
        path: '/registro',
        component: Registro_usuario,
    }
];

const router = new VueRouter({routes});
const app = new Vue({
    el: "#app",
    router: router,
    components: {
        Container,
        Navbar,
        Sidebar,
        Footer,
        Login,
        Register,
        PasswordReset,
        PasswordUpdate,
    }
});
