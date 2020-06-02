<template>
    <div @wheel="wheel">
        <div class="recipes">
            <div class="container">
                <h2 class="recipes__title">
                    {{title}}
                </h2>
            </div>     
            <div class="swiper-container">
                <div class="recipes__cart_container swiper-wrapper">
                    <div 
                        class="recipes__cart swiper-slide" 
                        v-for="(recip, index) in recipes" 
                        :key="recip.id"
                        ref="recipesCart"
                        @click="popapInfoCard(recip.imges, recip.title, recip.text, index)"
                    >                    
                        <img :src="recip.imges" alt="" class="recipes__cart__background">
                        <!-- <p class="recipes__cart__data">{{recip.date}}</p> -->
                        <h3 class="recipes__cart__header">{{recip.title}}</h3>
                    </div> 
                </div>
                <div class="arrow-block arrow-block--recipes">
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
                        <button class="new_popap__btn new_popap__btn--left" @click="leftRecipes"><i class="fas fa-angle-left"></i><span>Предыдущий рецепт</span></button>
                        <button class="new_popap__btn new_popap__btn--right" @click="rightRecipes"><span>Следующий рецепт</span><i class="fas fa-angle-right"></i></button>
                    </div>
                </div>
            </div>
        </transition>
        <div class="footer">
            <div class="container">
                <router-link class="arrow" :to="{name: 'News'}">
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
    name: "PageRecipes",
    data: () => ({
        title: 'Вкусные рецепты с MacChocolate',
        recipes: [],
        popapShow: false,
        textPopap: '',
        headPopap: '',
        imgPopap: '',
        swiper: null,
        indexRecipes: 0
    }),
    mounted: function () {        
        axios
            .get('http://chocolate-cms.loc.jet5.ru/api/api_recipes/')
            .then(response => {
                this.recipes = response.data.recipes
                
                setTimeout(() => { 
                    var swiper = new Swiper('.swiper-container', {
                        slidesPerView: 'auto',
                        centeredSlides: true,
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                    });             
                }, 0);                
            })

        // this.$refs.cartContainer.style.cssText = 'padding-left:' + (window.innerWidth - document.querySelector('.container').offsetWidth) / 2 + 'px;transform: translateX(0px)'

        let transformSize = 0

         

        // this.$refs.right.addEventListener('click', function() {
        //     let widthCart = document.querySelector('.recipes__cart').offsetWidth
        //     if (document.querySelector('.recipes__cart_container').offsetWidth > transformSize * -1 + widthCart*2.1) {
        //         transformSize -= widthCart
        //     }
            
        //     document.querySelector('.recipes__cart_container').style.transform = 'translateX('+ transformSize +'px)'
        // })

        // this.$refs.left.addEventListener('click', function() {
        //     let widthCart = document.querySelector('.recipes__cart').offsetWidth
        //     if (transformSize <= -10) {
        //         transformSize += widthCart
        //     }            
        //     document.querySelector('.recipes__cart_container').style.transform = 'translateX('+ transformSize +'px)'
        // })
    },
    methods: {   
        wheel(ev) {
            if (!this.popapShow) {
                if (ev.deltaY > 0) {                    
                    setTimeout(() => {
                        this.$router.push('/News');
                    }, 0);
                }
                if (ev.deltaY < 0) {                    
                    setTimeout(() => {
                        this.$router.push('/Two');
                    }, 0);
                }
            }            
        },
        popapInfoCard(a, b, c, i) {
            this.indexRecipes = i
            this.popapShow = true
            this.headPopap = b
            this.textPopap = c
            setTimeout(() => {                
                document.querySelector('.new_popap__info img').setAttribute('src', a);
            }, 0);
        },
        leftRecipes() {
            if (this.indexRecipes <= 0) {
                this.indexRecipes = this.recipes.length - 1
            } else {
                this.indexRecipes = this.indexRecipes - 1
            }
            this.headPopap = this.recipes[this.indexRecipes].title
            this.textPopap = this.recipes[this.indexRecipes].text
            setTimeout(() => {   
                document.querySelector('.new_popap__info img').setAttribute('src', this.recipes[this.indexRecipes].imges);
            }, 0);
        },
        rightRecipes() {
            if (this.indexRecipes >= this.recipes.length - 1) {
                this.indexRecipes = 0
            } else {
                this.indexRecipes = this.indexRecipes + 1
            }
            this.headPopap = this.recipes[this.indexRecipes].title
            this.textPopap = this.recipes[this.indexRecipes].text
            setTimeout(() => {   
                document.querySelector('.new_popap__info img').setAttribute('src', this.recipes[this.indexRecipes].imges);
            }, 0);
        },
        // scrollMaus() {
        //     console.log()
        // }
    },
}
</script>