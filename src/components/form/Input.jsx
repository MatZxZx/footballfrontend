import { toCapitalaze } from '../../helpers/func'

function Input({ name, type = 'text', value, autoFocus, error,
  onChange = () => { },
  onFocus = () => { }
}) {
  return (
    <div className='text-xs text-primary'>
      {error && <p className='text-red-400 mb-1'>Campo requerido *</p>}
      {!error && <p className='mb-1'>{toCapitalaze(name)}</p>}
      <input
        name={name}
        className={`w-full px-2 py-1 bg-transparent border border-[#c2dd8d] outline-none rounded-sm`}
        type={type}
        placeholder={toCapitalaze(name)}
        autoFocus={autoFocus === undefined ? false : autoFocus}
        value={value}
        onChange={onChange}
        onFocus={onFocus} />
    </div>
  )
}

export default Input