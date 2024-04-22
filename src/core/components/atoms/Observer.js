import { useObserver} from '../../../data/useObserver';

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
  return <>{children}</>;
}

// Default export.
export default Observer;