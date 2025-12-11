type ProfileAvatarProps = {
  avatarURL: string;
  username: string;
};

function ProfileAvatar({ avatarURL, username }: ProfileAvatarProps) {
  return (
    <div className="relative">
      <div className="h-20 w-20 rounded-full bg-gradient-to-br from-green-400 via-yellow-400 to-red-500 p-1">
        <img
          src={avatarURL}
          alt={username}
          className="h-full w-full rounded-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
}

export default ProfileAvatar;
