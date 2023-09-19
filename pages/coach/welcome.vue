<template>
<v-card class="welcome-card">
    <div class="welcome_message">
        Welcome <span class="primary--text username">{{$myuser().fullname}}</span><br> <span>Just a few steps to start...</span>
    </div>
    <v-form ref="form">
        <v-container class="form-container">
            <v-row >
                <v-col cols="12" md="12" class="photo_div">
                    <div>
                        <v-img class="photo_preview" :src="photo_preview" />
                        <v-file-input v-model="photo" hide-input label="Upload your photo" outlined truncate-length="15" @change="onFileChange" prepend-icon="mdi-camera" accept="image/png, image/jpeg, image/jpg"></v-file-input>
                    </div>
                    <div v-show="fileerror != ''" class="v-messages theme--light error--text" role="alert">
                        <div class="v-messages__wrapper mt-4">
                            <div class="v-messages__message">{{fileerror}} </div>
                        </div>
                    </div>
                </v-col>
                <v-col cols="12" md="12">
                    <v-text-field v-model="title" label="Your Title" placeholder="Enter your title ex (fitness trainer)" outlined :rules="[v => !!v || 'This filed is required']" clearable></v-text-field>
                </v-col>
                <v-col cols="12" md="12">
                    <v-textarea v-model="bio" label="Your Bio" placeholder="Descrip Your Work" outlined :rules="[v => !!v || 'This filed is required']" clearable></v-textarea>
                </v-col>
                <v-col cols="12" md="6">
                    <v-menu ref="menu" v-model="birthdatemenu" :close-on-content-click="false" :return-value.sync="birthdate" transition="scale-transition" offset-y min-width="auto">
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field outlined v-model="birthdate" label="Your Birth Date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" :rules="[v => !!v || 'This filed is required']" clearable></v-text-field>
                        </template>
                        <v-date-picker v-model="birthdate" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="birthdatemenu = false">
                                Cancel
                            </v-btn>
                            <v-btn text color="primary" @click="$refs.menu.save(birthdate)">
                                OK
                            </v-btn>
                        </v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field v-model="video_url" label="Intro Video (optional)" placeholder="Intro Video" outlined clearable></v-text-field>
                </v-col>
                <v-col cols="12" md="12">
                    <v-btn block elevation="3" @click="complete_profile" large color="primary" class="auth-btn">Submit for review
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</v-card>
</template>

<script>
export default {
    layout: 'CoachWelcome',
    data() {
        return {

            title: '',
            bio: '',
            birthdate: '',
            birthdatemenu: false,
            photo: '',
            photo_preview: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
            video_url: '',
            fileerror: false,
            myloader: null,
            value:''
        }
    },
    methods: {
        complete_profile() {

            if (this.$refs.form.validate()) {
                this.myloader = this.$vs.loading({
                    target: this.$refs.form,

                })
                const formDataObj = new FormData()
                formDataObj.append('photo', this.photo)
                formDataObj.append('title', this.title)
                formDataObj.append('birthdate', this.birthdate)
                formDataObj.append('video_url', this.video_url)
                formDataObj.append('bio', this.bio)
                

                this.$axios.post(`/coach/review/`, formDataObj, {
                        'Content-Type': 'multipart/form-data',
                    })
                    .then(response => {
                        console.log(response)
                        this.myloader.close()
                        this.$router.push('/coach');
                        this.openNotification('top-right', 'success', 'Done !!', 'The Data has been Submited.')
                    })
                    .catch(error => {
                        this.myloader.close()

                        console.log(error.response)
                        this.openNotification('top-right', 'danger', error.response.data.status, error.response.data.errors)
                    })

            }
        },
          openNotification(position = 'top-right', color, title, message) {
            const noti = this.$vs.notification({
                color,
                position,
                title,
                text: message,
            })
        },
        createImage(file) {
            const reader = new FileReader();
            reader.onload = e => {
                this.photo_preview = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        onFileChange(file) {
            this.fileerror = false;

            if (!file) {
                return;
            }
            if (!this.isFileImage(file)) {
                this.fileerror = "Allowed types are :  jpeg / png / jpg";
                return;
            }
            if (file.size > 4000000) {
                this.fileerror = 'photo size should be less than 4 MB!';
                return;
            }
            
            this.createImage(file);
        },
        isFileImage(file) {
            const acceptedImageTypes = ['image/jpg', 'image/jpeg', 'image/png'];
            return file && acceptedImageTypes.includes(file['type'])
        }
    }
}
</script>

<style lang="scss">
.welcome-card {
    width: 50%;
    margin: 0 auto;
    padding: 1rem;
    text-align: center
}

.welcome_message,
.username {
    font-size: 30px;
}

.photo_preview {
    height: 100px;
    width: 100px;
    object-fit: contain;
    border-radius: 50%;
    border: 2px solid #eee;
}

.photo_div {
    position: relative;

    .v-input {
        position: absolute;
        top: 0;
        background: #fff;
        border-radius: 50%;
        box-shadow: 0px 0px 4px 0px #707070;
        height: 35px;
        width: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        margin: 0;

        .v-input__prepend-outer {
            margin: 0 !important;
            padding: 0 !important;
        }
    }
}
</style>
