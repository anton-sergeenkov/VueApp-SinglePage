<template>
    <div class="wrapper">
        <h2>{{articleHeader}}</h2>
        <p v-for="(item, i) in articleContent" :key="i">{{item}}</p>
    </div>
</template>

<script>
import { fetchArticle } from '../api/articleService';

export default {
    data() {
        return {
            articleHeader: null,
            articleContent: [],
        };
    },
    created() {
        fetchArticle()
            .then(res => res.json())
            .then(({ header, content }) => {
                this.articleHeader = header;
                this.articleContent = content;
            });
    }
}
</script>

<style scoped>
p::first-letter {
    font-size: var(--font-h2);
    font-weight: bold;
    color: var(--color-accent-dark);
}
</style>
