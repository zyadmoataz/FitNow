<template>
<div>
    <FitBreadcumb :breadcrumbPath="breadcrumbPath"></FitBreadcumb>

    <v-card class="fit-card" v-if="myApplier != null">
        <v-card-title class="fit-card-title d-flex mb-2 justify-space-between">
            <div class="fit-card-title">
                {{myApplier.user.fullname}} Apply Details
            </div>
            <div class="actions d-flex">
                <offerDialog :myApplier="myApplier"></offerDialog>
                <v-btn depressed color="primary" class="fit-btn" @click="startChat">
                    <v-icon size="18" class="mr-2">mdi-forum</v-icon>Start Chat
                </v-btn>
            </div>
        </v-card-title>
        <v-row>
            <v-col md="3">
                <div class="info-block">
                    <div class="title">
                        Client Name
                    </div>
                    <div class="block-info">
                        {{myApplier.user.fullname}}
                    </div>
                </div>
            </v-col>
            <v-col md="3">
                <div class="info-block">
                    <div class="title">
                        Age
                    </div>
                    <div class="block-info">
                        {{myApplier.age}}
                    </div>
                </div>
            </v-col>
            <v-col md="3">
                <div class="info-block">
                    <div class="title">
                        Height
                    </div>
                    <div class="block-info">
                        {{myApplier.height}} cm
                    </div>
                </div>
            </v-col>
            <v-col md="3">
                <div class="info-block">
                    <div class="title">
                        Height
                    </div>
                    <div class="block-info">
                        {{myApplier.weight}} kg
                    </div>
                </div>
            </v-col>
            <v-col md="3">
                <div class="info-block">
                    <div class="title">
                        Diseases
                    </div>
                    <div class="block-info">
                        {{myApplier.diseases}}
                    </div>
                </div>
            </v-col>
            <v-col md="3">
                <div class="info-block">
                    <div class="title">
                        Training Time
                    </div>
                    <div class="block-info">
                        {{myApplier.training_time}}
                    </div>
                </div>
            </v-col>
            <v-col md="3">
                <div class="info-block">
                    <div class="title">
                        Goal
                    </div>
                    <div class="block-info">
                        {{myApplier.goal}}
                    </div>
                </div>
            </v-col>
            <v-col md="3">
                <div class="info-block">
                    <div class="title">
                        Food Allergy
                    </div>
                    <div class="block-info">
                        {{myApplier.food_allergy}}
                    </div>
                </div>
            </v-col>
            <v-col md="3">
                <div class="info-block">
                    <div class="title">
                        Use Supplements
                    </div>
                    <div class="block-info">
                        {{myApplier.use_supplements}}
                    </div>
                </div>
            </v-col>
            <v-col md="3">
                <div class="info-block">
                    <div class="title">
                        Other
                    </div>
                    <div class="block-info">
                        {{myApplier.other}}
                    </div>
                </div>
            </v-col>
            <v-col cols="12" md="12" class="image-preview d-flex" v-if="myApplier.images">

                <div v-for="(image,index) in myApplier.images" :key="index">
                    <img :src="image" />
                </div>

            </v-col>
        </v-row>
    </v-card>

</div>
</template>

<script>
import Dropzone from 'nuxt-dropzone'
import 'nuxt-dropzone/dropzone.css'
import offerDialog from './offerDialog.vue'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import * as firestoreService from '@/plugins/chat-database/firestore'
import * as firebaseService from '@/plugins/chat-database/firebase'
import * as storageService from '@/plugins/chat-database/storage'
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
        vueDropzone: Dropzone,
        offerDialog
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
                    text: 'Appliers',
                    disabled: false,
                },
            ],
            headers: [{
                    text: 'Client Name',
                    sortable: false,
                    value: 'user.fullname',
                },
                {
                    text: 'Age',
                    value: 'age'
                },
                {
                    text: 'Height',
                    value: 'height'
                },

                {
                    text: 'Weight',
                    value: 'weight'
                },
                {
                    text: 'Goal',
                    value: 'goal'
                },
                {
                    text: 'Actions',
                    value: 'actions',
                    sortable: false
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
            myApplier: null,
            usersInRoom: false,
            rooms: null
        }
    },
    mounted() {
        this.GetPackageApply();
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

        async CreateRoom(user1, user2) {
            await firestoreService.getAllRooms().then(({
                data
            }) => {
                this.rooms = data;

            });
            if (this.rooms != null) {
                for (var i = 0; i < this.rooms.length; i++) {
                    console.log(this.rooms[i])
                    if (this.rooms[i].users[0] == user1._id && this.rooms[i].users[1] == user2._id) {
                        this.$router.push('/coach/inbox/');
                        console.log("done1")
                        break;
                    }
                    this.CreateRoom2(user1, user2)
                }
            
            }else{
                 this.CreateRoom2(user1, user2)
            }
        },
        async CreateRoom2(user1, user2) {
            await firestoreService.addRoom({
                users: [user1._id, user2._id],
                lastUpdated: new Date()
            })
            this.$router.push('/coach/inbox')
        },
        async startChat() {
            const myloader = this.$vs.loading({
                target: this.$refs.mycontainer,
                color: '#34BE82'
            })
            const user1 = {
                _id: this.myApplier.user.id.toString(),
                username: this.myApplier.user.fullname,
                avatar: this.myApplier.user.photo != null ? this.myApplier.user.photo : 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
            }
            await firestoreService.addIdentifiedUser(user1._id, user1)

            const user2 = {
                _id: this.$myuser().id.toString(),
                username: this.$myuser().fullname,
                avatar: this.$myuser().photo != null ? this.$myuser().photo : 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
            }

            await firestoreService.addIdentifiedUser(user2._id, user2)
            await this.CreateRoom(user1, user2)
            myloader.close()

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
        GetPackageApply() {
            const myloader = this.$vs.loading({
                target: this.$refs.mycontainer,
                color: '#34BE82'
            })
            this.$axios
                .get('/package-apply/' + this.$route.params.id)
                .then(response => {
                    myloader.close()
                    this.myApplier = response.data.data
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
        height: 300px;
        object-fit: contain;
        display: block;
        margin-bottom: 5px;
    }
}

.info-block {
    box-shadow: 0px 0px 2px 0px #5e5e5e;
    padding: 5px;

    .title {
        border-bottom: 1px solid #eee;
        padding: 5px;
    }

    .block-info {
        padding: 5px;
    }
}
</style>
