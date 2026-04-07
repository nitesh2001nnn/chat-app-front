import "./avatar.scss";

type avatarProps = {
  src:string;
}

const Avatar = ({src}:avatarProps) => {
  return (
    <div className="avatar-container">
      <img src={src} />
    </div>
  );
};

export default Avatar;
