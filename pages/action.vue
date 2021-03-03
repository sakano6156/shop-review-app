<template>
    <div>
        <div class="container">{{ name }}{{ world }}</div>
        <button @click="changeTextHello()">{{ btnNameHello }}</button>
        <button @click="changeTextBye()">{{ btnNameBye }}</button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    data: () => ({
        name: 'こんにちは',
        world: '世界',
        btnNameHello: 'こんにちは',
        btnNameBye: 'さようなら',
    }),
    methods: {
        changeTextHello() {
            this.name = 'こんにちは'
        },
        changeTextBye() {
            this.name = 'さようなら'
        }
    },
})
</script>

<style></style>
