<template>  
  <div id="app">
    <div style="display: none" class="sizePage" :data-number="sizePage"></div>
    <transition
        name="showAnimat"                         
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
    >
      <div class="preloader">
        <img class="preloader__img" src="@/img/logo.png" alt="">
        <div class="preloader__line">
          <div class="preloader__line__active"></div>
        </div>
        <div style="position: absolute; opacity: 0" v-for="img in images" :key="img.id">
          <img :src="img.imgPreload" alt="">
        </div>
      </div>
    </transition>
    <div class="header">
      <transition 
          name="showAnimat" 
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
      >
        <div class="background_menu" v-if="show" @click="show = false"></div>
      </transition>
      <div class="container">
        <div class="header__left">
          <a class="header__logo_container" href="/">
            <img src="@/img/logo.png" alt="" class="header__logo">
          </a>
          <div class="header__select_block">
            <div class="header__select" @click="showLang = !showLang" :class="{ clouse: !showLang }"><span class="name_lang">Ru</span> <span class="icon_lang"><i class="fas fa-angle-down"></i></span></div>
            <transition
              name="showAnimat" 
              enter-active-class="animated fadeIn"
              leave-active-class="animated fadeOut"
            >
              <div class="header__select__group" v-if="showLang">
                <div class="header__select" @click="newLang('English')">English</div>
                <div class="header__select" @click="newLang('Global')">Global</div>
              </div>              
            </transition>
          </div>
        </div>
        <div class="header__right">
          <div class="header__btn__nav_container" >
            <router-link class="arrow" :to="{name: menu_url}">
              <button @click="show = false" class="header__btn__nav">{{menu_name}}</button>
            </router-link>
            
            <transition
              name="showAnimat" 
              enter-active-class="animated fadeIn"
              leave-active-class="animated fadeOut"
            >
              <div class="header__btn__nav_block" v-if="show">
                <router-link class="arrow" v-for="(value, index) in burger_name" :key="value.id" :to="{name: burger_url[index]}">
                  <button @click="show = false" class="header__btn__nav">{{value}}</button>
                </router-link>
              </div>
            </transition>
          </div>                
          <div class="burger" @click="show = !show" :class="{ open: show }">
            <span class="burger__line"></span>
            <span class="burger__line burger__line--hidden"></span>
            <span class="burger__line"></span>
          </div>
        </div>
      </div>        
    </div>
    <div @wheel="wheel">
      <transition
        :name="animatSlide" mode="out-in"
      >
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>   
  </div>  
</template>

<script>
import axios from 'axios'
import VueAxios from 'vue-axios'

export default {  
  name: 'App',
  data: () => ({
    show: false,
    preload: true,
    showLang: false,
    menu_name: null,
    menu_url: null,
    burger_name: null,
    burger_url: null,
    sizePage: 0,
    images: [
      {
        imgPreload: require('@/img/c1(1).png')
      },
      {
        imgPreload: require('@/img/c1.png')
      },
      {
        imgPreload: require('@/img/c3.png')
      },
      {
        imgPreload: require('@/img/Depositphotos_7234343_ds.jpg')
      },
      {
        imgPreload: require('@/img/Depositphotos_89894700_xl-2015.jpg')
      },
      {
        imgPreload: require('@/img/Group 4.png')
      },
      {
        imgPreload: require('@/img/Group 47.png')
      },
      {
        imgPreload: require('@/img/Hand.png')
      },
      {
        imgPreload: require('@/img/image 7.png')
      },
      {
        imgPreload: require('@/img/image1.png')
      },
      {
        imgPreload: require('@/img/image2.png')
      },
      {
        imgPreload: require('@/img/image3.png')
      },
      {
        imgPreload: require('@/img/image4.png')
      },
      {
        imgPreload: require('@/img/Rectangle 5(1).png')
      },
      {
        imgPreload: require('@/img/Rectangle 5.png')
      },
      {
        imgPreload: require('@/img/Rectangle 28.png')
      },
      {
        imgPreload: require('@/img/Rectangle1.png')
      },
      {
        imgPreload: require('@/img/Rectangle2.png')
      },
      {
        imgPreload: require('@/img/Rectangle3.png')
      },
      {
        imgPreload: require('@/img/Rectangle4.png')
      },
      {
        imgPreload: require('@/img/logo.png')
      }
    ],
    animatSlide: 'fadeTop'
  }),
  created: function () {        
    setTimeout(() => {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        this.$router.push('/Mobile')
        document.querySelector('.header').remove()
      }
    }, 0);
  },
  mounted: function () {
    this.sizePage = document.body.offsetHeight / 900    

    document.querySelector('html').style.fontSize = this.sizePage + 'px'

    // запрос данных
    axios
      .get('http://chocolate-cms.loc.jet5.ru/api/api_burger_menu/')
      .then(response => {
        this.menu_name = response.data.menu_name[0]
        this.menu_url = response.data.menu_url
        this.burger_name = response.data.burger_name
        this.burger_url = response.data.burger_url
      })
      
    var preloader    = document.querySelector('.preloader'), // селектор прелоадера
        imagesCount  = document.querySelectorAll('img').length, // количество изображений
        percent      = 100 / imagesCount, // количество % на одну картинку
        progress     = 0, // точка отсчета
        loadedImg    = 0; // счетчик загрузки картинок

    this.widthActive = loadedImg

    if (imagesCount > 0) {
      for (var i = 0; i < imagesCount; i++) { // создаем клоны изображений
        var img_copy        = new Image();
        img_copy.src        = document.images[i].src;
        img_copy.onload     = img_load;
        img_copy.onerror    = img_load;
      }

      function img_load () {
        progress += percent;
        loadedImg++;
        if (progress >= 100 || loadedImg == imagesCount) {
            document.querySelector('.preloader').remove()
        }
        document.querySelector('.preloader__line__active').style.width = progress + '%'
      }
    } else {
      document.querySelector('.preloader').remove()
    }
  },
  methods: { 
    wheel (ev) {
      if (ev.deltaY > 0) {
        this.animatSlide = 'fadeTop'
      }
      if (ev.deltaY < 0) {
        this.animatSlide = 'fadeBottom'
      }      
    },
    newLang (e) {
      console.log(e)
      // document.querySelector('.name_lang').textContent
      // document.querySelector('.name_lang').textContent = e
    }
  }
}
</script>
