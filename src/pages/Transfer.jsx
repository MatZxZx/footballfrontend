import { useEffect } from 'react'
import ScrollFilter from '../components/scroll-filter/ScrollFilter'
import { getOrder } from '../helpers/func'
import LayoutPage from '../layouts/LayoutPage'
import { useSelector } from 'react-redux'
import useNavbar from '../hooks/useNavbar'
import PlayerCardTrasfer from '../components/player/PlayerCardTrasfer'
import { useTransfer } from '../contexts/TransferContext'
import InformationCard from '../components/InformationCard'
import Button from '../components/Button'
import LoadingPageTransparent from '../components/loading/LoadingPageTransparent'

function Transfer() {

  const userState = useSelector(state => state.user.user)
  const { showModel, setShowModel, handleTransfer, transferIsLoading } = useTransfer()
  const { setIcon } = useNavbar()

  function playersAdapter(align, banking) {
    const resAlign = [
      ...align.map(p => ({ ...p, isEmpty: false, isBanking: false }))
    ]
    const resBanking = [
      ...banking.map(p => ({ ...p, isEmpty: false, isBanking: true }))
    ]

    const playersWithouthAlign = 7 - align.length
    const playersWithouthBanking = 2 - banking.length

    if (playersWithouthAlign) {
      for (let i = 0; i < playersWithouthAlign; i++) {
        const DELS = resAlign.filter(p => p.position === 'DEL')
        const MCS = resAlign.filter(p => p.position === 'MC')
        const DFS = resAlign.filter(p => p.position === 'DF')
        const PTS = resAlign.filter(p => p.position === 'PT')

        let position
        let orderOnPosition

        if (DELS.length < 2) {
          position = 'DEL'
          orderOnPosition = getOrder(DELS)
        } else if (MCS.length < 2) {
          position = 'MC'
          orderOnPosition = getOrder(MCS)
        } else if (DFS.length < 2) {
          position = 'DF'
          orderOnPosition = getOrder(DFS)
        } else if (PTS.length < 1) {
          position = 'PT'
          orderOnPosition = getOrder(PTS)
        } else {
          throw new Error('me mori en alineacion')
        }

        resAlign.push({
          id: 0,
          isEmpty: true,
          position,
          order: orderOnPosition,
          isBanking: false
        })
      }
    }

    if (playersWithouthBanking) {
      for (let i = 0; i < playersWithouthBanking; i++) {
        const MCS = resBanking.filter(p => p.position === 'MC')
        const DFS = resBanking.filter(p => p.position === 'DF')
        let order
        let position

        if (resBanking.length === 0) {
          order = 0
        } else {
          switch (resBanking[0].order) {
            case 0:
              order = 1
              break
            case 1:
              order = 0
              break
          }
        }

        if (MCS.length < 1) {
          position = 'MC'
        } else if (DFS.length < 1) {
          position = 'DF'
        } else {
          throw new Error('me mori en banca')
        }

        resBanking.push({
          id: 0,
          isEmpty: true,
          position,
          order,
          isBanking: true
        })
      }
    }

    const res = [...resAlign, ...resBanking]
    const DELS = res.filter(p => p.position === 'DEL')
    const MCS = res.filter(p => p.position === 'MC')
    const DFS = res.filter(p => p.position === 'DF')
    const PTS = res.filter(p => p.position === 'PT')
    DELS.sort((a, b) => a.order - b.order)
    MCS.sort((a, b) => a.order - b.order)
    DFS.sort((a, b) => a.order - b.order)
    PTS.sort((a, b) => a.order - b.order)
    MCS.sort((a, b) => b.isBanking - a.isBanking)
    DFS.sort((a, b) => b.isBanking - a.isBanking)
    return [DELS, MCS, DFS, PTS]
  }

  useEffect(() => {
    setIcon('transfer')
  }, [])

  function handleClickOnBody(e) {
    if (showModel) setShowModel(false)
  }

  const teamComplete = userState.team.players.length === 9

  return (
    <>
      {
        transferIsLoading
          ? <LoadingPageTransparent />
          : <></>
      }
      <div onClick={handleClickOnBody}>

        <LayoutPage>
          <div className='flex flex-col lg:flex-row gap-12 overflow-hidden'>
            <div className='flex justify-center gap-4 lg:flex-col lg:justify-normal'>
              <InformationCard text='Presupuesto' data={`${userState.budget}$`} />
              <InformationCard text='Transferencias' data={userState.willCardActive ? '∞' : userState.transfers} />
              <Button onClick={handleTransfer} hidden={!(userState.team.players.length === 9)}>
                Guardar
              </Button>
            </div>
            <div className='w-full'>
              {
                !teamComplete
                  ? <p className='text-center animate__animated animate__fadeInDown mb-6'>Ficha jugadores tocando los espacios vacios</p>
                  : <></>
              }
              <div className='w-full relative flex justify-center items-center'>
                <div className='football-field  flex flex-col justify-center items-center lg:gap-8'>
                  {
                    playersAdapter(userState.team.players.filter(p => !p.isBanking), userState.team.players.filter(p => p.isBanking)).map((section, i) => {
                      return <div key={i} className='flex gap-4'>
                        {
                          section.map((p, j) => <PlayerCardTrasfer key={j} player={p} />)
                        }
                      </div>
                    })
                  }
                </div>
                <div className={`w-full transfer__model right-0 ${showModel ? 'transfer__model-active' : ''} p-4`}>
                  <ScrollFilter />
                </div>
              </div>
            </div>
          </div>
        </LayoutPage>
      </div>
    </>
  )
}

export default Transfer