import { Modal, Button, Textarea, Card, Row, Image } from '@nextui-org/react'
import { BsImage } from 'react-icons/bs'
import { createComment } from '../../../firebase'
import Resizer from 'react-image-file-resizer'
import { IoCloseCircleOutline } from 'react-icons/io5'

export default function ModalWriteComment({ usernameUser, visibleModalWriteComment, setVisibleModalWriteComment, React, styles }) {

    const [Content, setContent] = React.useState()
    const [img, setImg] = React.useState()
    let inputRef

    function imageHandler(e) {
        const fileObj = e.target.files && e.target.files[0]
        if (fileObj) {
            Resizer.imageFileResizer(
                e.target.files[0],
                400,
                400,
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

    function handleCreateComment() {
        createComment(Content, usernameUser, img).then(() => {
            setVisibleModalWriteComment(false)
        })
    }

    return (
        <Modal
            open={visibleModalWriteComment}
            onClose={() => setVisibleModalWriteComment(false)}
        >
            <Modal.Header>
                <h1 className={'font_title_modals'}>Novo comentário</h1>
            </Modal.Header>
            <Modal.Body>
                <Textarea value={Content} placeholder={'Conteúdo'} onChange={e => setContent(e.target.value)} rows={8} />
                <input onChange={imageHandler} type="file" hidden accept='image/*' ref={ref => inputRef = ref} />
                {img ?
                    <div style={{ maxHeight: 200, display: 'flex', flexDirection: 'column' }}>
                        <IoCloseCircleOutline onClick={() => setImg('')} cursor={'pointer'} style={{ marginLeft: 'auto', marginBottom: 5 }} size={45} />
                        <Image src={img} height={400} width={400} objectFit="contain" />
                    </div>
                    :
                    <Row onClick={() => inputRef.click()} align='center' justify='center' className={styles.btn_upload_img}>
                        <BsImage color="#45BD62" size={20} className={styles.btn_img_upload_photo} />
                        <span>Foto</span>
                    </Row>
                }
            </Modal.Body>
            <Modal.Footer>
                <Card>
                    <Button onPress={() => handleCreateComment()}>Enviar</Button>
                </Card>
            </Modal.Footer>
        </Modal>
    )

}