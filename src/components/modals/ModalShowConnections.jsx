import { Modal } from '@nextui-org/react'
import ModalListConnections from '../../lists/ModalListConnections'

export default function ModalShowConnections({ React, visibleModalShowConnection, setVisibleModalShowConnection, styles, userConnections }) {

    return (
        <Modal
            css={{ backgroundColor: '#f3eded' }}
            width={'40vw'}
            open={visibleModalShowConnection}
            onClose={() => setVisibleModalShowConnection(false)}
        >
            <Modal.Header>
                <h1 className='font_title_modals'>Suas conexões</h1>
            </Modal.Header>
            <Modal.Body>
                <ModalListConnections styles={styles} connections={userConnections} />
            </Modal.Body>
        </Modal>
    )

}