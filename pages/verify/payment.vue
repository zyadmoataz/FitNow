<template>
<div class="verify-page">
    <v-row style="height:100vh; overflow:hidden;margin:0">
        <v-col cols="12" md="12" sm="12" class="scroll-style" style="padding:0;height:100%;overflow-y: auto">
            <div class="auth-steps">
              
                <div class="steps-container">
                    <v-icon class="done-icon" color="primary">mdi-check-decagram</v-icon>
                    <h1>Payment Done!</h1>
                    <p>Coach will start creating the customized program for you it will take 5-8 days, if the coach not deliver after 10 days the money will refund automatic.</p>
                </div>
            </div>
        </v-col>
    </v-row>
</div>
</template>

<script>
import verifyComp from '~/components/global/register/verify.vue'
export default {
    auth:false,
    components: {
        verifyComp
    }
}
</script>
<style lang="scss" scoped>
.verify-page{
    background: #F8F8F8;
    text-align: center;
}

.auth-steps {
    width: 30% !important;
    margin: 4rem auto;
    margin-top: calc(100% - 95%);
   height: 90%;
    text-align: center;
    .steps-container{
      height: 90%;
    background-color: #fff;
    padding: 2rem 8%;
    border-radius: 10px;
    box-shadow: 0px 0px 20px 20px #f1f1f169;
    }
      @media (max-width:760px) {
          width: 90% !important;
      }
      h1{
        font-size:30px;
        margin-bottom:1rem
      }
      p{
        font-size:18px
      }
}
.done-icon{
    font-size: 100px;
    margin-bottom: 2rem;
}
.logo {
    padding: 0.5rem 0;
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;
    @media (max-width:760px) {
        margin-bottom: 2rem;
    }

    svg {
        height: 50px;

        @media (max-width:760px) {
            height: 40px;
        }
    }
}
</style>
