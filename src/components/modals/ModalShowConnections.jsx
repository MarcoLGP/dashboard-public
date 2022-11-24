import { Modal } from '@nextui-org/react'
import ModalListConnections from '../../lists/ModalListConnections'

export default function ModalShowConnections({ React, visibleModalShowConnection, setVisibleModalShowConnection, styles, userConnections }) {

    return (
        <Modal
            css={{ backgroundColor: '#f3eded' }}
            width={'38vw'}
            open={visibleModalShowConnection}
            onClose={() => setVisibleModalShowConnection(false)}
        >
            <Modal.Footer>
                <h1 className='font_title_modals'>Suas conexões</h1>
            </Modal.Footer>
            <Modal.Body>
                <ModalListConnections styles={styles} connections={userConnections} />
            </Modal.Body>
        </Modal>
    )

}