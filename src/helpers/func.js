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