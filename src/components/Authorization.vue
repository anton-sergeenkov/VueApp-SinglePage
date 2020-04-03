<template>
    <div>
        <div v-if="!getUser.authorized" class="wrapper-authorization">
            <ui-button
                class="btn"
                @click.native="handlerAuthorization"
                label="Авторизация"
                theme="flat"
            />
            <ui-button
                class="btn"
                @click.native="handlerRegistration"
                label="Регистрация"
                theme="flat"
            />
        </div>

        <span v-else>⚡️ Привет, <strong>{{getUser.name}}</strong>!</span>

        <ui-dialog v-if="openModalAuthorization" @close="closeModalAuthorization">
            <template v-slot:header>Авторизация</template>
            <template v-slot:form>
                <form @submit.prevent="checkFormAuthorization" class="wrapper-form">
                    <div>
                        <ui-input class="form-input-comment" v-model="inputAuthorization.login" label="Логин*" />
                        <ui-input class="form-input-comment" v-model="inputAuthorization.password" label="Пароль*" type="password" />
                    </div>
                    <div class="wrapper-form-btn">
                        <ui-button class="form-btn" label="Отмена" @click.native.prevent="closeModalAuthorization" />
                        <ui-button class="form-btn" label="Ок" theme="primary" />
                    </div>
                </form>
            </template>
        </ui-dialog>

        <ui-toast v-if="showWarningAuthorization" theme="error" @close="closeWarningAuthorization">
            Неверный логин или пароль
        </ui-toast>

        <ui-dialog v-if="openModalRegistration" @close="closeModalRegistration">
            <template v-slot:header>Регистрация</template>
            <template v-slot:form>
                <form @submit.prevent="checkFormRegistration" class="wrapper-form">
                    <div>
                        <ui-input class="form-input-comment" v-model="inputRegistration.login" label="Логин*" />
                        <ui-input class="form-input-comment" v-model="inputRegistration.password" label="Пароль*" type="password" />
                        <ui-input class="form-input-comment" v-model="inputRegistration.name" label="Отображаемое имя*" />
                    </div>
                    <div class="wrapper-form-btn">
                        <ui-button class="form-btn" label="Отмена" @click.native.prevent="closeModalRegistration" />
                        <ui-button class="form-btn" label="Ок" theme="primary" />
                    </div>
                </form>
            </template>
        </ui-dialog>

        <ui-toast v-if="showWarningRegistration" theme="error" @close="closeWarningRegistration">
            Заполните все поля
        </ui-toast>

    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { fetchUsers } from '../api/usersService'

export default {
    data() {
        return {
            users: null,
    
            // authorization
            openModalAuthorization: false,
            inputAuthorization: {
                login: '',
                password: '',
            },
            showWarningAuthorization: false,

            // registration
            openModalRegistration: false,
            inputRegistration: {
                login: '',
                password: '',
                name: ''
            },
            showWarningRegistration: false,
        };
    },
    computed: {
        ...mapGetters(['getUser'])
    },
    methods: {
        ...mapActions(['setUser']),

        // authorization
        handlerAuthorization() {
            this.openModalAuthorization = true;
        },
        closeModalAuthorization() {
            this.openModalAuthorization = false;
        },
        checkFormAuthorization() {
            const inputLogin = this.inputAuthorization.login;
            const inputPassword = this.inputAuthorization.password;

            if (this.users[inputLogin]) {
                const password = this.users[inputLogin].password;
                const name = this.users[inputLogin].name;

                if (password == inputPassword) {
                    this.closeModalAuthorization();
                    this.setUser({
                        authorized: true,
                        login: inputLogin,
                        password,
                        name
                    });
                } else {
                    this.showWarningAuthorization = true;
                }
            } else {
                this.showWarningAuthorization = true;
            }
        },
        closeWarningAuthorization() {
            this.showWarningAuthorization = false;
        },

        // registration
        handlerRegistration() {
            this.openModalRegistration = true;
        },
        closeModalRegistration() {
            this.openModalRegistration = false;
        },
        checkFormRegistration() {
            const inputLogin = this.inputRegistration.login;
            const inputPassword = this.inputRegistration.password;
            const inputName = this.inputRegistration.name;

            if (inputLogin && inputPassword && inputName) {
                this.setUser({
                    authorized: true,
                    login: inputLogin,
                    password: inputPassword,
                    name: inputName
                });

                this.closeModalRegistration();
            } else {
                this.showWarningRegistration = true;
            }
        },
        closeWarningRegistration() {
            this.showWarningRegistration = false;
        },

    },
    created() {
        fetchUsers()
            .then(res => res.json())
            .then(data => this.users = data)
            .catch(error => console.log(error))
    }
}
</script>

<style scoped>
.wrapper-authorization {
    display: flex;
}
.btn {
    margin: 0 5px;
}
.wrapper-form {
    width: 400px;
    line-height: 1.5;
    padding: 20px;
}

.wrapper-form-btn {
    display: flex;
    justify-content: center;
    margin-top: 45px;
}
.form-btn {
    margin: 0 5px;
    min-width: 150px;
}
.form-input-comment {
    margin-top: 30px;
}
</style>
