import { Modal, Input, Card, Button, Loading } from '@nextui-org/react'
import { RiLockPasswordFill } from 'react-icons/ri'
import axios from '../../utils/api/axios'
import jwt from 'jsonwebtoken'
import { encrypt } from '../../../crypto'

export default function ModalEditPassword({ visibleModalEditPassword, setVisibleModalEditPassword, React, Username }) {

    const [userPassword, setUserPassword] = React.useState()
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(false)
    const [helper, setHelper] = React.useState('')
    const [newUserPassword, setNewUserPassword] = React.useState()
    const [newUserPassword2, setNewUserPassword2] = React.useState()

    function updatePassword() {

        if (!userPassword) {
            setError(true)
            setHelper('Digite a sua senha')
        } else if (!newUserPassword || !newUserPassword2) {
            setError(true)
            setHelper('Digite a sua nova senha')
        } else if (newUserPassword.length < 5 || newUserPassword2.length < 5) {
            setError(true)
            setHelper('Digite uma senha acima dos 5 caracteres')
        } else if (newUserPassword !== newUserPassword2) {
            setError(true)
            setHelper('Nova senha não correspondente')
        } else {
            setLoading(true)
            const req_token = encrypt(jwt.sign({ data: { old_pass: userPassword, new_pass: newUserPassword, username: Username } }, process.env.NEXT_PUBLIC_JWT_SECRET))
            axios.post('/updateUserPassword' + req_token, { key: process.env.NEXT_PUBLIC_CRYPTO_SECRET }).then(res => {
                switch (res.data.code) {
                    case 203:
                        setLoading(false)
                        setError(true)
                        setHelper('Sua senha está incorreta')
                        break;
                    case 200:
                        setVisibleModalEditPassword(false)
                        break;
                    default:
                        setLoading(false)
                        setError(true)
                        setHelper('Desculpe houve um erro interno, tente novamente')
                        break;
                }
            })
        }
    }

    return (
        <Modal
            open={visibleModalEditPassword}
            onClose={() => setVisibleModalEditPassword(false)}
        >
            <Modal.Header>
                <h1 className='font_title_modals'>Alterar senha</h1>
            </Modal.Header>
            <Modal.Body>
                <Input.Password label={helper} status={error && 'error'} value={userPassword} onChange={e => setUserPassword(e.target.value)} labelLeft={<RiLockPasswordFill />} placeholder='Senha atual' />
                <Input.Password status={error && 'error'} value={newUserPassword} onChange={e => setNewUserPassword(e.target.value)} labelLeft={<RiLockPasswordFill />} placeholder='Senha nova' />
                <Input.Password status={error && 'error'} value={newUserPassword2} onChange={e => setNewUserPassword2(e.target.value)} labelLeft={<RiLockPasswordFill />} placeholder='Confirmar senha nova' />
                {loading && <Loading type='points' css={{ margin: 10 }} />}
            </Modal.Body>
            <Modal.Footer>
                <Card>
                    <Button onPress={() => updatePassword()}>Confirmar</Button>
                </Card>
            </Modal.Footer>
        </Modal>
    )

}