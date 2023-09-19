<template>
<v-dialog v-model="dialog" max-width="55%">
   
    <v-card class="fit-dailog-card">
        <v-card-title class="fit-card-title-dialog">
            Add New Exercise
        </v-card-title>
        <v-card-text style="padding:0" :key="mydailogKey">
            <v-form ref="myform" lazy-validation class="form">
                <v-row style="margin:0" class="d-flex">
                    <v-col cols="12" md="6" sm="12" style="padding:0;">
                        <div class="firstHalf">

                            <v-text-field v-model="title" placeholder="Name your exercise" outlined :rules="[v => !!v || 'This filed is required']"></v-text-field>

                            <v-select v-model="primary_focus" :items="priFocus" label="PRIMARY FOCUS" outlined placeholder="choose primary focus" style="padding:0" :rules="[v => !!v || 'This filed is required']"></v-select>

                            <div class="tracking-block">
                                <v-select v-model="tracking_filed" :items="exCategorys" label="TRACKING FIELD" outlined placeholder="choose exercise category" style="padding:0" :rules="[v => !!v || 'This filed is required']"></v-select>
                                <div class="track-select d-flex justify-space-between align-center" style="width:100%">

                                    <div class="track-chips">
                                       <label class="d-block">TRACKING FIELDS</label>
                                        <v-chip color="#fff" close @click:close="removeItem(item)" style="color:#000" v-for="(item, index) in traking_types_selected" :key="index" class="ma-2">
                                            {{item.name}}
                                        </v-chip>

                                    </div>
                                    <v-menu offset-y>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn class="btnAdd" fab dark x-small color="#47bd8a" v-bind="attrs" v-on="on">
                                                <v-icon>
                                                    mdi-plus
                                                </v-icon>
                                            </v-btn>
                                        </template>
                                        <v-list>
                                            <v-list-item :disabled="disableChips" @click="addItemtoList(item)" v-for="(item, index) in tracking_types" :key="index">
                                                <v-list-item-title>{{ item.name }}</v-list-item-title>
                                            </v-list-item>
                                        </v-list>
                                    </v-menu>
                                </div>

                            </div>
                            <v-textarea outlined v-model="instructions" label="INSTRUCTIONS " placeholder="add your instructions" style="padding:0" height="95"></v-textarea>

                        </div>
                    </v-col>
                    <v-col class="aa" cols="12" md="6" sm="12" style="padding:0;">

                        <div class="secondHalf">
                            <h3>Media</h3>
                            <br>
                            <v-text-field v-model="linkVideo" placeholder="youtube link" outlined prepend-icon="mdi-link" style="padding:0"></v-text-field>

                            <v-col cols="12" md="12" style="padding-bottom:0">
                                <label class="mb-4 d-block">Upload Images (Optional)</label>
                                <client-only>

                                    <vue-dropzone ref="myVueDropzone" v-model="Uploads" id="dropzone" :options="dropzoneOptions" @vdropzone-file-added="fileAdded">
                                        <div class="dropzone-custom-content">
                                            <h3 class="dropzone-custom-title mb-2">
                                                <v-icon style="margin:0 10px;">mdi-cloud-upload</v-icon>Drag and drop to upload Images
                                            </h3>
                                            <div class="subtitle text-center">Allowed jpg,jpeg,png</div>
                                        </div>
                                    </vue-dropzone>
                                </client-only>

                            </v-col>

                        </div>

                    </v-col>

                </v-row>
            </v-form>

        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color=" darken-1" text large style="padding: 1rem 2rem;" @click="dialog = false">
                Cancel
            </v-btn>
            <v-btn color="primary" large style="padding: 1rem 2rem;" @click="AddExersice">
                Add
            </v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script>
import Dropzone from 'nuxt-dropzone'
import 'nuxt-dropzone/dropzone.css'

import 'vue2-dropzone/dist/vue2Dropzone.min.css'

const importupload = () => {
    if (process.client) {
        return {
            vue2Dropzone: () => import('vue2-dropzone')
        }
    }
    return {}
}
export default {
        watch:{
        dialog(val){
            if(!val){
                this.$emit('closeAdd')
            }
        }
    },
    components: {
        vueDropzone: Dropzone
    },
    data: () => ({
      Uploads:'',
         dropzoneOptions: {
                url: 'https://',
                autoProcessQueue: false,
                autoQueue: false,
                disablePreviews: false,
                addRemoveLinks: true,
                uploadMultiple: false,
                thumbnailWidth: 150,
                maxFilesize: 8,
                dictDefaultMessage: "<i class='fa fa-upload m-1'></i>Click Or Drag file here to Upload.",
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
            },
        title:'',
        mydailogKey:0,
        primary_focus:'',
        tracking_filed:'',
        instructions: '',
        image: null,
        video: null,
        linkVideo: '',
        dialog: true,
        dialogDelete: false,
files_form:[],
        url: "../../assets/img/blank-profile-picture-973460__340.webp",

        priFocus: ['Chest', 'Biceps', 'Lower Back', 'Lats', 'trieceps'],

        exCategorys: ['Strength', 'Bodyweight', 'Timed', 'Distance (long)', 'Distance (short)'],
        exercise: [],
        editedIndex: -1,
        traking_types_selected: [{
                name: 'time',
                uint: 'sec'
            },],
        tracking_types: [{
                name: 'time',
                uint: 'sec'
            },
            {
                name: 'tempo',
                uint: 'sec'
            },
            {
                name: 'speed',
                uint: 'km/h'
            },
            {
                name: 'reps',
                uint: 'count'
            },
            {
                name: 'weight',
                uing: 'kg'
            }
        ],

        disableChips: false,

    }),

    methods: {
        addItemtoList(item) {
            if (this.traking_types_selected.length == 3) {
                return;
            }
            this.traking_types_selected.push(item);
            this.tracking_types = this.tracking_types.filter(function (obj) {
                return obj.name !== item.name;
            });
            if (this.traking_types_selected.length == 3) {
                this.disableChips = true;
            }

        },
        removeItem(item) {
            this.traking_types_selected = this.traking_types_selected.filter(function (obj) {
                return obj.name !== item.name;
            });
            this.tracking_types.push(item);
            if (this.traking_types_selected.length < 3) {
                this.disableChips = false;
            }
        },
        fileAdded(file) {

            this.files_form.push(file)
        },
        async AddExersice() {
            /*  ======= Check if form is validate  ======= */
            if (this.$refs.myform.validate()) {

                var here = this;
                /*  ======= Start Loader  ======= */
                const myloader = this.$vs.loading({
                    target: this.$refs.mycontainer,
                    color: '#34BE82'
                })

                /* ======= Organize data When Has File User formDataObj ======= */
                const formDataObj = new FormData()
                formDataObj.append('title', this.title)
                formDataObj.append('primary_focus', this.primary_focus)
                formDataObj.append('tracking_filed', this.tracking_filed)
                formDataObj.append('instructions', this.instructions)
                formDataObj.append('video_url', this.linkVideo)

                //files
                for (var i = 0; i < this.files_form.length; i++) {
                    formDataObj.append('images[' + i + ']', this.files_form[i])
                }
                  //tracking
                for (var i = 0; i < this.traking_types_selected.length; i++) {
                    if(this.traking_types_selected[i].id){
                        formDataObj.append('tracking_types[' + i + '][id]', this.traking_types_selected[i].id)
                    }
                    formDataObj.append('tracking_fileds[' + i + '][name]', this.traking_types_selected[i].name)
                    formDataObj.append('tracking_fileds[' + i + '][uint]', this.traking_types_selected[i].uint)
                }

                /* ======= Send To API  ======= */
                await this.$axios.post('/exercies/add', formDataObj, {
                    'Content-Type': 'multipart/form-data',
                }).then((response) => {
                    myloader.close();

                    //Send Notification if success
                    here.$vs.notification({
                        position: 'top-right',
                        title: 'Success',
                        text: 'Exercise Added Successfully',
                        color: 'success',
                        icon: '<i aria-hidden="true" class="v-icon notranslate mr-2 mdi mdi-check theme--light primary--text"></i>'
                    })
                here.$emit('fetchExercises');
                    //redirect to list
                    here.dialog = false;

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

    },

}
</script>

<style lang="scss" scoped>
.firstHalf {
    background-color: white;
    padding: 15px 0px 9px;
    padding-right: 10px;
    margin-right: 5px;
}

.secondHalf {
    background-color: rgb(246, 247, 251);
    padding: 15px 9px 9px;
    height:100%
}

.media {
    display: flex;
    align-items: center;
    justify-content: center;

}

h2 {
    color: #34BE82;
}

.tracking-block {
    background: rgb(246, 247, 251);
    padding: 1rem;
    border-radius: 5px;
    margin-bottom: 1rem;

    .v-select>.v-input__control>.v-input__slot {
        background: #fff !important;
    }

 
}
   .v-chip .v-chip__content {
        color: #000 !important
    }
.dropzone {
    background-color: transparent;
    border: dashed 2px #34BE82;

    transition: 300ms ease-in-out;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;

    p {
        font-size: 20px;
    }

    &:hover {
        background-color: #34be8211;
        transition: 300ms ease-in-out;
    }
}
</style>
