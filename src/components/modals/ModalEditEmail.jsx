import { Modal, Input, Button, Card, Loading } from '@nextui-org/react'
import axios from '../../utils/api/axios'
import { validate } from 'isemail'
import { FiMail } from 'react-icons/fi'
import { setUserUpdateEmail } from '../../../redux/slices/userInfo'
import jwt from 'jsonwebtoken'
import { encrypt } from '../../../crypto'

export default function ModalEditEmail({ visibleModalEditEmail, setVisibleModalEditEmail, React, dispatch }) {

    const [email, setEmail] = React.useState('')
    const [error, setError] = React.useState(false)
    const [helperEmail, setHelperEmail] = React.useState('')
    const [helperEmail2, setHelperEmail2] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [email2, setEmail2] = React.useState('')

    function updateUserEmail() {
        if (!email || !email2) {

            if (!email) {
                setError(true)
                setHelperEmail('Digite um e-mail')
            }
            if (!email2) {
                setError(true)
                setHelperEmail2('Digite um e-mail')
            }

        } else if (email !== email2) {
            setError(true)
            setHelperEmail(`E-mails não correspondentes`)
            if (helperEmail2) setHelperEmail2('')
        } else if (!validate(email)) {
            setError(true)
            setHelperEmail('E-mail inválido')
            if (helperEmail2) setHelperEmail2('')
        } else {
            setLoading(true)
            const req_token = encrypt(jwt.sign({ data: { email: email } }, process.env.NEXT_PUBLIC_JWT_SECRET))
            axios.post('/updateUserEmail/' + req_token, { key: process.env.NEXT_PUBLIC_CRYPTO_SECRET }).then(res => {
                switch (res.data.code) {
                    case 203:
                        setLoading(false)
                        setError(true)
                        setHelperEmail('E-mail já utilizado')
                        break;
                    case 200:
                        dispatch(setUserUpdateEmail(email))
                        setVisibleModalEditEmail(false)
                        break;
                    default:
                        setLoading(false)
                        setError(true)
                        setHelperEmail('Desculpe houve um erro interno, tente novamente')
                        break;
                }
            })
        }
    }

    return (
        <Modal
            open={visibleModalEditEmail}
            onClose={() => setVisibleModalEditEmail(false)}
        >
            <Modal.Header>
                <h1 className='font_title_modals'>Alterar e-mail</h1>
            </Modal.Header>
            <Modal.Body>
                <Input label={helperEmail} status={error && 'error'} value={email} onChange={e => setEmail(e.target.value)} labelLeft={<FiMail />} placeholder='Novo e-mail' />
                <Input label={helperEmail2} value={email2} status={error && 'error'} onChange={e => setEmail2(e.target.value)} labelLeft={<FiMail />} placeholder='Confirmar novo e-mail' />
                {loading && <Loading type='points' css={{ margin: 10 }} />}
            </Modal.Body>
            <Modal.Footer>
                <Card>
                    <Button onPress={() => updateUserEmail()}>Confirmar</Button>
                </Card>
            </Modal.Footer>
        </Modal>
    )

}