<template>
<div style="background-color: #FBFCFC;">
    <v-row>
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

                            <nuxt-link class="txt" to="../coach/training-home.vue" style="min-height: 15px;display:flex;">
                                <div>
                                    <img src="https://everfit.io/wp-content/themes/everfit/assets/images/homepage/icon/tools-icon1.svg" alt="Training online personal trainers software">
                                </div>
                                <div style="    vertical-align: middle;">Training</div>
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
    </v-row>

    <!-- end of nav  -->

    <!-- videoooo -->
    <v-row style="margin-top:0; margin-bottom:50px">
        <v-col cols="12" md="12" sm="12">
            <video class="pc" webkit-playsinline playsinline autoplay loop muted id="myVideo01" style="width: 100%; height: 100%;">
                <source src="../assets/img/icons/train.mp4" type="video/mp4">
            </video>
        </v-col>
    </v-row>
    <!-- videoooo  -->

    <!-- bottom -->

    <v-row style="background-color: #FBFCFC; ">
        <!-- left  -->
        <v-col cols="12" md="6" sm="12" class="scroll-style" style="height:100%; overflow-y: auto;">
            <div class="left-side" style="padding: 40px;">
                <h1 class="mb-6" style="font-size: 60px;color:#353535d6; ">
                    Build and Deliver Workout Programs in Minutes
                </h1>
                <h2 class="mb-6" style="color: rgb(52, 190, 130);font-size: 30px;font-weight: bold;">
                    Design any workout you can dream of using the fastest drag-and-drop builder on the market.
                </h2>
                <nuxt-link class="training-sign" to="/register">
                    <div style=" display:center;padding-top:30px;display: grid;">
                        <v-btn class="mb-6" x-large color="primary" elevation="3">SIGN UP</v-btn>
                    </div>
                </nuxt-link>
            </div>
        </v-col>
        <!-- left  -->

        <v-col cols="12" md="6" sm="12" class=" d-md-block d-none " style="height:100%; overflow-y: auto;">
            <div class="right"></div>
        </v-col>
    </v-row>
    <!-- bottom  -->

    <!-- footer  -->
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
    <!-- footer  -->

</div>
</template>

<script>
export default {
    data: () => ({

        icons: [
            'mdi-facebook',
            'mdi-twitter',
            'mdi-linkedin',
            'mdi-instagram',
        ],
    }),

}
</script>

<style>
.left-side {
    padding: 40px;
    font-size: 50px;
    font-weight: 600;
}

v-btn {
    border-radius: 10px;
    padding-top: 40px;
}

.right {
    background-image: url("../assets/img/icons/Fitness-Day-.jpeg");

    height: 100vh;
    background-size: cover;
}

@media (max-width:960px) {
    .right {

        background-image: url("../assets/img/icons/Fitness-Day-.jpeg");
        margin: -20px;
        width: initial;
        overflow-y: auto;
        height: 100vh;
        background-size: cover;
    }
}

.main {
    float: left;
}

.txt {
    text-decoration: none;
}
</style>
