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
    icon = iconSrc,
    src = icon,
    title,
    description,
    ...other
  } = props || {};
  const baseClassName = 'step-card';
  className = className && `${baseClassName} ${className}` || baseClassName;

  // Render.
  return <Column className={className} {...other}>
    {src && <img className='step-card-icon' src={src}/> || (
      (typeof step === 'number' || step) && <div className='step-card-num'>
        {step}
      </div>
    ) || null}
    {title && <span className='step-card-title'>{title}</span> || null}
    {description && <span className='step-card-description'>{description}</span> || null}
  </Column>
}

// Default export.
export default StepCard;