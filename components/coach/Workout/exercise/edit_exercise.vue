<template>
<div class="exerciseDetails exercise_details_section" v-if="currentExercise != null">
    <div class="exercise d-flex"><img class="mr-4" v-if="currentExercise.images != null && currentExercise.images.length > 0" :src=currentExercise.images[0] style="border-radius: 10%;" alt="">
        <div class="text" style="color:#000"> {{ currentExercise.title }}</div>
        <v-icon color="#000" size="20" class="ml-auto" @click="DeleteEx(exercise)">mdi-delete</v-icon>

    </div>
    <br>
    <div class="fortable scroll-style" style="padding:0;height:100%;overflow-y: auto">
        <table style="border: 1px solid rgb(218, 223, 234);border-radius:5px">
            <thead style="margin:auto;">
                <tr>
                    <th style="min-height: px !important;">
                        Set
                    </th>
                    <th v-for="track in currentExercise.tracking_fileds" :key="track.id">
                        {{track.name}} ({{track.uint}})
                    </th>
                </tr>
            </thead>
            <tbody id="myTable" :key="newSet">
                <tr v-for="(set,index) in exercise.sets" :key="index">
                    <td style="display: block;height: 50px;padding: 21px 8px; font-weight: bold;">
                        {{index + 1}}
                    </td>
                    <td v-for="track2 in currentExercise.tracking_fileds" :key="track2.id">
                        <v-text-field dense loader-height="5px" class="inputt" v-model="set[track2.name]" outlined></v-text-field>
                    </td>
                    <td v-if="index != 0" style="    display: flex;align-items: center; height: 100%;">
                        <v-icon color="red" size="20" class="ml-auto" @click="DeleteSet(set)">mdi-delete</v-icon>
                    </td>

                </tr>
            </tbody>

        </table>

        <v-btn color="primary" outlined style="padding: 1rem 2rem; margin-top:10px; margin-bottom: 10px; float: right;" @click="addSet">
            <v-icon size="20px" class="mr-2">mdi-plus</v-icon> Add Set
        </v-btn>
        <br>
        <v-col style="padding:0">
            <v-text-field v-model="exercise.notes" dense placeholder="Add any note for exercise" outlined style="width:100%; margin-top: 25px;"></v-text-field>
        </v-col>
    </div>
</div>
</template>

<script>
export default {
    props: {
        exercise: Object,
        Ident: Number,
        sectionindex: Number
    },
    data() {
        return {
            currentExercise: null,
            sets: [],
            newSet: 0
        }
    },
    async mounted() {
        await this.getExercise();
     
    },

    methods: {
        SetExercise() {
            // var data = {
            //     index: this.$props.Ident,
            //     notes: this.$props.exercise.notes,
            //     exercise_id: this.currentExercise.id,
            //     sets: this.$props.exercise.sets
            // };
            // this.$emit('updateEx', data)
        },
        getExercise() {
            var myid = 0;
            if (this.$props.exercise.exercise_id != null) {
                myid = this.$props.exercise.exercise_id;
            } else {
                myid = this.$props.exercise.id
                this.addSet()              
            }
            console.log(myid);
            const myloader = this.$vs.loading({
                target: this.$refs.mycontainer,
                color: '#34BE82'
            })
            this.$axios
                .get('/exercies/' + myid)
                .then(response => {
                    myloader.close()
                    this.currentExercise = response.data.data

                })
                .catch(error => {
                    myloader.close()
                    console.log(error)
                })
        },
        DeleteSet(set) {
            if (!set.id) {
                this.exercise.sets.splice(this.exercise.sets.indexOf(set), 1)
                this.newSet += 1;
                return;
            }
            const myloader = this.$vs.loading({
                target: this.$refs.mycontainer,
                color: '#34BE82'
            })
            var here = this;
            this.$axios
                .post('/workouts/deleteSet', {
                    id: set.id
                })
                .then(response => {
                    myloader.close()
                    this.$emit('refetch-data');
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
         DeleteEx(exercise) {
            if (!exercise.exercise_id) {
                this.exercise.splice(this.exercise.indexOf(exercise), 1)
                this.newSet += 1;
                return;
            }
            const myloader = this.$vs.loading({
                target: this.$refs.mycontainer,
                color: '#34BE82'
            })
            var here = this;
            this.$axios
                .post('/workouts/deleteEx', {
                    id: exercise.id
                })
                .then(response => {
                    myloader.close()
                    this.$emit('refetch-data');
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
        addSet() {
            if (!this.$props.exercise.sets) {
                this.$props.exercise.sets = [];
            }
            this.$props.exercise.sets.push({

            })
            this.newSet += 1;
        },

    }
}
</script>

<style lang="scss">
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

table {
    width: 100%;
}

table,
th,
td {
    padding: 5px;

}

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
</style>
