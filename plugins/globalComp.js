import Vue from 'vue'
import FitBreadcumb from '@/components/global/FitBreadcumb.vue'

const components = { FitBreadcumb }




Object.entries(components).forEach(([name, component]) => {
    Vue.component(name, component)
})



export default function({ store }, inject) {
    const myuser = () => store.state.authStore.userData;
     inject( 'myuser', myuser);



}