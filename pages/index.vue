<template lang="en-US">
<div style="background-color:white;">

    <nav>
        <v-app-bar app dense flat style=" background-color: rgba(0, 0, 0, .4);">
            <v-toolbar-title>
                <nuxt-link class="txt" to="/home">
                    <div style="   color: white; background: center bottom;margin: 10px;">
                        FitNow </div>
                </nuxt-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>

            <v-menu class="dropdown" open-on-hover offset-y transition="scale-transition" style="top: 39px;left: 1321px !important;">
                <template style="display:flex;justify-content:space-between;" v-slot:activator="{ on, attrs }">
                    <div style=" color: white;background: center bottom;margin: 15px;" v-bind="attrs" v-on="on">
                        Features
                    </div>
                </template>

                <v-list>
                    <v-list-item style="min-height: 15px;display:flex;">

                        <nuxt-link class="txt" to="/training-home" style="min-height: 15px;display:flex;">
                            <div>
                                <img src="https://everfit.io/wp-content/themes/everfit/assets/images/homepage/icon/tools-icon1.svg" alt="Training online personal trainers software">
                            </div>
                            <div style="vertical-align: middle;">Training</div>
                        </nuxt-link>
                    </v-list-item>
                </v-list>
            </v-menu>
            <nuxt-link class="txt" to="/pricing">
                <div style=" color: white;background: center bottom;margin: 10px;">
                    pricing </div>
            </nuxt-link>
            <nuxt-link class="txt" to="/login">
                <div style="   color: white; background: center bottom;margin: 10px;">
                    sign in </div>
            </nuxt-link>

        </v-app-bar>
    </nav>

    <v-row style="background-color:white;padding:0;" >
        <v-col cols="12" md="12" sm="12">
            <div class="containerss">

                <video class="video" webkit-playsinline playsinline autoplay loop muted id="myVideo01" style="width: 100%;height: 100%;">
                    <source src="../assets/img/icons/ved.mp4" type="video/mp4">

                </video>

                <div class="overlay">
                    <p class="p-txt d-md-block d-none">To put it simply, physical activity and exercise is important for everyone.</p>
                    <form>
                        <p class="p-txt d-md-block d-none"> Children, adolescents, and adults of all ages need regular physical activity. Physical activity promotes good health</p>
                        <v-row>

                            <v-col cols="12" md="6" sm="12">
                                <v-text-field class=" d-md-block d-none" v-model="joinUs" label="Email" value="mail" solo></v-text-field>
                               
                            </v-col>


                            <v-col cols="12" md="6" sm="12">
                                <nuxt-link class="set" to="/register">
                                    <v-btn color="primary" type="submit" class="btn-join" elevation="2" large style=" color:white;"> sign up immediately
                                        <img src="https://everfit.io/wp-content/themes/everfit/assets/images/homepage/icon/icon-arrow-right.svg" style="margin-left: 15px;">
                                    </v-btn>

                                </nuxt-link>
                            </v-col>

                        </v-row>

                    </form>

                </div>
            </div>


        </v-col>
    </v-row>
    <!-- vide  -->

    <!-- sp -->
    <v-row class="row-clss">
        <v-col cols="12" md="12" sm="12">

            <div class="row row--light row--top" style=" margin: 20px;padding: 15px;display: flow-root;">
                <div class="cell well">
                    <div class="well well--l">
                        <div class="clients">
                            <div class="clients-images client-logos" style="justify-content:center;">
                                <ul>
                                    <li style=" list-style:none ;    margin-bottom: 40px;"><img src="https://truecoach.co/cdn-cgi/image/width=360,fit=scale-down,format=auto,quality=75/assets/images/logo-bl.png" alt="Barbel Logic" class="is-white is-wide"></li>
                                    <li style=" list-style:none ;"><img src="https://truecoach.co/cdn-cgi/image/width=360,fit=scale-down,format=auto,quality=75/assets/images/logo-powermonkey.png" alt="Power Monkey Fitness" class="is-white"></li>

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </v-col>
    </v-row>
    <!-- sp -->

    <v-row style="background-color:white ; justify-content:center;padding: 30px;">

        <!-- card start -->

        <v-cols cols="12" md="3" sm="12" style=" padding: 0px 50px 50px 50px;">
            <li class="card card--feature card--bordered "><img src="../assets/img/icons/feature-measure.svg" alt="Track your clients progress" class="filter-green">
                <h4>Effortlessly Track<br>&amp; Measure Client Data</h4>
                <p>Your clients can enter their workout data for each workout. So you’ll be able to make quality decisions about their next progression with easy-to-see training data at your fingertips.</p>
            </li>
        </v-cols>

        <v-cols cols="12" md="3" sm="12" style="padding: 0px 50px 50px 50px;">
            <li class="card card--feature card--bordered"><img src="../assets/img/icons/feature-time.svg" alt="Save time and train more clients" class="filter-green">
                <h4>Double Down On Delivery Output &amp; Reclaim Your Time</h4>
                <p>Our workout builder gives you a big-picture view of a month in the past or in advance, so you know what your clients did or need while you're designing. This enables you to fast-track design, creation, delivery.</p>
            </li>
        </v-cols>

        <v-cols cols="12" md="3" sm="12" style="    padding: 0px 50px 50px 50px;">
            <li class="card card--feature card--bordered"><img src="../assets/img/icons/feature-video.svg" alt="Build your own self-branded video exercise library " class="filter-green">
                <h4>Self-Branded Video Exercise Demos</h4>
                <p>No more curating workouts on YouTube and linking them to exercises on a spreadsheet. Create your own videos, upload them to TrueCoach, Or use our library of over 1,200+ pre-loaded strength and conditioning exercise videos.</p>
            </li>
        </v-cols>
        <v-cols cols="12" md="3" sm="12" style="padding: 0px 50px 50px 50px;">
            <li class="card card--feature card--bordered"><img src="../assets/img/icons/feature-contact.svg" alt="Connect and engage with your clients" class="filter-green">
                <h4>Connect, Engage &amp; End Accountability Issues</h4>
                <p>We do the math on compliance numbers for every client program you create. You get an overall snapshot so you can give your attention to clients who need it, and use your coaching skills to move them forward.</p>
            </li>

        </v-cols>

    </v-row>

    <!-- card end -->

    <v-row style="background-color:white;padding:0px;" >
        <v-col cols="12" md="12" sm="12" class="d-md-block d-none">
            <div class="first-section-home">

            </div>

        </v-col>
    </v-row>

    <v-row style="width:100%;background-color:white;margin: 0px;padding :40px;background-color:#F2F3F4;">
        <!-- our coaches -->
        <div class="container">
            <div class="row">
                <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div class="our-team">
                        <div class="picture">
                            <img class="img-fluid" src="https://picsum.photos/130/130?image=1027">
                        </div>
                        <div class="team-content">
                            <h3 class="name">Michele Miller</h3>
                            <h4 class="title">Fitness trainer</h4>
                        </div>
                        <ul class="social">
                            <li><a href="https://codepen.io/collection/XdWJOQ/" class="fa fa-facebook" aria-hidden="true"></a></li>
                            <li><a href="https://codepen.io/collection/XdWJOQ/" class="fa fa-twitter" aria-hidden="true"></a></li>
                            <li><a href="https://codepen.io/collection/XdWJOQ/" class="fa fa-google-plus" aria-hidden="true"></a></li>
                            <li><a href="https://codepen.io/collection/XdWJOQ/" class="fa fa-linkedin" aria-hidden="true"></a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div class="our-team">
                        <div class="picture">
                            <img class="img-fluid" src="https://picsum.photos/130/130?image=839">
                        </div>
                        <div class="team-content">
                            <h3 class="name">Patricia Knott</h3>
                            <h4 class="title">Nutritionist</h4>
                        </div>
                        <ul class="social">
                            <li><a href="https://codepen.io/collection/XdWJOQ/" class="fa fa-facebook" aria-hidden="true"></a></li>
                            <li><a href="https://codepen.io/collection/XdWJOQ/" class="fa fa-twitter" aria-hidden="true"></a></li>
                            <li><a href="https://codepen.io/collection/XdWJOQ/" class="fa fa-google-plus" aria-hidden="true"></a></li>
                            <li><a href="https://codepen.io/collection/XdWJOQ/" class="fa fa-linkedin" aria-hidden="true"></a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div class="our-team">
                        <div class="picture">
                            <img class="img-fluid" src="https://picsum.photos/130/130?image=856">
                        </div>
                        <div class="team-content">
                            <h3 class="name">Justin Ramos</h3>
                            <h4 class="title">Fitness trainer</h4>
                        </div>
                        <ul class="social">
                            <li><a href="https://codepen.io/collection/XdWJOQ/" class="fa fa-facebook" aria-hidden="true"></a></li>
                            <li><a href="https://codepen.io/collection/XdWJOQ/" class="fa fa-twitter" aria-hidden="true"></a></li>
                            <li><a href="https://codepen.io/collection/XdWJOQ/" class="fa fa-google-plus" aria-hidden="true"></a></li>
                            <li><a href="https://codepen.io/collection/XdWJOQ/" class="fa fa-linkedin" aria-hidden="true"></a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div class="our-team">
                        <div class="picture">
                            <img class="img-fluid" src="https://picsum.photos/130/130?image=836">
                        </div>
                        <div class="team-content">
                            <h3 class="name">Mary Huntley</h3>
                            <h4 class="title">Nutritionist</h4>
                        </div>
                        <ul class="social">
                            <li><a href="https://codepen.io/collection/XdWJOQ/" class="fa fa-facebook" aria-hidden="true"></a></li>
                            <li><a href="https://codepen.io/collection/XdWJOQ/" class="fa fa-twitter" aria-hidden="true"></a></li>
                            <li><a href="https://codepen.io/collection/XdWJOQ/" class="fa fa-google-plus" aria-hidden="true"></a></li>
                            <li><a href="https://codepen.io/collection/XdWJOQ/" class="fa fa-linkedin" aria-hidden="true"></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- our coaches -->
    </v-row>

    <!-- footer  -->
    <v-col cols="12" md="12" sm="12" style="padding:0px;">
        <v-footer style="background-image: linear-gradient(to right, #34BE82,#00C853); width:101%; " padless>

            <v-row justify="center" no-gutters>
                <v-col cols="12" md="6" sm="12">
                    <div color="primary" flat tile class=" white--text text-center ">
                        <v-card-text>
                            <v-btn v-for="icon in icons" :key="icon" class="mx-4 white--text" icon>
                                <v-icon size="30px">
                                    {{ icon }}
                                </v-icon>
                            </v-btn>
                        </v-card-text>
                    </div>
                </v-col>
                <v-col cols="12" md="6" sm="12">
                    <v-card-text class="white--text pt-6 text-center  mx-4" style="font-size:large;">
                        Made with ❤️ in Egypt
                    </v-card-text>
                </v-col>
            </v-row>
        </v-footer>
    </v-col>
    <!-- footer  -->

</div>
</template>

<script>
export default {
    data: () => ({
        joinUs: '',

        icons: [
            'mdi-facebook',
            'mdi-twitter',
            'mdi-linkedin',
            'mdi-instagram',
        ],
        items: [{
                src: 'https://everfit.io/wp-content/themes/everfit/assets/images/homepage/webp/coaches-sub3.webp',
            },
            {
                src: 'https://everfit.io/wp-content/themes/everfit/assets/images/homepage/webp/coaches-sub1.webp',
            },
            {
                src: 'https://everfit.io/wp-content/themes/everfit/assets/images/homepage/webp/coaches-sub2.webp',
            },
            {
                src: 'https://everfit.io/wp-content/themes/everfit/assets/images/homepage/webp/coaches-sub4.webp',
            },
        ],
        model: null,

    }),

}
</script>

<style lang="scss">
.head-video {
    &::after {
        content: "";
        position: absolute;
        background: rgba(0, 0, 0, .5);
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;

    }
}

.vid-cont {
    position: relative;
    margin: 0px;
}

.xx {
    position: relative;
    text-align: center;
    color: black;
}

.container video {
    position: relative;
    z-index: 0;
}



.carousel-fade {
    position: relative;
    width: 100%;
    height: 100vh;
}

.clients-images.client-logos {
    display: block;
}

.clients-images.client-logos ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

}

.sec-mv__ttl {
    @media (max-width:1400px) {
        display: none;
    }
}

.clients-images.client-logos ul li {

    @media (min-width: 1025px) {
        width: 25%;
    }

}

.first-section-home {
    background-image: url("../assets/img/icons/reem.jpg");
    height: 100vh;
    background-size: cover;

    /* Control the height of the image */
    min-height: 380px;

    /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;

}

.tools-tab {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -4px;
}

.tools-tab .item {
    width: 34%;
    padding: 0 4px;
    margin-bottom: 8px;
}

li {
    list-style: none;
}

.tools-btn {
    padding: 10px;
}

.tools-btn {
    display: flex;
    flex-wrap: wrap;
    background: #f7faff;
    border: 1px solid #d9e7fc;
    box-shadow: 0 2px 4px rgb(12 12 46 / 10%);
    border-radius: 8px;
    // padding: 20px 20px 17px;
    cursor: pointer;
}

.tools-btn__img.mb {
    margin-bottom: 15px;

    @media (max-width: 1440px) {}
}

img {
    vertical-align: middle;
    max-width: 100%;
}

.tools-btn__ct {
    width: 100%;
}

.tools-btn__ttl {
    font-size: 15px;
    margin-bottom: 8px;

    @media (max-width: 1440px) {}
}

.tools-btn__txt {
    font-size: 14px;

    @media (max-width: 1440px) {}
}

.txt {
    text-decoration: none;
}

.our-team {
    padding: 30px 0 40px;
    margin-bottom: 30px;
    text-align: center;
    overflow: hidden;
    position: relative;
    background-color: white;
}

.our-team .picture {
    display: inline-block;
    height: 130px;
    width: 130px;
    margin-bottom: 50px;
    z-index: 1;
    position: relative;
}

.our-team .picture::before {
    content: "";
    width: 100%;
    height: 0;
    border-radius: 50%;
    background-color: #34BE82;
    position: absolute;
    bottom: 135%;
    right: 0;
    left: 0;
    opacity: 0.9;
    transform: scale(3);
    transition: all 0.3s linear 0s;
}

.our-team:hover .picture::before {
    height: 100%;
    background-color: #34BE82;

}

.our-team .picture::after {
    content: "";
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #34BE82;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
}

.our-team .picture img {
    width: 100%;
    height: auto;
    border-radius: 50%;
    transform: scale(1);
    transition: all 0.9s ease 0s;
}

.our-team:hover .picture img {
    box-shadow: 0 0 0 14px #34BE82;
    transform: scale(0.7);
}

.our-team .title {
    display: block;
    font-size: 15px;
    color: #34BE82;
    text-transform: capitalize;
}

.our-team .social {
    width: 100%;
    padding: 0;
    margin: 0;
    background-color: #34BE82;
    position: absolute;
    bottom: -100px;
    left: 0;
    transition: all 0.5s ease 0s;
}

.our-team:hover .social {
    bottom: 0;
}

.our-team .social li {
    display: inline-block;
}

.our-team .social li a {
    display: block;
    padding: 10px;
    font-size: 17px;
    color: white;
    transition: all 0.3s ease 0s;
    text-decoration: none;
}

.our-team .social li a:hover {
    color: #34BE82;
    background-color: #34BE82;
}

.card {
    background: #fff;
    border-radius: 7px;
    box-shadow: rgb(0 0 0 / 7%) 0 8px 25px 0;
    margin: 0 auto;
    max-width: 550px;
    padding: 20px 25px;
    width: 100%;
}

.card--bordered {
    border-top: 7px #34BE82 solid;
}

.card--feature {
    font-size: 15px;
    padding: 20px 30px;
    letter-spacing: 1px;
}

.sec-mv__wrap {
    position: absolute;
    width: 100%;

    transform: translateY(-295%);
    color: white;
    padding: 0 135px;
}

.sec-mv__ttl {

    font-size: 30px;
    text-align: center;
    font-weight: 600;
    letter-spacing: 0px;
    max-width: 960px;
    margin: 0 auto 26px;
    color: white;
}

.sec-mv__tm {
    max-width: 770px;
    font-size: 28px;
    letter-spacing: -.7px;
    margin: 0 auto 67px;
    text-align: center;
    line-height: 1.38;
    font-weight: 300;
    color: white;
}

.filter-green {
    filter: invert(55%) sepia(83%) saturate(321%) hue-rotate(102deg) brightness(94%) contrast(98%);
}

.text-color input {
    color: black !important;

}

.txt-div {
    padding: 20px;
    background-color: white;
}

.containerss {
    position: relative;
}

.containerss video {
    position: relative;
    z-index: 0;
}

.overlay {
    position: absolute;
    top: 25%;
    left: 22%;
    z-index: 1;
}

.p-txt {
    color: white;
    font-size: 30px;
    font-weight: 700;
    max-width: 1000px;
}

.btn-join {
    font-weight: 800;

}
</style>
