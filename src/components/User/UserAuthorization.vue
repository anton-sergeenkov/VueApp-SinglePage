<template>
    <div>
        <ui-dialog @close="close">
            <template v-slot:header>Авторизация</template>
            <template v-slot:form>
                <form @submit.prevent="checkFormAuthorization" class="wrapper-form">
                    <div>
                        <ui-input class="form-input-comment" v-model="inputAuthorization.login" label="Логин*" />
                        <ui-input class="form-input-comment" v-model="inputAuthorization.password" label="Пароль*" type="password" />
                    </div>
                    <div class="wrapper-form-btn">
                        <ui-button class="form-btn" label="Отмена" @click.native.prevent="close" />
                        <ui-button class="form-btn" label="Ок" theme="primary" />
                    </div>
                </form>
            </template>
        </ui-dialog>

        <ui-toast v-if="showWarningAuthorization" theme="error" @close="closeWarningAuthorization">
            Неверный логин или пароль
        </ui-toast>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { fetchUsers } from '../../api/usersService';

export default {
    data() {
        return {
            users: null,
            inputAuthorization: {
                login: '',
                password: '',
            },
            showWarningAuthorization: false,
        };
    },
    computed: {
        ...mapGetters(['getUser'])
    },
    methods: {
        ...mapActions(['setUser']),

        close() {
            this.$emit('close');
        },
        checkFormAuthorization() {
            const inputLogin = this.inputAuthorization.login;
            const inputPassword = this.inputAuthorization.password;

            if (this.users[inputLogin]) {
                const password = this.users[inputLogin].password;
                const name = this.users[inputLogin].name;

                if (password == inputPassword) {
                    this.close();
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
.wrapper-form {
    width: 400px;
    line-height: 1.5;
    padding: 20px;
}
.form-input-comment {
    margin-top: 30px;
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
</style>
