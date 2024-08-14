
function ApiMessage({ classNameCard = '', classNameText = '', children }) {
  return (
    <div className={`h-full flex justify-center items-center ${classNameCard}`}>
      <p className={`text-primary text-center font-bold ${classNameText}`}>{children}</p>
    </div>
  )
}

export default ApiMessage