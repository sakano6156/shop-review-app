import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

export interface User {
    name?: string
    description?: string
}

@Module({ stateFactory: true, namespaced: true, name: 'user' })
export default class UserStore extends VuexModule {
    user: User = {}

    @Mutation
    create(user: User) {
        this.user.name = user.name
        this.user.description = user.description
    }
}