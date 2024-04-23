import { useObserver} from '../../hooks/useObserver';
import {useState, useEffect} from 'react';
import observe from '../../../data/observe';

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
  // useObserver(obj, attr, onRefresh);

  const valid = obj && attr && obj.hasOwnProperty(attr);
  let value = valid ? obj[attr] : null;
  const [state, setState] = useState(value);
  // const forceUpdate = useForceUpdate();
  if (valid) {
    useEffect(() => {
      const refresh = typeof onRefresh === 'function' && (() => {
        const v = obj[attr];
        v !== state && onRefresh(v);
        setState(v);
        console.log('OBSERVED', state, v);
        // forceUpdate();
      }) || (() => setState(obj[attr]));
      observe(obj, attr, refresh);
    }, []);
  }

  return <div className='observer' key={`${Math.random()}`}>{children}</div>;
}

// Default export.
export default Observer;