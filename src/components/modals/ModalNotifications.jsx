import { Modal } from "@nextui-org/react";
import UserNotifications from "../../lists/UserNotifications";

export default function ModalNotifications({ visibleModalNotifications, setVisibleModalNotifications, notifications, styles }) {

    return (
        <Modal
        open={visibleModalNotifications}
        width={520}
        onClose={() => setVisibleModalNotifications(false)}
        >
            <Modal.Header>
                <h1 className="font_title_modals">Notificações</h1>
            </Modal.Header>
            <Modal.Body>
                <UserNotifications styles={styles} notifications={notifications} />
            </Modal.Body>
        </Modal>
    )

}