<template>
<div style="  background-color: white;
">
    <v-row>
        <nav>
            <v-app-bar app dense flat style=" background-color: rgba(0, 0, 0, .4);">
                <v-toolbar-title>
                    <span style="color :white;"> FitNow</span>
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

                            <nuxt-link class="txt" to="../coach/training-home.vue" style="min-height: 15px;display:flex;">
                                <div>
                                    <img src="https://everfit.io/wp-content/themes/everfit/assets/images/homepage/icon/tools-icon1.svg" alt="Training online personal trainers software">
                                </div>
                                <div style="    vertical-align: middle;">Training</div>
                            </nuxt-link>
                        </v-list-item>
                    </v-list>
                </v-menu>
                <div style=" color: white;background: center bottom;margin: 10px;">
                    pricing </div>
                <nuxt-link class="txt" to="/login">
                    <div style="   color: white; background: center bottom;margin: 10px;">
                        sign in </div>
                </nuxt-link>

            </v-app-bar>
        </nav>
    </v-row>

    <v-row style="background-color: #f9f9f9;">
        <v-col cols="12" md="6" sm="12">
            <div style="margin: 85px -5px 40px 10px; padding:60px;">
                <h1 style="color: rgb(52, 190, 130);font-weight: normal;font-size: 50px;">
                    Payment
                </h1>
                <p style="line-height: 2;font-size: 20px;">
                    payment plan is more than comfortable for both our coaches and trainees especially since it’s not based on subscriptions.The payment method depends on subscription package that may be annoying for most of trainees.Payment method is very flexible in our application it offer to the trainee easy experience with variety options trainee only pays for his customized package that he agrees on with the coach , we only take a 10 % fees from the coach side.

                </p>
            </div>
        </v-col>
        <v-col cols="12" md="5" offset-md="1" class="d-md-block d-none">
            <div style="margin-top:70px background-color: rgb(249, 249, 249);">
                <img class="cardd" style="width: 90%;margin-top: 55px;height: 70vh;" src="../../assets/img/icons/payment2.jpeg">
            </div>
        </v-col>
    </v-row>
    <v-row>
        <div class="cell well questions__area" style="margin-top:70px;">
            <div class="questions__wrap">
                <div class="left_faq_text">
                    <div class="guarantee__text">
                        <h4>What is the<br>FitNow Guarantee?</h4>
                        <p class="our__content">We are confident that FitNow will save you time and deliver a better experience to your clients while growing your training businesses. So confident, we have introduced the TrueCoach Guarantee.</p>

                    </div>
                </div>
            </div>
        </div>

        <div class="cell well questions__area" style="margin-top:70px;">
            <div class="questions__wrap">
                <div class="left_faq_text">
                    <div class="guarantee__text">
                        <h4>How our payment<br> happen?</h4>
                        <p class="our__content">Payment method is very flexible in our application trainee only pays for his customized package that he agrees on with the coach , we only take a 10 % fees from the coach side.</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="cell well questions__area" style="margin-top:70px;">
            <div class="questions__wrap">
                <div class="left_faq_text">
                    <div class="guarantee__text">
                        <h4>What is new<br>we provid?</h4>
                        <p class="our__content"> we thought of creating a new powerful freelance and training platform to combine health care and freelancing
To unlock a new track and launch a new service to the market </p>
                    </div>
                </div>
            </div>
        </div>
    </v-row>

    <v-row>
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
    </v-row>

</div>
</template>

<script>
export default {
data:({

        icons: [
            'mdi-facebook',
            'mdi-twitter',
            'mdi-linkedin',
            'mdi-instagram',
        ],
})
}
</script>

<style>
.well {
    margin-bottom: 50px;
    margin-top: 50px;
}

.cell {
    margin-left: auto;
    margin-right: auto;
    max-width: 1240px;
}

.row {
    padding-left: 20px;
    padding-right: 20px;
}

.questions__area .mb4.tac {
    color: #2f3745;
    font-size: 36px;
    line-height: 44px;
}

.tac {
    text-align: center;
}

.mb4 {
    margin-bottom: 40px !important;
}

.questions__wrap {
    display: flex;
    flex-wrap: wrap;
}

.questions__wrap .left_faq_text {
    max-width: 348px;
    width: 100%;
}

.guarantee__text {
    grid-row: 1/4;
    border: 2px solid #94e2c1;
    box-sizing: border-box;
    border-radius: 20px;
    padding: 35px 30px 51px;
    position: relative;
}

.guarantee__text h4 {
    color: #34be82;
    font-style: normal;
    font-weight: 800;
    font-size: 24px;
    line-height: 29px;
    margin-bottom: 10px;
}

.guarantee__text .our__content {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    color: #2f3745;
    line-height: 19px;
}

.questions__area p {
    font-size: 14px;
    font-weight: 500;
    line-height: 17px;
    color: #2f3745;
}

.txt {
    text-decoration: none;
}
</style>
