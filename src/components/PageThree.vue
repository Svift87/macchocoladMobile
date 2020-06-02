<template>
    <div class="recipes container">
        <h2 class="recipes__title">
            {{title}}
        </h2>
        <!-- <div class="recipes__carusel">
            <ul class="recipes__carusel__item">
                <li class="recipes__carusel__list" v-for="recip in recipes" :key="recip.id" ref="slider">
                    <a href="">
                        <div class="recipes__carusel__img-block">
                            <img :src="recip.img.default" alt="">
                        </div>
                        <p class="recipes__carusel__title">{{recip.title}}</p>
                        <p class="recipes__carusel__data">{{recip.data}}</p>
                    </a>                    
                </li>
            </ul>
            <div class="arrow-block" v-if="arrow">
                <div class="arrow-slide arrow-slide_left" ></div>
                <div class="arrow-slide arrow-slide_right" ></div>
            </div>
        </div>         -->
        <div>
              <div>
                <!-- swiper -->
                <swiper class="recipes__carusel__item" :options="swiperOption">
                  <swiper-slide class="recipes__carusel__list" v-for="recip in recipes" :key="recip.id">
                    <a href="" @click.prevent>
                      <div class="recipes__carusel__img-block">
                        <img :src="recip.img" alt="">
                      </div>
                      <p class="recipes__carusel__title">{{recip.title}}</p>
                      <p class="recipes__carusel__data">{{recip.data}}</p>
                    </a>
                  </swiper-slide>                    
                </swiper>
                <div class="swiper-button-prev" slot="button-prev" v-if="arrow"></div>
                <div class="swiper-button-next" slot="button-next" v-if="arrow"></div>
              </div>
            </div>

        <md-card>
            <md-card-actions>
            <div class="md-subhead">
                <span>Multiple Slides Per View</span>
                <span>（</span>
                <span>一次显示多个 slides</span>
                <span>）</span>
            </div>
            <md-button class="md-icon-button"
                        target="_blank"
                        href="https://github.com/surmon-china/vue-awesome-swiper/blob/master/examples/11-slides-per-view.vue">
                <md-icon>code</md-icon>
            </md-button>
            </md-card-actions>
            <md-card-media>
            <!-- swiper -->
            <swiper :options="swiperOption">
                <swiper-slide>Slide 1</swiper-slide>
                <swiper-slide>Slide 2</swiper-slide>
                <swiper-slide>Slide 3</swiper-slide>
                <swiper-slide>Slide 4</swiper-slide>
                <swiper-slide>Slide 5</swiper-slide>
                <swiper-slide>Slide 6</swiper-slide>
                <swiper-slide>Slide 7</swiper-slide>
                <swiper-slide>Slide 8</swiper-slide>
                <swiper-slide>Slide 9</swiper-slide>
                <swiper-slide>Slide 10</swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
            </md-card-media>
        </md-card>


        
    </div>
</template>

<script>

export default {
    name: 'PageThree',
    // data: () => ({
    //     title: 'Вкусные рецепты с MacChocolate',
    //     recipes: [
    //         {
    //             img: require('../img/Rectangle1.png'),
    //             title: 'Какао с корицей и маршмеллоу',
    //             data: '21 января'
    //         },
    //         {
    //             img: require('../img/Rectangle2.png'),
    //             title: 'Какао с корицей и маршмеллоу',
    //             data: '21 января'
    //         },
    //         {
    //             img: require('../img/Rectangle3.png'),
    //             title: 'Какао с корицей и маршмеллоу',
    //             data: '21 января'
    //         },
    //         {
    //             img: require('../img/Rectangle4.png'),
    //             title: 'Какао с корицей и маршмеллоу',
    //             data: '21 января'
    //         },
    //         {
    //             img: require('../img/Rectangle4.png'),
    //             title: 'Какао с корицей и маршмеллоу',
    //             data: '21 января'
    //         }
            
    //     ],
    //     arrow: true,
    //     maxSlide: 0
    // }),
    // mounted: function() {
    //     if (this.recipes.length <= 4) {
    //         this.arrow = false            
    //     }
    //     this.maxSlide = this.recipes.length
    // }
    data: () => ({
        swiperOption: {
            slidesPerView: 3,
            spaceBetween: 30,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            }
        }
    }),
    mounted: function() {
	  if (this.recipes.length <= 4) {
		  this.arrow = false
	  }
  },

    



    
}
</script>