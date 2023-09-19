<template>
<div>
    <FitBreadcumb :breadcrumbPath="breadcrumbPath"></FitBreadcumb>

    <v-card class="fit-card" v-if="myProgram != null">
        <v-card-title class="fit-card-title mb-2">
            {{myProgram.program.title}}
        </v-card-title>
        <div class="week">
            <v-row v-for="(week,index) in program_weeks" :key="index">
                <v-col v-for="day in getProgramDays(index + 1)" :key="day.id">
                    <div class="day">
                        <div class="headerDay">
                            <span>DAY {{day.day_num}}</span>
                            <v-tooltip right>
                                <template v-slot:activator="{ on, attrs }">

                                    <v-icon v-bind="attrs" v-on="on" class="add-workout" @click="AddWorkout(day)">
                                        mdi-plus
                                    </v-icon>

                                </template>
                                <span style="color:#fff">Add Workout</span>
                            </v-tooltip>

                        </div>
                        <div class="list">
                            <draggable class="dragArea list-group" :list="day.workout" :group="{ name: 'people', pull: pullFunction }" v-if="day.workout">
                                <div class="list-group-item">
                                    <div class="exercise" @click="EditWorkout(day.workout)">
                                        <div class="head d-flex">
                                            <div class="exerciseHead">{{ day.workout.title }}</div>
                                            <div class="exerciseContent">{{ GetTotalEx(day.workout) }}</div>
                                        </div>
                                        <ul class="sections">
                                            <li v-for="section in day.workout.sections" :key="section.id">
                                                <div class="section-title">{{ section.title }}</div>
                                                <div class="section-ec-totla">
                                                    <v-icon class="mr-2">mdi-dumbbell</v-icon>{{GetTotalExSection(section)}}
                                                </div>
                                            </li>
                                        </ul>
                                    </div>

                                </div>
                            </draggable>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </div>
        <newTemplate @refetch-program="getProgram" @close="closeNewTemplate" v-if="AddNewWorkout" :program_id="myProgram.program_id" :current_day="current_day"></newTemplate>
    </v-card>
    <EditWorkout v-if="editWorkout" @refetch-workouts="getProgram" :workout_id="current_edit_id" @closeEdit="closeEdit"></EditWorkout>

</div>
</template>

<script>
import draggable from 'vuedraggable';
import EditWorkout from '@/components/coach/Workout/edit.vue'

import newTemplate from '@/components/coach/program/workouts/addFromTemplate.vue'
export default {
    name: "clone-on-control",
    display: "Clone on Control",
    order: 1,
    components: {
        draggable,
        newTemplate,
        EditWorkout

    },
    layout: 'CoachLayout',
    computed: {
        program() {
            if (this.myProgram != null && this.myProgram.program != null) {
                return this.myProgram.program
            }
        },
        program_weeks() {
            return new Array(this.myProgram.program.weeks);

        },
    },
    data() {
        return {
            program_days: [],
            myProgram: null,
            breadcrumbPath: [{
                    text: 'Coach',
                    disabled: false,
                    href: '/',
                },
                {
                    text: 'Program',
                    disabled: false,
                },
                {
                    text: 'Calender Program',
                    disabled: false,
                },
            ],
            AddNewWorkout: false,
            current_day: null,
            current_edit_id: 0,
            editWorkout: false

        }
    },
    mounted() {
        this.getProgram();
    },
    methods: {
        EditWorkout(workout) {
            this.editWorkout = true;
            this.current_edit_id = workout.id;
        },
        closeEdit() {
            this.editWorkout = false;
            this.current_edit_id = 0;
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
        GetTotalExSection(item) {
            var total = 0;
            if (item.exercises != null && item.exercises.length > 0) {
                total += item.exercises.length
            }

            return total;
        },
        AddWorkout(day) {
            this.current_day = day;
            this.AddNewWorkout = true;
        },
        closeNewTemplate() {
            this.AddNewWorkout = false
        },
        getProgramDays(week) {

            var end = (week * 7);
            var start = end - 7;
            console.log(week)
            console.log(this.program.days.filter(obj => obj.day_num >= start && obj.day_num <= end))
            return this.program.days.filter(obj => obj.day_num > start && obj.day_num <= end)

        },
        clone({
            name
        }) {
            return {
                name,
                id: idGlobal++
            };
        },
        pullFunction() {
            return this.controlOnStart ? "clone" : true;
        },
        start({
            originalEvent
        }) {
            this.controlOnStart = originalEvent.ctrlKey;
        },

        getProgram() {
            const myloader = this.$vs.loading({
                target: this.$refs.mycontainer,
                color: '#34BE82'
            })
            this.$axios
                .get('/assign-program/' + this.$route.params.id)
                .then(response => {
                    myloader.close()
                    this.myProgram = response.data.data
                    console.log(this.myProgram)
                })
                .catch(error => {
                    myloader.close()
                    console.log(error)
                })
        },
    }
};
</script>

<style lang="scss" scoped>
.week {}

.day {
    border-radius: 5px;
    background-color: #f3f5f8;
    padding: 10px;
    overflow: hidden;
}

.headerDay {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;

    span {
        color: #47bd8a;
        font-size: 12px;
    }
}

.list {

    overflow: hidden;
    height: 153px;
    padding: 0;

}

.list-group-item {
    cursor: pointer;
    padding: 0;
    margin-bottom: 5px;
    border-radius: 5%;

}

.exercise {
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 0px 0px 4px 2px #b3b3b37a;
    padding: 5px;
    border: 1px solid #fff;
    margin-bottom: 10px;
    transition: 300ms ease-in-out;
    display: block;
    max-height: 200px;
    overflow-y: scroll;
      &::-webkit-scrollbar {
            width: 0.1em;
        }

        &::-webkit-scrollbar-track {
            box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        }

        &::-webkit-scrollbar-thumb {
            background-color: rgb(201, 201, 201);
            border-radius: 5px;
        }
    .head {
        justify-content: space-between;
            align-items: center;
    }

    &:hover {
        border: 1px solid $primary-color;
        transition: 300ms ease-in-out;
    }

    .sections {
        text-align: left;
        margin: 5px 0;
        padding: 0;
        border-radius: 5px;

        li {
            padding: 5px 10px !important;
            border: 1px solid #e8e8e8;

            border-left: 3px solid #cdd1db;
            margin-bottom: 5px;
            text-align: right;
            color: #161f38;

            .section-title {
                font-size: 14px;
                color: #000;
                font-weight: bold;
            }

            .section-ec-totla {
                font-size: 12px;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                font-weight: bold;

                i {
                    font-size: 12px;
                    font-weight: bold;
                    color: #000;
                }
            }
        }
    }

    .exerciseHead {

        font-size: 14px;
        color: $primary-color;
        font: bold;
    }

    .exerciseContent {
        font-size: 10px;
        color: black;

    }

}

.add-workout {
    background: #919191;
    color: #fff;
    border-radius: 50%;
    font-size: 18px;
    padding: 1px;
}
</style>
