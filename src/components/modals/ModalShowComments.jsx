import { Modal } from "@nextui-org/react"
import ModalListComments from "../../lists/ModalListComments"

export default function ModalShowComments({ React, visibleModalShowComments, setVisibleModalShowComments, styles, data }) {

    return (
        <Modal
            css={{ backgroundColor: '#f3eded' }}
            width={'40vw'}
            open={visibleModalShowComments}
            onClose={() => setVisibleModalShowComments(false)}
        >
            <Modal.Header>
                <h1 className="font_title_modals">Seus comentários</h1>
            </Modal.Header>
            <Modal.Body>
                <ModalListComments data={data} styles={styles} />
            </Modal.Body>
        </Modal>
    )

}