
import Column from '../atoms/Column';

// Main component.
const hashTagRe = re = /(\#[a-z0-9]+)/gi;
export const ChatDemoPost = props => {
  // Normalise input.
  let {
    className,
    textContent,
    text = textContent,
    imageContent,
    visualContent = imageContent,
    imgContent = visualContent,
    imageSource = imgContent,
    imgSrc = imageSource,
    src = imgSrc
  } = props || {}, baseClassName = 'chat-demo-post';
  className = className && `${baseClassName} ${className}` || baseClassName;

  // Render.
  return (src || text) && <Column className={className}>
    {src && <div className='image-container'>
      <img src={src}/>
    </div> || null}
    {text && <span className='text-content'>
      {text.split(hashTagRe).map((s, i) => s.charAt(0) === '#' && <b key={`${i}`} className='hashTag'>{s}</b> || s)}
    </span> || null}
  </Column> || null;
}

// Default exports.
export default ChatDemoPost;