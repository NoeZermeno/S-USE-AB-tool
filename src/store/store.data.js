const state = {
    sessionToken: null
    // userName: null,
    // role: 'user',
}

const getters = {
  
    sessionToken: state => {
        return state.sessionToken;
    }
}

const actions = {
    setSessionToken(context, payload) {
        context.commit('setSessionTokenTokenHandler', payload);
    },
   
}

// mutations
const mutations = {
    setSessionTokenTokenHandler(state, token) {
        state.sessionToken = token;
    },
 
}

export default {
    state,
    getters,
    actions,
    mutations
}