import { useObserver } from '../../hooks/useObserver';
import { Children, cloneElement } from 'react';
import { genKeyAttr } from '../../../utils/genKeyAttr';

// Main component.
export const Observer = props => {
  const {
    object,
    obj = object,
    property,
    prop = property,
    attribute = prop,
    attr = attribute,
    onRefresh,
    children
  } = props || {};
  if (!(children && Children.toArray(children).length)) return null;
  useObserver(obj, attr, onRefresh);
  return <>{Children.map(children, child => cloneElement(child), { key: genKeyAttr() })}</>;
}

// Default export.
export default Observer;