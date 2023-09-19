<template>
<v-dialog v-model="dialog" max-width="48%">
    <v-card class="fit-dailog-card">
        <v-card-title class="fit-card-title-dialog">
            Find a Workout
        </v-card-title>

        <v-card-text style="padding:0" v-if="workouts">
            <form ref="form" lazy-validation class="form">
                <v-row style="margin:0">
                    <v-col cols="12" md="7" sm="12" style="padding:0;">
                        <div class="firstHalf" style="padding:0;">
                            <v-text-field v-model="search" @keyup="searchfilter" append-icon="mdi-magnify" label="Search" single-line hide-details outlined></v-text-field>
                            <v-spacer></v-spacer>
                            <br>
                            <p>MOST RECENT ({{workouts.length}})</p>

                            <div class="workouts-list">
                                <div :class="['workout-block', {'active-workout' : active_workout == workout}]" @click="active_workout=workout" v-for="(workout ) in workouts" :key="workout.id">
                                    <div class="name">
                                        <h3> {{ workout.title }}</h3>
                                        <div class="content">
                                            {{GetTotalEx(workout)}}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </v-col>
                    <v-col class="aa" cols="12" md="5" sm="12" style="padding:0;">
                        <div class="secondHalf">
                            <div class="frame">

                                <div v-if="active_workout">
                                    <div class="bgwork">
                                        <h3 style="color:white;"> {{ active_workout.title }}</h3>
                                        <div class="content">
                                            {{GetTotalEx(active_workout)}}
                                        </div>
                                    </div>
                                    <div class="description">Description</div>
                                    <div class="text">{{ active_workout.description }}</div>
                                    <div class="workout_exercises" v-for="(exercise ) in active_workout.workout_exercieses" :key="exercise.id" style="padding: 10px 15px;">
                                        <exerciseBlock :myExercise_id="exercise.details.id"></exerciseBlock>
                                    </div>
                                    <div class="workout_sections" v-for="(section ) in active_workout.sections" :key="section.id">
                                        <div class="section-title">
                                            {{section.title}}
                                        </div>
                                        <div class="workout_exercises" v-for="(exercise ) in section.exercises" :key="exercise.id" style="padding: 10px 15px;">
                                            <exerciseBlock :myExercise_id="exercise.details.id"></exerciseBlock>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </v-col>

                </v-row>
            </form>

        </v-card-text>

        <v-card-actions class="d-flex justify-end">
            <v-btn class="mt-4 mb-4 mr-4 fit-btn" outlined color="primary" @click="dialog = false">
                Cancel
            </v-btn>
            <v-btn class="mt-4 mb-4  fit-btn" color="primary" @click="AddWorkOut">
                Add To Day
            </v-btn>

        </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script>
import draggable from 'vuedraggable';
import exerciseBlock from './exercise.vue';
export default {
    display: "List",
    order: 1,
    components: {
        draggable,
        exerciseBlock
    },
    watch: {
        dialog() {
            // this.$emit('close')
        }
    },
    props:{
        current_day:Object,
        program_id:Number
    },
    data() {
        return {
            current: 1,
            search: "",
            dialog: true,
            dialogDelete: false,
            isHidden: true,

            filterdList: null,
            workouts: [],
            active_workout: null,

        };
    },
    mounted() {
        this.fetchWorkouts()
    },
    watch:{
        dialog(val){
            if(!val){
                 this.$emit('close');
            }
        }
    },
    methods: {

        async fetchWorkouts() {
            /*  ======= Start Loader  ======= */
            const myloader = this.$vs.loading({
                target: this.$refs.mycontainer,
                color: '#34BE82'
            })
            await this.$axios.get('/workouts/list').then((response) => {
                this.workouts = response.data.data.data;
                this.active_workout = this.workouts[0];
                console.log(response)

            }).catch(function (error) {
                console.log(error.response)

            });
            myloader.close();
        },
        async AddWorkOut() {
            var here = this;
            /*  ======= Start Loader  ======= */
            const myloader = this.$vs.loading({
                target: this.$refs.mycontainer,
                color: '#34BE82'
            })

            var data = {
                workout_id: this.active_workout.id,
                program_id: this.$props.program_id,
         
            }
            /* ======= Send To API  ======= */
            await this.$axios.post('/programs/addWorkoutToDay/'+this.$props.current_day.id, data, {
                'Content-Type': 'multipart/form-data',
            }).then((response) => {
                myloader.close();

                //Send Notification if success
                here.$vs.notification({
                    position: 'top-right',
                    title: 'Success',
                    text: 'Workout Added Successfully',
                    color: 'success',
                    icon: '<i aria-hidden="true" class="v-icon notranslate mr-2 mdi mdi-check theme--light primary--text"></i>'
                })

                //redirect to list
                here.$emit('close');
                here.$emit('refetch-program');

            }).catch(function (error) {
                myloader.close();

                //Send Notification if error
                here.$vs.notification({
                    position: 'top-right',
                    title: 'danger',
                    text: error.response.data.message,
                    color: 'danger',
                    icon: '<i aria-hidden="true" class="v-icon notranslate mr-2 mdi mdi-check theme--light primary--text"></i>'
                })
                console.log(error.response)

            });
        },
        GetTotalEx(item) {
            var total = 0;
            if (item.workout_exercieses != null && item.workout_exercieses.length > 0) {
                total += item.workout_exercieses.length
            }
            if (item.sections != null && item.sections.length > 0) {
                item.sections.forEach(element => {

                    total += element.exercises.length
                });

            }
            var x = total > 1 ? 'Exercises' : 'Exercise';
            return total + ' ' + x;
        },
        searchfilter() {
            console.log(this.search)
            const search = this.search.toLowerCase();

            if (!search || search == '') {
                this.filterdList = null;
            }

            this.filterdList = this.workouts.filter(c => c.name.toLowerCase().includes(search));
        },
        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        log: function (evt) {
            window.console.log(evt);
        }
    }
};
</script>

<style lang="scss" scoped>
.fromTemplate {
    margin-right: 1rem;
    align-items: center;
    text-align: center;
    font-size: 8px;
    height: 90%;
    padding: 2rem;
    border: 1px solid #a2a2a2;
    border-radius: 5%;
    cursor: pointer;
    height: 250px;

    &:hover {
        transition: 300ms;
        border: 1px solid #34BE82;
    }

    &:hover .choose-image path {
        transition: 300ms;
        fill: #31e195a8
    }
}

.list-group-item {
    cursor: pointer;
    box-shadow: rgb(240 240 240) 1px 1px 1px 1px;
}

.name {
    margin-top: 8px;
}

.content {
    display: flex;

    p {
        margin-right: 10px;
        margin-top: 8px;
    }

}

.firstHalf {
    background-color: white;
    padding: 15px 0px 9px;
    padding-right: 10px;
    margin-right: 13px;
}

.secondHalf {
    background-color: #f1f1f1;
    height: 100%;
    padding: 1rem 2rem;
}

.frame {
    padding: 0;
    border: 10px solid white;
    border-radius: 20px 20px 0 0;
    height: 100%;
    width: 100%;
    z-index: 50;
    overflow: hidden;
    position: relative;

    .description {
        font-weight: bold;
        font-size: 11px;
        line-height: 15px;
        color: rgb(34, 34, 34);
        padding: 10px 10px 10px;
    }

    .text {
        font-weight: normal;
        font-size: 12px;
        line-height: 16px;
        color: rgb(34, 34, 34);
        margin: auto;
        padding: 0 10px 10px;
    }

}

.bgwork {
    background: url("@/assets/img/workout_preview_bg.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    margin: auto;
    width: 100%;
    padding: 0 1.5rem;
    padding-top: 2rem;
    position: relative;
    padding-bottom: 2rem;

    &::before {
        content: "";
        width: 50%;
        border-radius: 7px;
        background-color: #fff;
        height: 20px;
        display: block;
        position: absolute;
        top: -5px;
        left: 68px;

    }

    h3 {
        font-weight: bold;
        font-size: 18px;
        line-height: 130%;
        color: rgb(255, 255, 255);
        -webkit-box-orient: vertical;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        overflow: hidden;
        margin-bottom: 5px;
    }

    .content {
        font-weight: bold;
        font-size: 10px;
        line-height: 14px;
        letter-spacing: 0.3px;
        text-transform: uppercase;
        color: rgb(255, 255, 255);
        opacity: 0.6;
    }

}

.exercise {
    display: flex;
    align-items: center;

}

.media {
    display: flex;
    align-items: center;
    justify-content: center;

}

h2 {
    color: #34BE82;
}

.workouts-list {
    border-radius: 8px 8px 0px 0px;
    border-top: 1px solid rgb(240, 240, 240);
    border-right: 1px solid rgb(240, 240, 240);
    border-left: 1px solid rgb(240, 240, 240);
    border-image: initial;
    border-bottom: none;
    overflow: hidden overlay;
    flex: 1 1 0%;

}

.workout-block {
    padding: 10px 15px;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    color: rgb(0, 0, 0);
    cursor: pointer;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
    box-shadow: rgb(240 240 240) 0px -1px 0px inset;

    .content {
        font-weight: normal;
        font-size: 13px;
        line-height: 18px;
        color: rgb(130, 129, 128);
    }
}

.active-workout {
    background: #e4fff3;

    h3 {
        color: #0c9d5e
    }
}

.workout_sections {
    padding: 5px;
    margin: 1rem;

    .section-title {
        color: #000;
        font-weight: bold;
        margin-bottom: 1rem;

    }
}
</style>
