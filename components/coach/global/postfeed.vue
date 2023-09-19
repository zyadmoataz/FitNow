<template>
<div>
    <v-row ref="mycontainer" class="post-page">
        <!-- start of post -->
        <v-col cols="12" md="9" v-if="postes.length > 0">
            <div :class="['fit-postes']" v-for="post in postes" :key="post.id">
                <h2 class="applied-text" v-if="post.applied">You applied on this job. </h2>

                <v-card class="fit-post" elevation="5">
                    <h1 class="post-title">{{post.title}}</h1>
                    <div class="post-info d-flex">
                        <span class="post-date">
                            <v-icon color="primary">mdi-clock-outline</v-icon> {{changeDate(post.created_at)}}
                        </span>
                    </div>

                    <div class="post-dec">{{truncate(post.description,100)}}
                        <nuxt-link to="">more</nuxt-link>
                    </div>

                    <progdes :post="post" :appliedBefore="post.applied" :show="true" @RefetchPostes="ReloadAll" />

                    <div class="skills">
                        <v-chip v-for="skill in post.skills" :key="skill.id" class="btn" elevation="4" outlined rounded>{{skill.title}}</v-chip>
                    </div>
                    <div class="post-footer d-flex" style="    margin-bottom: 2rem;">
                        <div class="location">
                            <v-icon color="primary">mdi-currency-usd</v-icon> {{post.price}} EGP
                        </div>
                        <div class="location">
                            <v-icon color="primary">mdi-map-marker</v-icon> Egypt
                        </div>
                    </div>
                </v-card>
            </div>

        </v-col>
        <v-col cols="12" md="9" v-else>
            <div class="fit-postes">
                <v-card class="fit-post" elevation="5">
                    <h1 class="post-title">No Postes</h1>
                </v-card>
            </div>
        </v-col>

        <!-- ent of post -->
        <!-- start of sam miller -->

        <v-col cols="12" md="3" sm="3">

            <div class="coach-side" v-if="coachData != null">
                <div class="side-header">
                    <img :src="coachData.coach_profile.photo">
                    <div class="coach-title">
                        {{$myuser().fullname}}
                    </div>
                    <div class="coach-title-2">
                        {{coachData.coach_profile.title}}
                    </div>
                </div>
            </div>
        </v-col>

    </v-row>
    <!-- end of sam miller -->

</div>
</template>

<script>
import Progdes from './progdes.vue'

export default {
    layout: 'CoachLayout',
    components: {

        Progdes
    },

    data: () => {

        return {
            isOpen: false,

            postes: [],
            myloader: null,
            currentpost: 0,
            coachData: null,
            appliedBefore: false

        }

    },
    async mounted() {
        const myloader = this.$vs.loading({
            target: this.$refs.mycontainer,
            color: '#34BE82'
        })

        await this.fetchPostes();
        await this.getcoachData();
        myloader.close();
    },

    methods: {
        async ReloadAll() {
            const myloader = this.$vs.loading({
                target: this.$refs.mycontainer,
                color: '#34BE82'
            })

            await this.fetchPostes();
            await this.getcoachData();
            myloader.close();
        },
        async fetchPostes() {

            var here = this;
            await this.$axios.get('/jobs/all').then((response) => {

                this.postes = response.data.data.data;
                here.postes.forEach(post => {
                    this.$axios.get('job-proposel/checkIfCoachApplied/' + post.id).then((response) => {
                        post.applied = response.data.data.exists;
                    });
                });

            }).catch(function (error) {
                console.log(error.response)

            });
        },
        async getcoachData() {
            await this.$axios.get('/coach/data').then((response) => {
                this.coachData = response.data.data;
            }).catch(function (error) {
                console.log(error.response)

            });
        },
        truncate(str, no_words) {
            return str.split(" ").splice(0, no_words).join(" ");
        },
        changeDate(date) {
            return this.fromNow(date);
        },
        fromNow(date, nowDate = Date.now(), rft = new Intl.RelativeTimeFormat(undefined, {
            numeric: "auto"
        })) {
            const SECOND = 1000;
            const MINUTE = 60 * SECOND;
            const HOUR = 60 * MINUTE;
            const DAY = 24 * HOUR;
            const WEEK = 7 * DAY;
            const MONTH = 30 * DAY;
            const YEAR = 365 * DAY;
            const intervals = [{
                    ge: YEAR,
                    divisor: YEAR,
                    unit: 'year'
                },
                {
                    ge: MONTH,
                    divisor: MONTH,
                    unit: 'month'
                },
                {
                    ge: WEEK,
                    divisor: WEEK,
                    unit: 'week'
                },
                {
                    ge: DAY,
                    divisor: DAY,
                    unit: 'day'
                },
                {
                    ge: HOUR,
                    divisor: HOUR,
                    unit: 'hour'
                },
                {
                    ge: MINUTE,
                    divisor: MINUTE,
                    unit: 'minute'
                },
                {
                    ge: 30 * SECOND,
                    divisor: SECOND,
                    unit: 'seconds'
                },
                {
                    ge: 0,
                    divisor: 1,
                    text: 'just now'
                },
            ];
            const now = typeof nowDate === 'object' ? nowDate.getTime() : new Date(nowDate).getTime();
            const diff = now - (typeof date === 'object' ? date : new Date(date)).getTime();
            const diffAbs = Math.abs(diff);
            for (const interval of intervals) {
                if (diffAbs >= interval.ge) {
                    const x = Math.round(Math.abs(diff) / interval.divisor);
                    const isFuture = diff < 0;
                    return interval.unit ? rft.format(isFuture ? x : -x, interval.unit) : interval.text;
                }
            }
        }

    },

}
</script>

<style lang="scss" scoped>
post-page {
    position: relative;
}

.applied-text {
    background: #898989;
    padding: 10px 1rem;
    color: #fff;
    border-radius: 10px 10px 0 0;
}

.fit-post {
    margin-bottom: 2rem;
    padding: 1rem;
    transition: 300ms ease-in-out;

    &:hover {
        background-color: rgba(244, 244, 244, 0.579);
        cursor: pointer;
        transition: 300ms ease-in-out;
    }

    i {
        font-size: 18px;
    }

    .post-title {
        font-size: 1.5rem;
        color: $primary-color;
    }

    .post-dec {
        font-size: 1rem;
        color: #666;
        margin: 1rem 0;
        line-height: 29px;
    }

    .post-info {
        color: #6e6e6e;

        .spr {
            margin: 0 10px;
        }
    }

    .skills {
        .v-chip.v-chip--outlined.v-chip.v-chip {
            background: rgba(237, 237, 237, 0.704) !important;
            border: 1px solid rgb(237, 237, 237);
            margin-right: 10px;
        }
    }

    .post-footer {
        margin: 1rem 0;
        color: #6e6e6e;

        .bold {
            font-weight: bold;
            color: $primary-color;
        }

        div {
            margin-left: 5px;
            margin-right: 2rem;
        }
    }
}

.coach-side {
    background: #fff;
    position: fixed;
    width: 20%;
    padding: 3rem 1rem;

    @media (max-width: 760px) {
        display: none !important;
    }

    .side-header {
        text-align: center;

        img {
            height: 140px;
            width: 140px;
            border-radius: 50%;
            object-fit: cover;
            border: 2px solid $primary-color;
            margin-bottom: 10px;
        }

        .coach-title {
            font-size: 1.5rem;
            font-weight: bold;
        }
    }
}
</style>
