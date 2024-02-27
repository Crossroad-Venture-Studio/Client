'use client';

import createEventHandlers from '../../../utils/createEventHandlers';
import createStopPropagationFunc from '../../../utils/createStopPropagationFunc';
import Button from '../atoms/Button';
import BackButton from '../atoms/BackButton';
import NextButton from '../atoms/NextButton';

// Navbar.
const TopNavbar = props => {
  // Get props.
  let {
    // Back nav.
    backSrc = 'https://crossroad-venture-studio.github.io/Design-System/icons/navigation/chevron-left-wired-light.svg',
    backTitle,
    backAlt = backTitle,
    backText = 'Back',
    onBack,
    backHref,
    // Logo.
    logoSrc,
    logoText,
    onLogo,
    logoHref,
    // Right nav.
    nav = [],
    rightNav = nav,
    // Next nav.
    nextSrc = 'https://crossroad-venture-studio.github.io/Design-System/icons/navigation/chevron-right-wired-light.svg',
    nextTitle,
    nextAlt = backTitle,
    nextText = 'Next',
    onNext,
    nextHref,
    // Other.
    children,
    className,
    safearea,
    ...other
  } = props || {},
    onLogoFuncs = createEventHandlers(
      {onPress: createStopPropagationFunc(onLogo)},
      null,
      {style: {pointerEvents: 'none'}}
    );

  // Normalize input and filter buttons.
  className = className && `top-navbar ${className}` || 'top-navbar';
  safearea && (className = `safearea ${className}`);
  rightNav = (Array.isArray(rightNav) && rightNav || [rightNav]).filter(x => x);
  const hasBack = (onBack || backHref) && (backSrc || backText),
    hasNext = (onNext || nextHref) && (nextSrc || nextText);

  // Layout.
  return (
    <nav className={className} {...other}>
      {hasBack && (
        <div className='row center left fill'>
          <BackButton
            src={backSrc}
            title={backTitle}
            alt={backAlt}
            value={backText}
            href={backHref}
            onPress={onBack}
          ></BackButton>
        </div>
      ) || null}

      {(logoSrc || logoText) && (
        <a
          className={`link row center text-gap ${hasBack && (rightNav.length || hasNext) && 'middle' || (hasBack && 'right') || 'left'} fill`}
          href={logoHref || null}
          {...onLogoFuncs}
        >
          {logoSrc && <img src={logoSrc} className='logo' alt='logo'/> || null}
          {logoText && <span className='logo-text vertical-trim'> {logoText} </span> || null}
        </a>
      ) || null}

      {...(children || [])}

      {rightNav.length && <div className='row center right fill'>
        {...(rightNav.map((b, i) => <Button {...b} key={`${i}`}></Button>))}
      </div> || null}

      {hasNext && (
        <div className={`row center right ${(!rightNav.length || !(logoSrc || logoText)) && 'fill' || ''}`}>
          <NextButton
            src={nextSrc}
            title={nextTitle}
            alt={nextAlt}
            value={nextText}
            href={nextHref}
            onPress={onNext}
          ></NextButton>
        </div>
      ) || null}
    </nav>
  );
}

// Exports.
export default Object.freeze(Object.defineProperty(TopNavbar, 'TopNavbar', {
  value: TopNavbar
}));