import { set, ref, remove } from 'firebase/database'
import { db_notification } from '../../../firebase'

async function createAndRemoveEvent({ type, event, data }) {

    if (type == 'create') {
        set(ref(db_notification, event), {
            data: data
        })
    } else if (type == 'remove') {
        remove(ref(db_notification, event))
    }

}

export { createAndRemoveEvent }