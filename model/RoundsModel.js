import { BaseModel } from 'startupjs/orm'

export default class RoundsModel extends BaseModel {
  async addNew (params = {}) {
    const id = params.id || this.root.id()
    await this.root.add('rounds', {
      ...params,
      createdAt: Date.now(),
      id
    })
  }
}
