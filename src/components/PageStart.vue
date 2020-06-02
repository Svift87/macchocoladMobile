<template>
    <div @wheel="wheel">        
        <div class="starter">
            <div class="starter__video">
                <video  loop="loop" autoplay="autoplay" muted="muted" ref="theVideo" :src="starterScreen.starterVideo">
                    <!-- <source :src="starterScreen.starterVideo" type="video/mp4"> -->
                </video>
            </div>
            <div class="container">
                <h1 class="starter__title" v-html="starterScreen.starterTitle">
                </h1>
                <p class="starter__text" v-html="starterScreen.starterText">
                </p>
                <img :src="starterScreen.starterImage" alt="" class="starter__image">
            </div>
        </div>
        <div class="footer">
            <div class="container">
                <router-link class="arrow" :to="{name: 'One'}">
                    <img src="@/img/Union.png" alt="">
                </router-link>
                <div class="footer__socicon_block">
                    <img class="footer__socicon__img" :src="starterScreen.footerSociconImg" alt="">
                    <a :href="socIcon.textUrl" class="footer__socicon" target="_blank" v-for="socIcon in footerSocicon" :key="socIcon.id">
                        <i :class="socIcon.textClass"></i>
                    </a>
                </div>
            </div>            
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import VueAxios from 'vue-axios'

export default {
    name: "PageStart",
    data: () => ({
        // video: require("@/video/preview.mp4"),
        starterScreen: [],
        footerSocicon: [],
        
    }),
    created: function () {        
        setTimeout(() => {
            this.$refs.theVideo.play();
        }, 0);
    },
    mounted: function() {
        axios
            .get('http://chocolate-cms.loc.jet5.ru/api/api_video/')
            .then(response => {
                this.starterScreen = response.data.starterScreen[0]             
            })
        
        axios
            .get('http://chocolate-cms.loc.jet5.ru/api/api_footer/')
            .then(response => {
                this.footerSocicon = response.data.footerSocicon
            })    
    },
    methods: {
        wheel(ev) {
            if (ev.deltaY > 0) {
                setTimeout(() => {
                    this.$router.push('/One')
                }, 0);
            }
        }
    }
}
</script>