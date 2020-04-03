<template>
    <div>
        <ui-button
            v-if="getUser.authorized"
            class="comment-btn-new"
            @click.native="handlerCommentAdd"
            label="Новый комментарий"
            theme="primary"
        />

        <div v-if="showForm">
            <ui-input
                class="comment-input"
                v-model="inputComment"
                label="Текст комментария*"
                multiline
            />
            <ui-button
                class="comment-btn-add"
                @click.native="handlerCommentSubmit"
                label="Добавить комментарий"
                theme="primary"
            />
        </div>

        <ui-toast v-if="showWarning" theme="error" @close="closeWarning">
            Напишите комментарий
        </ui-toast>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { getCurrentDate } from '../../utils/getCurrentDate';

export default {
    data() {
        return {
            inputComment: '',
            showForm: false,
            showWarning: false
        }
    },
    computed: {
        ...mapGetters(['getComments']),
        ...mapGetters(['getUser'])
    },
    methods: {
        closeWarning() {
            this.showWarning = false;
        },
        handlerCommentAdd() {
            this.showForm = true;
        },
        handlerCommentSubmit() {
            if (this.inputComment) {

                const data = [
                    ...this.getComments,
                    {
                        user: this.getUser.name,
                        date: getCurrentDate(),
                        text: this.inputComment
                    }
                ];

                this.setComments(data);
                this.showForm = false;
            } else {
                this.showWarning = true;
            }
        },
        ...mapActions(['setComments'])
    },
}
</script>

<style scoped>
.comment-btn-new {
    margin: auto;
    margin-top: 30px;
}
.comment-input {
    margin-top: 30px;
}
.comment-btn-add {
    margin: auto;
    margin-top: 30px;
}
</style>
