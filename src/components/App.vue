<template>
    <div>
        <app-menu></app-menu>
        <router-view></router-view>
    </div>
</template>

<script>
import Menu from './Menu.vue';

export default {
    components: {
        'app-menu': Menu
    }
}
</script>

<style>
:root {
    --color-light:       #eee;
    --color-accent:      #ffda4a;
    --color-accent-dark: #e9c057;
    --color-medium:      #4b778e;
    --color-dark:        #304a58;
    --font-small:        14px;
    --font-main:         16px;
    --font-h1:           23px;
    --font-h2:           21px;
    --margin-menu:       50px;
}
::-webkit-scrollbar       { width: 7px; height: 7px;}
::-webkit-scrollbar-thumb { height: 50px; background-color: var(--color-medium); border-radius: 2px;}
::-webkit-scrollbar-track { background-color: var(--color-light); }
* {
    box-sizing: border-box;
}
body {
    margin: 0;
    padding: 0;
    font-size: var(--font-main);
    font-family: sans-serif;
    line-height: 1.5;
}
.wrapper {
    max-width: 1920px;
    margin: auto;
    display: flex;
    padding: 30px;
    flex-wrap: wrap;
}
h1 {
    color: var(--color-dark);
    font-size: var(--font-h1);
}
h2 {
    font-weight: normal;
    color: var(--color-dark);
    font-size: var(--font-h2);
}
h3 {
    color: var(--color-dark);
    font-size: var(--font-main);
    margin: 5px 0;
}
</style>