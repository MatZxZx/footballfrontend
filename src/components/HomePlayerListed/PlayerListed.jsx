import './PlayerListed.css'

export default function PlayerListed({ name, team, place, points }) {
  return (
      <div className='w-full PlayerListed flex justify-center items-center'>
        <img className='playerImg' src="/src/assets/profile.png" alt="player" />
        <div className='w-full playerNameNTeam'>
          <p>{name}</p>
          <div className='w-full team'>
              <p>{team}</p>
          </div>
        </div>
        <div className='playerPlaceNPoints'>
          <p>{place}º</p>
          <div className='points'>
            <p>{points} PTS</p>
          </div>
        </div>
      </div>
      
  )
}