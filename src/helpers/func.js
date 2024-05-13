export function getWidthByPoints(points) {
  return points > 20 ? 512 : 512 / 20 * points 
}

export function getPositionColor(position) {
  switch (position) {
    case 'DF':
      return '#58C6CD'
    case 'DEL':
      return '#C71919'
    case 'MC':
      return '#E3E816'
    case 'PT':
      return '#CC40E2'
    default:
      return '#fff'
  }
}

export function toCapitalaze(string) {
  const s = string.slice(0)
  return s[0].toUpperCase() + s.slice(1)
}

export function getPlayerPoints(p) {
  let points = 0

  if (p.present)
      points++

    switch (p.position) {
      case 'DEL':
        points += p.goals * 4
      case 'DF':
        points += p.goals * 6
      case 'MC':
        points += p.goals * 5
      case 'PT':
        points += p.goals * 10
    }

    points += p.assists * 3
    points += p.locks
    points -= p.goalAgainst * 2
    points -= p.missedPenalty * 2

    points += p.position === 'PT' ? 0 : parseInt(p.interception / 2)
    points += p.savedPenalty * 5
    points -= p.criminalCommitted
    points += p.emptyGoal ? 4 : 0
    points -= p.position === 'PT' || p.position === 'DF' ? parseInt(p.goalsConceded / 2) : 0

    return points
}

export function getOrder(listPlayers) {
  let is0 = false
  let is1 = false
  let is2 = false
  listPlayers.forEach(p => {
    switch (p.order) {
      case 0:
        is0 = true
        break
      case 1:
        is1 = true
        break
      case 2:
        is2 = true
        break
    }
  })
  if (!is0) {
    return 0
  } else if (!is1) {
    return 1
  } else if (!is2) {
    return 2
  }
}