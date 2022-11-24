import { Modal, Avatar, Card, Button, Row, Loading } from "@nextui-org/react";
import Resizer from "react-image-file-resizer";
import { useDispatch } from "react-redux";
import axios from '../../utils/api/axios'
import { setUserUpdatePhoto } from "../../../redux/slices/userInfo";
import jwt from 'jsonwebtoken'
import { uploadUserImage } from "../../../firebase";
import { encrypt } from "../../../crypto";

export default function ModalAvatarPhoto({ visibleModalAvatarPhoto, setVisibleModalAvatarPhoto, React, Username }) {

    let inputFileRef
    const [img, setImg] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [helper, setHelper] = React.useState(false)
    const dispatch = useDispatch()

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
        }
    }

    function handleUploadImageUser() {
        setLoading(true)
        uploadUserImage(Username, img).then(url => {
            const req_token = encrypt(jwt.sign({ data: { img: url, username: Username } }, process.env.NEXT_PUBLIC_JWT_SECRET))
            axios.post('/updateUserImage/' + req_token, { key: process.env.NEXT_PUBLIC_CRYPTO_SECRET }).then(res => {
                switch (res.data.code) {
                    case 200:
                        dispatch(setUserUpdatePhoto(url))
                        setVisibleModalAvatarPhoto(false)
                        break;
                    default:
                        setHelper('Desculpe houve um problema interno, tente novamente')
                        break;
                }
            }).catch(() => {
                setHelper('Desculpe houve um problema no servidor, tente novamente')
            })
        }).catch(() => setHelper('Desulpe houve um problema no servidor de upload de imagem, tente novamente'))
    }

    return (
        <Modal
            open={visibleModalAvatarPhoto}
            blur
            onClose={() => setVisibleModalAvatarPhoto(false)}
        >
            <Modal.Header>
                <h1 className="font_title_modals">Perfil</h1>
            </Modal.Header>
            <Modal.Body>
                <input hidden onChange={imageHandler} ref={refParam => inputFileRef = refParam} type={'file'} accept='image/*' />
                <Avatar pointer onClick={() => inputFileRef.click()} css={{ size: '$40', alignSelf: 'center' }} src={img || "https://cdn-icons-png.flaticon.com/512/953/953738.png"} />
                <span className="font_body_modal">{img ? 'Gostou da foto?' : 'Percebi que está sem foto de perfil... que tal colocar uma foto ?'}</span>
                {loading && <Loading type="points" />}
                <span className="font_body_modal" style={{ color: 'red' }}>{helper}</span>
            </Modal.Body>
            <Modal.Footer>
                {img ?
                    <Row justify="center">
                        <Button onClick={() => handleUploadImageUser()} size={'sm'} style={{ marginRight: 30 }} color={'success'}>Confirmar</Button>
                        <Button size={'sm'} color={'error'} onClick={() => setVisibleModalAvatarPhoto(false)}>Dispensar</Button>
                    </Row> :
                    <Card>
                        <Button color={'error'} onClick={() => setVisibleModalAvatarPhoto(false)}>Dispensar</Button>
                    </Card>
                }
            </Modal.Footer>
        </Modal>
    )

}