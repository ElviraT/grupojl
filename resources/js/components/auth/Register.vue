<template>
    <div class="register-page">
        <div class="register-box">
            <div class="card">
                <div class="card-body register-card-body">
                    <p class="login-box-msg">Registrar una nueva cuenta</p>

                    <errors
                        :success="success"
                        :failure="failure"
                        :message="message"
                        :loading="loading"
                    />
                    <form method="post" ref="form">
                        <div class="input-group">
                            <input
                                type="text"
                                class="form-control"
                                v-model="name"
                                placeholder="Nombre y Apellido"
                                required
                            />
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-user"></span>
                                </div>
                            </div>
                        </div>
                        <p
                            class="small text-danger mb-3"
                            v-html="errors.name"
                        ></p>

                        <div class="input-group">
                            <input
                                type="email"
                                class="form-control"
                                v-model="email"
                                placeholder="Email"
                                required
                            />
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-envelope"></span>
                                </div>
                            </div>
                        </div>
                        <p
                            class="small text-danger mb-3"
                            v-html="errors.email"
                        ></p>

                        <div class="input-group">
                            <input
                                class="form-control"
                                v-model="username"
                                placeholder="Usuario"
                                required
                            />
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fa fa-user"></span>
                                </div>
                            </div>
                        </div>
                        <p
                            class="small text-danger mb-3"
                            v-html="errors.username"
                        ></p>

                        <div class="input-group">
                            <input
                                type="password"
                                class="form-control"
                                v-model="password"
                                placeholder="Contrase??a"
                                required
                            />
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>
                        <p
                            class="small text-danger mb-3"
                            v-html="errors.password"
                        ></p>

                        <div class="input-group">
                            <input
                                type="password"
                                class="form-control"
                                v-model="password_confirmation"
                                placeholder="Repetir contrase??a"
                                required
                            />
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>
                        <p
                            class="small text-danger mb-3"
                            v-html="errors.password_confirmation"
                        ></p>

                        <div class="row">
                            <div class="col-12">
                                <button
                                    type="button"
                                    class="btn btn-primary btn-block"
                                    @click="validate($event)"
                                >
                                    Registrar
                                </button>
                            </div>
                            <!-- /.col -->
                        </div>
                    </form>

                    <a href="/login" class="text-center">Ya tengo una cuenta</a>
                </div>
                <!-- /.form-box -->
            </div>
            <!-- /.card -->
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Errors from "../partials/Errors.vue";

export default {
    components: { Errors },
    name: "Register",
    data() {
        return {
            name: "",
            email: "",
            username: "",
            password: "",
            password_confirmation: "",
            success: false,
            failure: false,
            message: "",
            token: document.head
                .querySelector('meta[name="csrf-token"]')
                .getAttribute("content"),
            loading: false,
            errors: {
                name: "",
                email: "",
                username: "",
                password: "",
                password_confirmation: ""
            }
        };
    },
    methods: {
        validate(event) {
            event.preventDefault();
            // Show the loading alert
            this.loading = true;
            this.failure = false;
            this.success = false;

            // Register the user
            let user = {
                name: this.name,
                email: this.email,
                username: this.username,
                password: this.password,
                password_confirmation: this.password_confirmation,
                _token: this.token
            };
            // Empty the errors
            this.errors.name = null;
            this.errors.email = null;
            this.errors.username = null;
            this.errors.password = null;
            axios
                .post("/register", user)
                .then(res => {
                    this.loading = false;
                    this.success = true;
                    this.message = "Registrado correctamente.";
                    this.failure = false;

                    setTimeout(() => {
                        window.location.href = "/home";
                    }, 1000);
                })
                .catch(err => {
                    this.loading = false;
                    this.failure = true;
                    // Show the error message
                    this.message = err.response.data.message;
                    this.errors.name = err.response.data.errors.name
                        ? err.response.data.errors.name[0]
                        : null;
                    this.errors.email = err.response.data.errors.email
                        ? err.response.data.errors.email[0]
                        : null;
                    this.errors.username = err.response.data.errors.username
                        ? err.response.data.errors.username[0]
                        : null;
                    this.errors.password = err.response.data.errors.password
                        ? err.response.data.errors.password[0]
                        : null;
                    this.success = false;
                });
        }
    }
};
</script>
