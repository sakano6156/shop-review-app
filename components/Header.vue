<template>
    <div class="header">
        <div class="logo-text">
            <nuxt-link to="/shop/">
                Coffee review
            </nuxt-link>
            <span class="sub-title">美味しいコーヒーショップの比較サイト</span>
        </div>
        <div>
            <nuxt-link class="menu" to="/shop/">お店</nuxt-link>
            <nuxt-link class="menu" to="/shop/entry">登録</nuxt-link>
        </div>
    </div>
</template>

<style>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom:  1px solid #cccccc;
}

.logo-text {
    font-family: 'Brush Script MT',cursive;
    font-size: 50px;
    padding: 12px 24px;
}

.sub-title {
    font-size: 18px;
    margin-left: 8px;
}

a {
  color: black;
  text-decoration: none;
}

@media screen and (max-width: 767px) {
    .logo-text {
        font-size: 30px;
    }

    .sub-title {
        display: none;
    }
}

.menu {
    padding: 12px 24px;
    display: inline-block;
}

</style>