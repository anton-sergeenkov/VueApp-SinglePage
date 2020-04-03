<template>
    <div>
        <ui-dialog @close="closeModal">
            <template v-slot:header>Регистрация</template>
            <template v-slot:form>
                <form @submit.prevent="checkForm" class="form-wrapper">
                    <div>
                        <ui-input class="form-input" v-model="forms.login" label="Логин*" />
                        <ui-input class="form-input" v-model="forms.password" label="Пароль*" type="password" />
                        <ui-input class="form-input" v-model="forms.name" label="Отображаемое имя*" />
                    </div>
                    <div class="form-wrapper-btn">
                        <ui-button class="form-btn" label="Отмена" @click.native.prevent="closeModal" />
                        <ui-button class="form-btn" label="Ок" theme="primary" />
                    </div>
                </form>
            </template>
        </ui-dialog>

        <ui-toast v-if="showWarning" theme="error" @close="closeWarning">
            Заполните все поля
        </ui-toast>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    data() {
        return {
            forms: {
                login: '',
                password: '',
                name: ''
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
            const inputName = this.forms.name;

            if (inputLogin && inputPassword && inputName) {
                this.setUser({
                    authorized: true,
                    login: inputLogin,
                    password: inputPassword,
                    name: inputName
                });

                this.closeModal();
            } else {
                this.showWarning = true;
            }
        },
        closeWarning() {
            this.showWarning = false;
        },
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
