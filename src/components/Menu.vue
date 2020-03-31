<template>
    <div class="wrapper">
        <ul class="menu">
            <li><router-link :to="{name: 'index'}" class="link-menu">Главная</router-link></li>
            <li><router-link :to="{name: 'article'}" class="link-menu">Статья</router-link></li>
        </ul>
        <app-authorization></app-authorization>
    </div>
</template>

<script>
import Authorization from './Authorization.vue'

export default {
    components: {
        'app-authorization': Authorization
    }
}
</script>

<style scoped>
.menu .router-link-exact-active {
    background-color: var(--color-accent);
}
.wrapper {
    justify-content: space-between;
    align-items: center;
    background-color: var(--color-light);
}
.menu {
    display: flex;
    margin: 0;
    padding: 0;
    list-style-type: none;
    margin-left: var(--margin-menu);
}
.link-menu {
    padding: 10px 15px;
    margin: 5px;
    border-radius: 3px;
    color: black;
    text-decoration: none;
}
</style>
