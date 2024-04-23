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
  const [state] = useObserver(obj, attr, onRefresh);
  console.log('OBSERVER', state);
  return <>{console.log('>> OBSERVER', state)}{children}</>;
}

// Default export.
export default Observer;