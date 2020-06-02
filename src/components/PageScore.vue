<template>
    <div @wheel="wheel">
        <div class="score">
            <div class="container">
                <h2 class="score__title">
                    {{title}}
                </h2>
                <div class="score__item__scroll" >
                    <div class="nujniy"  v-on:mousedown="mouseDown"></div>
                    <div class="score__item_container">
                        <div class="score__item" v-for="score in scores" :key="score.id">
                            <div class="score__item__img_block">
                                <img :src="score.img" :alt="score.title" class="score__item__img">
                            </div>                
                            <h3 class="score__item__name">{{score.title}}</h3>
                        </div>
                    </div>
                </div>
                <div class="score__rage_container">
                    <input type="range" class="score__rage">
                </div>
            </div>               
        </div>
        <div class="footer">
            <div class="container">
            <div class="footer__block">
                <div class="footer__socicon_block">
                    <a :href="socIcon.textUrl" class="footer__socicon" target="_blank" v-for="socIcon in footerSocicon" :key="socIcon.id">
                        <i :class="socIcon.textClass"></i>
                    </a>
                </div>
                <p class="footer__copyright" v-html="footerCopyright.textCopyright"></p>
            </div>
            <div class="footer__kruche_block">
                <a href="https://kruchenas.net/" class="footer__kruche">
                    <img :src="footerCopyright.logoKruche" alt="">
                    <span v-html="footerCopyright.textKruche"></span>
                </a>
                
                <router-link class="footer__arrow" :to="{name: footerCopyright.angleUrlUp}">
                    <i class="fas fa-angle-up"></i>
                </router-link>
            </div>
            </div>      
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import VueAxios from 'vue-axios'

export default {
    name: 'buy',
    data: () => ({
        title: 'Где купить?',
        scores: [],
        tab: false,
        footerSocicon: [],
        footerCopyright: [],
        test: 0
    }),
    mounted: function () {
        axios
            .get('http://chocolate-cms.loc.jet5.ru/api/api_score/')
            .then(response => {
                this.scores = response.data.score   
                
                setTimeout(() => {
                    if (this.scores.length > 12) {
                        let widthScroll = document.querySelector('.score__item_container').scrollWidth - document.querySelector('.score__item__scroll').offsetWidth
                        let pxProcent = (document.querySelector('.score__item_container').scrollWidth - document.querySelector('.score__item__scroll').offsetWidth) / 100
                        let val = document.querySelector('.score__rage').value

                        document.querySelector('.score__rage').value = 0

                        document.querySelector('.score__rage').addEventListener('input', function() {
                            val = document.querySelector('.score__rage').value
                            document.querySelector('.score__rage').style.background = '-webkit-linear-gradient(left ,#fff 0%,#fff '+val+'%,#692F11 '+val+'%, #692F11 100%)'
                            document.querySelector('.score__item_container').style.transform = 'translateX(-'+ val * pxProcent +'px)'
                        })
                    } else {
                        document.querySelector('.score__rage').remove()
                    }
                }, 0);
            })

        axios
            .get('http://chocolate-cms.loc.jet5.ru/api/api_footer/')
            .then(response => {
                this.footerSocicon = response.data.footerSocicon
                this.footerCopyright = response.data.footerCopyright[0]
            })

        document.querySelector('.nujniy').addEventListener('mouseover', () => {
            this.tab = true
        })
        document.querySelector('.nujniy').addEventListener('mouseout', () => {
            this.tab = false
        })
    },
    methods: {
        wheel(ev) {
            if (ev.deltaY < 0) {
                setTimeout(() => {
                    this.$router.push('/Prelast')
                }, 0);
            }
        },
        mouseDown(e) {
            if (this.scores.length > 12) {
                if (this.tab) {
                    let pageX = 0
                    let widthScroll = document.querySelector('.score__item_container').scrollWidth - document.querySelector('.score__item__scroll').offsetWidth
                    let pxProcent = (document.querySelector('.score__item_container').scrollWidth - document.querySelector('.score__item__scroll').offsetWidth) / 100

                    document.onmousemove = e => {
                        
                        if (pageX !== 0) {
                            if (this.test <= widthScroll && this.test >= 0) {
                                this.test += (pageX - e.pageX)

                                // document.querySelector('.score__item_container').scrollLeft = document.querySelector('.score__item_container').scrollLeft + (pageX - e.pageX)

                                document.querySelector('.score__item_container').style.transform = 'translateX(' + this.test * -1 + 'px)'
                                document.querySelector('.score__rage').value = this.test / pxProcent
                                document.querySelector('.score__rage').style.background = '-webkit-linear-gradient(left ,#fff 0%,#fff '+document.querySelector('.score__rage').value+'%,#692F11 '+document.querySelector('.score__rage').value+'%, #692F11 100%)'
                                
                            } else if (this.test < 0) {
                                this.test = 0
                            } else if (this.test > widthScroll) {
                                this.test = widthScroll
                            }
                            
                        }
                        pageX = e.pageX
                        // заканчиваем выполнение событий
                        document.querySelector('.nujniy').onmouseup = () => {
                            document.onmousemove = null
                            document.querySelector('.nujniy').onmouseup = null
                        }

                        // отменяем браузерный drag
                        document.querySelector('.nujniy').ondragstart = () => {
                            return false
                        }
                    
                    }
                } else {
                    document.onmousemove = null
                    document.querySelector('.nujniy').onmouseup = null

                    document.querySelector('.nujniy').ondragstart = () => {
                        return false
                    }
                }
                    
                   
            }
        }
    }
}
</script>