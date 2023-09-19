<template>
<v-dialog v-model="dialog" max-width="48%">

    <template v-slot:activator="{ on, attrs }">
        <div class="fromTemplate" v-bind="attrs" v-on="on" s>
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" class="choose-image">
                <rect width="60" height="60" fill="white" />
                <path d="M58.3028 54H9.69721C9.2988 54 9 53.6766 9 53.2453V22.9488L17.4661 14H58.3028C58.7012 14 59 14.3235 59 14.7547V53.2453C59 53.6766 58.7012 54 58.3028 54Z" fill="white" stroke="#A5A7AE" stroke-miterlimit="10" />
                <path d="M54.3028 50H5.69721C5.2988 50 5 49.6765 5 49.2453V18.9488L13.4661 10H54.3028C54.7012 10 55 10.3235 55 10.7547V49.2453C55 49.6765 54.7012 50 54.3028 50Z" fill="white" stroke="#A5A7AE" stroke-miterlimit="10" />
                <path d="M50.3028 46H1.69721C1.2988 46 1 45.6766 1 45.2453V18L14 6H50.3028C50.7012 6 51 6.32345 51 6.75472V45.2453C51 45.6766 50.7012 46 50.3028 46Z" fill="#EDEDED" stroke="#A5A7AE" stroke-miterlimit="10" />
                <path d="M32.4608 27.9054C32.493 28.0044 32.5553 28.0909 32.639 28.1528L35.9509 30.6022C35.961 30.6096 35.9713 30.6167 35.9819 30.6233C36.2319 30.7807 36.4486 30.9858 36.6194 31.2269L37.0274 30.9379L36.6194 31.2269C36.7902 31.468 36.9118 31.7404 36.9774 32.0285C37.0429 32.3167 37.051 32.6149 37.0013 32.9061C36.9516 33.1974 36.845 33.476 36.6876 33.7261L36.6871 33.727L36.2018 34.5015C36.2018 34.5016 36.2018 34.5016 36.2018 34.5016C36.0134 34.8008 35.7138 35.0129 35.3691 35.0913C35.0255 35.1694 34.6651 35.1084 34.3665 34.9216L19.4204 25.1516L19.4205 25.1515L19.4145 25.1477C19.1158 24.9584 18.9041 24.6586 18.8257 24.3137C18.7473 23.969 18.8084 23.6074 18.9957 23.3076C18.9958 23.3074 18.9959 23.3072 18.996 23.307L22.4951 17.7469C22.5757 17.6188 22.747 17.5292 22.9247 17.5301C23.0934 17.5308 23.1497 17.6011 23.1684 17.6654L23.1683 17.6654L23.1711 17.6747C23.4001 18.4115 23.7809 19.0921 24.2891 19.6727C24.7972 20.2532 25.4214 20.7208 26.1214 21.0453C26.13 21.0493 26.1386 21.053 26.1474 21.0564C27.4832 21.5862 28.9449 21.6944 30.3376 21.373L32.4608 27.9054Z" fill="white" stroke="#A5A7AE" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M17.375 35.625H26.5417" stroke="#A5A7AE" stroke-miterlimit="10" stroke-linecap="square" />
                <path d="M17.375 31.0417H20.125" stroke="#A5A7AE" stroke-miterlimit="10" stroke-linecap="square" />
                <path d="M1 18H14V6L1 18Z" fill="#BFBFBF" stroke="#A5A7AE" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

            <h3> Create from Template</h3>
            <p>Choose from list of templates</p>

        </div>

    </template>
    <v-card class="fit-dailog-card">
        <v-card-title class="fit-card-title-dialog">
            Choose Workout Template
        </v-card-title>

        <v-card-text style="padding:0">
            <form ref="form" lazy-validation class="form">
                <v-row style="margin:0">
                    <v-col cols="12" md="6" sm="12" style="padding:0;">
                        <div class="firstHalf" style="padding:0;">
                            <v-text-field v-model="search" @keyup="searchfilter" append-icon="mdi-magnify" label="Search" single-line hide-details outlined></v-text-field>
                            <v-spacer></v-spacer>
                            <br>
                            <p>MOST POPULAR</p>

                            <div class="col-12" style="padding:0;">
                                <div v-if="filterdList == null">
                                    <div @click="current=element.id" class="list-group-item" v-for="(element ) in list1" :key="element.name" style="padding:0;">
                                        <div class="name" style="padding:0;">
                                            <h3> {{ element.name }}</h3>
                                            <div class="content" style="padding:0;">
                                                <p>{{ element.exercises }} Exercises</p>
                                                <p>{{ element.sections }} Sections</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-else>
                                    <div @click="current=element.id" class="list-group-item" v-for="(element ) in filterdList" :key="element.name" style="padding:0;">
                                        <div class="name" style="padding:0;">
                                            <h3> {{ element.name }}</h3>
                                            <div class="content" style="padding:0;">
                                                <p>{{ element.exercises }} Exercises</p>
                                                <p>{{ element.sections }} Sections</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </v-col>
                    <v-col class="aa" cols="12" md="6" sm="12" style="padding:0;">
                        <div class="secondHalf">
                            <div class="frame">

                                <div v-for="(element ) in list1.filter(obj => obj.id == current)" :key="element.name" style="padding:0;">
                                    <div class="bgwork" style="padding:30px 10px 5px;">
                                        <h3 style="color:white;"> {{ element.name }}</h3>
                                        <div class="content" style="padding:0;">
                                            <p style="color:white;">{{ element.exercises }} Exercises</p>
                                            <p style="color:white;">{{ element.sections }} Sections</p>
                                        </div>
                                    </div>
                                    <div class="description">Description</div>
                                    <div class="text">{{ element.description }}</div>
                                    <div class="list-group-item" v-for="(element ) in list2" :key="element.name" style="padding: 10px 15px;">
                                        <div class="exercise">
                                            <img :src=element.image width="40px" height="40px" style="border-radius: 10%;" alt="">
                                            <div style="margin-left: 10px; color: black;  font-size: 13px; line-height: 16px;"> {{ element.name }} </div>
                                            <div style="  float:right; font-weight: normal; font-size: 10px; line-height: 14px; color: rgb(95, 95, 95); overflow: hidden; white-space: nowrap; ">
                                                {{ element.reps }}</div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </v-col>

                </v-row>
            </form>

        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn to="/newTemplate" color="primary" large style="padding: 1rem 2rem;" @click="save">
                Select
            </v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script>
import draggable from 'vuedraggable';
export default {
    name: "list1",
    display: "List",
    order: 1,
    components: {
        draggable
    },
    watch:{
        dialog(){
           // this.$emit('close')
        }
    },
    data() {
        return {
            current: 1,
            search: "",
            dialog: false,
            dialogDelete: false,
            isHidden: true,
            list1: [{
                    name: "Lower Body 40:20 5x5 - Demo",
                    exercises: 14,
                    sections: 3,
                    description: "Five exercises, 40 seconds of work, 20 seconds of rest, repeated five times.",
                    id: 1
                },
                {
                    name: "HIIT TABATA 20:10 8x8 - Demo",
                    exercises: 18,
                    sections: 3,
                    description: "Two movements per round, alternating. Work 20 seconds, rest 10 seconds. Two minuet rest between rounds.",
                    id: 2
                },
                {
                    name: "Power xBody 40:20 5x5 - Demo",
                    exercises: 9,
                    sections: 6,
                    description: "Four rounds of five exercises. One minuet of workout, no rest between exercises. 45 seconds of recovery between each round.",
                    id: 3
                },

            ],
            list2: [{
                    name: "Incline Dumbbell Curl.",
                    reps: "12 reps",
                    image: [require("../../../assets/img/11.jpg")],
                    id: 1,

                },
                {
                    name: "Dumbbell Side Lateral Raises",
                    reps: "18 reps",
                    image: [require("../../../assets/img/22.jpg")],

                    id: 2,
                },
                {
                    name: "Incline dumbbell bench press",
                    reps: "15 reps",
                    image: [require("../../../assets/img/33.jpg")],
                    id: 3,
                },
                {
                    name: "squat for full legs",
                    reps: "20 reps",
                    image: [require("../../../assets/img/44.jpg")],
                    id: 4,
                },

            ],
            filterdList: null

        };
    },
    methods: {

        save(date) { //axios

        },
        searchfilter() {
            console.log(this.search)
            const search = this.search.toLowerCase();

            if (!search || search == '') {
                this.filterdList = null;
            }

            this.filterdList = this.list1.filter(c => c.name.toLowerCase().includes(search));
        },
        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        log: function (evt) {
            window.console.log(evt);
        }
    }
};
</script>

<style lang="scss" scoped>
.fromTemplate {
    margin-right: 1rem;
    align-items: center;
    text-align: center;
    font-size: 8px;
    height: 90%;
    padding: 2rem;
    border: 1px solid #a2a2a2;
    border-radius: 5%;
    cursor: pointer;
    height: 250px;

    &:hover {
        transition: 300ms;
        border: 1px solid #34BE82;
    }

    &:hover .choose-image path {
        transition: 300ms;
        fill: #31e195a8
    }
}

.list-group-item {
    cursor: pointer;
    box-shadow: rgb(240 240 240) 1px 1px 1px 1px;
}

.name {
    margin-top: 8px;
}

.content {
    display: flex;

    p {
        margin-right: 10px;
        margin-top: 8px;
    }

}

.firstHalf {
    background-color: white;
    padding: 15px 0px 9px;
    padding-right: 10px;
    margin-right: 13px;
}

.secondHalf {
    background-color: rgb(246, 247, 251);
    padding: 15px 9px 9px;
    height: 100%;
}

.frame {
    padding: 0;
    border: 10px solid white;
    border-radius: 20px 20px 0 0;
    height: 100%;
    width: 100%;
    z-index: 50;
    overflow: hidden;

    .description {
        font-weight: bold;
        font-size: 11px;
        line-height: 15px;
        color: rgb(34, 34, 34);
        padding: 10px 10px 10px;
    }

    .text {
        font-weight: normal;
        font-size: 12px;
        line-height: 16px;
        color: rgb(34, 34, 34);
        margin: auto;
        padding: 0 10px 10px;
    }

}

.bgwork {
    background: url("../../../assets/img/workout_preview_bg.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    margin: auto;
    width: 100%;

}

.exercise {
    display: flex;
    align-items: center;

}

.media {
    display: flex;
    align-items: center;
    justify-content: center;

}

h2 {
    color: #34BE82;
}
</style>
