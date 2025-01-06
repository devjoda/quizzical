const Button = ({label, type = 'button', size = 'large', selected = false, correct = false, showResults = false, disabled = false, handleClick}) => {
  const baseClass = 'transition-colors'
  let opacityClass = ''
  const cursorClass = disabled ? 'cursor-auto' : 'cursor-pointer'
  let hoverClass = ''
  let typeClass = ''
  let sizeClass = ''
  
  if (type === 'button') {
    typeClass = 'text-white bg-blue-500 rounded-lg'
    opacityClass = disabled ? 'opacity-50' : 'opacity-100'
    hoverClass = !disabled && 'hover:bg-blue-600'
  } else if (type === 'radio') {
    opacityClass = disabled && !selected ? 'opacity-50' : 'opacity-100'
    if (disabled) {
      if (selected) {
        if (correct) {
          typeClass = 'text-green-900 bg-green-300 border-2 border-green-300 rounded-full'
        } else {
          typeClass = 'text-red-900 bg-red-300 border-2 border-red-300 rounded-full'
        }
      } else {
        if (correct) {
          typeClass = 'text-green-950 bg-transparent border-2 border-green-500 rounded-full'
        } else {
        typeClass = 'text-blue-950 bg-transparent border-2 border-blue-400 rounded-full'
        }
      }
    } else {
      if (selected) {
        typeClass = 'text-blue-800 bg-blue-200 border-2 border-blue-200 rounded-full'
      } else {
        typeClass = 'text-blue-900 bg-transparent border-2 border-blue-400 rounded-full'
        hoverClass = 'hover:text-blue-800 hover:bg-blue-200 hover:border-blue-200'
      }
    }
  }

  if (size === 'small') {
    sizeClass = 'px-6 py-2 md:text-lg'
  } else if (size === 'medium') {
    sizeClass = 'px-6 py-3 md:text-xl'
  } else if (size === 'large') {
    sizeClass = 'px-8 py-4 md:text-2xl'
  } 

  return (
    <div>
      <button type={type} className={`${baseClass} ${opacityClass} ${cursorClass} ${hoverClass} ${typeClass} ${sizeClass}`} onClick={handleClick}>{label}</button>
    </div>
  )
}

export { Button }