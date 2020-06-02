<template>
  <div @wheel="wheel">
    <div class="cookies__container" @mousemove="move" @mouseout="out">
        <div class="cookies__circular left"></div>
        <div class="cookies__circular right"></div>
        <div class="cookies__progress_bar">
            <div class="cookies__progress_bar__active"></div>
        </div>
        <canvas 
          class="hand hand__opacity"
          ref="canvas"
        ></canvas>
        <div class="cookies__zone cookies__left-zone"></div>
        <div class="cookies__zone cookies__right-zone"></div>
        <div class="title_container container">
            <h1 class="title_page" v-html="titleDiscription"></h1>
            <p class="title_discription" v-html="titlePage"></p>
        </div>
        <div class="cookies__chokoCrum_block">
          <img :src="i.img" alt="" class="cookies__chokoCrum" v-for="i in imgChoco" :key="i.id">
        </div>
        <div class="cookies__block" ref="scrollBox">
            <div class="cookies__scroling">
              <p style="display: none">{{ windowWidth }}</p>
              <canvas
                  class="cookies"
                  v-for="item in allCookies"
                  :key="item.id"
                  :data-text="item.text"
                  ref="tester"
              >
              </canvas>
            </div>
        </div>
    </div>
    <div v-for="item in allCookies" :key="item.id" class="cookies__prediction" ref="prediction">
        <canvas class="cookies__prediction__paper"></canvas>
        <p v-if="popapShow" v-html="item.text"></p>
    </div>
    <transition
      name="showAnimat"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut" 
    >
        <div class="popap" v-if="popapShow">
            <div class="popap__bg" @click="popapAnShow"></div>
            <div class="popap__container">
                <div class="closed" @click="popapAnShow">
                    <i class="fas fa-times"></i>
                </div>
                <div class="popap__text"></div>
                <!-- <div class="popap__line"></div> -->
                <div class="popap__share">
                    <p class="popap__share__text">Поделиться</p>
                    <div class="popap__share__icon_container">
                        <div class="popap__share__icon" @click="shared(item.socialUrl)" v-for="item in social" :key="item.id">
                            <i :class="item.socialClass"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
    <div class="footer">
        <div class="container">
            <router-link class="arrow" :to="{name: 'Two'}">
              <img src="@/img/Union.png" alt="">
            </router-link>
            <div class="footer__socicon_block">
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
  name: "PageOne",
  data: () => ({
    titleDiscription: '',
    titlePage: '',
    scroll: 0,
    bHeight: window.innerHeight - 100,
    windowWidth: window.innerWidth,
    popapShow: false,
    textPopap: "",
    social: [],
    handPositionX: 0,
    handPositionY: 0,
    activeIndex: 0,
    handMove: false,
    cockeeLength: 0,
    allCookies: [],
    paperSekvencia: [
      {
        images: require("@/img/Paper/Paper_1_00.png")
      },
      {
        images: require("@/img/Paper/Paper_1_01.png")
      },
      {
        images: require("@/img/Paper/Paper_1_02.png")
      },
      {
        images: require("@/img/Paper/Paper_1_03.png")
      },
      {
        images: require("@/img/Paper/Paper_1_04.png")
      },
      {
        images: require("@/img/Paper/Paper_1_05.png")
      },
      {
        images: require("@/img/Paper/Paper_1_06.png")
      },
      {
        images: require("@/img/Paper/Paper_1_07.png")
      },
      {
        images: require("@/img/Paper/Paper_1_08.png")
      },
      {
        images: require("@/img/Paper/Paper_1_09.png")
      },
      {
        images: require("@/img/Paper/Paper_1_10.png")
      },
      {
        images: require("@/img/Paper/Paper_1_11.png")
      },
      {
        images: require("@/img/Paper/Paper_1_12.png")
      },
      {
        images: require("@/img/Paper/Paper_1_13.png")
      },
      {
        images: require("@/img/Paper/Paper_1_14.png")
      },
      {
        images: require("@/img/Paper/Paper_1_15.png")
      },
      {
        images: require("@/img/Paper/Paper_1_16.png")
      },
      {
        images: require("@/img/Paper/Paper_1_17.png")
      },
      {
        images: require("@/img/Paper/Paper_1_18.png")
      },
      {
        images: require("@/img/Paper/Paper_1_19.png")
      },
      {
        images: require("@/img/Paper/Paper_1_20.png")
      },
      {
        images: require("@/img/Paper/Paper_1_21.png")
      },
      {
        images: require("@/img/Paper/Paper_1_22.png")
      },
      {
        images: require("@/img/Paper/Paper_1_23.png")
      },
      {
        images: require("@/img/Paper/Paper_1_24.png")
      },
      {
        images: require("@/img/Paper/Paper_1_25.png")
      },
      {
        images: require("@/img/Paper/Paper_1_26.png")
      },
      {
        images: require("@/img/Paper/Paper_1_27.png")
      },
      {
        images: require("@/img/Paper/Paper_1_28.png")
      },
      {
        images: require("@/img/Paper/Paper_1_29.png")
      },
      {
        images: require("@/img/Paper/Paper_1_30.png")
      }
    ],
    handSekvencia: [
      {
        images: require("@/img/Hand/Hand_31_05_01.png")
      },{
        images: require("@/img/Hand/Hand_31_05_02.png")
      },{
        images: require("@/img/Hand/Hand_31_05_03.png")
      },{
        images: require("@/img/Hand/Hand_31_05_04.png")
      },{
        images: require("@/img/Hand/Hand_31_05_05.png")
      },{
        images: require("@/img/Hand/Hand_31_05_06.png")
      },{
        images: require("@/img/Hand/Hand_31_05_07.png")
      },{
        images: require("@/img/Hand/Hand_31_05_08.png")
      },{
        images: require("@/img/Hand/Hand_31_05_09.png")
      },{
        images: require("@/img/Hand/Hand_31_05_10.png")
      },{
        images: require("@/img/Hand/Hand_31_05_11.png")
      },{
        images: require("@/img/Hand/Hand_31_05_12.png")
      },{
        images: require("@/img/Hand/Hand_31_05_13.png")
      },{
        images: require("@/img/Hand/Hand_31_05_14.png")
      },{
        images: require("@/img/Hand/Hand_31_05_15.png")
      },{
        images: require("@/img/Hand/Hand_31_05_16.png")
      },{
        images: require("@/img/Hand/Hand_31_05_17.png")
      },{
        images: require("@/img/Hand/Hand_31_05_18.png")
      },{
        images: require("@/img/Hand/Hand_31_05_19.png")
      },{
        images: require("@/img/Hand/Hand_31_05_20.png")
      },{
        images: require("@/img/Hand/Hand_31_05_21.png")
      },{
        images: require("@/img/Hand/Hand_31_05_22.png")
      },{
        images: require("@/img/Hand/Hand_31_05_23.png")
      },{
        images: require("@/img/Hand/Hand_31_05_24.png")
      },{
        images: require("@/img/Hand/Hand_31_05_25.png")
      },{
        images: require("@/img/Hand/Hand_31_05_26.png")
      },{
        images: require("@/img/Hand/Hand_31_05_27.png")
      },{
        images: require("@/img/Hand/Hand_31_05_28.png")
      },{
        images: require("@/img/Hand/Hand_31_05_29.png")
      },{
        images: require("@/img/Hand/Hand_31_05_30.png")
      },{
        images: require("@/img/Hand/Hand_31_05_31.png")
      },{
        images: require("@/img/Hand/Hand_31_05_32.png")
      },{
        images: require("@/img/Hand/Hand_31_05_33.png")
      },{
        images: require("@/img/Hand/Hand_31_05_34.png")
      },{
        images: require("@/img/Hand/Hand_31_05_35.png")
      },{
        images: require("@/img/Hand/Hand_31_05_36.png")
      }
    ],
    cookieSekvencia: [
      // {
      //   images: require("@/img/Cookie_Crush_3/Cooke_Crush_3_resize_01.png")
      // },
      // {
      //   images: require("@/img/Cookie_Crush_3/Cooke_Crush_3_resize_02.png")
      // },
      // {
      //   images: require("@/img/Cookie_Crush_3/Cooke_Crush_3_resize_03.png")
      // },
      // {
      //   images: require("@/img/Cookie_Crush_3/Cooke_Crush_3_resize_04.png")
      // },
      // {
      //   images: require("@/img/Cookie_Crush_3/Cooke_Crush_3_resize_05.png")
      // },
      // {
      //   images: require("@/img/Cookie_Crush_3/Cooke_Crush_3_resize_06.png")
      // },
      // {
      //   images: require("@/img/Cookie_Crush_3/Cooke_Crush_3_resize_07.png")
      // },
      // {
      //   images: require("@/img/Cookie_Crush_3/Cooke_Crush_3_resize_08.png")
      // },
      // {
      //   images: require("@/img/Cookie_Crush_3/Cooke_Crush_3_resize_09.png")
      // },
      // {
      //   images: require("@/img/Cookie_Crush_3/Cooke_Crush_3_resize_10.png")
      // },
      // {
      //   images: require("@/img/Cookie_Crush_3/Cooke_Crush_3_resize_11.png")
      // },
      // {
      //   images: require("@/img/Cookie_Crush_3/Cooke_Crush_3_resize_12.png")
      // },
      // {
      //   images: require("@/img/Cookie_Crush_3/Cooke_Crush_3_resize_13.png")
      // },
      // {
      //   images: require("@/img/Cookie_Crush_3/Cooke_Crush_3_resize_14.png")
      // },
      // {
      //   images: require("@/img/Cookie_Crush_3/Cooke_Crush_3_resize_15.png")
      // },
      // {
      //   images: require("@/img/Cookie_Crush_3/Cooke_Crush_3_resize_16.png")
      // },
      // {
      //   images: require("@/img/Cookie_Crush_3/Cooke_Crush_3_resize_17.png")
      // },
      // {
      //   images: require("@/img/Cookie_Crush_3/Cooke_Crush_3_resize_18.png")
      // },
      // {
      //   images: require("@/img/Cookie_Crush_3/Cooke_Crush_3_resize_19.png")
      // },
      // {
      //   images: require("@/img/Cookie_Crush_3/Cooke_Crush_3_resize_20.png")
      // }
      {
        images: require("@/img/CookieCrush_27.05/CookieCrush_20.png")
      },
      {
        images: require("@/img/CookieCrush_27.05/CookieCrush_21.png")
      },
      {
        images: require("@/img/CookieCrush_27.05/CookieCrush_22.png")
      },
      {
        images: require("@/img/CookieCrush_27.05/CookieCrush_23.png")
      },
      {
        images: require("@/img/CookieCrush_27.05/CookieCrush_24.png")
      },
      {
        images: require("@/img/CookieCrush_27.05/CookieCrush_25.png")
      },
      {
        images: require("@/img/CookieCrush_27.05/CookieCrush_26.png")
      },
      {
        images: require("@/img/CookieCrush_27.05/CookieCrush_27.png")
      },
      {
        images: require("@/img/CookieCrush_27.05/CookieCrush_28.png")
      },
      {
        images: require("@/img/CookieCrush_27.05/CookieCrush_29.png")
      },
      {
        images: require("@/img/CookieCrush_27.05/CookieCrush_30.png")
      },
      {
        images: require("@/img/CookieCrush_27.05/CookieCrush_31.png")
      },
      {
        images: require("@/img/CookieCrush_27.05/CookieCrush_32.png")
      },
      {
        images: require("@/img/CookieCrush_27.05/CookieCrush_33.png")
      },
      {
        images: require("@/img/CookieCrush_27.05/CookieCrush_34.png")
      },
      {
        images: require("@/img/CookieCrush_27.05/CookieCrush_35.png")
      },
      {
        images: require("@/img/CookieCrush_27.05/CookieCrush_36.png")
      },
      {
        images: require("@/img/CookieCrush_27.05/CookieCrush_37.png")
      },
      {
        images: require("@/img/CookieCrush_27.05/CookieCrush_38.png")
      },
      {
        images: require("@/img/CookieCrush_27.05/CookieCrush_39.png")
      },
      {
        images: require("@/img/CookieCrush_27.05/CookieCrush_40.png")
      },
      {
        images: require("@/img/CookieCrush_27.05/CookieCrush_41.png")
      },
      {
        images: require("@/img/CookieCrush_27.05/CookieCrush_42.png")
      },
      {
        images: require("@/img/CookieCrush_27.05/CookieCrush_43.png")
      },
      {
        images: require("@/img/CookieCrush_27.05/CookieCrush_44.png")
      },
      {
        images: require("@/img/CookieCrush_27.05/CookieCrush_45.png")
      },
      {
        images: require("@/img/CookieCrush_27.05/CookieCrush_46.png")
      },
      {
        images: require("@/img/CookieCrush_27.05/CookieCrush_47.png")
      },
      {
        images: require("@/img/CookieCrush_27.05/CookieCrush_48.png")
      },
      {
        images: require("@/img/CookieCrush_27.05/CookieCrush_49.png")
      },
      {
        images: require("@/img/CookieCrush_27.05/CookieCrush_50.png")
      }
    ],
    animateCookies: [
      {
        images: require("@/img/Cookie_1/Cookie_1_resize_00.png")
      },{
        images: require("@/img/Cookie_1/Cookie_1_resize_01.png")
      },{
        images: require("@/img/Cookie_1/Cookie_1_resize_02.png")
      },{
        images: require("@/img/Cookie_1/Cookie_1_resize_03.png")
      },{
        images: require("@/img/Cookie_1/Cookie_1_resize_04.png")
      },{
        images: require("@/img/Cookie_1/Cookie_1_resize_05.png")
      },{
        images: require("@/img/Cookie_1/Cookie_1_resize_06.png")
      },{
        images: require("@/img/Cookie_1/Cookie_1_resize_07.png")
      },{
        images: require("@/img/Cookie_1/Cookie_1_resize_08.png")
      },{
        images: require("@/img/Cookie_1/Cookie_1_resize_09.png")
      },{
        images: require("@/img/Cookie_1/Cookie_1_resize_10.png")
      },{
        images: require("@/img/Cookie_1/Cookie_1_resize_11.png")
      },{
        images: require("@/img/Cookie_1/Cookie_1_resize_12.png")
      },{
        images: require("@/img/Cookie_1/Cookie_1_resize_13.png")
      },{
        images: require("@/img/Cookie_1/Cookie_1_resize_14.png")
      },{
        images: require("@/img/Cookie_1/Cookie_1_resize_15.png")
      },{
        images: require("@/img/Cookie_1/Cookie_1_resize_16.png")
      },{
        images: require("@/img/Cookie_1/Cookie_1_resize_17.png")
      },{
        images: require("@/img/Cookie_1/Cookie_1_resize_18.png")
      },{
        images: require("@/img/Cookie_1/Cookie_1_resize_19.png")
      },{
        images: require("@/img/Cookie_1/Cookie_1_resize_20.png")
      },{
        images: require("@/img/Cookie_1/Cookie_1_resize_21.png")
      },{
        images: require("@/img/Cookie_1/Cookie_1_resize_22.png")
      },{
        images: require("@/img/Cookie_1/Cookie_1_resize_23.png")
      },{
        images: require("@/img/Cookie_1/Cookie_1_resize_24.png")
      },{
        images: require("@/img/Cookie_1/Cookie_1_resize_25.png")
      },{
        images: require("@/img/Cookie_1/Cookie_1_resize_26.png")
      },{
        images: require("@/img/Cookie_1/Cookie_1_resize_27.png")
      },{
        images: require("@/img/Cookie_1/Cookie_1_resize_28.png")
      },{
        images: require("@/img/Cookie_1/Cookie_1_resize_29.png")
      },{
        images: require("@/img/Cookie_1/Cookie_1_resize_30.png")
      },{
        images: require("@/img/Cookie_1/Cookie_1_resize_31.png")
      },{
        images: require("@/img/Cookie_1/Cookie_1_resize_32.png")
      },{
        images: require("@/img/Cookie_1/Cookie_1_resize_33.png")
      },{
        images: require("@/img/Cookie_1/Cookie_1_resize_34.png")
      },{
        images: require("@/img/Cookie_1/Cookie_1_resize_35.png")
      },{
        images: require("@/img/Cookie_1/Cookie_1_resize_36.png")
      },{
        images: require("@/img/Cookie_1/Cookie_1_resize_37.png")
      },{
        images: require("@/img/Cookie_1/Cookie_1_resize_38.png")
      },{
        images: require("@/img/Cookie_1/Cookie_1_resize_39.png")
      },{
        images: require("@/img/Cookie_1/Cookie_1_resize_40.png")
      },{
        images: require("@/img/Cookie_1/Cookie_1_resize_41.png")
      },{
        images: require("@/img/Cookie_1/Cookie_1_resize_42.png")
      },{
        images: require("@/img/Cookie_1/Cookie_1_resize_43.png")
      },{
        images: require("@/img/Cookie_1/Cookie_1_resize_44.png")
      },{
        images: require("@/img/Cookie_1/Cookie_1_resize_45.png")
      },{
        images: require("@/img/Cookie_1/Cookie_1_resize_46.png")
      },{
        images: require("@/img/Cookie_1/Cookie_1_resize_47.png")
      },{
        images: require("@/img/Cookie_1/Cookie_1_resize_48.png")
      },{
        images: require("@/img/Cookie_1/Cookie_1_resize_49.png")
      },{
        images: require("@/img/Cookie_1/Cookie_1_resize_50.png")
      }
    ],
    activeSekvencia: 0,
    footerSocicon: [],
    arr: [],
    min: 100,
    max: 180,
    imgChoco: [
      {
        img: require("@/img/Chocolate_layer_1.png")
      },
      {
        img: require("@/img/Chocolate_layer_2.png")
      }
    ]
  }),
  mounted: function() {
    
    axios
      .get('http://chocolate-cms.loc.jet5.ru/api/api_one_social/')
      .then(response => {
        this.social = response.data.socialShare        
      })

    axios
      .get('http://chocolate-cms.loc.jet5.ru/api/api_footer/')
      .then(response => {
          this.footerSocicon = response.data.footerSocicon
      })

    axios
      .get('http://chocolate-cms.loc.jet5.ru/api/api_one_cookies/')
      .then(response => {
        this.allCookies = response.data.cookies
        
        this.titleDiscription = response.data.titleDiscription
        this.titlePage = response.data.titlePage
        
        setTimeout(() => {
          let diapazon = (document.querySelector('.cookies__scroling').offsetWidth - 100) / this.allCookies.length
          this.cockeeLength = this.$refs.tester.length - 1
          let widthCock = 0
          let leftCock = 0
          let topCock = 0

          for (let i = 0; i < this.$refs.tester.length; i++) {
            let a, b, c, d, z
            
            let randomazer = () => {
              a = Math.round(0 - 0.5 + Math.random() * (this.bHeight - 250 * document.querySelector('.sizePage').dataset.number))
              b = Math.round(0 - 0.5 + Math.random() * (diapazon - 100 * document.querySelector('.sizePage').dataset.number)) + diapazon * i
              // c = Math.round(0 - 0.5 + Math.random() * 50 * document.querySelector('.sizePage').dataset.number) + 150 * document.querySelector('.sizePage').dataset.number  
              // d = Math.round(0 - 0.5 + Math.random() * (360 - 0 + 1))
              c = Math.round(Math.random() * ((this.max * document.querySelector('.sizePage').dataset.number) - (this.min * document.querySelector('.sizePage').dataset.number)) + (this.min * document.querySelector('.sizePage').dataset.number))
              if (b > leftCock && b < leftCock + widthCock) {
                randomazer()
              } else {
                if (a - 200 < 0) {
                  this.$refs.tester[i].style.top = a + 200 + "px";
                } else {
                  this.$refs.tester[i].style.top = a - c + "px";
                }
                
                let rad = (this.max * document.querySelector('.sizePage').dataset.number) - (this.min * document.querySelector('.sizePage').dataset.number)

                z = Math.round((c - this.min * document.querySelector('.sizePage').dataset.number) * 10 / rad) + 10
                
                this.$refs.tester[i].style.left = b + "px";
                this.$refs.tester[i].style.width = c + "px";
                this.$refs.tester[i].style.height = c + "px";
                // this.$refs.tester[i].style.transform = 'rotate(' + d + 'deg)'
                this.$refs.tester[i].style.zIndex = z;

                this.arr.push(Math.round((c - this.min * document.querySelector('.sizePage').dataset.number) * 100 / rad))

                widthCock = c
                leftCock = b
                topCock = a
              }
            }
            randomazer ()
          }

          // Создание случайного набора появления печенек

          var totalNumbers 		  = (this.$refs.tester.length - 1) - 0 + 1,
            arrayTotalNumbers 	= [],
            arrayRandomNumbers 	= [],
            tempRandomNumber;

          while (totalNumbers--) {
            arrayTotalNumbers.push(totalNumbers + 0);
          }

          while (arrayTotalNumbers.length) {
            tempRandomNumber = Math.round(Math.random() * (arrayTotalNumbers.length - 1));
            arrayRandomNumbers.push(arrayTotalNumbers[tempRandomNumber]);
            arrayTotalNumbers.splice(tempRandomNumber, 1);
          }

          // Каневас

          var canvas = this.$refs.canvas
          var ctx = canvas.getContext('2d')

          canvas.width = document.querySelector(".hand").offsetWidth
          canvas.height = document.querySelector(".hand").offsetHeight

          document.querySelector(".hand").classList.remove('hand__opacity')

          setTimeout(() => {
            console.log('das')
            this.handMove = true
          }, 500);
          
          var img = new Image()
          img.src = this.handSekvencia[0].images

          this.initCanvas(this.handSekvencia[0].images, canvas, ctx, img)
          
          for(let i = 0; this.$refs.tester.length> i; i++) {
            let deleteAnimation = true
            let imgСookies = new Image()

            // Канвас для печенек

            let canvasСookies = this.$refs.tester[i]
            let ctxСookies = canvasСookies.getContext('2d')

            canvasСookies.width = this.$refs.tester[i].offsetWidth
            canvasСookies.height = this.$refs.tester[i].offsetHeight

            setTimeout(() => {
              this.$refs.tester[i].style.opacity = '1'
              // Рандомное покачивание печенья
              if (deleteAnimation) {
                //  Канвас для печенек
                let canvasСookies = this.$refs.tester[i]
                let ctxСookies = canvasСookies.getContext('2d')

                canvasСookies.width = this.$refs.tester[i].offsetWidth
                canvasСookies.height = this.$refs.tester[i].offsetHeight

                this.initCanvasСookies(this.allCookies[i].images, canvasСookies, ctxСookies, imgСookies) 
                let numShow = 0
                let intervalPokach = () => {                
                  if (numShow < this.animateCookies.length - 1 && deleteAnimation) {
                    numShow++            
                    imgСookies.src = this.animateCookies[numShow].images
                    imgСookies.onload = function() {
                      ctxСookies.clearRect(0, 0, canvasСookies.width, canvasСookies.height);
                      ctxСookies.drawImage(imgСookies, 0, 0, canvasСookies.width, canvasСookies.height)
                      setTimeout(intervalPokach, 35)
                    }                  
                  } else if (!deleteAnimation) {
                    imgСookies.src = this.cookieSekvencia[this.cookieSekvencia.length - 1].images
                    imgСookies.onload = function() {
                      ctxСookies.clearRect(0, 0, canvasСookies.width, canvasСookies.height);
                      ctxСookies.drawImage(imgСookies, 0, 0, canvasСookies.width, canvasСookies.height)
                    }
                  } else {
                    numShow = 0
                    setTimeout(intervalPokach, 35)
                  }
                }
                intervalPokach()
                  
              }
            }, 500 * arrayRandomNumbers[i]);

            this.$refs.tester[i].addEventListener('click', () => {
              this.$refs.tester[i].style.transition = '0'
              this.handMove = false
              deleteAnimation = false
              let num = 0
              let numСookies = 0

              let imgСookiesBoom = new Image()              
              
              this.$refs.tester[i].style.transform = 'rotate(0)'
              this.$refs.tester[i].style.height = window.innerHeight + 'px'
              this.$refs.tester[i].height = window.innerHeight

              // this.$refs.tester[i].style.top = this.$refs.tester[i].offsetTop + 40 + 'px'
              // this.$refs.tester[i].style.left = this.$refs.tester[i].offsetLeft + 80 + 'px'
              this.$refs.tester[i].style.position = 'fixed'
              this.$refs.tester[i].style.top = this.handPositionY + "px"
              this.$refs.tester[i].style.left = this.handPositionX + "px"
              
              

              imgСookiesBoom.src = this.cookieSekvencia[this.cookieSekvencia.length - 1].images
              imgСookiesBoom.onload = function() {
                ctxСookies.clearRect(0, 0, canvasСookies.width, window.innerHeight)
                ctxСookies.drawImage(imgСookiesBoom, 0, 0, canvasСookies.width, window.innerHeight)
              }

              // Анимация разбиения печеньки
              let intervalСookies = () => {
                if (numСookies < this.cookieSekvencia.length - 1) {
                  numСookies++
                  imgСookiesBoom.src = this.cookieSekvencia[numСookies].images
                  imgСookiesBoom.onload = function() {
                    ctxСookies.clearRect(0, 0, canvasСookies.width, window.innerHeight)
                    ctxСookies.drawImage(imgСookiesBoom, 0, 0, canvasСookies.width, window.innerHeight)
                    setTimeout(intervalСookies, 35)
                  }
                  imgСookiesBoom.onerror = function() {
                    setTimeout(intervalСookies, 35)
                  }
                } else {
                  this.cookiesTextOn(i)
                  this.$refs.tester[i].remove()
                  this.cockeeLength = document.querySelectorAll('.cookies').length - 1 
                }
              }

              // Анимация руки
              let interval = () => {
                if (num < this.handSekvencia.length - 1) {
                  num++            
                  img.src = this.handSekvencia[num].images
                  img.onload = function() {
                    ctx.clearRect(0, 0, canvas.width, canvas.height)
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
                    setTimeout(interval, 35)
                  }
                }
                if (num == 20) {
                  intervalСookies()
                }
              }
              interval()
            })

            // Изменение размеров печенек по ховеру

            let sizeCoocke = () => {
              
                let widthCoocke = this.$refs.tester[i].offsetWidth
                let heightCoocke = this.$refs.tester[i].offsetHeight
                let leftCoocke = this.$refs.tester[i].offsetLeft
                let topCoocke = this.$refs.tester[i].offsetTop
                let zCoocke = this.$refs.tester[i].style.zIndex

                let radius = (150 * document.querySelector('.sizePage').dataset.number + 75 * document.querySelector('.sizePage').dataset.number) - widthCoocke
                
                this.$refs.tester[i].addEventListener('mouseover', () => {
                  if (deleteAnimation) {
                    this.$refs.tester[i].style.width = widthCoocke + radius + 'px'
                    this.$refs.tester[i].style.height = heightCoocke + radius + 'px'
                    this.$refs.tester[i].style.top = topCoocke - radius / 2 + 'px'
                    this.$refs.tester[i].style.left = leftCoocke - radius / 2 + 'px'
                    this.$refs.tester[i].style.zIndex = '20'
                  }
                })
                this.$refs.tester[i].addEventListener('mouseout', () => {
                  if (deleteAnimation) {
                    this.$refs.tester[i].style.width = widthCoocke + 'px'
                    this.$refs.tester[i].style.height = heightCoocke + 'px'
                    this.$refs.tester[i].style.top = topCoocke + 'px'
                    this.$refs.tester[i].style.left = leftCoocke + 'px'
                    this.$refs.tester[i].style.zIndex = zCoocke
                  }
                })       
            }
            sizeCoocke()
          }
        }, 0)
      })

    setTimeout(() => {
      document.querySelector(".cookies__progress_bar__active").style.width = Math.round((document.querySelector(".cookies__block").offsetWidth * 100) / document.querySelector(".cookies__scroling").offsetWidth) + "%";
      document.querySelector(".cookies__progress_bar__active").style.left = Math.round((document.querySelector(".cookies__block").scrollLeft * 100) / document.querySelector(".cookies__scroling").offsetWidth) + "%";
    }, 0);

    this.$refs.scrollBox.scrollLeft = this.$refs.scrollBox.scrollWidth / 2 - window.innerWidth / 2;
    window.onresize = () => {
      this.windowWidth = window.innerWidth;

      document.querySelector(".cookies__progress_bar__active").style.width = Math.round((document.querySelector(".cookies__block").offsetWidth * 100) / document.querySelector(".cookies__scroling").offsetWidth) + "%";
      document.querySelector(".cookies__progress_bar__active").style.left = Math.round((document.querySelector(".cookies__block").scrollLeft * 100) / document.querySelector(".cookies__scroling").offsetWidth) + "%";

      this.bHeight = window.innerHeight - 100;
      this.$refs.scrollBox.scrollLeft = this.$refs.scrollBox.scrollWidth / 2 - window.innerWidth / 2;
    };

    let scrollRightInterval
    let scrollLeftInterval
    let a = 2
    let b = 0

    let cookiesLeftZone = document.querySelector(".cookies__left-zone");
    let cookiesRightZone = document.querySelector(".cookies__right-zone");

    cookiesLeftZone.addEventListener("mouseover", function() {
      scrollRightInterval = setInterval(function() {
        if (a <= 10) {
          a += 0.1;
        }
        document.querySelector(".cookies__block").scrollLeft -= a;
        document.querySelector(".cookies__progress_bar__active").style.left = Math.round((document.querySelector(".cookies__block").scrollLeft * 100) / document.querySelector(".cookies__scroling").offsetWidth) + "%";
        if (
          b <= 64 &&
          document.querySelector(".cookies__block").scrollLeft == 0
        ) {
          b += 1;
        }
        document.querySelector(".cookies__circular.left").style.width = b + "px";
      }, 1);
    })
    cookiesLeftZone.addEventListener("mouseout", function() {
      a = 2;
      b = 0;
      document.querySelector(".cookies__circular.left").style.width = b + "px";
      clearInterval(scrollRightInterval);
    })
    cookiesRightZone.addEventListener("mouseover", function() {      
      scrollLeftInterval = setInterval(function() {
        if (a <= 10) {
          a += 0.1;
        }
        document.querySelector(".cookies__block").scrollLeft += a;
        document.querySelector(".cookies__progress_bar__active").style.left = Math.round((document.querySelector(".cookies__block").scrollLeft * 100) / document.querySelector(".cookies__scroling").offsetWidth) + "%";
        if (
          b <= 64 &&
          document.querySelector(".cookies__block").scrollLeft >= document.querySelector(".cookies__scroling").offsetWidth - document.querySelector(".cookies__block").offsetWidth - 10
        ) {
          b += 1;
        }
        document.querySelector(".cookies__circular.right").style.width = b + "px";
      }, 1);
    })
    cookiesRightZone.addEventListener("mouseout", function() {
      a = 2;
      b = 0;
      document.querySelector(".cookies__circular.right").style.width = b + "px";
      clearInterval(scrollLeftInterval);
    })
  },
  methods: {
    initCanvasСookies (imagePath, canvas, ctx, img) {
      img.src = imagePath
      img.onload = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      }
    },
    initCanvas(imagePath, canvas, ctx, img) {
      img.src = imagePath
      img.onload = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      }
    },
    wheel(ev) {
      document.querySelector(".hand").classList.add('hand__opacity')      
      document.querySelector('.cookies__progress_bar').classList.add('hiden')
      
      this.handMove = false
      if (ev.deltaY < 0) {
        setTimeout(() => {
          this.$router.push('/')
        }, 500);
        setTimeout(() => {
          document.querySelector(".hand").classList.remove('hand__opacity')          
          document.querySelector('.cookies__progress_bar').classList.remove('hiden')
          this.handMove = true          
        }, 900);
      }
      if (ev.deltaY > 0) {
        setTimeout(() => {
          this.$router.push('/Two')
        }, 500);
        setTimeout(() => {
          document.querySelector(".hand").classList.remove('hand__opacity')
          document.querySelector('.cookies__progress_bar').classList.remove('hiden')
          this.handMove = true
        }, 900);
      }
    },
    move(e) {
      if (this.handMove) {
        setTimeout(() => {
          document.querySelector(".title_container").classList.add("hide");
        }, 1000);
        this.handPositionX = e.clientX;
        this.handPositionY = e.clientY;

        document.querySelector(".hand").style.transition = "none";
        document.querySelector(".hand").style.left = e.clientX - 400 * document.querySelector('.sizePage').dataset.number + "px";
        document.querySelector(".hand").style.top = e.clientY - 200 * document.querySelector('.sizePage').dataset.number + "px";      
        document.querySelectorAll('.cookies__chokoCrum')[0].style.transform = 'translate(' + e.clientX * 0.01 + 'px, ' + e.clientY * 0.01 + 'px)'
        document.querySelectorAll('.cookies__chokoCrum')[1].style.transform = 'translate(' + e.clientX * 0.005 + 'px, ' + e.clientY * 0.005 + 'px)'
        let parallax = (e, target, a) => {
          target.style.transform = 'translate(' + e.clientX * 0.01 * (a/10) + 'px, ' + e.clientY * 0.002 * (a/10) + 'px)'        
        };
        for (let i = 0; i < document.querySelectorAll('.cookies').length; i++) {
          parallax(e, document.querySelectorAll('.cookies')[i], this.arr[i])
        }  
      }      
    },
    out(e) {
      if (this.handMove) {
        document.querySelector(".hand").style.transition = "0.5s";
        document.querySelector(".hand").style.left = "calc(50% - " + document.querySelector(".hand").width / 1.5 + "px)";
        document.querySelector(".hand").style.top = "calc(50% - " + document.querySelector(".hand").height / 3 + "px)";
      }
    },
    cookiesTextOn(i) {
      this.activeIndex = i
      this.$refs.prediction[this.activeIndex].style.left = this.handPositionX + "px"
      this.$refs.prediction[this.activeIndex].style.top = this.handPositionY + "px"


      var canvasPaper = document.querySelectorAll('.cookies__prediction__paper')[this.activeIndex]
      var ctxPaper = canvasPaper.getContext('2d')

      canvasPaper.width = document.querySelectorAll('.cookies__prediction__paper')[this.activeIndex].offsetWidth
      canvasPaper.height = document.querySelectorAll('.cookies__prediction__paper')[this.activeIndex].offsetHeight
      
      let imgPaper = new Image()
      imgPaper.src = this.paperSekvencia[0].images
      
      let num = 0

      setTimeout(() => {
        this.$refs.prediction[this.activeIndex].classList.add("center")
        document.querySelector(".hand").style.transition = "0.5s"
        document.querySelector(".hand").style.left = "calc(50% - " + document.querySelector(".hand").width / 1.5 + "px)"
        document.querySelector(".hand").style.top = "calc(50% - " + document.querySelector(".hand").height / 3 + "px)"
        let interval = () => {
          if (num < this.paperSekvencia.length - 1) {
            num++
            imgPaper.src = this.paperSekvencia[num].images
            imgPaper.onload = function() {
              ctxPaper.clearRect(0, 0, canvasPaper.width, canvasPaper.height);
              ctxPaper.drawImage(imgPaper, 0, 0, canvasPaper.width, canvasPaper.height)
              setTimeout(interval, 35)
            }
          } else {
            imgPaper.src = this.paperSekvencia[this.paperSekvencia.length - 1].images
            ctxPaper.drawImage(imgPaper, 0, 0, canvasPaper.width, canvasPaper.height)
          }
        }
        interval()
      }, 0)
      setTimeout(() => {        
        this.$refs.prediction[this.activeIndex].classList.add("turn")
        this.popapShow = true        
      }, 1000)
    },
    popapAnShow() {
      document.querySelectorAll('.cookies__prediction')[this.activeIndex].style.opacity = 0
      this.handMove = true
      // Канвас для руки
      var canvas = this.$refs.canvas
      var ctx = canvas.getContext('2d')

      canvas.width = document.querySelector(".hand").offsetWidth
      canvas.height = document.querySelector(".hand").offsetHeight   
      
      var img = new Image()
      
      this.$refs.prediction[this.activeIndex].classList.remove("turn");
      setTimeout(() => {
        this.initCanvas(this.handSekvencia[0].images, canvas, ctx, img)
        this.$refs.prediction[this.activeIndex].classList.remove("center");
      }, 1000);
      this.popapShow = false
    },
    shared(url) {
      if (url == 'http://vkontakte.ru/share.php?') {
        url += 'url=' + this.allCookies[this.activeIndex].htmlShare
      } else if (url == 'https://twitter.com/share?') {
        url += 'url=' + this.allCookies[this.activeIndex].htmlShare
      } else if (url == 'https://connect.ok.ru/offer?') {
        url += 'url=' + this.allCookies[this.activeIndex].htmlShare
      } else if (url == 'http://www.facebook.com/sharer.php?') {
        url += 'u=' + this.allCookies[this.activeIndex].htmlShare
      }
      window.open(url,'sharer','toolbar=0,status=0,width=626,height=436')
    }
  }
};
</script>