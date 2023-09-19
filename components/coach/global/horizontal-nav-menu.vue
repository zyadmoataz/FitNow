<template>
<v-app-bar app>
    <v-card color="lighten-4" :class="['horizontal-nav',{'horizontal-nav-ltr': !$vuetify.rtl},{'horizontal-nav-rtl' : $vuetify.rtl}]" flat rounded height="50px" :absolute="true" :bottom="false">
        <v-toolbar dense>
            <v-app-bar-nav-icon @click="closeDrawer" class="d-lg-none"></v-app-bar-nav-icon>
            <v-btn icon>
                <v-icon>mdi-star</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
            </v-btn>

            <v-spacer></v-spacer>
            <!-- Langauges -->
            <div class="top-header-block" @click="toggleDirection">
                <nuxt-link v-for="locale in availableLocales" :key="locale.code" :to="switchLocalePath(locale.code)" class="d-flex langs secondary--text">

                    <img v-if="locale.code == 'ar'" src="~/assets/img/icons/SA.png">
                    <img v-else src="~/assets/img/icons/USA.png">
                    {{ locale.name }}

                </nuxt-link>
            </div>
            <!-- Notification -->
            <div class="top-header-block">
                <v-badge :content="1" :value="1" color="red" overlap style="font-size:12px">
                    <v-icon>
                        mdi-bell
                    </v-icon>
                </v-badge>
            </div>

            <!-- User Menu -->
            <div class="top-header-block">
                <v-menu offset-y :close-on-click="closeOnClick" class="user-menu">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn v-bind="attrs" v-on="on" class="user-nav-btn">
                            <div class="d-flex">
                                <div class="user-info" :style="$vuetify.rtl ? 'text-align:left;margin-left:10px' : 'text-align:right;margin-right:10px'">
                                    <div class="user-name secondary--text">{{$store.state.authStore.userData.fullname}}</div>
                                    <div class="user-title accent--text">Coach</div>
                                </div>
                                <div class="user-img d-flex">
                                    <img v-if="coachData != null" :src="coachData.coach_profile.photo">
                                    <img v-else src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y">
                                </div>
                            </div>
                        </v-btn>
                    </template>

                    <v-list class="user-menu-list">
                        <v-list-item link>
                            <v-list-item-icon>
                                <v-icon size="20">mdi-account</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>My Profile</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
               
                        <v-list-item link to="/coach/inbox">
                            <v-list-item-icon>
                                <v-icon size="20">mdi-message</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>Messages</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-divider></v-divider>

                        <v-list-item link to="/coach/coach-setting">
                            <v-list-item-icon>
                                <v-icon size="20">mdi-cog</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>Settings</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item link @click="logout">
                            <v-list-item-icon>
                                <v-icon size="20">mdi-power</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>Sign out</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>

        </v-toolbar>
    </v-card>
</v-app-bar>
</template>

<script>
export default {
    data() {
        return {
            closeOnClick: true,
            notivications_status: true,
            coachData: null
        }
    },

    computed: {
        availableLocales() {
            return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
        }
    },
    mounted() {
        this.getcoachData();
    },
    methods: {
        async getcoachData() {
            await this.$axios.get('/coach/data').then((response) => {
                this.coachData = response.data.data;
            }).catch(function (error) {
                console.log(error.response)

            });
        },
        closeDrawer() {
            this.$emit('closedrawer');
        },
        toggleDirection() {
            this.$vuetify.rtl = !this.$vuetify.rtl

        },
        logout() {

            localStorage.removeItem('user');
            this.$router.push('/login');
        }
    }
}
</script>

<style lang="scss" scoped>
.v-menu__content {
    top: 75px !important;
    z-index: 999 !important;
}

.user-nav-btn {
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
    padding: 5px !important;

    &::before {
        background: transparent !important;
        box-shadow: none !important;
    }

    .user-info {
        letter-spacing: 0;

        .user-name {
            text-transform: capitalize;
            font-size: 14px;
            font-weight: 500;
        }

        .user-title {
            font-size: 12px;
            text-transform: capitalize;
        }
    }

    .user-img {
        img {
            width: 40px;
            height: 40px;
            object-fit: cover;
            border-radius: 50%;
        }
    }
}

.user-menu-list {
    .v-list-item {
        min-height: 30px !important;

    }

    .v-list-item__icon:first-child {
        margin-right: 10px !important;
    }

    .v-list-item__icon {
        margin: 8px 0 !important;
    }

    .v-list-item__title {
        font-size: 0.7rem;
    }
}

.top-header-block {
    padding: 0 10px;
}

.langs {
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    text-decoration: none !important;

    img {
        height: 14px;
        margin: 0 10px;
    }
}
</style>
