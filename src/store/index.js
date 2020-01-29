import Vue from 'vue'
import Vuex from 'vuex'
import { Cookies } from 'quasar'
import createPersistedState from 'vuex-persistedstate'

import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */
let store = null

export const initStore = (ssrContext) => {
  const cookies = process.env.SERVER
    ? Cookies.parseSSR(ssrContext)
    : Cookies

  const persistedState = createPersistedState({
    paths: ['example'],
    storage: {
      getItem (key) {
        return JSON.stringify(cookies.get(key))
      },
      setItem (key, value) {
        cookies.set(key, value)
      },
      removeItem (key) {
        cookies.remove(key)
      }
    }
  })
  store = new Vuex.Store({
  // enable strict mode (adds overhead!)
  // for dev mode only
    strict: process.env.DEV,
    modules: { example },
    // global actions
    plugins: [persistedState]
  })
}
export default function ({ ssrContext }) {
  initStore(ssrContext)
  return store
}

export { store }
