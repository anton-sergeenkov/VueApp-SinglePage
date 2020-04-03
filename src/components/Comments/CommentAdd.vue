<template>
    <div>
        <ui-button
            v-if="getUser.authorized"
            class="btn-comment-new"
            @click.native="handlerCommentAdd"
            label="Новый комментарий"
            theme="primary"
        />

        <div v-if="showForm">
            <ui-input
                class="input-comment"
                v-model="inputComment"
                label="Текст комментария*"
                multiline
            />
            <ui-button
                class="btn-comment-add"
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
