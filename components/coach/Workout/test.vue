<template>
<v-dialog v-model="dialog" max-width="50%">

    <template v-slot:activator="{ on, attrs }">

        <div class="newTemplate" v-bind="attrs" v-on="on">
            <img src="../../../assets/img/new_workout.svg" alt="">
            <h3> Create New Workout</h3>
            <p>Create your own</p>

        </div>
    </template>
    <v-card class="fit-dailog-card">

        <v-card-text style="padding:0">

            <v-row style="margin:0">

                <v-col cols="12" md="5" sm="12" style="padding:0;">

                    <div class="firstHalf">

                        <v-tabs>
                            <v-tab>
                                Exersice
                            </v-tab>
                            <v-tab>
                                Section
                            </v-tab>

                            <v-tab-item>
                                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details outlined></v-text-field>
                                      <br>
                                <h3>MOST POPULAR</h3>
                                      <br>
                                <div class="col-12">

                                    <draggable class="list-group" :list="list1" group="people" @change="log">
                                        <div class="list-group-item" v-for="(element, index) in list1" :key="element.name">
                                            {{ element.name }} {{ index }}
                                        </div>
                                    </draggable>
                                </div>
                            </v-tab-item>
                            <v-tab-item>
                                <div>baaa</div>
                            </v-tab-item>

                        </v-tabs>

                    </div>

                </v-col>

                <v-col cols="12" md="7" sm="12" style="padding:0;">
                    <div class="secondHalf">
                        <v-text-field v-model="nameExercise" label="Name of Exercise" clearable placeholder="Name of Exercise" outlined :rules="[v => !!v || 'This filed is required']"></v-text-field>
                        <v-textarea outlined v-model="description" label="description " placeholder="add your description" rows="1" row-height="15"></v-textarea>
                        <h3>Add Exercise</h3>
                        <div class="col-12 ltwo">

                            <draggable class="list-group aa" :list="list2" group="people" @change="log">
                                <div class="list-group-item" v-for="(element, index) in list2" :key="element.name">
                                    {{ element.name }} {{ index }}
                                </div>
                            </draggable>
                        </div>
                        <label class="mb-4 d-block">Upload Images (Optional)</label>

                    </div>
                </v-col>

            </v-row>

        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="primary" large style="padding: 1rem 2rem;" @click="save">
                Select
            </v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script>
import draggable from 'vuedraggable';
import Dropzone from 'nuxt-dropzone'
import 'nuxt-dropzone/dropzone.css'
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
    nameExercise: "",
    description: "",
    order: 1,
    components: {
        draggable,
        vueDropzone: Dropzone,
    },
    data() {

        return {
            list1: [{
                    name: "arm",
                    id: 1
                },
                {
                    name: "chest",
                    id: 2
                },
                {
                    name: "back",
                    id: 3
                },

            ],
            list2: [

            ]
        };
    },
    methods: {
        add: function () {
            this.list.push({
                name: "Juan"
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
        }
    }

}
</script>

<style lang="scss" scoped>
.newTemplate {
    margin: 5px;
    align-items: center;
    text-align: center;
    font-size: 8px;
    height: 90%;
    padding: 15px;
    border: 1px solid #34BE82;
    border-radius: 5%;

    cursor: pointer;
}

.list-group-item {
    padding: 10px 15px;
    box-shadow: rgb(240 240 240) 1px 1px 1px 1px;
    width: 300px;

}

.firstHalf {
    background-color: white;
    padding: 10px 0px 9px;
    padding-right: 10px;
    margin-right: 10px;
}

.secondHalf {
    background-color: rgb(246, 247, 251);
    padding: 15px 9px 9px;
    margin-top: 8px;
}

.itemtap
{
  margin-top: 20px;
}
</style>
