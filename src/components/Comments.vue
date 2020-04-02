<template>
    <div class="comments-wrapper">
        <h2>Комментарии</h2>

        <div class="comments-container" v-for="(item, i) in commentsContent" :key="i">
            <p class="comments-user">{{item.user}}</p>
            <p class="comments-date">{{item.date}}</p>
            <p class="comments-text">{{item.text}}</p>
        </div>

        <app-error-api v-if="articleError" />
    </div>
</template>

<script>
import ErrorApi from './ErrorApi.vue';
import { fetchComment } from '../api/articleService';

export default {
    components: {
        'app-error-api': ErrorApi
    },
    data() {
        return {
            commentsContent: [],
            articleError: false,
        };
    },
    created() {
        fetchComment()
            .then(res => res.json())
            .then(data => this.commentsContent = data)
            .catch(error => this.articleError = true)
    }
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
    text-align: center;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: flex-end;
}
.comments-date {
    grid-area: date;
    text-align: center;
    font-size: 12px;
    color: var(--color-dark);
}
.comments-text {
    grid-area: text;
    padding: 20px;
}
</style>
