<template>
    <div class="shop-entry">
        <h2>ショップ登録</h2>
        <div v-if="shop.image">
            <img class="preview-image" :src="shop.image" alt="" />
        </div>
        <div class="entry-input-row">
            <span class="entry-label">画像</span><input v-if="reset" @change="upload" type="file" />
        </div>
        <div class="entry-input-row">
            <span class="entry-label">店名</span><input type="text" v-model="shop.shopName" />
        </div>
        <div class="entry-input-row">
            <span class="entry-label">店舗紹介</span><textarea v-model="shop.description" rows="5"></textarea>
        </div>
        <div>
            <button class="entry-btn" @click="entryShop()">登録</button>
        </div>
        <div class="message">
            <div v-if="entryDocId">
                FireStoreにDocId：{{ entryDocId }}で登録しました
            </div>
            <div v-if="errorMessage">エラーメッセージ：{{ errorMessage }}</div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import firebase from '@/plugins/firebase'

export default Vue.extend({
    data: () => ({
        shop: {
            shopName: '',
            image: '',
            description: '',
        },
        entryDocId: '',
        errorMessage: '',
        reset: true,
    }),
    methods: {
        entryShop() {
            this.errorMessage = ''
            if(!this.shop.shopName || !this.shop.description) {
                this.errorMessage = '店名と店舗紹介は必須です'
                return
            }

            const db = firebase.firestore()
            const dbShops = db.collection('shops')
            dbShops
                .add({
                    shopName: this.shop.shopName,
                    description: this.shop.description,
                    image: this.shop.image,
                })
                .then((ref) => {
                    this.entryDocId = ref.id
                    this.shop.shopName = ''
                    this.shop.description = ''
                    this.shop.image = ''

                    this.inputFileReset()
                })
                .catch((err) => {
                    this.errorMessage = err
                })
        },
        upload(e: any){
            const file = e.target.files[0]

            if(!file.type.includes('image')) {
                this.errorMessage = '画像を指定してください'
                this.inputFileReset()
                return
            }
            const storageRef = firebase.storage().ref(file.name)
            storageRef.put(file).then(() => {
                firebase
                    .storage()
                    .ref(file.name)
                    .getDownloadURL()
                    .then((url) =>{
                        this.shop.image = url
                    })
                    .catch((err) => {
                        this.errorMessage = err
                    })
            })
        },
        inputFileReset() {
            this.reset = false
            this.$nextTick(function() {
                this.reset = true
            })
        },
    },
})
</script>

<style>
h2 {
    margin-bottom: 20px;
}

.shop-entry {
    width: 600px;
    padding: 16px;
    margin: auto;
    margin-top: 16px;
    margin-bottom: 16px;
    box-shadow: 1px 1px 4px 1px rgb(218, 218, 218);
    color: #333;
}

.preview-image {
    width: 100%;
    height: 300px;
    object-fit: cover;
}

.entry-input-row {
    padding: 12px;
}

.entry-label {
    width: 100px;
    display: inline-block;
    vertical-align: top;
}

input[type='text'] {
    width: 400px;
    font-size: 18px;
}

textarea {
    width: 400px;
    font-size: 18px;
}

.entry-btn {
    width: 200px;
    font-size: 18px;
    border-radius: 30px;
    padding: 4px;
    display: block;
    margin: auto;
    margin-top: 32px;
    cursor: pointer;
    color: white;
    background-color:  cornflowerblue;
    border: 0px;
}

.message {
    margin: 12px;
    padding: 12px;
}
</style>