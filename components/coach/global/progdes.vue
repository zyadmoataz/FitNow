<template>
<v-dialog v-model="dialog" max-width="50%">
    <template v-slot:activator="{ on, attrs }">
        <v-btn v-if="!appliedBefore" v-bind="attrs" v-on="on" elevation="4" color="primary" style="float: right;" class="fit-btn">Apply </v-btn>
        <v-btn v-else v-bind="attrs" v-on="on" elevation="4" color="secondary" style="float: right;" class="fit-btn">View Proposal</v-btn>
    </template>

    <v-card class="job-dialog" v-if="!appliedBefore">
        <v-card-title>
            <span class="job-title">{{post.title}}</span>
        </v-card-title>
        <div class="post-info d-flex">
            <div class="date">
                <v-icon color="primary">mdi-clock-outline</v-icon> {{changeDate(post.created_at)}}
            </div>
            <div class="date">
                <v-icon color="primary">mdi-map-marker</v-icon> Egypt
            </div>
            <div>
                <v-icon color="primary">mdi-currency-usd</v-icon> {{post.price}} EGP
            </div>

        </div>
        <div class="dec">
            {{post.description}}
        </div>
        <v-card-text>
            <v-row class="send-proposel">
                <v-col cols="12" sm="12" md="12">
                    <v-form ref="form" v-model="valid" lazy-validation>

                        <v-col cols=" 12" md="12" style="padding-bottom:0">
                            <label class="d-block mb-4">Select a Package</label>
                            <v-autocomplete v-model="mypackage" outlined :items="packages" item-value="id" item-text="title" label="Select a Package" clearable :rules="[v => !!v || 'This filed is required']"></v-autocomplete>
                        </v-col>
                        <v-col cols=" 12" md="12" style="padding-bottom:0">
                            <label class="d-block mb-4">Write your coverletter!</label>
                            <v-textarea v-model="coverletter" label="Cover Letter" clearable outlined height="300" required :rules="[v => !!v || 'Item is required']"></v-textarea>
                        </v-col>
                    </v-form>

                </v-col>

            </v-row>
        </v-card-text>
        <v-card-actions class="mb-2">
            <v-spacer></v-spacer>
            <v-btn color="primary darken-1" text @click="dialog = false">
                Cancel
            </v-btn>
            <v-btn color="primary" class="fit-btn" @click="applyJob">
                Apply
            </v-btn>

        </v-card-actions>
    </v-card>
    <v-card class="job-dialog" v-else>
        <v-card-title>
            <span class="job-title">{{post.title}}</span>
        </v-card-title>
        <div class="post-info d-flex">
            <div class="date">
                <v-icon color="primary">mdi-clock-outline</v-icon> {{changeDate(post.created_at)}}
            </div>
            <div class="date">
                <v-icon color="primary">mdi-map-marker</v-icon> Egypt
            </div>
            <div>
                <v-icon color="primary">mdi-currency-usd</v-icon> {{post.price}} EGP
            </div>

        </div>
        <div class="dec">
            {{post.description}}
        </div>
        <v-card-text v-if="myProposal != null">
            <v-row class="send-proposel">
                <v-col cols="12" sm="12" md="12">
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <div class="mb-4">
                            <label class="d-flex mr-2">Package : {{packages.filter(obj => obj.id == myProposal.package_id)[0].title}}</label>
                        </div>
                         <div>
                            <label>Your cover Letter!</label><br>
                        {{myProposal.coverletter}}
                        </div>
                      
                    </v-form>

                </v-col>

            </v-row>
        </v-card-text>
        <v-card-actions class="mb-2">
            <v-spacer></v-spacer>
            <v-btn color="primary darken-1" class="fit-btn" @click="dialog = false">
                Close
            </v-btn>

        </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script>
export default {
    data() {

        return {
            dialog: false,
            coverletter: '',
            valid: false,
            myProposal: null,
            packages: [],
            mypackage: null,

        }

    },
    props: {
        post: Object,
        appliedBefore: Boolean

    },
    watch: {
        appliedBefore: function (val) {
            if (val) {
                this.GetMyProposal()

            }
        }
    },
    methods: {
        async applyJob() {
            var here = this;
            /*  ======= Check if form is validate  ======= */
            if (this.$refs.form.validate()) {
                /*  ======= Start Loader  ======= */
                const myloader = this.$vs.loading({
                    target: this.$refs.mycontainer,
                    color: '#34BE82'
                })

                /* ======= Organize data  ======= */
                var data = {
                    job_id: this.$props.post.id,
                    coverletter: this.coverletter,
                    package_id: this.mypackage
                };
                console.log(data)
                /* ======= Send To API  ======= */
                await this.$axios.post('/job-proposel/add', data).then((response) => {
                    //Refetch Postes
                    here.$emit('RefetchPostes')
                    here.$props.post.applied = true;
                    myloader.close();

                    //Send Notification if success
                    here.$vs.notification({
                        position: 'top-right',
                        title: 'Success',
                        text: 'Job Proposel Added Successfully',
                        color: 'success',
                        icon: '<i aria-hidden="true" class="v-icon notranslate mr-2 mdi mdi-check theme--light primary--text"></i>'
                    })

                    //Close Dialog
                    this.dialog = false;

                    //Refetch Postes

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
        async fethPackages() {
            await this.$axios.get('/coach-packages/list').then((response) => {
                this.packages = response.data.data.data;
                console.log(response)

            }).catch(function (error) {
                console.log(error.response)

            });
        },
        GetMyProposal() {
            this.$axios.get('job-proposel/getMyProposal/' + this.$props.post.id).then((response) => {
                this.myProposal = response.data.data;
                console.log(response)
            }).catch(function (error) {
                console.log(error.response)
            });
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
    mounted() {
        this.fethPackages();
    }

}
</script>

<style lang="scss">
.job-dialog {
    padding-bottom: 2rem;

    .v-card__title {
        padding: 0 !important;
    }

    .job-title {
        font-weight: bold;
        color: #000;
        padding: 1rem;
        font-size: 1.5rem;
        border-bottom: 1px solid #bdbdbd;
        width: 100%;
    }

    .dec {
        font-size: 16px;
        line-height: 26px;
        font-size: 16px;
        line-height: 29px;
        color: #000;
        padding: 1.5rem;
    }

    .post-info {
        padding: 1rem;

        background: #eee;

        div {
            margin-right: 2rem
        }
    }

    .send-proposel {
        border-top: 1px solid #eee;
        padding: 1rem 0;

        label {
            margin-bottom: 2px;
            font-weight: bold;
            display: block;
        }
    }
}
</style>
