import { getPlayerPoints } from '../helpers/func'

export function getPointsByUser(user) {
  const pointsAlign = user.team.align.players.reduce((acum, p) => acum + getPlayerPoints(p), 0)
  const pointsBanking = user.team.banking.players.reduce((acum, p) => acum + getPlayerPoints(p), 0)
  return pointsAlign + pointsBanking
}