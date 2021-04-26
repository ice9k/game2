import { BaseModel } from 'startupjs/orm'

export default class TemplatesModel extends BaseModel {
  async addNew (params = {}) {
    const userId = this.root.get('_session.userId')
    const id = params.id || this.root.id()
    await this.root.add('templates', {
      ...params,
      userId,
      createdAt: Date.now(),
      id
    })
  }
}
