import blueBlob from '../assets/blob-blue.svg';
import yellowBlob from '../assets/blob-yellow.svg';

const Blob = ({color = 'blue', size = 'medium', top = 'auto', right = 'auto', bottom = 'auto', left = 'auto'}) => {
  const blobSrc = color === 'blue' ? blueBlob : yellowBlob

  const imgClassName = size === 'large' ? 'sm:h-auto md:h-[250px] md:w-[250px] lg:h-[350px] lg:w-[350px]' : 'h-auto w-auto'
  
  return (
    <div className="hidden [@media(min-width:1600px)]:block" style={{ position: 'fixed', top, right, bottom, left, zIndex: -10 }}>
      <img className={`${imgClassName}`} src={blobSrc} alt='blob'/>
    </div>
  )
}

export { Blob }