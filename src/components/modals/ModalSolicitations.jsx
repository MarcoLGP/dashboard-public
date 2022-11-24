import { Modal } from '@nextui-org/react'
import { setUsersSolicitationModal } from '../../../redux/slices/usersSolicitation'
import Solicitations from '../../lists/Solicitations'

export default function ModalSolicitations({ usersSolicitationModal, dispatch, styles }) {

    return (
        <Modal
            open={usersSolicitationModal}
            width={450}
            onClose={() => dispatch(setUsersSolicitationModal(false))}
        >
            <Modal.Header>
                <h1 className='font_title_modals'>Solicitações</h1>
            </Modal.Header>
            <Modal.Body>
                <Solicitations styles={styles} />
            </Modal.Body>
        </Modal>
    )

}