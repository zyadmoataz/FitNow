<template>
<div class="exercise_in_workout d-flex" v-if="myExercises">
    <div class="ex-img">
        <img class="mr-2" v-if="myExercises.images != null && myExercises.images.length > 0" :src=myExercises.images[0] style="border-radius: 10%;" alt="">
    </div>
    <div class="ex-info">
        <div class="ex-title">
          {{myExercises.title}}
        </div>
        <div class="primary_focus">
            Focus : {{myExercises.primary_focus}}
        </div>
    </div>
     </div>
</template>

<script>
export default {
    data() {
        return {
            myExercises: null
        }
    },
    props: {
        myExercise_id: Number
    },
    mounted() {
        this.getExercise()
    },
    methods: {
        getExercise() {
            const myloader = this.$vs.loading({
                target: this.$refs.mycontainer,
                color: '#34BE82'
            })
            this.$axios
                .get('/exercies/' + this.$props.myExercise_id)
                .then(response => {
                    myloader.close()
                    this.myExercises = response.data.data

                })
                .catch(error => {
                    myloader.close()
                    console.log(error)
                })
        },
    }
}
</script>
<style lang="scss">
.exercise_in_workout{

    .ex-img{
        img{
            height: 45px;
            width: 45px;
        }
    }
    .ex-title{
          font-weight: 600;
    font-size: 14px;
    line-height: 12px;
    color: rgb(34, 34, 34);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 130px;
    white-space: initial;
    line-height: 18px;
    }
    .primary_focus{
        font-size: 12px;
        color: rgb(102, 102, 102);
        margin-top: 5px;
    }
}
</style>