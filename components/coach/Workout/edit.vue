<template>
<v-dialog v-model="dialog" max-width="55%">

    <v-card class="fit-dailog-card">
        <v-card-text style="padding:0">
            <v-row style="margin:0">

                <v-col cols="12" md="4" sm="12" style="padding:0;">

                    <div class="firstHalf">
                        <v-text-field dense v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details outlined style=" margin-top: 20px;"></v-text-field>
                        <br>
                        <h3>MOST POPULAR EXERCISES</h3>
                        <br>
                        <div style="padding:0;" class="exercsie-block">

                            <div v-if="filterdList == null">
                                <draggable direction="horizontal"  :invertSwap ="true" class="list-group exercises_list" ghostClass="ghost" connectToSortable=".single-ex" :group="{ name: 'my-group2', pull: 'clone'}" :list="exercises" :animation="200" :sort="false" helper="clone">
                                    <div class="list-group-item" v-for="(element ) in exercises" :key="element.title">
                                        <div class="exercise">
                                            <div class="image-title">
                                                <img v-if="element.images != null && element.images.length > 0" :src=element.images[0] style="border-radius: 10%;" alt="">
                                                <div class="text"> {{ element.title }}
                                                </div>
                                            </div>

                                            <v-icon style="margin:0 10px;">mdi-drag</v-icon>
                                        </div>
                                    </div>
                                </draggable>
                            </div>
                            <div v-else>
                                <draggable class="list-group" :list="exercises" group="people" @change="log">

                                    <div class="list-group-item" v-for="(element ) in filterdList" :key="element.title">
                                        <div class="exercise">
                                            <div class="image-title">
                                                <img v-if="element.images != null && element.images.length > 0" :src=element.images[0] style="border-radius: 10%;" alt="">
                                                <div class="text"> {{ element.title }}
                                                </div>
                                            </div>

                                            <v-icon style="margin:0 10px;">mdi-drag</v-icon>
                                        </div>
                                    </div>
                                </draggable>

                            </div>
                        </div>

                    </div>

                </v-col>

                <v-col cols="12" md="8" sm="12" style="padding:0;" v-if="currentWorkout != null">
                    <div class="secondHalf">
                        <v-form ref="myform" lazy-validation class="form">
                            <v-text-field dense v-model="currentWorkout.title" label="Name of Workout" clearable placeholder="Name of Exercise" outlined :rules="[v => !!v || 'This filed is required']"></v-text-field>
                            <v-textarea dense outlined v-model="currentWorkout.description" label="Description " placeholder="add your description" rows="1" row-height="20"></v-textarea>

                            <draggable  direction="horizontal" :invertSwap ="true" class="list-group" :list="currentWorkout.workout_exercieses" :group="{ name: 'my-group2', pull: 'clone'}" @change="log" helper="clone" ghostClass="ghost">
                                <div :class="['dragg mb-4']" v-if="currentWorkout.workout_exercieses.length==0 && ActiveSection == 'drag-drop'">

                                    <div class="drag-image d-flex">
                                        <svg width="80" height="80" viewBox="0 0 77 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect opacity="0.3" x="22" width="55" height="43" rx="3" fill="#E6E7FD" />
                                            <rect x="27.5" y="6.5" width="44" height="30" rx="2.5" stroke="#31e195" stroke-dasharray="2 2" />
                                            <rect x="1" y="23" width="43" height="26" rx="4" fill="#E9EAFF" stroke="white" stroke-width="2" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M37 40V51.188L39.969 48.322L40.129 48.183H45.165L37 40Z" fill="#31e195" />
                                            <g clip-path="url(#clip0)">
                                                <rect x="14.5" y="29.5" width="4" height="13" rx="0.5" stroke="#31e195" />
                                                <rect x="26.5" y="29.5" width="4" height="13" rx="0.5" stroke="#31e195" />
                                                <path d="M12.5 33C12.5 32.7239 12.7239 32.5 13 32.5H14.5V39.5H13C12.7239 39.5 12.5 39.2761 12.5 39V33Z" stroke="#31e195" />
                                                <path d="M30.5 32.5H32C32.2761 32.5 32.5 32.7239 32.5 33V39C32.5 39.2761 32.2761 39.5 32 39.5H30.5V32.5Z" stroke="#31e195" />
                                                <rect x="18.5" y="34.5" width="8" height="3" stroke="#31e195" stroke-miterlimit="10" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0">
                                                    <rect width="21" height="14" fill="white" transform="translate(12 29)" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        <span> Drag exercise from the <br>left to add</span>
                                    </div>

                                </div>
                                <div style="margin-bottom: 10px;" class="list-group-item single-ex" v-for="(exercise,index) in currentWorkout.workout_exercieses" :key="exercise.name">
                                <editExercis @updateEx="updateEx" @refetch-data="getWorkout" @deleteExercise="deleteExerciseSingle(exercise)" :exercise="exercise" :Ident="index"></editExercis>
                                </div>
                            </draggable>

                            <!-- ======= Add Section  ======= -->
                            <div class="addSection" v-if="ActiveSection == 'add-section'">
                                <v-text-field dense v-model="new_section_name" placeholder="Add a section name" outlined :rules="[v => !!v || 'This filed is required']"></v-text-field>
                                <v-col md="6" style="padding:0">
                                    <v-select v-model="new_section_type" dense :items="SectionTypes" label="Section Type" outlined></v-select>
                                </v-col>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color=" darken-1" text class="fit-btn" style="padding: 1rem 2rem;" @click="ActiveSection = ''">
                                        Cancel
                                    </v-btn>

                                    <v-btn color="primary" outlined class="fit-btn" style="padding: 1rem 2rem;  float: right;" @click="CreateSection">
                                        Create Section
                                    </v-btn>
                                </v-card-actions>

                            </div>
                            <!-- ======= New Sections Loop  ======= -->
                            <div :key="updateList">
                                <div class="sections-drag" v-for="(new_section,index) in sections" :key="new_section.name">
                                    <div class="section-header d-flex align-items-center">
                                        <v-icon color="#fff" class="mr-4" @click="hideSection(new_section)"> {{ new_section.hide ? 'mdi-menu-down' : 'mdi-menu-up'}}</v-icon>
                                        <div class="section-title"> {{new_section.title}}</div>
                                        <v-icon color="#fff" size="20" class="ml-auto" @click="DeleteSection(new_section)">mdi-delete</v-icon>

                                    </div>
                                    <div class="section-body" v-show="!new_section.hide">
                                        <v-text-field v-model="new_section.instructions" dense placeholder="Add instructions" outlined></v-text-field>

                                        <draggable  direction="horizontal" :invertSwap ="true" class="list-group" :list="new_section.exercises" :group="{ name: 'my-group2', pull: 'clone'}" @change="log" helper="clone" ghostClass="ghost">
                                            <div :class="['dragg',{'active' : moving}]" v-if="new_section.exercises.length==0">

                                                <div class="drag-image d-flex">
                                                    <svg width="80" height="80" viewBox="0 0 77 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <rect opacity="0.3" x="22" width="55" height="43" rx="3" fill="#E6E7FD" />
                                                        <rect x="27.5" y="6.5" width="44" height="30" rx="2.5" stroke="#31e195" stroke-dasharray="2 2" />
                                                        <rect x="1" y="23" width="43" height="26" rx="4" fill="#E9EAFF" stroke="white" stroke-width="2" />
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M37 40V51.188L39.969 48.322L40.129 48.183H45.165L37 40Z" fill="#31e195" />
                                                        <g clip-path="url(#clip0)">
                                                            <rect x="14.5" y="29.5" width="4" height="13" rx="0.5" stroke="#31e195" />
                                                            <rect x="26.5" y="29.5" width="4" height="13" rx="0.5" stroke="#31e195" />
                                                            <path d="M12.5 33C12.5 32.7239 12.7239 32.5 13 32.5H14.5V39.5H13C12.7239 39.5 12.5 39.2761 12.5 39V33Z" stroke="#31e195" />
                                                            <path d="M30.5 32.5H32C32.2761 32.5 32.5 32.7239 32.5 33V39C32.5 39.2761 32.2761 39.5 32 39.5H30.5V32.5Z" stroke="#31e195" />
                                                            <rect x="18.5" y="34.5" width="8" height="3" stroke="#31e195" stroke-miterlimit="10" />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0">
                                                                <rect width="21" height="14" fill="white" transform="translate(12 29)" />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                    <span> Drag exercise from the <br>left to add</span>
                                                </div>

                                            </div>
                                            <div style="margin-bottom: 10px;" class="list-group-item my-handle" v-for="(exercise,index2) in new_section.exercises" :key="exercise.name">
                                                <editExercis @updateEx="updateExSection" @deleteExercise="deleteExercise(new_section,exercise)" :sectionindex="index" :exercise="exercise" :Ident="index2"></editExercis>
                                            </div>
                                        </draggable>
                                    </div>
                                </div>
                            </div>
                            <v-btn class="fit-btn fit-btn-2 mt-4" style="padding: 1rem 2rem;  float: right;" @click="ActiveSection = 'add-section'">
                                <v-icon size="20px" class="mr-2">mdi-plus</v-icon> Add Section
                            </v-btn>
                        </v-form>
                    </div>
                </v-col>
                <!-- 
                <rawDisplayer class="col-3" :value="list1" title="List 1" />
                <rawDisplayer class="col-3" :value="list2" title="List 2" />
                <rawDisplayer class="col-3" :value="list3" title="List 2" /> -->

            </v-row>
        </v-card-text>

        <v-card-actions class="d-flex justify-end">
            <v-btn class="mt-4 mb-4 mr-4 fit-btn" outlined color="primary" @click="dialog = false">
                Cancel
            </v-btn>
            <v-btn class="mt-4 mb-4  fit-btn" color="primary" @click="UpdateWorkout">
                Update & Close
            </v-btn>

        </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script>
import Vue from 'vue'

import draggable from 'vuedraggable';
import Dropzone from 'nuxt-dropzone'
import 'nuxt-dropzone/dropzone.css'
import exerciseinsection from './exercise/exercise_in_section'
import editExercis from './exercise/edit_exercise';
const importupload = () => {
    if (process.client) {
        return {
            vue2Dropzone: () => import('vue2-dropzone')
        }
    }
    return {}
}

export default {
    name: "two-lists",
    display: "Two Lists",
    order: 1,
    components: {
        draggable,
        vueDropzone: Dropzone,
        exerciseinsection,
        editExercis
    },
    watch: {
        dialog: function (newValue) {
            if (!newValue) {
                this.$emit('closeEdit');
            }
        }
    },
    computed: {
        sections: function () {
            return this.currentWorkout.sections
        }
    },
    data: () => ({
        single_exercises: [],
        workout_name: '',
        SectionTypes: ['Workout', 'Warm up', 'Cool down', 'Recovery'],
        isHidden: true,
        ActiveSection: 'drag-drop',
        isShow: true,
        moving: false,
        sectionName: '',
        note: '',
        description: null,
        instructions: '',
        nameExercise: '',
        new_section_type: '',
        new_section_name: '',
        search: "",
        dialog: true,
        dialogDelete: false,

        list2: [

        ],
        list3: [

        ],
        filterdList: null,
        exerciseSets: [{

            Weight: '-',
            reps: '-',
            reset: "00:00"
        }, ],
        newSections: [],
        exercises: [],
        currentWorkout: null,
        updateList: 0,

    }),
    mounted() {
        this.fetchExercises();
        this.getWorkout();
    },
    props: {
        workout_id: Number
    },
    methods: {
        refreshAll() {
            this.ActiveSection = 'drag-drop';
            this.currentWorkout.sections = [];
            this.newExercises = [];
            this.workout_name = '';
            this.workout_description = '';
            this.single_exercises = []

        },
        async UpdateWorkout() {
            /*  ======= Check if form is validate  ======= */
            if (this.$refs.myform.validate()) {

                var here = this;
                /*  ======= Start Loader  ======= */
                const myloader = this.$vs.loading({
                    target: this.$refs.mycontainer,
                    color: '#34BE82'
                })

                /* ======= Organize data ======= */

                this.currentWorkout.workout_exercieses.forEach(function (exercise) {
                    if(exercise.title && exercise.title != null){
                        exercise.exercise_id = exercise.id;
                        exercise.newEx = true;
                    }
                })
                for(var i =0; i <  this.currentWorkout.sections.length; i++){
                    this.currentWorkout.sections[i].exercises.forEach(function (exercise) {
                        if(exercise.title && exercise.title != null){
                            exercise.exercise_id = exercise.id;
                            exercise.newEx = true;
                        }
                    })
                }
    
                console.log(this.currentWorkout)

                /* ======= Send To API  ======= */
                await this.$axios.post('/workouts/update/' + this.currentWorkout.id, this.currentWorkout).then((response) => {
                    myloader.close();

                    //Send Notification if success
                    here.$vs.notification({
                        position: 'top-right',
                        title: 'Success',
                        text: 'Workout Updated Successfully',
                        color: 'success',
                        icon: '<i aria-hidden="true" class="v-icon notranslate mr-2 mdi mdi-check theme--light primary--text"></i>'
                    })
                    //redirect to list
                    here.dialog = false;
                    here.$emit('close')
                    here.$emit('refetch-workouts')

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

            }
        },
        getWorkout() {
            const myloader = this.$vs.loading({
                target: this.$refs.mycontainer,
                color: '#34BE82'
            })
            this.$axios
                .get('/workouts/' + this.$props.workout_id)
                .then(response => {
                    myloader.close()
                    this.currentWorkout = response.data.data
                    this.currentWorkout.sections.forEach((element) => {
                        element.hide = true
                    });
                })
                .catch(error => {
                    myloader.close()
                    console.log(error)
                })
        },
        fetchExercises() {
            const myloader = this.$vs.loading({
                target: this.$refs.mycontainer,
                color: '#34BE82'
            })
            this.$axios
                .get('/exercies/list')
                .then(response => {
                    myloader.close()
                    this.exercises = response.data.data
                })
                .catch(error => {
                    myloader.close()
                    console.log(error)
                })
        },

        addSet(section, exercise) {
            var mysectionIndex = this.currentWorkout.sections.indexOf(section)
            var myExIndex = this.currentWorkout.sections[mysectionIndex].exercises.indexOf(exercise)
            this.currentWorkout[mysectionIndex].exercises[myExIndex].sets.push({})
        },
        deleteItem(item) {
            this.item.id = this.exerciseSets.indexOf(item)
            this.item.id = Object.assign({}, item)
            this.exerciseSets.splice(this.editedIndex, 1)

        },
        hideSection(section) {
            section.hide = !section.hide;
            this.updateList += 1
            //  console.log(section)
        },
    
        deleteExerciseSingle(exercise) {
            var myExIndex = this.single_exercises.indexOf(exercise)
            this.single_exercises.splice(myExIndex, 1)
        },
   DeleteSection(section) {
            if (!section.id) {
                this.currentWorkout.sections.splice( this.currentWorkout.sections.indexOf(section), 1)
                return;
            }
            const myloader = this.$vs.loading({
                target: this.$refs.mycontainer,
                color: '#34BE82'
            })
            var here = this;
            this.$axios
                .post('/workouts/deleteSection', {
                    id: section.id
                })
                .then(response => {
                    myloader.close()
                    this.getWorkout();
                    here.$vs.notification({
                        position: 'top-right',
                        title: 'Success',
                        text: 'Set Deleted Successfully',
                        color: 'success',
                        icon: '<i aria-hidden="true" class="v-icon notranslate mr-2 mdi mdi-check theme--light primary--text"></i>'
                    })
                })
                .catch(error => {
                    myloader.close()
                    console.log(error)
                    here.$vs.notification({
                        position: 'top-right',
                        title: 'danger',
                        text: error.response.data.message,
                        color: 'danger',
                        icon: '<i aria-hidden="true" class="v-icon notranslate mr-2 mdi mdi-check theme--light primary--text"></i>'
                    })
                })
        },
        deleteExercise(section, exercise) {
            var mysectionIndex = this.currentWorkout.sections.indexOf(section)
            var myExIndex = this.currentWorkout.sections[mysectionIndex].exercises.indexOf(exercise)
            this.currentWorkout.sections[mysectionIndex].exercises.splice(myExIndex, 1)
        },

        CreateSection() {
            var data = {
                title: this.new_section_name,
                type: this.new_section_type,
                instructions: '',
                exercises: [],
                hide: false

            }
           this.currentWorkout.sections.push(data);
            this.ActiveSection = '';
            this.new_section_name = '';
            this.new_section_type = '';
        },
        onStart: function (val) {
            this.moving = true;
            console.log('asdasd')
        },
        onEnd: function () {
            this.moving = false
        },
        updateEx(obj) {
            this.currentWorkout.workout_exercieses[obj.index] = obj
        },
        updateExSection(obj) {
            this.currentWorkout.sections[obj.section_index].exercises[obj.index] = obj
        },
        searchfilter() {
            console.log(this.search)
            const search = this.search.toLowerCase();

            if (!search || search == '') {
                this.filterdList = null;
            }

            this.filterdList = this.exercises.filter(c => c.title.toLowerCase().includes(search));
        },
        add: function () {
            this.list.push({
                name: "arm"
            });
        },
        replace: function () {
            this.list = [{
                name: "Edgard"
            }];
        },
        clone: function (el) {
            return {
                name: el.name + " cloned"
            };
        },
        log: function (evt) {
            window.console.log(evt);
            console.log(this.currentWorkout)
        }
    }

}
</script>

<style lang="scss" scoped>
.newTemplate {
    align-items: center;
    text-align: center;
    font-size: 8px;
    height: 90%;
    padding: 2rem;
    border: 1px solid #a2a2a2;
    border-radius: 5%;
    cursor: pointer;
    height: 250px;
    margin-bottom: 2rem;

    &:hover {
        transition: 300ms;
        border: 1px solid #34BE82;
    }

    .choose-image {
        width: 80px;
        height: 80px;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }

    &:hover .choose-image path {
        transition: 300ms;
        fill: #31e195a8
    }
}

.exerciseDetails {
    border-radius: 5px;
    border: 1px solid rgb(218, 223, 234);
    box-shadow: rgb(240 240 240) 1px 1px 1px 1px;
    height: 100%;
    width: 100%;
    padding: 20px;
    padding-bottom: 0;

    .fortable {
        width: 100%;
        height: 300px;
        overflow: hidden;

    }

}

.exercise_details_section {
    border: 1px solid rgb(218, 223, 234);
    box-shadow: rgb(76 98 135 / 25%) 0px 2px 3px;
    border-radius: 5px;
    background-color: rgb(255, 255, 255);

    .fortable {
        th {
            font-size: 12px;
            color: #656a66;
        }

        td {

            border-radius: 5%;
            line-height: 10px;
        }

    }
}

.addSection {
    border-radius: 5px;
    border: 1px solid rgb(218, 223, 234);
    box-shadow: rgba(76, 135, 94, 0.25) 0px 2px 3px;
    height: 100%;
    width: 100%;
    padding: 20px;
    padding-bottom: 10px;
    margin-bottom: 10px;

}

.dragSection {
    border-radius: 5px;
    border: 1px solid rgb(218, 223, 234);
    box-shadow: rgb(240 240 240) 1px 1px 1px 1px;
    height: 100%;
    width: 100%;
    padding: 20px;
    padding-bottom: 10px;
    margin-bottom: 10px;

}

table,
th,
td {
    padding: 5px;

}

.exercsie-block {
    .list-group {
        height: 400px;
        padding-right: 1rem;
        overflow-y: scroll;

        &::-webkit-scrollbar {
            width: 0.2em;
        }

        &::-webkit-scrollbar-track {
            box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        }

        &::-webkit-scrollbar-thumb {
            background-color: rgb(201, 201, 201);
            border-radius: 5px;
        }

        .list-group-item {
            border: 1px solid rgb(235, 237, 242);
            overflow: hidden;
            cursor: grab;
            width: 100%;
            height: 66px;
            flex-direction: row;
            padding: 5px;
            border-radius: 5px;
            -webkit-box-pack: justify;
            justify-content: space-between;
            -webkit-box-align: center;
            align-items: center;
            margin-bottom: 1rem;
        }
    }
}

.exercise {
    display: flex;
    align-items: center;
    padding: 0;
    justify-content: space-between;
    height: 100%;

    .image-title {
        display: flex;
        align-items: center;

    }

    img {
        height: 60px;
        width: 60px;
    }

}

.text {
    margin-left: 10px;
    color: black;

}

.dragg {
    background-color: transparent;
    border: dashed 1px #8f8f8fb5;
    height: 150px;
    transition: 300ms ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;

    svg {
        height: 100px;
        width: 100px;
    }

    .drag-image {
        align-items: center;
    }

    span {
        margin: 14px;
        margin-top: -5px;
        color: #000;
    }

}

.drag-active {
    border: dashed 2px #34BE82;
}

.firstHalf {
    background-color: white;
    padding: 10px 0px 9px;
    padding-right: 10px;
    margin-right: 10px;
}

.secondHalf {
    border-left: 1px solid #eee;
    padding: 15px 9px 9px;
    margin-top: 8px;
    height: 600px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        width: 0.2em;
    }

    &::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }

    &::-webkit-scrollbar-thumb {
        background-color: rgb(201, 201, 201);
        border-radius: 5px;
    }

}

h2 {
    color: #34BE82;
}

.dashbox {
    background-color: transparent;
    border: dashed 2px #34BE82;
    height: 150px;
    transition: 300ms ease-in-out;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    p {
        font-size: 20px;
    }

    &:hover {
        background-color: #34be8211;
        transition: 300ms ease-in-out;
    }
}

.moving-card {
    opacity: 0.5;
    background: #F7FAFC;
    border: 1px solid #4299e1;
}

.exercises_list {
    .list-group-item {
        transition: 300ms;

        &:hover {
            border: 1px solid $primary-color;
            transition: 300ms;
        }
    }
}

.sections-drag {

    border-radius: 6px;
    margin-bottom: 1rem;

    .section-header {
        background: linear-gradient(90.16deg, #00b566 0.08%, #00c371 99.94%);
        color: #fff;
        font-weight: bold;
        padding: 1rem;
        border-radius: 5px 5px 0 0;
    }

    .section-body {
        background: #f3fffa;
        padding: 1rem
    }
}
.ghost {
  opacity: .5;
  background: #C8EBFB;
      border: dashed 2px #34BE82;
      padding:1rem

}
</style>
