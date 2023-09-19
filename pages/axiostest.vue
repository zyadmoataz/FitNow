<template>
    <div>
        {{user.fullname}}
          {{user.id}}
    </div>
</template>
<script>
export default {
    data(){
        return{
            user:{}
        }
    },
    methods:{
        async getuser(data){
           
            await this.$axios.get('/user').then((response) => {
                this.user = response.data;
                console.log(response)

            
            }).catch(function (error) {
                console.log(error.response)
        
            });
        }
    },
    mounted(){
        this.getuser();
    }
}
</script>