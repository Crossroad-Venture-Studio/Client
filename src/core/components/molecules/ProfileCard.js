// Imports.
import Column from '../atoms/Column';

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
  } = {};
  const baseClassName = 'profile-card';
  className = className && `${baseClassName} ${className}` || baseClassName;

  // Render.
  return <Column className={className} {...other}>
    {src && <img src={src}/> || null}
    {name && <span className={className}>{name}</span>}
  </Column>;
}

// Default export.
export default ProfileCard;