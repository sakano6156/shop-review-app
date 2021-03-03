import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import UserStore from '~/store/user'

// eslint-disable-next-line import/no-mutable-exports
let userStore: UserStore

function initialiseStores(store: Store<any>): void {
    userStore = getModule(UserStore, store)
}

export { initialiseStores, userStore }
