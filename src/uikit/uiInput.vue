<template>
    <div class="input-text">
        <input
            @input="$emit('input', $event.target.value)" 
            @focus="onFocus" 
            @blur="onBlur($event.target.value)" 
            :class="classes" 
            class="input"
            :type="type"
        />
        <label :class="{ active:focused }" v-html="label"></label>
    </div>
</template>

<script>
export default {
    data() {
        return {
            focused: false
        }
    },
    props: {
        label: { type: String },
        type:  { type: String, default: 'text' }
    },
    methods: {
        onFocus() {
            this.focused = true;
        },
        onBlur(content) {
            if (content === '') {
                this.focused = false;
            }
        }
    },
    computed: {
        classes() {
            return {
                ['active']: this.focused
            };
        },
    }
}
</script>

<style scoped>
.input-text {
    --color-default: #6e6e6e;
    --color-accent: #4b778e;
}
.input-text {
    position: relative;
    width: 100%;
}
.input {
    position: relative;
    z-index: 1;
    width: 100%; 
    padding: 10px;
    border: none;
    outline: none;
    font-family: inherit;
    font-size: 15px;
    background: none;
    border: 1px solid var(--color-default);
    border-radius: 3px;
}
.input.active {
    border: 1px solid var(--color-accent);
}
label {
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    padding: 10px;
    font-size: 15px;
    color: var(--color-default);
    transition: 0.4s;
}

label.active {
    top: -30px;
    font-size: 12px;
    color: var(--color-accent);
}

input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none; 
    margin: 0; 
}
</style>
