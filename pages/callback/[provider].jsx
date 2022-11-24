import React from "react"
import { useSession } from "next-auth/react"
import axios from "../../src/utils/api/axios"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import { setModalMessageLog, setModalUserRegisterSocialSign } from "../../redux/slices/modals"
import { Loading, Modal } from "@nextui-org/react"
import { setUserRegisterSocialSign } from "../../redux/slices/userRegisterSocialSign"
import jwt from 'jsonwebtoken'
import { encrypt } from "../../crypto"

export default function Callback() {

    const { data: session, status } = useSession()
    const dispatch = useDispatch()
    const router = useRouter()
    const provider = router.query.provider

    React.useEffect(() => {

        if (provider) {

            if (provider !== 'Google' && provider !== 'Facebook' && provider !== 'Github') {

                dispatch(setModalMessageLog({ visible: true, msg: 'Url inválida' }))
                router.push('/')

            } else {

                if (status === 'authenticated') {

                    const req_token = encrypt(jwt.sign({ data: { provider: provider, img: session.user.image, email: session.user.email.trim().toLowerCase(), username: session.user.name.replace(' ', '').toLowerCase().trim().normalize('NFD').replace(/[^a-zA-Z\s]/g, "") } }, process.env.NEXT_PUBLIC_JWT_SECRET))
                    axios.post('/verifyUser/' + req_token, { key: process.env.NEXT_PUBLIC_CRYPTO_SECRET }).then(res => {
                        switch (res.data.code) {
                            case 200:
                                const token = encrypt(jwt.sign({ data: { Email: res.data.email } }, process.env.NEXT_PUBLIC_JWT_SECRET, { expiresIn: '24h' }))
                                localStorage.setItem('token', token)
                                router.replace('/dashboard/home')
                                break;
                            case 202:
                                dispatch(setUserRegisterSocialSign({ email: res.data.email, provider: provider }))
                                dispatch(setModalMessageLog({ visible: true, msg: 'Username sendo utilizado' }))
                                router.push('/')
                                break;
                            case 203:
                                dispatch(setUserRegisterSocialSign({ email: res.data.email, username: res.data.username, provider: provider, img: session.user.image }))
                                dispatch(setModalUserRegisterSocialSign(true))
                                router.push('/')
                                break;
                            case 204:
                                dispatch(setModalMessageLog({ visible: true, msg: 'Conta registrada por outro login social' }))
                                router.push('/')
                                break;
                            default:
                                router.push('/')
                                break;
                        }
                    })
                }
            }

        }

    }, [status])

    return (
        <>
            <Modal
                open={true}
                width={70}
            >
                <Modal.Body>
                    <Loading />
                </Modal.Body>
            </Modal>
        </>
    )
}