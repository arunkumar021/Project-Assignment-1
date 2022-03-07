import { createStore } from 'vuex';
import axios from 'axios';
export default createStore({
        state: {
            authenticated: false,
            isLogged: false
        },
        mutations: {
            setAuthentication(state , status) {
                state.authenticated = status
            }
        },
     
    })
