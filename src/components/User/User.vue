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

        <app-authorization v-if="openModalAuthorization" @close="closeModalAuthorization" />
        <app-registration v-if="openModalRegistration" @close="closeModalRegistration" />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import UserAuthorization from './UserAuthorization.vue';
import UserRegistration from './UserRegistration.vue';

export default {
    components: {
        'app-authorization': UserAuthorization,
        'app-registration': UserRegistration
    },
    data() {
        return {
            openModalAuthorization: false,
            openModalRegistration: false,            
        };
    },
    computed: {
        ...mapGetters(['getUser'])
    },
    methods: {
        handlerAuthorization() {
            this.openModalAuthorization = true;
        },
        handlerRegistration() {
            this.openModalRegistration = true;
        },
        closeModalAuthorization() {
            this.openModalAuthorization = false;
        },
        closeModalRegistration() {
            this.openModalRegistration = false;
        }
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
