<template>
<div>
   <topcards></topcards>
   <clientsChart></clientsChart>
</div>
</template>

<script>
import topcards from '@/components/coach/home/top-cards.vue'
import clientsChart from '@/components/coach/home/client-chart.vue'
export default {
  layout:'CoachLayout',
  components:{
    topcards,
    clientsChart
  }
}
</script>
