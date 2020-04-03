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

        <span v-else>⚡️ Привет, <strong>{{userName}}</strong>!</span>

        <ui-dialog v-if="openModalAuthorization" @close="closeModalAuthorization">
            <template v-slot:header>Вход на сайт</template>
            <template v-slot:form>
                <form @submit.prevent="checkFormAuthorization" class="wrapper-form">
                    <div>
                        <ui-input class="form-input-comment" v-model="inputAuthorization.login" label="Имя пользователя*" />
                        <ui-input class="form-input-comment" v-model="inputAuthorization.password" label="Пароль*" type="password" />
                    </div>
                    <div class="wrapper-form-btn">
                        <ui-button class="form-btn" label="Отмена" @click.native.prevent="closeModalAuthorization" />
                        <ui-button class="form-btn" label="Ок" theme="primary" />
                    </div>
                </form>
            </template>
        </ui-dialog>

        <ui-toast v-if="showWarning" theme="error" @close="closeWarning">
            Неверный логин или пароль
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
            openModalAuthorization: false,
            inputAuthorization: {
                login: '',
                password: '',
            },
            showWarning: false,
            userName: null
        };
    },
    computed: {
        ...mapGetters(['getUser'])
    },
    methods: {
        ...mapActions(['setUser']),
        closeWarning() {
            this.showWarning = false;
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
                    this.userName = name;
                    this.setUser({
                        authorized: true,
                        login: inputLogin,
                        password,
                        name
                    });
                } else {
                    this.showWarning = true;
                }
            } else {
                this.showWarning = true;
            }
        },
        handlerAuthorization() {
            this.openModalAuthorization = true;
        },




        handlerRegistration() {
            alert('handlerRegistration');
        }
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
