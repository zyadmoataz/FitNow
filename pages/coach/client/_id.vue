<template>
<div>
    <FitBreadcumb :breadcrumbPath="breadcrumbPath"></FitBreadcumb>

    <div>
        <progresss v-if="client" :client="client"/>
    </div>

</div>
</template>

// 
<script>
import progresss from '@/components/coach/global/progresss.vue'

export default {
    layout: 'CoachLayout',

    components: {
        progresss
    },

    data() {

        return {
            breadcrumbPath: [{
                    text: "Home",
                    disabled: false,
                    href: '/',
                },
                {
                    text: 'Trainee Progress',
                    disabled: true,
                    href: '',
                },
            ],
            client:''

        }
    },
    mounted(){
        this.fetchClient();
    },
    methods: {
        async fetchClient() {
            /*  ======= Start Loader  ======= */
            const myloader = this.$vs.loading({
                target: this.$refs.mycontainer,
                color: '#34BE82'
            })
            await this.$axios.get('/coach-trainees/show/'+this.$route.params.id).then((response) => {
                this.client = response.data.data;
                console.log(response)

            }).catch(function (error) {
                console.log(error.response)

            });
            myloader.close();
        },
    }
}
</script>

<style>
h3 {
    color: #34be82;
}
</style>
