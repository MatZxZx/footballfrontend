import {
  DEL,
  MC,
  DF,
  PT
} from '../const/positions'

const jugadoresEnCampo = [
  {name: 'Chaparro', section: DEL, points: 1000},
  {name: 'Jimenez', section: DEL, points: 99},
  {name: 'Quinteros', section: MC, points: 166},
  {name: 'Marco', section: MC, points: 122},
  {name: 'Dimitrioff', section: DF, points: 88},
  {name: 'Rodriguez', section: DF, points: 100},
  {name: 'Moschen', section: PT, points: 80}
]

const jugadoresEnBanca = [
  {name: 'Ferro', section: MC, points: 90},
  {name: 'Jerez', section: DF, points: 120}
]

export default {
  campo: jugadoresEnCampo,
  banca: jugadoresEnBanca
}