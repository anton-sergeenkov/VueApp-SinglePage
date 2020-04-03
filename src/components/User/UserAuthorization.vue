<template>
    <div>
        <ui-dialog @close="closeModal">
            <template v-slot:header>Авторизация</template>
            <template v-slot:form>
                <form @submit.prevent="checkForm" class="form-wrapper">
                    <div>
                        <ui-input class="form-input" v-model="forms.login" label="Логин*" />
                        <ui-input class="form-input" v-model="forms.password" label="Пароль*" type="password" />
                    </div>
                    <div class="form-wrapper-btn">
                        <ui-button class="form-btn" label="Отмена" @click.native.prevent="closeModal" />
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
import { fetchUsers } from '../../api/usersService';

export default {
    data() {
        return {
            users: null,
            forms: {
                login: '',
                password: '',
            },
            showWarning: false,
        };
    },
    computed: {
        ...mapGetters(['getUser'])
    },
    methods: {
        ...mapActions(['setUser']),

        closeModal() {
            this.$emit('close');
        },
        checkForm() {
            const inputLogin = this.forms.login;
            const inputPassword = this.forms.password;

            if (this.users[inputLogin]) {
                const password = this.users[inputLogin].password;
                const name = this.users[inputLogin].name;

                if (password == inputPassword) {
                    this.closeModal();
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
        closeWarning() {
            this.showWarning = false;
        },
    },
    created() {
        fetchUsers()
            .then(res => res.json())
            .then(data => this.users = data)
            .catch(error => console.log(error))
    },
}
</script>

<style scoped>
.form-wrapper {
    width: 400px;
    padding: 20px;
    line-height: 1.5;
}
.form-wrapper-btn {
    display: flex;
    justify-content: center;
    margin-top: 45px;
}
.form-input {
    margin-top: 30px;
}
.form-btn {
    min-width: 150px;
    margin: 0 5px;
}
</style>
