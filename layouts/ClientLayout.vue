<template>
<v-app ref="myapp">
    <Nuxt />
</v-app>
</template>

<script>
export default {
    name: 'ClientLayout',
    //  middleware: ['FitNowAuth'],
    auth: true,

    data() {
        return {
            drawer: false,
            loading: true,
            myloader: null,
            status: 0,
            token: null,
         
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
  

    }
}
</script>

<style lang="scss" scoped>
.fit_logo_block {
    padding: 5px 10px;
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 14rem;
    background: #fff;
    z-index: 3;

    i {
        font-size: 18px;
        padding-left: 55px;
    }
}

.fit_logo {
    display: flex;
    padding: 1rem 0;
    align-items: center;

    .fit_icon {
        height: 40px;
        margin-right: 15px;
    }

    .fit_logo_text {
        height: 40px;
    }
}

.load_coach {

    height: 100vh;
    display: flex;
    align-items: center;

    justify-content: center;
}
</style>
