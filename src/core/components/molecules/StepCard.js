// Imports.
import Column from '../atoms/Column';

// Main component.
export const StepCard = props => {
  let {
    className,
    number,
    num = number,
    step = num,
    iconSrc,
    icon = iconSrc
  } = props || {};
  const baseClassName = 'profile-card';
  className = className && `${baseClassName} ${className}` || baseClassName;

  // Render.
  return <Column className={className} {...other}>
    
  </Column>
}

// Default export.
export default StepCard;