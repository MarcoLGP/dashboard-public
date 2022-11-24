import { Avatar } from "@nextui-org/react";
import ModalAvatarPhotoChange from "../modals/ModalAvatarPhotoChange";
import Resizer from "react-image-file-resizer";

export default function UserAvatarWallpaper({ styles, userInfo, React, userProfileInfo }) {

    const [visibleModalAvatarPhotoChange, setVisibleModalAvatarPhotoChange] = React.useState(false)
    const [img, setImg] = React.useState()

    let inputRef
    function imageHandler(e) {
        const fileObj = e.target.files && e.target.files[0]
        if (fileObj) {
            Resizer.imageFileResizer(
                e.target.files[0],
                300,
                300,
                "JPEG",
                100,
                0,
                (uri) => {
                    setImg(uri)
                },
                "base64"
            );
            setVisibleModalAvatarPhotoChange(true)
        }
    }

    return (
        <div className={styles.avatar_image_wallpaper}>
            <div className={styles.avatar_image_name}>
                {visibleModalAvatarPhotoChange && <ModalAvatarPhotoChange React={React} Username={userInfo.Username} img={img} setImg={setImg} visibleModalAvatarPhotoChange={visibleModalAvatarPhotoChange} setVisibleModalAvatarPhotoChange={setVisibleModalAvatarPhotoChange} />}
                {!userProfileInfo && <input onChange={imageHandler} type="file" hidden accept='image/*' ref={ref => inputRef = ref} />}
                {userProfileInfo && <Avatar bordered className={styles.avatar_profile} src={userProfileInfo.Img || 'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-3.jpg'} /> ||
                    <Avatar pointer onClick={() => inputRef.click()} bordered className={styles.avatar_profile} src={userInfo.Img || 'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-3.jpg'} />}
                <span>{userProfileInfo.Username || userInfo.Username}</span>
            </div>
        </div>
    )
}

