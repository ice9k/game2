import { BaseModel } from 'startupjs/orm'

export default class GameModel extends BaseModel {
  async joinUser (userId) {
    const { nextPlayerRoleIndex = 0, roles } = this.get()
    const role = roles[nextPlayerRoleIndex]
    await this.push('usersByRoles.' + role, userId)
    await this.set('nextPlayerRoleIndex', (nextPlayerRoleIndex + 1) % roles.length)
  }
}
