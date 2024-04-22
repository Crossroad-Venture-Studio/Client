// Function to check if an object property is observable.
export const isObservable = (obj, prop) => {
  let d;

  // Get if the object prop exists and has a property descriptor.
  const propExists = obj
    && obj.hasOwnProperty(prop)
    && (d = Object.getOwnPropertyDescriptor(obj, prop));

  // Check the prop exists and we can reconfigure it to observe,
  // or if it does not exists, that the object is extendable
  return (
    (propExists && d.configurable)
    || (!propExists && Object.isExtensible(obj))
  ) && (d || {}) || null;
}

// Function to check if a property was observed.
export const isObserved = (obj, prop) => {
  const d = isObservable(obj, prop) || {}, { get, set } = d;
  return get && set && set.__is_observable__ && d || null;
}

// Function to observe an object property.
export const observe = (obj, prop, ...callbacks) => {
  const d = isObservable(obj, prop);

  if (!d) return null;

  // Get setter call flag.
  callbacks = callbacks.flat(Infinity);
  const observeOnlyChanges = callbacks[0] !== true;
  const flag = typeof callbacks[0] !== 'function' && callbacks.length;

  // No-op.
  if ((flag && callbacks.length === 1) || !callbacks.length) return obj;

  // Update callbacks if observing a setter.
  const { get, set } = d;

  // The set of observable callbacks is simply augmented if
  // the setter is already mirroring an observable setter
  // with the same input parameters.
  if (set && set.__callbacks__ && observeOnlyChanges === set.__observeOnlyChanges__) {
    set.__callbacks__ = set.__callbacks__.concat(flag && callbacks.slice(1) || callbacks);
    return obj;
  }

  (set && ((flag && (callbacks[0] = set)) || callbacks.unshift(set)))
    || (flag && callbacks.shift());

  // Init object prop values (cur, prev, obj and prop).
  const args = [obj[prop], obj[prop], obj, prop];

  // Create new setter.
  const _setter = function (newVal) { // Setter
    args[1] = args[0]; // Update previous value
    args[0] = newVal; // Update current value
    for (let i = 0, c = setter.__callbacks__, l = c.length; i !== l; ++i) {
      c[i].apply(obj, args); // Call callbacks
      // In case the callbacks modifies the output value:
      args[0] = obj[prop];
    }
    console.log('SET', newVal, args[1]);
    return args[0]; // Return the object updated value
  }
  const setter = observeOnlyChanges && function (newVal) {
      // Don't call callbacks is nothing changes.
    return args[0] === newVal ? newVal : _setter(newVal);
  } || _setter;
  setter.__callbacks__ = callbacks;
  setter.__observeOnlyChanges__ = observeOnlyChanges;
  setter.__setter__ = set && (set.__setter__ || set);
  setter.__is_observable__ = true;

  // Return object.
  get && (get.__getter__ = get.__getter__ || get);
  return Object.defineProperty(obj, prop, {
    // get: (get && (() => get.apply(obj))) || (() => args[0]), // Getter
    get: get || (() => args[0]), // Getter
    set: setter,
    enumerable: true,
    configurable: true
  });
}

// Function to unobserve a property of an object.
export const completelyUnobserve = (obj, prop) => {
  // Check if the property was observed.
  const d = isObserved(obj, prop);
  if (!d) return null;

  // Get original getter / setter.
  const { get, set } = d, getter = get.__getter__, setter = set.__getter__;

  // Return object.
  return (getter || setter) && Object.defineProperty(obj, prop, {
    get: getter || undefined,
    set: setter || undefined,
    enumerable: true,
    configurable: true
  }) || Object.defineProperty(obj, prop, {
    value: obj[prop],
    enumerable: true,
    configurable: true
  });
}

// Function to remove observable callbacks.
export const removeObservableCallbacks = (obj, prop, ...callbacks) => {
  const d = isObserved(obj, prop);
  if (!d) return null;

  // Remove callbacks.
  callbacks = callbacks.flat(Infinity);
  const { set } = d, c = set.__callbacks__;
  let k = 0;
  for (let i = 0, l = c.length; i !== l; ++i) {
    let keep = true;
    for (let j = 0, m = callbacks.length; j !== m && keep; ++j)
      keep = c[i] !== callbacks[j];
    keep && (c[k++] = c[i]);
  }
  c.length = k;
  return obj;
}

// Function to unobserve.
export const unobserve = (obj, prop, ...callbacks) => (
  callbacks.length ?
    removeObservableCallbacks(obj, prop, ...callbacks)
    : completelyUnobserve(obj, prop)
);

// Exports.
export default observe;