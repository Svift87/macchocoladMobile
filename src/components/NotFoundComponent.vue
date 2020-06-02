<template>
    <div class="page404">
        <p class="page404__name">404</p>
        <p class="page404__text">Похоже, запрашииваемая вами страница не найдена</p>
        <div class="page404__link_container">
            <router-link class="arrow" :to="{name: menu_url}">
              <button @click="show = false" class="header__btn__nav">{{menu_name}}</button>
            </router-link>
            <router-link class="arrow" v-for="(value, index) in burger_name" :key="value.id" :to="{name: burger_url[index]}">
                <button @click="show = false" class="header__btn__nav">{{value}}</button>
            </router-link>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import VueAxios from 'vue-axios'

export default {
    data: () => ({
        menu_name: null,
        menu_url: null,
        burger_name: null,
        burger_url: null,
    }),
    mounted: function () {
        axios
        .get('http://chocolate-cms.loc.jet5.ru/api/api_burger_menu/')
        .then(response => {
            this.menu_name = response.data.menu_name[0]
            this.menu_url = response.data.menu_url
            this.burger_name = response.data.burger_name
            this.burger_url = response.data.burger_url
        })
    }
    
}
</script>