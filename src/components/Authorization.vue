<template>
    <div>
        <div v-if="!authorized" class="wrapper-authorization">
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
        <strong v-else>Имя пользователя</strong>
    </div>
</template>

<script>
export default {
    data() {
        return {
            authorized: false,
        };
    },
    methods: {
        handlerAuthorization() {
            alert('handlerAuthorization');
        },
        handlerRegistration() {
            alert('handlerRegistration');
        },
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
</style>
