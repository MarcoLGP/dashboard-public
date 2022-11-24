import { Avatar, Button, Card, Loading, Modal } from "@nextui-org/react";
import Resizer from "react-image-file-resizer";
import axios from "../../utils/api/axios";
import { useDispatch } from "react-redux";
import { setUserUpdatePhoto } from "../../../redux/slices/userInfo";
import { uploadUserImage } from "../../../firebase";
import jwt from "jsonwebtoken"
import { encrypt } from "../../../crypto";

export default function ModalAvatarPhotoChange({ Username, React, visibleModalAvatarPhotoChange, setVisibleModalAvatarPhotoChange, img, setImg }) {

    const dispatch = useDispatch()
    const [loading, setLoading] = React.useState(false)
    let inputRef

    function updatePhoto() {
        setLoading(true)
        uploadUserImage(Username, img).then(url => {
            const req_token = encrypt(jwt.sign({ data: { username: Username, img: url } }, process.env.NEXT_PUBLIC_JWT_SECRET))
            axios.post('/updateUserImage/' + req_token, { key: process.env.NEXT_PUBLIC_CRYPTO_SECRET }).then(res => {
                switch (res.data.code) {
                    case 200:
                        dispatch(setUserUpdatePhoto(url))
                        setVisibleModalAvatarPhotoChange(false)
                        break;
                }
            })
        })
    }

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
        <Modal
            open={visibleModalAvatarPhotoChange}
            onClose={() => setVisibleModalAvatarPhotoChange(false)}
            width={400}
        >
            <Modal.Header>
                <h1 className="font_title_modals">Imagem de perfil</h1>
            </Modal.Header>
            <Modal.Body>
                <input onChange={imageHandler} type="file" hidden accept='image/*' ref={ref => inputRef = ref} />
                <Avatar pointer onClick={() => inputRef.click()} css={{ size: '$40', alignSelf: 'center' }} src={img} />
                {loading && <Loading color={'primary'} type="points" css={{ margin: 10 }} />}
            </Modal.Body>
            <Modal.Footer>
                <Card>
                    <Button color='success' onPress={() => updatePhoto()}>Confirmar</Button>
                </Card>
            </Modal.Footer>
        </Modal>
    )

}