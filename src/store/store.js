import Vue from 'vue';
import Vuex from 'vuex';

import settings from './store.data'

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: { settings }
});