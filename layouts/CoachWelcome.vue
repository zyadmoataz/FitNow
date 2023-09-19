<template>
<v-app>
    <v-main class="app-content" style="margin:2rem 40px;">
        <horizontalnavmenu @closedrawer="closedrawer" />
        <Nuxt />

    </v-main>

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
            status: 0,
            myloader:null
        }
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
            if (this.status != 2) {
                this.$router.push('/coach')
            }
        }
        this.myloader.close();

    },
    methods: {
        async checkStatus() {
            await this.$axios.get('/coach/checkstatus').then((response) => {
                this.status = response.data.data.status;
            }).catch(function (error) {
                console.log(error.response)

            });
        },
        closedrawer() {

            this.drawer = !this.drawer;

        },
        async getuser() {
            await this.$axios.get('/user').then((response) => {
                console.log(response)
                localStorage.setItem("user", JSON.stringify(response.data))
            }).catch(function (error) {
                console.log(error.response)

            });
        },
    }
}
</script>
