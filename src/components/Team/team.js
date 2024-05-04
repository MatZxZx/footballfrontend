class Change {
  currentPlayers = []
  inProgress = false

  addPlayer(player) {
    if (this.currentPlayers.length < 2) {
      this.currentPlayers.push(player)
    }
  }

  canMakeChange() {
    return this.currentPlayers === 2
  }
}

class TeamClass {
  constructor(onField, onBanking, sections, changeField, changeBanking) {
    this.field = this.playersAdapter(onField) // jugadores en campo
    this.banking = this.playersAdapter(onBanking) // jugadores en banca
    this.sections = sections ? sections : [[], [], [], []] // secciones: DEL, MD, DF, PT.
    this.changeField = changeField ? changeField : new Change()
    this.changeBanking = changeBanking ? changeBanking : new Change()
    if (!sections) {
      this.init()
    }
  }

  setSelectedPlayers(players, value) {
    this.field.forEach(p => {
      players.forEach(py => {
        if (p.name.toLowerCase() === py.name.toLowerCase()) {
          p.selected = value
        }
      })
    })
    this.banking.forEach(p => {
      players.forEach(py => {
        if (p.name.toLowerCase() === py.name.toLowerCase()) {
          p.selected = value
        }
      })
    })
    this.sections.forEach(s => {
      s.forEach(p => {
        players.forEach(py => {
          if (p.name.toLowerCase() === py.name.toLowerCase()) {
            p.selected = value
          }
        })
      })
    })
  }

  playersAdapter(players) {
    return players.map(p => {
      return {
        name: p.name,
        section: p.section,
        inactive: p.inactive === undefined ? false : p.inactive,
        selected: p.selected === undefined ? false : p.selected,
        points: p.points
      }
    })
  }

  getEmptySections() {
    return [[], [], [], []]
  }

  onField(player) {
    return this.field.includes(player)
  }

  onBanking(player) {
    return this.banking.includes(player)
  }

  canChangePlayersOnBanking() {
    return !this.changeField.inProgress // se puede empezar un cambio en banca si no hay un cambio en proceso
  }

  changePlayersOnBanking(playerOnBanking, playerOnField) {
    // if (!this.canChangePlayersOnBanking()) {
      console.log('Hay un cambio de campo en proceso', this.changeField.currentPlayers.toString())
      // return
    // }

    const section = this.getSection(playerOnField.section)
    section.splice(section.indexOf(playerOnField), 1)
    let index = -1
    this.banking.forEach((j, i) => {
      if (j.name.toLowerCase() === playerOnBanking.name.toLowerCase()) {
        index = i
      }
    })
    this.banking.splice(index, 1, playerOnField)
    this.getSection(playerOnBanking.section).push(playerOnBanking)

  }

  changeFieldInProgress() {
    return this.changeField.inProgress
  }

  changeBankingInProgress() {
    return this.changeBanking.inProgress
  }
  /*
    se puede empezar un cambio en campo si no hay un cambio en proceso y
    si los jugadores son de la misma seccion
  */
  canChangePlayersOnField(playerA, playerB) {
    return (
      (!this.changeBanking.inProgress) &&
      (playerA.section === playerB.section)
    )
  }

  addPlayerOnChangeOnField(player) {
    this.changeField.push(player)
  }

  changePlayersOnField(playerA, playerB) {
    const section = this.getSection(playerA.section)
    const indexA = section.indexOf(playerA)
    const indexB = section.indexOf(playerB)
    section[indexA] = playerB
    section[indexB] = playerA
  }

  getSection(section) {
    return {
      DEL: this.sections[0],
      MC: this.sections[1],
      DF: this.sections[2],
      PT: this.sections[3],
    }[section]
  }

  isLeftWithoutPlayer(player) {
    return this.getSection(player.section).length - 1 <= 0
  }

  init() {
    this.field.forEach(player => {
      this.getSection(player.section).push(player)
    })
  }

  clone() {
    return new TeamClass(this.field, this.banking, this.sections, this.changeField, this.changeBanking)
  }

  disablePlayers(predicateOnField, predicateOnBanking) {
    this.field.forEach(p => {
      if (predicateOnField(p)) {
        p.inactive = true
      }
    })
    this.sections.forEach(s => {
      s.forEach(p => {
        if (predicateOnField(p)) {
          p.inactive = true
        }
      })
    })
    this.banking.forEach(p => {
      if (predicateOnBanking(p)) {
        p.inactive = true
      }
    })
  }

  activeAllPlayers() {
    this.field.forEach(p => {
      p.inactive = false
    })
    this.banking.forEach(p => {
      p.inactive = false
    })
    this.sections.forEach(s => {
      s.forEach(p => {
        p.inactive = false
      })
    })
  }
}

export default TeamClass