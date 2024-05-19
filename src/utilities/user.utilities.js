import { getPlayerPoints } from '../helpers/func'

export function getPointsByUser(user) {
  return user.team.players.reduce((acum, p) => acum + getPlayerPoints(p), 0)
}