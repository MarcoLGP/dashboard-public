import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import jwt from 'jsonwebtoken'
import * as yup from "yup";
import axios from '../../../utils/api/axios'
import { Loading } from '@nextui-org/react';
import ModalConfirmGeolocation from '../../modals/ModalConfirmGeolocation';
import { useRouter } from 'next/router';
import { encrypt } from '../../../../crypto';

export default function FormSignIn({ styles, setSignIn, React }) {

    const [helperResAuth, setHelperResAuth] = React.useState('')
    const [visibleModalConfirmGeolocation, setVisibleModalConfirmGeolocation] = React.useState(false)
    const [loadingRes, setLoadingRes] = React.useState(false)
    const router = useRouter()

    const validation = yup.object().shape({
        Email: yup.string().required('Digite um e-mail.').email('Digite um e-mail válido.'),
        Password: yup.string().required('Digite uma senha.')
    })


    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: yupResolver(validation)
    })

    async function handleSignIn(data) {
        setHelperResAuth('')
        setLoadingRes(true)
        const req_token = encrypt(jwt.sign({ data: { ...data } }, process.env.NEXT_PUBLIC_JWT_SECRET))
        axios.post(`/signIn/${req_token}`, { key: process.env.NEXT_PUBLIC_CRYPTO_SECRET }).then(res => {

            switch (res.data.code) {
                case 202:
                    setLoadingRes(false)
                    setHelperResAuth("E-mail ou senha inválido")
                    break;
                case 200:
                    setLoadingRes(false)
                    localStorage.setItem('token', res.data.token)
                    router.push('/dashboard/home')
                    break;
                case 203:
                    setLoadingRes(false)
                    setHelperResAuth("E-mail ou senha inválido")
                    break;
                default:
                    setLoadingRes(false)
                    setHelperResAuth("Desculpe, houve um erro interno")
                    break;
            }
        })
    }

    return (
        <>
            {visibleModalConfirmGeolocation && <ModalConfirmGeolocation styles={styles} setSignIn={setSignIn} visibleModal={visibleModalConfirmGeolocation} setVisibleModal={setVisibleModalConfirmGeolocation} />}
            <form onSubmit={handleSubmit(handleSignIn)} className={styles.container_form_sign}>

                <label style={{ color: errors.Email?.message && 'red' || helperResAuth && 'red' }} htmlFor="Email">E-mail</label>
                <input style={{ borderColor: errors.Email?.message && 'red' || helperResAuth && 'red' }} type="text" id="Email" name="Email" {...register('Email')} />
                <span className={styles.error_message_form}>{errors.Email?.message}</span>

                <label style={{ color: errors.Password?.message && 'red' || helperResAuth && 'red' }} htmlFor="Password">Senha</label>
                <input style={{ borderColor: errors.Password?.message && 'red' || helperResAuth && 'red' }} type="Password" id="Password" name="Password" {...register('Password')} />
                {loadingRes && <Loading style={{ margin: 15 }} type='points' />}
                <span className={styles.error_message_form}>{errors.Password?.message || helperResAuth}</span>

                <span onClick={() => setVisibleModalConfirmGeolocation(true)} className={styles.register_line}>Não possui uma conta ? Registre-se !</span>
                <button type="submit">Entrar</button>

            </form>
        </>
    )

}
