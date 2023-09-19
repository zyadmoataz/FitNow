<template>
<div>
    <FitBreadcumb :breadcrumbPath="breadcrumbPath"></FitBreadcumb>

    <v-card class="fit-card">
        <v-card-title class="fit-card-title">
            All Exercise
        </v-card-title>
        <v-row class="justify-space-between">
            <v-col md="4">
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" large outlined></v-text-field>
            </v-col>
            <v-col md="8" style="displey:flex;justify-content:end">
                <v-btn color="primary" x-large dark class="mb-2" @click="AddDialog = true">
                    Add New Exercise
                </v-btn>
                <addExercise @fetchExercises="fetchExercises" @closeAdd="closeAdd" v-if="AddDialog" />
            </v-col>
        </v-row>
        <v-row class="mb-1" style="margin-top:-10px">
            <v-col>

                <!-- Table -->

                <v-data-table :headers="headers" :items="exercise" :search="search" sort-by="PrimaryFocus" class="elevation-1">
                    <template v-slot:[`item.title`]="{ item }">
                        <div class="exercise-title-table d-flex" @click="ShowEdit(item)">
                            <div class="img mr-4">
                                <img V-IF="item.images" :src="item.images[0]" />
                            </div>
                            <div>
                                <div class="title">
                                    {{item.title}}
                                </div>
                                <div class="description">
                                    {{item.description}}
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-slot:[`item.created_at`]="{ item }">
                        {{convertDate(item.created_at)}}
                    </template>
                    <template v-slot:[`item.actions`]="{ item }">

                        <v-icon small class="mr-2" @click="ShowEdit(item)">
                            mdi-pencil
                        </v-icon>
                    </template>

                </v-data-table>
            </v-col>
        </v-row>
        <editExercise @close="EditDialogClose" @fetchExercises="fetchExercises" :myexersice="currentEdit" v-if="EditDialog"></editExercise>

    </v-card>
</div>
</template>

<script>
import addExercise from '../../../components/coach/Exercise/addExercise.vue'
import editExercise from '../../../components/coach/Exercise/editExercise.vue'
export default {
    components: {
        addExercise,
        editExercise,

    },
    layout: 'CoachLayout',

    data: () => ({
        breadcrumbPath: [{
                text: 'program',
                disabled: false,
                href: '/',
            },
            {
                text: 'Exercises',
                disabled: false,
            },
        ],
        dialogDelete: false,
        search: '',
        headers: [{
                text: 'Exercise Title',
                align: 'start',
                sortable: true,
                value: 'title',
            },
            {
                text: 'Primary Focus',
                value: 'primary_focus'
            },
            {
                text: 'Tracking Filed',
                value: 'tracking_filed'
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
        exercise: [],
        editedIndex: -1,
        editedItem: {
            name: '',
            PrimaryFocus: '',
            Category: '',
            MostResent: 0,
        },
        defaultItem: {
            name: '',
            PrimaryFocus: '',
            Category: '',
            MostResent: 0,
        },
        EditDialog: false,
        currentEdit: '',
        AddDialog: false
    }),

    mounted() {
        this.fetchExercises();
    },
    methods: {
        ShowAdd(item) {
            this.AddDialog = true;
        },
        closeAdd() {
            this.AddDialog = false
        },
        ShowEdit(item) {
            this.EditDialog = true;
            this.currentEdit = item;
        },
        EditDialogClose() {
            this.EditDialog = false
        },
        async fetchExercises() {
            /*  ======= Start Loader  ======= */
            const myloader = this.$vs.loading({
                target: this.$refs.mycontainer,
                color: '#34BE82'
            })
            await this.$axios.get('/exercies/list').then((response) => {
                this.exercise = response.data.data;
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

    },

}
</script>

<style lang="scss">
.exercise-title-table {
    cursor: pointer;
    .title {
        font-size: 18px;
        color: rgb(13, 20, 25);
        font-weight: 600;
        margin-bottom: 5px;
    }
    img{
        height: 40px;
        width: 40px;
        border-radius: 5px;
        border:1px solid $primary-color
    }
    .description {
        font-size: 12px;
        color: rgb(13, 20, 25);
    }
}
</style>
