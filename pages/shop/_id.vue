<template>
    <div class="shop-detail">
        <nuxt-link to="/shop/">
            <button class="back-btn">戻る</button>
        </nuxt-link>
        <div>
            <img class="preview-image" :src="shop.image" alt="" />
        </div>
        <div class="detail-name">
            {{ shop.shopName }}
        </div>
        <div class="detail-score">
            <StarRating
                v-model="shop.score"
                :star-size="StarRatingConfig.starSize"
                :read-only="StarRatingConfig.readOnly"
            />
        </div>
        <div class="detail-description">
            {{ shop.description }}
        </div>
        <br />
        <hr />
        <h3>レビュー</h3>
        <div class="shop-review">
            {{ shop.review }}
        </div>
        <div v-if="!showReviewInput">
            <button @click="showReviewInput = !showReviewInput" class="review-btn">
                レビューする
            </button> 
        </div>
        <div v-if="showReviewInput">
            <div class="shop-score">
                <StarRating v-model="newScore" :star-size="StarRatingConfig.starSize" />
            </div>
            <div>
                <textarea class="textarea" v-model="newReview" rows="5"></textarea>
            </div>
            <div>
                <button @click="review()" class="review-btn">レビューを投稿</button> 
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import firebase from '@/plugins/firebase'
import StarRating from 'vue-star-rating'

export default Vue.extend({
    components: {
        StarRating,
    },
    data: () => ({
        shop: {
            shopName: '',
            image: '',
            score: 0,
            description: '',
            review: '',
        },
        entryDocId: '',
        errorMessage: '',
        reset: true,
        newScore: 0,
        newReview: '',
        showReviewInput: false,
        StarRatingConfig: {
            starSize: 30,
            readOnly: true,
        },
    }),
    head() {
        return {
            title: this.shop.shopName,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: this.shop.description,
                },
            ],
        }
    },
    created() {
        const db = firebase.firestore()
        const dbShop = db.collection('shops').doc(this.$route.params.id)

        dbShop.get().then((doc) => {
            const data = doc.data()!
            this.shop.image = data.image ? data.image : '/no-image.png'
            this.shop.shopName = data.shopName ? data.shopName : ''
            this.shop.score = data.score ? data.score : 0
            this.shop.description = data.description ? data.description : ''
            this.shop.review = data.review ? data.review : 'レビューはまだありません'
        })
    },
    methods: {
        review() {
            const db = firebase.firestore()
            const dbShop = db.collection('shops').doc(this.$route.params.id)

            dbShop
                .update({
                    score: this. newScore,
                    review: this.newReview,
                })
                .then(() => {
                    location.reload()
                })
        },
    },
})
</script>

<style>
h3 {
    margin-top: 20px;
    margin-bottom: 20px;
}

.back-btn {
    font-size: 18px;
    background: white;
    border: 0px;
    margin-bottom: 12px;
    cursor: pointer;
}

.shop-detail {
    width: 600px;
    padding: 16px;
    margin: auto;
    margin-top: 16px;
    margin-bottom: 16px;
    color: #333;
}

.preview-image {
    width: 100%;
    height: 300px;
    object-fit: cover;
}

.detail-name {
    font-weight: bold;
    font-size: 24px;
}

.detail-score {
    float: right;
}

.detail-description {
    font-size: 18px !important;
    margin-top: 32px !important;
}

textarea {
    width: 100%;
    font-size: 18px;
    margin-top: 24px;
}

.textarea {
    width: 100%;
    font-size: 18px;
    margin-top: 24px;
}

.review-btn {
    width: 200px;
    font-size: 18px;
    border-radius: 30px;
    padding: 4px;
    display: block;
    margin: auto;
    margin-top: 32px;
    cursor: pointer;
    color: white;
    background-color: lightcoral;
    border: 0px;
}

</style>