<template>
    <div @wheel="wheel">
        <div class="news">
            <div class="container">
                <h2 class="news__title">
                    {{title}}
                </h2>
            </div>      
            <div class="swiper-container--news">
                <div class="news__cart_container swiper-wrapper">
                    <div 
                        class="news__cart swiper-slide" 
                        v-for="(item, index) in news" 
                        :key="item.id"
                        ref="newsCart"
                        @click="popapInfoCard(item.imges, item.title, item.text, index)"
                    >
                        <div class="news__cart__img_block">
                            <img :src="item.imges" alt="" class="news__cart__img">
                        </div>
                        <h3 class="news__cart__header">{{item.title}}</h3>
                        <p class="news__cart__data">{{item.date}}</p>
                    </div> 
                </div>
                <div class="arrow-block arrow-block--news">
                    <div class="swiper-button-prev arrow-slide arrow-slide_left"> <i class="fas fa-angle-left"></i></div>
                    <div class="swiper-button-next arrow-slide arrow-slide_right"><i class="fas fa-angle-right"></i></div>
                </div>
            </div>
        </div>
        <transition
            name="showAnimat"                         
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
        >
            <div class="new_popap" v-if="popapShow">
                <div class="new_popap__bg" @click="popapShow = false"></div>    
                <div class="new_popap__container">
                    <div class="new_closed" @click="popapShow = false">
                        <i class="fas fa-times"></i>
                    </div>
                    <h2 class="new_popap__head" v-html="headPopap"></h2>
                    <div class="new_popap__info">
                        <img :src="imgPopap" alt="">
                        <div class="new_popap__text" v-html="textPopap"></div>
                    </div>
                    <div class="new_popap__line"></div>
                    <div class="new_popap__btn_container">
                        <button class="new_popap__btn new_popap__btn--left" @click="leftNews"><i class="fas fa-angle-left"></i><span>Предыдущая новость</span></button>
                        <button class="new_popap__btn new_popap__btn--right" @click="rightNews"><span>Следующая новость</span><i class="fas fa-angle-right"></i></button>
                    </div>
                </div>
            </div>
        </transition>
        <div class="footer">
            <div class="container">
                <router-link class="arrow" :to="{name: 'Prelast'}">
                    <img src="@/img/Union.png" alt="">
                </router-link>
            </div>      
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import VueAxios from 'vue-axios'
import Swiper from 'swiper'
import 'swiper/js/swiper.js'

export default {
    name: "PageNews",
    data: () => ({
        title: 'Новости',
        news: [],
        popapShow: false,
        textPopap: '',
        headPopap: '',
        imgPopap: '',
        swiper: null,
        indexNews: 0
    }),
    mounted: function () {
        axios
            .get('http://chocolate-cms.loc.jet5.ru/api/api_news/')
            .then(response => {
                this.news = response.data.news
                
                setTimeout(() => {
                    var swiperNews = new Swiper('.swiper-container--news', {
                        slidesPerView: 'auto',
                        centeredSlides: true,
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                    });
                }, 1000);
            })

        let transformSize = 0

        

        // this.$refs.right.addEventListener('click', function() {
        //     let widthCart = document.querySelector('.news__cart').offsetWidth
        //     if (document.querySelector('.news__cart_container').offsetWidth > transformSize * -1 + widthCart*3) {
        //         transformSize -= widthCart
        //     }            
        //     document.querySelector('.news__cart_container').style.transform = 'translateX('+ transformSize +'px)'
        // })

        // this.$refs.left.addEventListener('click', function() {
        //     let widthCart = document.querySelector('.news__cart').offsetWidth
        //     if (transformSize <= -10) {
        //         transformSize += widthCart
        //     }            
        //     document.querySelector('.news__cart_container').style.transform = 'translateX('+ transformSize +'px)'
        // })
    },
    methods: {   
        wheel(ev) {
            if (!this.popapShow) {
                if (ev.deltaY > 0) {                    
                    setTimeout(() => {
                        this.$router.push('/Prelast');
                    }, 0);
                }
                if (ev.deltaY < 0) {
                    setTimeout(() => {
                        this.$router.push('/Recipes');
                    }, 0);
                }
            }            
        },
        popapInfoCard(a, b, c, i) {
            this.indexNews = i
            this.popapShow = true
            this.headPopap = b
            this.textPopap = c
            setTimeout(() => {                
                document.querySelector('.new_popap__info img').setAttribute('src', a);
            }, 0);
        },
        leftNews() {
            if (this.indexNews <= 0) {
                this.indexNews = this.news.length - 1
            } else {
                this.indexNews = this.indexNews - 1
            }
            this.headPopap = this.news[this.indexNews].title
            this.textPopap = this.news[this.indexNews].text
            setTimeout(() => {   
                document.querySelector('.new_popap__info img').setAttribute('src', this.news[this.indexNews].imges);
            }, 0);
        },
        rightNews() {
            if (this.indexNews >= this.news.length - 1) {
                this.indexNews = 0
            } else {
                this.indexNews = this.indexNews + 1
            }
            this.headPopap = this.news[this.indexNews].title
            this.textPopap = this.news[this.indexNews].text
            setTimeout(() => {   
                document.querySelector('.new_popap__info img').setAttribute('src', this.news[this.indexNews].imges);
            }, 0);
        }
    },
}
</script>