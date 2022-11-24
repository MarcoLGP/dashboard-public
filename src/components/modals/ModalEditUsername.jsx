import { Button, Card, Input, Loading, Modal } from "@nextui-org/react"
import axios from "../../utils/api/axios"
import { FaRegUser } from 'react-icons/fa'
import { setUserUpdateUsername } from "../../../redux/slices/userInfo"
import jwt from 'jsonwebtoken'
import { encrypt } from "../../../crypto"

export default function ModalEditUsername({ React, visibleModalEditUsername, setVisibleModalEditUsername, Username, dispatch }) {

    const [usernameField, setUsernameField] = React.useState('')
    const [error, setError] = React.useState(false)
    const [helper, setHelper] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    function updateUsername() {

        if (!usernameField) {
            setError(true)
            setHelper('Digite um nome de usuário')
        } else if (usernameField.length < 5) {
            setError(true)
            setHelper('Digite um nome de usuário acima de 5 caracteres')
        } else {
            setLoading(true)
            const req_token = encrypt(jwt.sign({ data: { username_user: Username, username_field: usernameField } }, process.env.NEXT_PUBLIC_JWT_SECRET))
            axios.post('/updateUserUsername/' + req_token, { key: process.env.NEXT_PUBLIC_CRYPTO_SECRET }).then(res => {
                switch (res.data.code) {
                    case 200:
                        dispatch(setUserUpdateUsername(usernameField))
                        setVisibleModalEditUsername(false)
                        break;
                    case 202:
                        setLoading(false)
                        setError(true)
                        setHelper('Nome de usuário já utilizado')
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
            open={visibleModalEditUsername}
            onClose={() => setVisibleModalEditUsername(false)}
        >
            <Modal.Header>
                <h1 className="font_title_modals">Alterar usuário</h1>
            </Modal.Header>
            <Modal.Body>
                <Input label={helper} status={error && 'error'} value={usernameField} onChange={e => setUsernameField(e.target.value)} labelLeft={<FaRegUser />} placeholder={Username} />
                {loading && <Loading css={{ margin: 10 }} type='points' />}
            </Modal.Body>
            <Modal.Footer>
                <Card>
                    <Button onPress={() => updateUsername()}>Confirmar</Button>
                </Card>
            </Modal.Footer>
        </Modal>
    )

}