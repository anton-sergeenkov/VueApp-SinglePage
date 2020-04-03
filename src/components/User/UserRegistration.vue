<template>
    <div>
        <ui-dialog @close="close">
            <template v-slot:header>Регистрация</template>
            <template v-slot:form>
                <form @submit.prevent="checkFormRegistration" class="wrapper-form">
                    <div>
                        <ui-input class="form-input-comment" v-model="inputRegistration.login" label="Логин*" />
                        <ui-input class="form-input-comment" v-model="inputRegistration.password" label="Пароль*" type="password" />
                        <ui-input class="form-input-comment" v-model="inputRegistration.name" label="Отображаемое имя*" />
                    </div>
                    <div class="wrapper-form-btn">
                        <ui-button class="form-btn" label="Отмена" @click.native.prevent="close" />
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

export default {
    data() {
        return {
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

        close() {
            this.$emit('close');
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

                this.close();
            } else {
                this.showWarningRegistration = true;
            }
        },
        closeWarningRegistration() {
            this.showWarningRegistration = false;
        },
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
