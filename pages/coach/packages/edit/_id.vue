<template>
<div>
    <FitBreadcumb :breadcrumbPath="breadcrumbPath"></FitBreadcumb>

    <v-card class="fit-card" v-if="myPackage != null">
        <v-card-title class="fit-card-title mb-2">
            Edit Package
        </v-card-title>
        <v-form ref="form">
            <v-row class=" textFile">
                <v-col cols=" 12" md="6" style="padding-bottom:0">
                    <v-col cols="12" md="12" style="padding-bottom:0;">
                        <v-text-field label="Title" placeholder="" v-model="myPackage.title" outlined :rules="[v => !!v || 'This filed is required']"></v-text-field>
                    </v-col>
                    <v-col cols=" 12" md="12" style="padding-bottom:0">
                        <v-autocomplete v-model="myPackage.type" outlined :items="package_types" item-text="name" label="Type" clearable :rules="[v => !!v || 'This filed is required']"></v-autocomplete>
                    </v-col>
                    <v-col cols="12" md="12" style="padding-bottom:0">
                        <v-autocomplete v-model="myPackage.payment_type" outlined :items="payment_types" item-text="name" label="Payment Types" clearable :rules="[v => !!v || 'This filed is required']"></v-autocomplete>
                    </v-col>
                    <v-col cols=" 12" md="12" style="padding-bottom:0">
                        <v-text-field label="Price" type="number" prefix="EGP" placeholder="" v-model="myPackage.price" outlined :rules="[v => !!v || 'This filed is required']"></v-text-field>
                    </v-col>
                    <v-col cols=" 12" md="12" style="padding-bottom:0">
                        <v-autocomplete v-model="myPackage.weeks" outlined :items="weeks_choose" item-value="value" item-text="text" label="Weeks Number" clearable :rules="[v => !!v || 'This filed is required']"></v-autocomplete>
                    </v-col>

                </v-col>
                <v-col cols=" 12" md="6" style="padding-bottom:0">
                    <v-col cols=" 12" md="12" style="padding-bottom:0">
                        <v-textarea label="Description" placeholder="" v-model="myPackage.description" outlined :rules="[v => !!v || 'This filed is required']"></v-textarea>
                    </v-col>

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
                    <v-col cols="12" md="12" class="image-preview" v-if="myPackage.images">
                        <div v-for="(image,index) in myPackage.images" :key="index">
                            <img :src="image" />
                            <v-btn color="error" style="display:block;  width: 100%;" @click="DeleteImage(image)">
                                <v-icon small>
                                    mdi-delete
                                </v-icon>
                            </v-btn>
                        </div>

                    </v-col>
                </v-col>

                <v-col cols="12" md="12">
                    <div class="d-flex justify-end mt-4 mb-4">
                        <v-btn class="btnpost fit-btn-x" elevation="2" x-large color="primary" @click="UpdatePackage"> Update Package
                        </v-btn>
                    </div>
                    <!-- testtttttttttttttt-->
                </v-col>

            </v-row>
        </v-form>
    </v-card>

</div>
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
    components: {
        vueDropzone: Dropzone
    },
    layout: 'CoachLayout',

    data() {
        return {
            breadcrumbPath: [{
                    text: 'Coach',
                    disabled: false,
                    href: '/',
                },
                {
                    text: 'Pacakges',
                    disabled: false,
                },
                {
                    text: 'Add New',
                    disabled: false,
                },
            ],
            description: '',
            title: '',
            price: '',
            type: '',
            payment_type: '',
            weeks: '',
            files_form: [],
            Uploads: null,
            package_forms: [],
            package_form: '',
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
            package_types: [
                'Workouts & Nutrition',
                'Nutrition',
                'Workouts',
                'Body Building',
                'Fitness',
                'CrossFit',
                'Other',

            ],
            payment_types: [
                'Once',
                "Every 2 months",
                "Every 3 months",
                "Every 4 months",
            ],
            weeks_choose: [{
                    text: '1 Week',
                    value: 1
                },
                {
                    text: '2 Weeks',
                    value: 2
                },
                {
                    text: '3 Weeks',
                    value: 3
                },
                {
                    text: '4 Weeks',
                    value: 4
                },
                {
                    text: '5 Weeks',
                    value: 5
                },
                {
                    text: '6 Weeks',
                    value: 6
                }, {
                    text: '7 Weeks',
                    value: 7
                },
                {
                    text: '8 Weeks',
                    value: 8
                },

            ],
            myPackage: null
        }
    },
    mounted() {
        this.GetPackage();
        this.fetch_forms();
    },
    methods: {

        async UpdatePackage() {
            /*  ======= Check if form is validate  ======= */
            if (this.$refs.form.validate()) {

                var here = this;
                /*  ======= Start Loader  ======= */
                const myloader = this.$vs.loading({
                    target: this.$refs.mycontainer,
                    color: '#34BE82'
                })

                /* ======= Organize data When Has File User formDataObj ======= */
                const formDataObj = new FormData()
                formDataObj.append('title', this.myPackage.title)
                formDataObj.append('price', this.myPackage.price)
                formDataObj.append('weeks', this.myPackage.weeks)
                formDataObj.append('type', this.myPackage.type)
                formDataObj.append('form_id', this.myPackage.form_id)
                formDataObj.append('payment_type', this.myPackage.payment_type)
                formDataObj.append('description', this.myPackage.description)
                //files
                for (var i = 0; i < this.files_form.length; i++) {
                    formDataObj.append('images[' + i + ']', this.files_form[i])
                }

                /* ======= Send To API  ======= */
                await this.$axios.post('coach-packages/update/' + this.$route.params.id, formDataObj, {
                    'Content-Type': 'multipart/form-data',
                }).then((response) => {
                    myloader.close();

                    //Send Notification if success
                    here.$vs.notification({
                        position: 'top-right',
                        title: 'Success',
                        text: 'Package Added Successfully',
                        color: 'success',
                        icon: '<i aria-hidden="true" class="v-icon notranslate mr-2 mdi mdi-check theme--light primary--text"></i>'
                    })

                    //redirect to list
                    this.$router.push('/coach/packages')

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
        DeleteImage(Image) {
            const myloader = this.$vs.loading({
                target: this.$refs.mycontainer,
                color: '#34BE82'
            })
            var data = {
                name: this.getFileName(Image)
            }
            this.$axios
                .post('/coach-packages/deleteImage', data)
                .then(response => {
                    //Send Notification if success
                    this.$vs.notification({
                        position: 'top-right',
                        title: 'Success',
                        text: 'Image Deleted Successfully',
                        color: 'success',
                        icon: '<i aria-hidden="true" class="v-icon notranslate mr-2 mdi mdi-check theme--light primary--text"></i>'
                    })
                    this.GetPackage()
                    myloader.close()
                })
                .catch(error => {
                    myloader.close()
                    console.log(error)
                })
        },
        getFileName(file) {
            var filename = file.substring(file.lastIndexOf('/') + 1);
            return filename;
        },
        GetPackage() {
            const myloader = this.$vs.loading({
                target: this.$refs.mycontainer,
                color: '#34BE82'
            })
            this.$axios
                .get('/coach-packages/' + this.$route.params.id)
                .then(response => {
                    myloader.close()
                    this.myPackage = response.data.data
                })
                .catch(error => {
                    myloader.close()
                    console.log(error)
                })
        },
        fetch_forms() {
            const myloader = this.$vs.loading({
                target: this.$refs.mycontainer,
                color: '#34BE82'
            })
            this.$axios
                .get('/coach-forms/list')
                .then(response => {
                    myloader.close()
                    this.package_forms = response.data.data.data
                })
                .catch(error => {
                    myloader.close()
                    console.log(error)
                })
        },
        fileAdded(file) {

            this.files_form.push(file)
            console.log(file)
        },
    }

}
</script>

<style lang="scss" scoped>
h1 {
    color: #34BE82;
}

p {
    color: #5E5873;
}

span {
    color: #34BE82;
    font: bold;
}

.textFile {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

.choose {
    position: relative;
}

.Cfile {
    position: absolute;
    bottom: 0;
    right: 10%;
    width: 50%;
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

.image-preview {
    div {
        box-shadow: 0px 0px 4px 0px #eee;
        padding: 10px
    }

    img {
        height: 150px;
        object-fit: contain;
        display: block;
        margin-bottom: 5px;
        text-align: center;
        margin: 8px auto;
    }
}
</style>
