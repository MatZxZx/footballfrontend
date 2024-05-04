import './scrollfilter.css'
import { useState } from 'react'


function PlayerSearch(){

    const [name, setName] = useState('')

    return(
        <div>
            <form action=''>
                <input className= 'search' type='text' name={name} placeholder='Buscar' onChange={(e) => setName(e.target.value)}/>
            </form>

        </div>
    )
    
}

export default function ScrollFilter(){
    return(
        <div className="w-1/2 bg-[#202020] pt-3">
        <div className='flex space-x-6 pl-2'>
        <PlayerSearch/>
        <div className='flex space-x-7 pl-7'>
        <button className='del' onClick={() => alert('Estas filtrando por Delanteros')}>
            DEL
          </button>
        <button className='mc' onClick={() => alert('Estas filtrando por Mediocampistas')}>
            MC
          </button>
        <button className='df' onClick={() => alert('Estas filtrando por Defensas')}>
            DF
          </button>
        <button className='pt' onClick={() => alert('Estas filtrando por Porteros')}>
            PT
          </button>
          </div>
        </div>
        <div className="font-['Poppins'] text-white text-xl p-5 flex space-x-8">
        <p>Filtrar por</p>
        <button className='fil' onClick={() => alert('Estas filtrando por Goles')}>
            Goles
        </button>
        <button className='fil' onClick={() => alert('Estas filtrando por Asistencias')}>
            Asist
        </button>
        <button className='fil' onClick={() => alert('Estas filtrando por Puntos')}>
            Pts
        </button>
        <button className='fil' onClick={() => alert('Aca se abriria un coso')}>
            ...
        </button>
        <div className='flex space-x-4'>
        <button className='ord' onClick={() => alert('Estas filtrando de forma Ascendente')}>
            ASC
        </button>
        <button className='ord' onClick={() => alert('Estas filtrando de forma Descendente')}>
            DESC
        </button>
        </div>
        </div>
        </div>
    )
    
}