<template>
    <div>
        <ui-button
            class="btn-comment-new"
            @click.native="handlerCommentAdd"
            label="Новый комментарий"
            theme="primary"
        />

        <ui-input
            class="input-comment"
            v-model="inputName"
            label="Имя пользователя"
        />

        <ui-input
            class="input-comment"
            v-model="inputComment"
            label="Текст комментария"
            multiline
        />

        <ui-button
            class="btn-comment-add"
            @click.native="handlerCommentSubmit"
            label="Добавить комментарий"
            theme="primary"
        />
    </div>
</template>

<script>
import { getCurrentDate } from '../utils/getCurrentDate';

export default {
    data() {
        return {
            inputName: '',
            inputComment: ''
        }
    },
    methods: {
        handlerCommentAdd() {
            alert('handlerCommentAdd');
        },
        handlerCommentSubmit() {
            alert('handlerCommentSubmit');
        },
    }
}
</script>

<style scoped>
.btn-comment-new {
    margin: auto;
    margin-top: 30px;
}
.input-comment {
    margin-top: 30px;
}
.btn-comment-add {
    margin: auto;
    margin-top: 30px;
}
</style>
