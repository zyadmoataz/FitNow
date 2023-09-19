
<template>
<div>
   <Nuxt/>
   <FitBreadcumb :breadcrumbPath="breadcrumbPath"></FitBreadcumb>
   <postfeed />


</div>
</template>

<script>
import postfeed from '@/components/coach/global/postfeed.vue'

export default {
    layout:'CoachLayout',
  components:{
    postfeed,


  },

  data() {
        return {
            breadcrumbPath: [{
                    text: 'Dashboard',
                    disabled: false,
                    href: '/coach',
                },
                {
                    text: 'Jobs Feed',
                    disabled: true,
                    href: '/index',
                    // change the herf donot forget
                },
            ],

        }
    }

}
</script>
<style >

</style>

