

export const state = () => ({
    userData: "",
    userToken: ""
})
export const getters = {
    userData: (state) => state.userData,
    userToken: (state) => state.userToken,
    isAuthenticated(state) {
        return state.userToken
    },
    loggedInUser(state) {
        return state.userData
    }
}
export const mutations = {
    userData(state, value) {
        state.userData = value;
    },
    userToken(state, value) {
        state.userToken = value;
    },
}