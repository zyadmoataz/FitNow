export default function({ $axios, store, $auth , redirect}) {
        const user = JSON.parse(localStorage.getItem('user')) || '';
        store.commit('authStore/userData',user.user)
        if (user) {
            var token = user.access_token || '';
            $axios.setToken(token, 'Bearer')
            console.log("token axxx")
        }else{
            return redirect('/login')
        }

}
