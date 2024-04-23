import { useObserver } from '../../hooks/useObserver';
import { Children, cloneElement } from 'react';
import { genKeyAttr } from '../../../utils/genKeyAttr';

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
  if (!(children && (children = Children.toArray(children)).length)) return null;
  useObserver(obj, attr, onRefresh);
  return <>{children}</>
  return <>{children.map(child => cloneElement(child, { key: genKeyAttr() }))}</>;
}

// Default export.
export default Observer;