// Imports.
import { useRef, useEffect } from 'react';
import Button from '../atoms/Button';
import Column from '../atoms/Column';
import Row from '../atoms/Row';
import ChatDemoPost from './ChatDemoPost';
import { throttle } from '../../../../utils/src/throttle';
import '../../../../utils/src/functionUtils';

// Main component.
export const ChatDemoPostCarousel = ({
  posts,
  onClose,
  translate,
  hooks,
  className
} = {}) => {
  posts || (posts = []);
  className = className && `chat-demo-post-carousel ${className}` || 'chat-demo-post-carousel';
  typeof translate === 'function' || (translate = Function.identity);
  const containerRef = useRef(), nextRef = useRef(), prevRef = useRef(),
  prev = () => {
    const node = containerRef.current,
    w = ((node && node.childNodes[0]) || document.documentElement).clientWidth || 0;
    node.scrollLeft -= w;
  },
  next = () => {
    const node = containerRef.current,
    w = ((node && node.childNodes[0]) || document.documentElement).clientWidth || 0;
    node.scrollLeft += w;
  },
  checkInView = throttle(() => {
    const delta = 5,
      fromLeft = containerRef.current.scrollLeft,
      fromRight = containerRef.current.scrollWidth - containerRef.current.clientWidth - containerRef.current.scrollLeft;
    prevRef.current.style.opacity = fromLeft > delta && 1 || 0;
    nextRef.current.style.opacity = fromRight > delta && 1 || 0;
  }, 50);

  hooks && (
    hooks.prev = prev,
    hooks.next = next,
    hooks.checkInView = checkInView
  );

  useEffect(() => {
    window.addEventListener('resize', checkInView);
    containerRef.current.addEventListener('scroll', checkInView);
    setTimeout(checkInView, 0);
  }, []);

  // Render.
  return <Column className={className}>
    <Row className='chat-demo-post-container' ref={containerRef}>
      {posts.map(({...post} = {}, p) => (
        <ChatDemoPost
          key={`${p}`}
          {...post}
        />
      ))}
    </Row>
    <Row className='width-100-percent spread padding-horizontal-half'>
      <Button
        ref={prevRef}
        className='outlined large light round'
        src='https://crossroad-venture-studio.github.io/Design-System/icons/navigation/chevron-left-filled-light.svg'
        onPress={prev}
        translate={translate}
      />
      {typeof onClose === 'function' && <Button
        className='outlined large light'
        value='Close'
        onPress={onClose}
        translate={translate}
      /> || null }
      <Button
        ref={nextRef}
        className='outlined large light round'
        src='https://crossroad-venture-studio.github.io/Design-System/icons/navigation/chevron-right-filled-light.svg'
        onPress={next}
        translate={translate}
      />
    </Row>
  </Column>;
}

// Default export.
export default ChatDemoPostCarousel;