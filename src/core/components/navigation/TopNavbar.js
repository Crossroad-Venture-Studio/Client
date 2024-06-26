'use client';

import createEventHandlers from '../../../utils/createEventHandlers';
import Button from '../atoms/Button';
import BackButton from '../atoms/BackButton';
import NextButton from '../atoms/NextButton';
import '../../../../utils/src/functionUtils';

// Navbar.
export const TopNavbar = props => {
  // Get props.
  let {
    // Back nav.
    backIconSrc = 'https://crossroad-venture-studio.github.io/Design-System/icons/navigation/chevron-left-wired-light.svg',
    backSrc = backIconSrc,
    backTitle,
    backAlt = backTitle,
    backText = 'Back',
    onBack,
    backHref,
    // Logo.
    logoSrc,
    logoText,
    logoTitle,
    onPressLogo,
    onLogo = onPressLogo,
    logoHref,
    logoTarget,
    logoScroll = false,
    // Right nav.
    nav = [],
    rightNav = nav,
    // Next nav.
    nextIconSrc = 'https://crossroad-venture-studio.github.io/Design-System/icons/navigation/chevron-right-wired-light.svg',
    nextSrc = nextIconSrc,
    nextTitle,
    nextAlt = backTitle,
    nextText = 'Next',
    onNext,
    nextHref,
    // Background.
    backgroundSrc,
    background = backgroundSrc,
    // Other.
    children,
    className,
    safearea,
    translate,
    title = 'Top navigation bar',
    ...other
  } = props || {},
    onLogoFuncs = createEventHandlers(
      {onPress: onLogo},
      null,
      {style: {pointerEvents: 'none'}}
    );

  // Normalize input and filter buttons.
  Array.isArray(children || (children = [])) || (children = [children]);
  className = className && `top-navbar ${className}` || 'top-navbar';
  safearea && (className = `safearea ${className}`);
  rightNav = (Array.isArray(rightNav) && rightNav || [rightNav]).filter(x => x);
  typeof translate === 'function' || (translate = Function.identity);
  title && (title = translate(title));
  const hasBack = (onBack || backHref) && (backSrc || backText),
    hasNext = (onNext || nextHref) && (nextSrc || nextText);

  // Layout.
  return (
    <nav className={className} title={title || null} {...other}>
      {background && <img src={background} className='top-navbar-background'></img>}
      {hasBack && (
        <div className='row center left fill'>
          <BackButton
            src={backSrc}
            title={backTitle && translate(backTitle) || null}
            alt={backAlt && translate(backAlt) || null}
            value={backText && translate(backText) || null}
            href={backHref}
            onPress={onBack}
            translate={translate}
          ></BackButton>
        </div>
      ) || null}

      {(logoSrc || logoText) && (
        <Button
          className={`top-navbar-logo row center text-gap ${hasBack && (rightNav.length || hasNext) && 'middle' || (hasBack && 'right') || 'left'} fill`}
          href={logoHref}
          {...(logoTarget && { target: logoTarget } || {})}
          scroll={logoScroll}
          {...onLogoFuncs}
          title={logoTitle}
        >
          {logoSrc && <img src={logoSrc} className='top-navbar-logo-image do-not-hide' alt='logo'/> || null}
          {logoText && <span className='top-navbar-logo-text vertical-trim'> {translate(logoText)} </span> || null}
        </Button>
      ) || null}

      {...children}

      {rightNav.length && <div className={`top-navbar-right row center right${!(hasBack || logoSrc || logoText || hasNext) && ' fill' || ''}`}>
        {...(rightNav.map((b, i) => <Button translate={translate} {...b} key={`${i}`}></Button>))}
      </div> || null}

      {hasNext && (
        <div className={`row center right ${(!rightNav.length || !(logoSrc || logoText)) && 'fill' || ''}`}>
          <NextButton
            src={nextSrc}
            title={nextTitle && translate(nextTitle) || null}
            alt={nextAlt && translate(nextAlt) || null}
            value={nextText && translate(nextText) || null}
            href={nextHref}
            onPress={onNext}
          ></NextButton>
        </div>
      ) || null}
    </nav>
  );
}

// Exports.
export default TopNavbar;