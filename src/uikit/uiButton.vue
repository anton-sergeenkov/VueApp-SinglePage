<template>
    <button :class="classes" class="button" v-html="label"></button>
</template>

<script>
export default {
    props: {
        label: { type: String },
        theme: { type: String, default: 'secondary' },
        block: { type: Boolean }
    },
    computed: {
        classes() {
            return {
                ['button--'+this.theme]: true,
                ['button--block']: this.block
            };
        }
    }
}
</script>

<style scoped>
.button {
    --color-primary: #8d6bd5;
    --color-secondary: #9c9c9c;
}
.button {
    display: block;
    padding: 10px 15px;
    border: none;
    outline: none;
    background: none;
    color: #000;
    font-family: inherit;
    text-decoration: none;
    cursor: pointer;
    transition: 0.4s;

    font-size: 14px;
}
.button:hover {
    opacity: 0.9;
}
.button--primary, .button--secondary {
    border-radius: 3px;
    font-weight: bold;
}

.button--block {
    width: 100%;
}
.button--primary {
    border: 2px solid var(--color-primary);
    color: var(--color-primary);
    background-color: #fff;
}
.button--secondary {
    border: 2px solid var(--color-secondary);
    color: var(--color-secondary);
    background-color: #fff;
}
.button--flat {
    color: #000;
    background-color: #fff;
}
</style>
