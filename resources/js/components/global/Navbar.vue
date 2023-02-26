<template>
    <!-- Navbar -->
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
        <!-- Right navbar links -->

        <ul class="navbar-nav ml-auto">
            <li>
                <h5 class="nav-link">{{ user.name }}</h5>
            </li>
            <li class="nav-link position-relative">
                <i class="far fa-bell nav-icon"
                    ><span
                        class="position-absolute start-100 badge rounded-circle bg-light"
                        >4</span
                    ></i
                >
            </li>
            <li>
                <a
                    href="#"
                    @click="logout()"
                    :disabled="disable"
                    class="nav-link"
                    ><i class="fa fa-sign-out-alt nav-icon"></i
                ></a>
            </li>
        </ul>
    </nav>
    <!-- /.navbar -->
</template>

<script>
import axios from "axios";
import Errors from "../partials/Errors.vue";

export default {
    components: { Errors },
    name: "Navbar",
    props: ["user"],
    data() {
        return {
            disable: false
        };
    },
    methods: {
        logout() {
            // Disable the logout button
            this.disable = true;
            // Get the CSRF token
            let token = document.head
                .querySelector('meta[name="csrf-token"]')
                .getAttribute("content");
            // Log the user out
            axios
                .post("/logout", token)
                .then(() => {
                    console.log("logged out successfully");
                    window.location.href = "/";
                })
                .catch(
                    () => /* Enable the logout button */ (this.disable = false)
                );
        }
    }
};
</script>

<style>
.logo {
    height: 45px;
    width: 250px;
}
.logo-mobile {
    height: 60px;
    width: 200px;
}
#form {
    background: white;
    padding: 25px;
    border-radius: 14px;
    border: 2px solid #14756a23;
}
.nav-icon {
    font-size: 20px;
    margin-top: 5px;
}
.badge {
    margin-top: -12px !important;
    margin-left: -12px;
}
</style>
