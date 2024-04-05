// Imports
import Button from '../atoms/Button';
import Row from '../atoms/Row';
import Column from '../atoms/Column';

export const  CompanyFooter = props => {
  let {
    className,
    logoSrc,
    logo = logoSrc,
    logoTitle = 'Company logo',
    logoAlt = logoTitle,
    text,
    description = text,
    value = description,
    buttons,
    rightNav = buttons,
    socials,
    copyright,
    links,
    ...other
  } = props || {};
  const baseClassName = `company-footer responsive spread gap center`;
  className = className && `${baseClassName} ${className}` || baseClassName;
  rightNav = (Array.isArray(rightNav) && rightNav || [rightNav]).filter(x => x);
  socials = (Array.isArray(socials) && socials || [socials]).filter(x => x);
  links = (Array.isArray(links) && links || [links]).filter(x => x);

  // Render.
  return <Row className={className} {...other}>
    <Column className='text-gap-2x fill left'>
      {logo && <img src={logo} className='company-footer-logo icon' title={logoTitle} alt={logoAlt}/> || null}
      {value && <div className='line-height-120-percent font-size-12-14 company-footer-description'>{value}</div> || null}
    </Column>
    <Column className='text-gap fill right font-size-12-14'>
      {rightNav.length && <div className='row center gap-half'>
        {...(rightNav.map(({text, value = text, children, ...b} = {}, i) => <Button {...b} key={`${i}`}>{value}{children}</Button>))}
      </div> || null}
      {socials.length && <div className='row center'>
        {...(socials.map((b = {}, i) => <Button {...b} key={`${i}`}></Button>))}
      </div> || null}
      {copyright || null}
      {links.length && <div className='row center text-gap-half'>
        {...(links.map(({text, value = text, children, ...b} = {}, i) => [i && <span key={`${i}-sep`}>|</span> || null, <Button {...b} key={`${i}`}>{value}{children}</Button>]))}
      </div> || null}
    </Column>
  </Row>;
}

// Default export.
export default CompanyFooter;