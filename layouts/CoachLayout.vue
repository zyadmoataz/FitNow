<template>
<v-app ref="myapp">
    <div v-if="loading">
        <v-card class="load_coach">
            <div class="fit_logo_block">
                <nuxt-link class="fit_logo" to="/">
                    <svg class="fit_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 149.03 175.73">
                        <defs>

                            
<style>
.cls-1 {
    fill: #34be82;
}
</style>
                        </defs>
                        <title>FitNow</title>
                        <g id="Layer_2" data-name="Layer 2">
                            <g id="Layer_1-2" data-name="Layer 1">
                                <path class="cls-1" d="M121,112.48c-11.34-7.55-24-12.12-36.95-16-39.18-11-63.55-1.92-63.55-1.92C32.56,99.31,74.64,113,93.33,124.94c-.07,0-48-15.6-75.4-17.72a62.88,62.88,0,0,0,5.68,29.95,64,64,0,0,0,22.61,27.07c15.25,10.22,32,13.69,50.08,10.15,1.47-.29,2.93-.65,4.39-1,.1,0,.18-.13.27-.19C99.72,169.08,90.42,156,70.5,146.33,84.22,149,101.59,160,111.76,169c16.47-7.36,23.7-18.58,25.36-22.23,2.71-5.94,2.44-11.78-.35-17.65-3.47-7.27-9.26-12.33-15.76-16.66" />
                                <path class="cls-1" d="M143,83.81a88.27,88.27,0,0,0-7.37-12.31,76.68,76.68,0,0,0-6.89-8,1.64,1.64,0,0,1-.52-1.64,3.4,3.4,0,0,1,.29-.8c3.78-8,6.36-16.23,6-25.16a28,28,0,0,0-4.71-15c-7.06-10.48-17.2-16.13-29.18-19a73,73,0,0,0-33.43-.06c-10,2.31-18.88,6.83-25.71,14.78C35.41,23.77,33.34,32,34.33,41.18A59.17,59.17,0,0,0,39.52,59.6c.17.37.31.66.43.9a5.92,5.92,0,0,0,.48.83s22.15,1.36,35.08,5.36a72.87,72.87,0,0,1,16.81,6.39,242.26,242.26,0,0,0-62.06-2.52A259.72,259.72,0,0,0,0,75c0,.22,0,.43,0,.64l10.32,0c5.37,0,10.73.14,16.08.37a317.92,317.92,0,0,1,47.21,5.32A187.77,187.77,0,0,1,115.71,94.3a95.22,95.22,0,0,1,21,12.6c1.51,1.23,3,2.51,4.37,3.87a87.82,87.82,0,0,1,7.24,8.48c2.45-12.6-2.23-28.77-5.36-35.44M83.3,44.65a67,67,0,0,0-27.49,5.86c-2-5.55-3.63-11.69-2.26-17.46C55,26,64,22.23,69.88,20.63A54.19,54.19,0,0,1,91,19.33c8.37,1,16.09,3.52,22,10.07a10.27,10.27,0,0,1,2.75,6c.44,4.84-.82,9.38-2.59,13.8a14,14,0,0,1-1,1.89A66.93,66.93,0,0,0,83.3,44.65" />
                            </g>
                        </g>
                    </svg>
                    <svg class="fit_logo_text" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 367 77.7">
                        <title>Asset 3</title>
                        <g id="Layer_2" data-name="Layer 2">
                            <g id="Layer_1-2" data-name="Layer 1">
                                <path d="M72.35,10.9h10.9V0H72.35Zm0,66.8h10.9V19.17H72.35Z" />
                                <polygon points="350.77 62.5 367 19.17 355.39 19.17 344.31 48.42 350.77 62.5" />
                                <polygon points="340.56 58.02 322.7 19.17 310.29 19.17 293.44 58.02 277.59 19.17 265.99 19.17 289 77.7 297.77 77.7 297.67 77.6 297.88 77.7 316.44 34.21 336.12 77.7 345 77.7 347.2 71.85 340.56 58.02" />
                                <path d="M128.36,30.07V19.17h-24V0H93.44V64.58A13.1,13.1,0,0,0,106.56,77.7h21.8V66.8h-21.8a2.24,2.24,0,0,1-2.22-2.22V30.07Z" />
                                <path d="M181.33,19.17H134.91V77.7h10.9V32.29A2.24,2.24,0,0,1,148,30.07h33.3a2.24,2.24,0,0,1,2.22,2.22V77.7h10.9V32.29a13.09,13.09,0,0,0-13.12-13.12" />
                                <path d="M250.25,19.17H217a13.1,13.1,0,0,0-13.12,13.12V64.58A13.1,13.1,0,0,0,217,77.7h33.3a13.1,13.1,0,0,0,13.12-13.12V32.29a13.09,13.09,0,0,0-13.12-13.12m2.22,45.41a2.24,2.24,0,0,1-2.22,2.22H217a2.24,2.24,0,0,1-2.22-2.22V32.29A2.24,2.24,0,0,1,217,30.07h33.3a2.24,2.24,0,0,1,2.22,2.22Z" />
                                <rect x="17.92" y="35.92" width="37.78" height="10.9" />
                                <polygon points="10.9 35.92 10.9 15.94 66.6 15.94 66.6 5.04 0 5.04 0 77.7 10.9 77.7 10.9 46.82 10.9 35.92" />
                            </g>
                        </g>
                    </svg>
                </nuxt-link>


            </div>
        </v-card>
    </div>
    <div v-else>
        <verticalmenu :mobiledrawer="drawer" />
        <v-main class="app-content" style="margin:2rem 40px;">
            <horizontalnavmenu @closedrawer="closedrawer" />
            <Nuxt />
        </v-main>
    </div>
</v-app>
</template>

<script>
import verticalmenu from '@/components/coach/global/vertical-nav-menu'
import horizontalnavmenu from '@/components/coach/global/horizontal-nav-menu'

export default {
    name: 'CoachLayout',
    //  middleware: ['FitNowAuth'],
    auth: true,
    components: {
        verticalmenu,
        horizontalnavmenu
    },
    data() {
        return {
            drawer: false,
            loading: true,
            myloader: null,
            status: 0,
        }
    },

    methods: {
        closedrawer() {

            this.drawer = !this.drawer;

        },
        async checkStatus() {
            await this.$axios.get('/coach/checkstatus').then((response) => {
                this.status = response.data.data.status;
            }).catch(function (error) {
                console.log(error.response)

            });
        },
    },
    async mounted() {
        this.myloader = this.$vs.loading({
            target: this.$refs.myapp,
            text: 'Loading your data ...',
            color: '#34BE82'

        })
        if (!this.$myuser()) {
            return this.$router.push('/login')
        // } else if (this.$myuser().email_verified_at == null) {
        //     this.$router.push('/verify/not-verified')
        // } else {
            await this.checkStatus();
            if (this.status == 2) {
                this.$router.push('/coach/welcome')
            }
        }
        this.loading = false;
        this.myloader.close();

    }
}
</script>
<style lang="scss" scoped>
.fit_logo_block{
    padding: 5px 10px;
    display: flex;
justify-content: center;
      width: 100%;
      margin-bottom: 14rem;
    background: #fff;
    z-index: 3;
    i{
        font-size: 18px;
        padding-left: 55px;
    }
}
.fit_logo{
  display: flex;
    padding:1rem 0;
    align-items:  center;

  .fit_icon{
    height: 40px;
    margin-right: 15px;
  }
  .fit_logo_text{
    height: 40px;
  }
}
.load_coach{

    height: 100vh;
    display: flex;
    align-items: center;

    justify-content: center;
}
</style>
