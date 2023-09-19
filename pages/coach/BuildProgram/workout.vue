<template>
<div>
    <FitBreadcumb :breadcrumbPath="breadcrumbPath"></FitBreadcumb>
    <v-card class="fit-card">
        <v-card-title class="fit-card-title">
            Workouts
        </v-card-title>
        <v-row class="justify-space-between">
            <v-col md="4">
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" outlined></v-text-field>
            </v-col>
            <v-col md="8" style="displey:flex;justify-content:end">
                <v-btn color="primary" x-large dark class="mb-2" @click="newWorkout = true">
                    Create Workout
                </v-btn>
                <newTemplate v-if="newWorkout" @close="newWorkout = false" @refetch-workouts="fetchWorkouts" />
            </v-col>
        </v-row>
        <v-row class="mb-1" style="margin-top:-10px">
            <v-col>

                <v-data-table :headers="headers" :items="workouts" :search="search" sort-by="Workouts" class="elevation-1 workouts-table" @click:row="handleClick">
                    <template v-slot:[`item.Workouts`]="{ item }">
                        <div class="workout-title-table">
                            <div class="title">
                                {{item.title}}
                            </div>
                            <div class="description">
                                {{item.description}}
                            </div>
                            <div class="sections">
                                <div class="d-flex align-center" v-for="(section,index) in item.sections" :key="section.id">
                                    <span> {{section.title}} </span> <i class="mr-2 ml-2" style="font-size:12px">{{index != item.sections.length - 1 ? '/' : ''}}</i>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-slot:[`item.exercises`]="{ item }">
                        {{GetTotalEx(item)}}
                    </template>
                    <template v-slot:[`item.created_at`]="{ item }">
                        {{convertDate(item.created_at)}}
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
    </v-card>
    <EditWorkout v-if="editWorkout" @refetch-workouts="fetchWorkouts" :workout_id="current_edit_id" @closeEdit="closeEdit"></EditWorkout>
</div>
</template>

<script>
import addWorkout from '@/components/coach/Workout/addWorkout.vue'
import newTemplate from '@/components/coach/Workout/newTemplate.vue'
import EditWorkout from '@/components/coach/Workout/edit.vue'

export default {
    components: {
        addWorkout,
        newTemplate,
        EditWorkout

    },

    layout: 'CoachLayout',

    data: () => ({
        editWorkout: false,
        current_edit_id: 0,
        breadcrumbPath: [{
                text: 'Coach',
                disabled: false,
                href: '/',
            },
            {
                text: 'Workout',
                disabled: false,
            },
        ],
        dialog: false,
        newWorkout:false,
        dialogDelete: false,
        search: '',
        headers: [{
                text: 'Workouts',
                align: 'start',
                sortable: true,
                value: 'Workouts',
            },

            {
                text: 'Exercises',
                value: 'exercises'
            },

            {
                text: 'Creation Date',
                value: 'created_at'
            },
            {
                text: 'Actions',
                value: 'actions',
                sortable: false
            },
        ],
        workouts: [],
        editedIndex: -1,
        editedItem: {
            name: '',

            exercises: '',
            mostRecent: 0,
            owner: '',
        },
        defaultItem: {
            name: '',

            exercises: '',
            mostRecent: 0,
            owner: '',
        },
    }),

    mounted() {
        this.fetchWorkouts()
    },

    methods: {
        handleClick(row) {
            this.editWorkout = true;
            this.current_edit_id = row.id;
        },
        closeEdit() {
            this.editWorkout = false;
            this.current_edit_id = 0;
        },
        async fetchWorkouts() {
            /*  ======= Start Loader  ======= */
            const myloader = this.$vs.loading({
                target: this.$refs.mycontainer,
                color: '#34BE82'
            })
            await this.$axios.get('/workouts/list').then((response) => {
                this.workouts = response.data.data.data;
                console.log(response)

            }).catch(function (error) {
                console.log(error.response)

            });
            myloader.close();
        },
        convertDate(date) {
            var currentTime = new Date(date);
            var month = ("0" + (currentTime.getMonth() + 1)).slice(-2);
            var day = ("0" + currentTime.getDate()).slice(-2);
            var year = currentTime.getFullYear();
            var date = day + "/" + month + "/" + year;
            return date;
        },
        GetTotalEx(item) {
            var total = 0;
            if (item.workout_exercieses != null && item.workout_exercieses.length > 0) {
                total += item.workout_exercieses.length
            }
            if (item.sections != null && item.sections.length > 0) {
                console.log(item.sections)
                item.sections.forEach(element => {

                    total += element.exercises.length
                });

            }
            var x = total > 1 ? 'Exercises' : 'Exercise';
            return total + ' ' + x;
        }
    },
}
</script>

<style lang="scss">
.workout-title-table {
    .title {
        font-size: 18px;
        color: rgb(13, 20, 25);
        font-weight: 600;
        margin-bottom: 5px;
    }

    .description {
        font-size: 12px;
        color: rgb(13, 20, 25);
    }

    .sections {
        display: flex;
        margin: 10px 0;

        span {
            border-radius: 4px;
            background-color: #c8fbe5;
            font-size: 10px;
            font-weight: 600;
            font-style: normal;
            font-stretch: normal;
            line-height: 14px;
            letter-spacing: normal;
            text-align: left;
            color: $primary-color;
            padding: 2px 6px;
            white-space: pre-line;
            word-break: break-word;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-transform: none;
            margin-bottom: 3px;

        }
    }
}

.workouts-table {
    tr {
        cursor: pointer;
    }
}
</style>
