<template>
    <div @wheel="wheel">
        <div class="prelast">
            <div class="container">
                <div class="prelast__card_container" v-for="(info, index) in information" :key="info.id"  @click="popapActive(index)">
                    <h2 class="prelast__title">{{info.title}}</h2>
                    <p class="prelast__text">{{info.cardText}}</p>
                    <div class="arrow-prelast"><i class="fas fa-angle-right"></i></div>
                    <img :src="info.img" alt="" class="prelast__img">
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
                        <button class="new_popap__btn new_popap__btn--left" @click="leftRecipes"><i class="fas fa-angle-left"></i><span>{{prePopap}}</span></button>
                        <button class="new_popap__btn new_popap__btn--right" @click="rightRecipes"><span>{{lastPopap}}</span><i class="fas fa-angle-right"></i></button>
                    </div>
                </div>
            </div>
        </transition>
        <div class="footer">
            <div class="container">
                <router-link class="arrow" :to="{name: 'Score'}">
                    <img src="@/img/Union.png" alt="">
                </router-link>
            </div>      
        </div>
    </div>
</template>

<script>
import axios from "axios";
import VueAxios from "vue-axios";

export default {
    name: "PagePrelast",
    data: () => ({
        information: [],
        popapShow: false,
        headPopap: '',
        textPopap: '',
        imgPopap: '',
        prePopap: '',
        lastPopap: '',
        indexInformation: 0
    }),
    mounted: function () {
        axios
            .get("http://chocolate-cms.loc.jet5.ru/api/api_prelast/")
            .then(response => {
                this.information = response.data.information
            })
    },
    methods: {   
        wheel(ev) {
            if (!this.popapShow) {
                if (ev.deltaY > 0) {
                    setTimeout(() => {
                        this.$router.push('/Score');
                    }, 0);
                }
                if (ev.deltaY < 0) {
                    setTimeout(() => {
                        this.$router.push('/News');
                    }, 0);
                }
            }            
        },
        popapActive(i) {
            this.indexInformation = i
            this.popapShow = true
            if (this.indexInformation <= 0) {
                this.prePopap = this.information[this.information.length - 1].title
            } else {
                this.prePopap = this.information[this.indexInformation - 1].title
            }
            if (this.indexInformation >= this.information.length - 1) {
                this.lastPopap = this.information[0].title
            } else {
                this.lastPopap = this.information[this.indexInformation + 1].title
            }            

            this.headPopap = this.information[this.indexInformation].title
            this.textPopap = this.information[this.indexInformation].textPopap
            setTimeout(() => {                
                this.imgPopap = this.information[this.indexInformation].imgPopap
            }, 0);
        },
        leftRecipes() {
            if (this.indexInformation <= 0) {
                this.indexInformation = this.information.length - 1
            } else {
                this.indexInformation = this.indexInformation - 1
            }

            if (this.indexInformation <= 0) {
                this.prePopap = this.information[this.information.length - 1].title
            } else {
                this.prePopap = this.information[this.indexInformation - 1].title
            }

            if (this.indexInformation >= this.information.length - 1) {
                this.lastPopap = this.information[0].title
            } else {
                this.lastPopap = this.information[this.indexInformation + 1].title
            } 

            this.headPopap = this.information[this.indexInformation].title
            this.textPopap = this.information[this.indexInformation].textPopap
            setTimeout(() => {   
                this.imgPopap = this.information[this.indexInformation].imgPopap;
            }, 0);
        },
        rightRecipes() {
            if (this.indexInformation >= this.information.length - 1) {
                this.indexInformation = 0
            } else {
                this.indexInformation = this.indexInformation + 1
            }

            if (this.indexInformation <= 0) {
                this.prePopap = this.information[this.information.length - 1].title
            } else {
                this.prePopap = this.information[this.indexInformation - 1].title
            }

            if (this.indexInformation >= this.information.length - 1) {
                this.lastPopap = this.information[0].title
            } else {
                this.lastPopap = this.information[this.indexInformation + 1].title
            } 

            this.headPopap = this.information[this.indexInformation].title
            this.textPopap = this.information[this.indexInformation].textPopap
            setTimeout(() => {
                this.imgPopap = this.information[this.indexInformation].imgPopap;
            }, 0);
        }
    },
}
</script>
