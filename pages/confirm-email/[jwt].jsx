import { Loading, Modal } from "@nextui-org/react";
import axios from "../../src/utils/api/axios";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import { setModalMessageLog, setUserFirstAcess } from "../../redux/slices/modals";

export default function ConfirmEmail() {

    const router = useRouter()
    const dispatch = useDispatch()

    function verifyToken() {
        axios.post(`/registerUser/${router.query.jwt}`, { key: process.env.NEXT_PUBLIC_CRYPTO_SECRET }).then(res => {
            switch (res.data.code) {
                case 200:
                    localStorage.setItem('token', res.data.token)
                    dispatch(setUserFirstAcess(true))
                    router.replace('/dashboard/home')
                    router.
                    break;
                case 205:
                    router.push('/')
                    dispatch(setModalMessageLog({ visible: true, msg: 'Desculpe houve um erro interno, entre no link novamente' }))
                    break;
                case 202:
                    router.push('/')
                    dispatch(setModalMessageLog({ visible: true, msg: 'Nome de usuário em uso, realize o cadastro novamente' }))
                    break;
                case 203:
                    router.push('/')
                    dispatch(setModalMessageLog({ visible: true, msg: 'E-mail em uso, realize o cadastro novamente' }))
                    break;
                case 204:
                    router.push('/')
                    dispatch(setModalMessageLog({ visible: true, msg: 'E-mail e nome de usuário em uso, realize o cadastro novamente' }))
                    break;
                default:
                    router.push('/')
                    dispatch(setModalMessageLog({ visible: true, msg: 'Link inválido ou expirado' + res.data.code }))
                    break;
            }
        })
    }

    return (
        <Modal
            open={true}
            blur
        >
            <Modal.Body>
                <h1 style={{ textAlign: 'center', fontFamily: 'Roboto' }}>Validando link</h1>
                <Loading />
                {verifyToken()}
            </Modal.Body>
        </Modal>
    )
}