import { useObserver} from '../../hooks/useObserver';

// Main component.
export const Observer = props => {
  let {
    object,
    obj = object,
    property,
    prop = property,
    attribute = prop,
    attr = attribute,
    onRefresh,
    children
  } = props || {};
  useObserver(obj, attr, onRefresh);
  return <div className='observer' key={`${Math.random()}`}>{children}</div>;
}

// Default export.
export default Observer;