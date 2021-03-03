<template>
    <div>
        名前：<input type="text" v-model="user.name" />
        <br />
        自己紹介：<input type="text" v-model="user.description" /><br /><br />
        <button @click="moveConfirmPage()">確認画面へ</button>
        <br /><br />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { userStore } from '~/store'

export default Vue.extend({
    data: () => ({
        user: {
            name: '',
            description: '',
        },
    }),
    methods: {
        moveConfirmPage() {
            userStore.create(this.user)
            this.$router.push('/user/confirm')
        },
    },
})
</script>

<style></style>
