import { BaseModel } from 'startupjs/orm'

export default class GamesModel extends BaseModel {
  async addNew (params = {}) {
    const id = params.id || this.root.id()
    await this.root.add('games', {
      ...params,
      usersByRoles: {},
      createdAt: Date.now(),
      id
    })
  }
}
