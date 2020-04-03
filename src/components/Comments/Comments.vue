<template>
    <div class="comments-wrapper">
        <h2>Комментарии</h2>

        <div class="comments-container" v-for="(item, i) in getComments" :key="i">
            <p class="comments-user">{{item.user}}</p>
            <p class="comments-date">{{item.date}}</p>
            <p class="comments-text">{{item.text}}</p>
        </div>

        <app-error-api v-if="articleError" />

        <app-comment-add />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { fetchComment } from '../../api/articleService';
import ErrorApi from '../ErrorApi.vue';
import CommentAdd from './CommentAdd.vue';

export default {
    components: {
        'app-error-api': ErrorApi,
        'app-comment-add': CommentAdd,
    },
    computed: {
        ...mapGetters(['getComments'])
    },
    methods: {
        ...mapActions(['setComments'])
    },
    data() {
        return {
            articleError: false,
        };
    },
    created() {
        fetchComment()
            .then(res => res.json())
            .then(data => this.setComments(data))
            .catch(error => this.articleError = true)
    },
}
</script>

<style scoped>
.comments-wrapper {
    margin-top: 10px;
}
.comments-container {
    display: grid;
    grid-template-columns: 200px 1fr;
    grid-column-gap: 20px;
    grid-template-areas: 
        "user text"
        "date text";
    margin-top: 20px;
	box-shadow: var(--box-shadow);
}
.comments-user {
    grid-area: user;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    text-align: center;
    font-weight: bold;
}
.comments-date {
    grid-area: date;
    font-size: 12px;
    text-align: center;
    color: var(--color-dark);
}
.comments-text {
    grid-area: text;
    padding: 20px;
}
</style>
