<template>
  <div @wheel="wheel">
    <div class="product">
      <div class="product_container container">
        <div class="product__left">
          <p class="product__title">{{ title }}</p>
          <p class="product__descriptoin">{{ descriptoin }}</p>
          <p class="product__sub-title">{{ subTitle }}</p>
          <ul class="product__item">
            <li class="product__list" v-for="(item, index) in items" :key="item.id">
              <img :src="item.img" alt />
              <span class="number">{{index + 1}}.</span>
              <span>{{item.text}}</span>
            </li>
          </ul>
          <router-link class="arrow" :to="{name: 'Recipes'}">
            <button class="product__btn">Вкусные рецепты с MacChocolate</button>
          </router-link>
        </div>
        <div class="arrow-block">
          <div class="arrow-slide arrow-slide_left" @click="arrowLeft">
            <i class="fas fa-angle-left"></i>
          </div>
          <div class="arrow-slide arrow-slide_right" @click="arrowRight">
            <i class="fas fa-angle-right"></i>
          </div>
        </div>
        <div class="product__right">
          <div class="product__big-photo">
            <transition
              name="showAnimat"
              enter-active-class="animated fadeIn"
              leave-active-class="animated fadeOut"
            >
              <img :src="newBigSrc" alt key="sucess1" v-if="show" />
              <img :src="bigSrc" alt key="sucess2" v-else />
            </transition>
            <p class="title">{{ bigPhotoTitle }}</p>
            <p class="title_description">{{ bigPhotoDescription }}</p>
          </div>
          <div class="product__photo_container">
            <div
              class="product__smal-photo"
              v-for="(photo, index) in photos"
              :key="photo.id"
              @click="activSlide($event, photo, index)"
              ref="oneSlide"
            >
              <img :src="photo.img" alt />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="container">
        <router-link class="arrow" :to="{name: 'Recipes'}">
          <img src="@/img/Union.png" alt />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VueAxios from "vue-axios";

export default {
  name: "PageTwo",
  data: () => ({
    title: null,
    descriptoin: null,
    subTitle: null,
    bigSrc: "",
    newBigSrc: "",
    bigPhotoTitle: "",
    bigPhotoDescription: "",
    slideIndex: 0,
    show: true,
    items: [],
    photos: []
  }),
  mounted: function() {
    axios
      .get("http://chocolate-cms.loc.jet5.ru/api/api_two/")
      .then(response => {
        this.title = response.data.title;
        this.descriptoin = response.data.descriptoin;
        this.subTitle = response.data.subTitle;
        this.items = response.data.items;
        this.photos = response.data.photos;
        
        setTimeout(() => {
          this.$refs.oneSlide[0].classList.add("active");
          this.newBigSrc = this.photos[0].img;
          this.bigPhotoTitle = this.photos[0].textTop;
          this.bigPhotoDescription = this.photos[0].textTitle;
        }, 0);
      });
  },
  methods: {
    wheel(ev) {
      if (ev.deltaY > 0) {
        setTimeout(() => {
          this.$router.push("/Recipes");
        }, 0);
      }
      if (ev.deltaY < 0) {
        setTimeout(() => {
          this.$router.push("/One");
        }, 0);
      }
    },
    activSlide: function(a, b, c) {
      for (let i = 0; i < this.$refs.oneSlide.length; i++) {
        this.$refs.oneSlide[i].classList.remove("active");
      }
      a.srcElement.parentElement.classList.add("active");
      this.show = false;
      this.newBigSrc = this.bigSrc;
      this.slideIndex = c;
      this.newBigSrc = b.img;
      this.bigPhotoTitle = b.textTop;
      this.bigPhotoDescription = b.textTitle;
      setTimeout(() => {
        this.show = true;
      }, 0);
    },
    arrowLeft: function() {
      let sl = this.slideIndex;
      if (this.slideIndex == 0) {
        sl = this.photos.length - 1;
      } else {
        sl = this.slideIndex - 1;
      }
      for (let i = 0; i < this.$refs.oneSlide.length; i++) {
        this.$refs.oneSlide[i].classList.remove("active");
      }
      this.show = false;
      this.newBigSrc = this.bigSrc;
      this.$refs.oneSlide[sl].classList.add("active");
      this.slideIndex = sl;
      this.newBigSrc = this.photos[sl].img;
      this.bigPhotoTitle = this.photos[sl].textTop;
      this.bigPhotoDescription = this.photos[sl].textTitle;
      setTimeout(() => {
        this.show = true;
      }, 0);
    },
    arrowRight: function() {
      let sl = this.slideIndex;
      if (this.slideIndex == this.photos.length - 1) {
        sl = 0;
      } else {
        sl = this.slideIndex + 1;
      }
      for (let i = 0; i < this.$refs.oneSlide.length; i++) {
        this.$refs.oneSlide[i].classList.remove("active");
      }
      this.show = false;
      this.newBigSrc = this.bigSrc;
      this.$refs.oneSlide[sl].classList.add("active");
      this.slideIndex = sl;
      this.newBigSrc = this.photos[sl].img;
      this.bigPhotoTitle = this.photos[sl].textTop;
      this.bigPhotoDescription = this.photos[sl].textTitle;
      setTimeout(() => {
        this.show = true;
      }, 0);
    }
  }
};
</script>