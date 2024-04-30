// Prominence logo.
export const Logo = props => {
  let {
    type = 'color',
    height = 32,
    width = 'auto',
    responsive,
    title = 'Logo',
    alt = title,
    prefix,
    dir = 'assets/logos',
    src = `${dir}/${prefix && `${prefix}-` || ''}logo${type && `-${type}` || ''}.svg`,
    ...other
  } = props || {};
  if (responsive) {
    let v = parseFloat(height);
    isNaN(v) || (height = `min(max(calc(${v} * 0.05vw), calc(0.5 * ${v}px)), ${v}px)`);
    v = parseFloat(width);
    isNaN(v) || (width = `min(max(calc(${v} * 0.05vw), calc(0.5 * ${v}px)), ${v}px)`);
  } else {
    parseFloat(height) == height && (height = `${height}px`);
    parseFloat(width) == width && (width = `${width}px`);
  }

  // Render.
  return <img
    src={src}
    style={{width, height}}
    title={title || null}
    alt={alt || null}
    {...other}
  />;
}

export default Logo;