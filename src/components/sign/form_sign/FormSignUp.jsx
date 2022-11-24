import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import jwt from 'jsonwebtoken';
import * as yup from "yup";
import axios from '../../../utils/api/axios'
import ModalNoLocation from '../../modals/ModalNoLocation';
import { Loading } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { encrypt } from '../../../../crypto';
import { useDispatch } from 'react-redux';
import { clearRegisterSocialSign, setRemoveUsername, setUsernameRegisterSocialSign } from '../../../../redux/slices/userRegisterSocialSign';

export default function FormSignUp({ styles, setSignIn, React, setVisibleModalSendEmailVerification, userRegisterSocialSign }) {

    const [helperResEmail, setHelperResEmail] = React.useState('')
    const [visibleModalNoLocation, setVisibleModalNoLocation] = React.useState(false)
    const [helperResPass, setHelperResPass] = React.useState('')
    const [sucessSign, setSucessSign] = React.useState(false)
    const [loading, setLoading] = React.useState()
    const [helperResUsername, setHelperResUsername] = React.useState('')
    const [userLocation, setUserLocation] = React.useState()
    const dispatch = useDispatch()

    const router = useRouter()

    function getLocation() {
        if (!userLocation) window.navigator.geolocation.getCurrentPosition(position => {
            setUserLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude })
        })
    }

    React.useEffect(() => {
        getLocation()
    }, [])

    const validation = yup.object().shape({
        Username: !userRegisterSocialSign && yup.string().required('Digite seu nome de usuário').min(5, 'Digite um nome de usuário válido acima de 5 caracteres').max(15, 'Digite um nome de usuário válido abaixo de 15 caracteres.'),
        Email: !userRegisterSocialSign && yup.string().required('Digite um e-mail.').email('Digite um e-mail válido.'),
        Password: yup.string().required('Digite a sua senha.').min(5, 'Digite uma senha válida acima de 5 caracteres').max(40, 'Digite uma senha válida abaixo de 40 caracteres')
    })

    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: yupResolver(validation)
    })

    async function handleRegister(datas) {
        setHelperResEmail('')
        setHelperResUsername('')
        setHelperResPass('')
        setLoading(true)
        getLocation()
        if (userLocation) {
            if (!userRegisterSocialSign) {

                const token_req = encrypt(jwt.sign({ data: { ...datas, userLocation } }, process.env.NEXT_PUBLIC_JWT_SECRET))
                await axios.post(`/signUp/${token_req}`, { key: process.env.NEXT_PUBLIC_CRYPTO_SECRET }).then(res => {

                    switch (res.data.code) {
                        case 202:
                            setLoading(false)
                            setHelperResEmail('E-mail já cadastrado')
                            setHelperResUsername('Nome de usuário já cadastrado')
                            break;
                        case 206:
                            setLoading(false)
                            setHelperResEmail('E-mail inválido, tente usar outro')
                            break;
                        case 203:
                            setLoading(false)
                            setHelperResUsername('Nome de usuário já cadastrado')
                            break;
                        case 204:
                            setLoading(false)
                            setHelperResEmail('E-mail já cadastrado')
                            break;
                        case 200:
                            setLoading(false)
                            setSucessSign(true)
                            setVisibleModalSendEmailVerification(true)
                            setSignIn(true)
                            break;
                        default:
                            setLoading(false)
                            setHelperResPass(`Houve um erro interno (${res.data.code || ''}), tente novamente`)
                            break;
                    }
                })
            } else {
                if (!userRegisterSocialSign.username) {
                    setHelperResUsername('Digite seu nome de usuário')
                } else if (userRegisterSocialSign.username.lenght > 15) {
                    setHelperResUsername('Digite um nome de usuário válido abaixo de 15 caracteres.')
                } else if (userRegisterSocialSign.username.lenght < 5) {
                    setHelperResUsername('Digite um nome de usuário válido acima de 5 caracteres')
                } else {
                    const { Name, Password } = datas
                    const req_token = encrypt(jwt.sign({ data: { Password: Password, Name: Name, Email: userRegisterSocialSign.email, Username: userRegisterSocialSign.username, userLocation: userLocation, Provider: userRegisterSocialSign.provider, Img: userRegisterSocialSign.img } }, process.env.NEXT_PUBLIC_JWT_SECRET))
                    axios.post('/registerUserSocial/' + req_token, { key: process.env.NEXT_PUBLIC_CRYPTO_SECRET }).then(res => {
                        switch (res.data.code) {
                            case 200:
                                setLoading(false)
                                dispatch(clearRegisterSocialSign())
                                setSucessSign(true)
                                localStorage.setItem('token', res.data.token)
                                router.push('/dashboard/home')
                                break;
                            case 202:
                                setLoading(false)
                                setHelperResUsername('Username sendo utilizado')
                                if (userRegisterSocialSign.username) dispatch(setRemoveUsername())
                                break;
                            case 203:
                            case 204:
                                setLoading(false)
                                setHelperResEmail('E-mail sendo utilizado, não é possível completar o cadastro.')
                                const interval = setInterval(() => {
                                    window.location.reload()
                                    clearInterval(interval)
                                }, 2000)
                                break;
                            default:
                                setHelperResPass('Desculpe houve um erro interno(' + res.data.code + '), tente novamente')
                                break;
                        }
                    })
                }
            }
        } else {
            setVisibleModalNoLocation(true)
        }
    }

    return (
        <>
            <ModalNoLocation styles={styles} visibleModalNoLocation={visibleModalNoLocation} setVisibleModalNoLocation={setVisibleModalNoLocation} />
            <form onSubmit={handleSubmit(handleRegister)} className={styles.container_form_sign}>

                {
                    userRegisterSocialSign ?
                        <>
                            <label style={{ color: helperResUsername && 'red' }}>Usuário</label>
                            <input style={{ borderColor: helperResUsername && 'red' }} onChange={e => dispatch(setUsernameRegisterSocialSign(e.target.value))} value={userRegisterSocialSign.username} type="text" />
                            <span className={styles.error_message_form}>{helperResUsername}</span>

                            <label style={{ color: helperResEmail && 'red' }}>E-mail</label>
                            <input style={{ borderColor: helperResEmail && 'red' }} disabled value={userRegisterSocialSign.email} type="text" />
                        </>
                        :
                        <>
                            <label style={{ color: errors.Username?.message && 'red' || helperResUsername && 'red' }} htmlFor='Username'>Usuário</label>
                            <input style={{ borderColor: errors.Username?.message && 'red' || helperResUsername && 'red' }} type="text" name='Username' {...register('Username')} />
                            <span className={styles.error_message_form}>{errors.Username?.message || helperResUsername}</span>

                            <label style={{ color: errors.Email?.message && 'red' || helperResEmail && 'red' }} htmlFor="Email">E-mail</label>
                            <input style={{ borderColor: errors.Email?.message && 'red' || helperResEmail && 'red' }} type="text" name="Email" {...register('Email')} />
                            <span className={styles.error_message_form}>{errors.Email?.message || helperResEmail}</span>
                        </>
                }

                <label style={{ color: errors.Password?.message && 'red' }} htmlFor="Password">Senha</label>
                <input style={{ borderColor: errors.Password?.message && 'red' }} type="Password" id="Password" name="Password" {...register('Password')} />
                <span className={styles.error_message_form}>{errors.Password?.message || helperResPass}</span>

                {loading && <Loading css={{ margin: 10 }} type='points' color={'primary'} />}
                {sucessSign && <Loading css={{ margin: 10 }} type='points' color={'success'} />}

                <span onClick={() => setSignIn(true)} className={styles.register_line}>Possui uma conta ? Entre !</span>
                <button type="submit">Registrar</button>

            </form>
        </>
    )

}
