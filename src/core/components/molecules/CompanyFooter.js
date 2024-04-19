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
  const baseClassName = `company-footer responsive left spread gap top`;
  className = className && `${baseClassName} ${className}` || baseClassName;
  rightNav = (Array.isArray(rightNav) && rightNav || [rightNav]).filter(x => x);
  socials = (Array.isArray(socials) && socials || [socials]).filter(x => x);
  links = (Array.isArray(links) && links || [links]).filter(x => x);

  // Render.
  return <Row className={className} {...other}>
    <Column className='text-gap-2x fill left responsive'>
      {logo && <img src={logo} className='company-footer-logo icon' title={logoTitle} alt={logoAlt}/> || null}
      {value && <div className='line-height-130-percent font-size-12-14 balance company-footer-description'>{value}</div> || null}
    </Column>
    <Column className='text-gap fill right font-size-12-14 responsive'>
      {rightNav.length && <Row className='center gap-half'>
        {...(rightNav.map((b = {}, i) => <Button {...b} key={`${i}`}></Button>))}
      </Row> || null}
      {socials.length && <Row className='center'>
        {...(socials.map((b = {}, i) => <Button {...b} key={`${i}`}></Button>))}
      </Row> || null}
      {copyright || null}
      {links.length && <Row className='center text-gap-half padding-top-half'>
        {...(links.map(({
          isLink = true,
          text,
          value = text,
          children,
          ...b
        } = {}, i) => [
          i && <span key={`${i}-sep`}>|</span> || null,
          <Button isLink={isLink} {...b} key={`${i}`}>{value}{children}</Button>
        ]))}
      </Row> || null}
    </Column>
  </Row>;
}

// Default export.
export default CompanyFooter;