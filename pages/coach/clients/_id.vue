<template>
<div>
    <FitBreadcumb :breadcrumbPath="breadcrumbPath"></FitBreadcumb>

    <div>
         <progresss />
    </div>


</div>
</template>

// <script>

import progresss from '/components/coach/global/progresss.vue'


export default {
    layout: 'CoachLayout',


     components: { progresss },

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

        }
    }
}
</script>

<style>
h3 {
    color: #34be82;
}
</style>


