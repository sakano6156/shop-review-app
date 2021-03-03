<template>
    <div>
        <input type="text" v-model="newMessage" />
        <br /><br />
        <button @click="addMessage()">追加</button>
        <button @click="deleteMessage()">古い順に削除</button>
        <br /><br />
      <div v-for="message in messages" :key="message.index">
          {{ message }}
      </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    data: () => ({
        newMessage: '',
        messages: [] as any,
    }),
    methods: {
        addMessage() {
            this.messages.push(this.newMessage),
            this.newMessage = ''
        },
        deleteMessage() {
            if(this.messages.length > 0) {
                this.messages.splice(0, 1)
            }
        },
    },
})
</script>

<style></style>
