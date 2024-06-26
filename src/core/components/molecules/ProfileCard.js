// Imports.
import Button from '../atoms/Button';
import Column from '../atoms/Column';

// Main component.
export const  ProfileCard = props => {
  let {
    profilePictureSrc,
    profilePicture = profilePictureSrc,
    profilePic = profilePicture,
    pictureSrc = profilePic,
    profileSrc = pictureSrc,
    picture = pictureSrc,
    picSrc = picture,
    pic = picSrc,
    imageSrc = pic,
    imgSrc = imageSrc,
    image = imgSrc,
    img = image,
    src = img,
    name,
    linkedIn,
    linkedin = linkedIn,
    title,
    description,
    className,
    ...other
  } = props || {};
  const baseClassName = 'profile-card';
  className = className && `${baseClassName} ${className}` || baseClassName;

  // Render.
  return <Column className={className} {...other}>
    {src && <img className='profile-card-picture' src={src}/> || null}
    {(name || title) && <Column className='profile-card-name-title'>
      {name && <span className='profile-card-name'>{name}</span> || null}
      {title && <span className='profile-card-title'>{title}</span> || null}
    </Column> || null}
    {linkedin && <Button
      className='profile-card-linkedin'
      href={linkedin}
      src={'https://crossroad-venture-studio.github.io/Design-System/icons/socials/linkedin-dark.svg'}
      target='_blank'
      title={`Go to ${name}'s LinkedIn`}
    /> || null}
  </Column>;
}

// Default export.
export default ProfileCard;