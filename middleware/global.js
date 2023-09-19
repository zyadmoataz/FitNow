export default async({ app, store, $auth }) => {
    console.log('hre')
    if ($auth.loggedIn) {

        app.$auth.setUser(app.$auth.$storage.getUniversal('user'))

    }
}