import FlatList from "flatlist-react"
import axios from "../utils/api/axios"
import { Avatar, Loading, Row } from "@nextui-org/react"
import { FaUserPlus, FaUserClock, FaUsers } from "react-icons/fa"
import { AiFillLike, AiFillDislike, AiOutlineLike, AiOutlineDislike } from 'react-icons/ai'
import { useDispatch, useSelector } from "react-redux"
import { setDislikeDb, setLikeDb } from "../../firebase"
import { setDislike, setLike } from '../../redux/slices/comments'
import { RiUserShared2Fill } from 'react-icons/ri'
import { setUserUpdateSolicitations } from "../../redux/slices/userInfo"
import { createAndRemoveEvent } from "../utils/functions/db_events"
import { useRouter } from "next/router"
import { setUsersSolicitationModal } from "../../redux/slices/usersSolicitation"
import { encrypt } from "../../crypto"
import jwt from 'jsonwebtoken'
import { DateTime } from 'luxon'
import Image from "next/image"

export default function Comments({ styles, React }) {

    const { comments } = useSelector(state => state.comments)
    const { usersSolicitation } = useSelector(state => state.usersSolicitation)
    const { userConnections } = useSelector(state => state.userConnections)
    const router = useRouter()
    const { userInfo } = useSelector(state => state.userInfo)
    const dispatch = useDispatch()

    function handleTimaAgo(time) {

        function tratament(time_to_tratament) {
            return parseInt(time_to_tratament * -1)
        }

        if (tratament(time.diffNow('months').months >= 1 && tratament(time.diffNow('seconds').seconds) !== 0)) {
            return `${tratament(time.diffNow('months').months)} mêses atrás`
        } else if (tratament(time.diffNow('weeks').weeks) >= 1 && tratament(time.diffNow('seconds').seconds) !== 0) {
            return `${tratament(time.diffNow('weeks').weeks)} semanas atrás`
        } else if (tratament(time.diffNow('days').days) >= 1) {
            return `${tratament(time.diffNow('days').days)} dias atrás`
        } else if (tratament(time.diffNow('hours').hours) >= 1) {
            return `${tratament(time.diffNow('hours').hours)} horas atrás`
        } else if (tratament(time.diffNow('minutes').minutes) >= 1) {
            return `${tratament(time.diffNow('minutes').minutes)} minutos atrás`
        } else if (tratament(time.diffNow('seconds').seconds) >= 1) {
            return `${tratament(time.diffNow('seconds').seconds)} segundos atrás`
        }
    }

    function handleSendSolicitation(username) {

        createAndRemoveEvent({ type: 'create', event: `new_solicitation-${username}`, data: userInfo.Username })
        dispatch(setUserUpdateSolicitations({ type: 'add', username: username, operation: 'by' }))
        const req_token = encrypt(jwt.sign({ data: { username_user: userInfo.Username, username: username, operation: 'add' } }, process.env.NEXT_PUBLIC_JWT_SECRET))
        axios.post('/updateUserSolicitations/' + req_token, { key: process.env.NEXT_PUBLIC_CRYPTO_SECRET })

    }

    function handleLike(like, dislike, id, author, user_author) {

        if (!like) {

            if (dislike) {

                setDislikeDb(id, userInfo.Username, 'remove').then(() => {
                    dispatch(setDislike({ type: 'remove', username: userInfo.Username, id: id, comments: comments }))
                })

                if (!user_author) {
                    const req_token = encrypt(jwt.sign({ data: { username_user: author, operation: 'remove', notification: `${userInfo.Username} não curtiu o seu comentário;${id}` } }, process.env.NEXT_PUBLIC_JWT_SECRET))
                    axios.post('/updateUserNotifications/' + req_token, { key: process.env.NEXT_PUBLIC_CRYPTO_SECRET })
                }

            }

            setLikeDb(id, userInfo.Username, 'add').then(() => {
                dispatch(setLike({ type: 'add', username: userInfo.Username, id: id, comments: comments }))
            })

            if (!user_author) {
                const req_token = encrypt(jwt.sign({ data: { username_user: author, operation: 'add', notification: `${userInfo.Username} curtiu o seu comentário;${id}` } }, process.env.NEXT_PUBLIC_JWT_SECRET))
                axios.post('/updateUserNotifications/' + req_token, { key: process.env.NEXT_PUBLIC_CRYPTO_SECRET })
                createAndRemoveEvent({ type: 'create', event: `new_notification-${author}`, data: `${userInfo.Username} curtiu o seu comentário;${id}` })
            }

        } else {

            setLikeDb(id, userInfo.Username, 'remove').then(() => {
                dispatch(setLike({ type: 'remove', username: userInfo.Username, id, comments }))
            })

            const req_token = encrypt(jwt.sign({ data: { username_user: author, operation: 'remove', notification: `${userInfo.Username} curtiu o seu comentário;${id}` } }, process.env.NEXT_PUBLIC_JWT_SECRET))
            axios.post('/updateUserNotifications/' + req_token, { key: process.env.NEXT_PUBLIC_CRYPTO_SECRET })

        }
    }

    function handleDislike(dislike, like, id, author, user_author) {

        if (!dislike) {

            if (like) {

                setLikeDb(id, userInfo.Username, 'remove').then(() => {
                    dispatch(setLike({ type: 'remove', username: userInfo.Username, id, comments }))
                })

                if (!user_author) {

                    const token_req = encrypt(jwt.sign({ data: { username_user: author, operation: 'remove', notification: `${userInfo.Username} curtiu o seu comentário;${id}` } }, process.env.NEXT_PUBLIC_JWT_SECRET))
                    axios.post('/updateUserNotifications/' + token_req, { key: process.env.NEXT_PUBLIC_CRYPTO_SECRET })

                }

            }

            setDislikeDb(id, userInfo.Username, 'add').then(() => {
                dispatch(setDislike({ type: 'add', username: userInfo.Username, id, comments }))
            })

            if (!user_author) {
                const token_req = encrypt(jwt.sign({ data: { username_user: author, operation: 'add', notification: `${userInfo.Username} não curtiu o seu comentário;${id}` } }, process.env.NEXT_PUBLIC_JWT_SECRET))
                axios.post('/updateUserNotifications/' + token_req, { key: process.env.NEXT_PUBLIC_CRYPTO_SECRET })
                createAndRemoveEvent({ type: 'create', event: `new_notification-${author}`, data: `${userInfo.Username} não curtiu o seu comentário; ${id}` })
            }

        } else {

            setDislikeDb(id, userInfo.Username, 'remove').then(() => {
                dispatch(setDislike({ type: 'remove', username: userInfo.Username, id, comments }))
            })

            if (!user_author) {
                const token_req = encrypt(jwt.sign({ data: { username_user: author, operation: 'remove', notification: `${userInfo.Username} não curtiu o seu comentário;${id}` } }, process.env.NEXT_PUBLIC_JWT_SECRET))
                axios.post('/updateUserNotifications/' + token_req, { key: process.env.NEXT_PUBLIC_CRYPTO_SECRET })
                createAndRemoveEvent({ type: 'create', event: `new_notification-${author}`, data: `${userInfo.Username} não curtiu o seu comentário; ${id}` })
            }

        }
    }

    function handleComment({ Author, Content, imageUser, idComment, Like, Dislike, Img, Time }) {

        let like
        let dislike
        let solicitation_by
        let solicitation_for
        let friend
        let user_author

        let time_ago = DateTime.fromISO(Time)

        if (Author == userInfo.Username) {
            user_author = true
        }

        Like.forEach(username => {
            if (username.includes(userInfo.Username)) {
                like = true
            }
        })

        Dislike.forEach(username => {
            if (username.includes(userInfo.Username)) {
                dislike = true
            }
        })

        userInfo.SolicitationsBy.forEach(username => {
            if (username.includes(Author)) {
                solicitation_by = true
            }
        })

        usersSolicitation.forEach(user => {
            if (user.Username.includes(Author)) {
                solicitation_for = true
            }
        })

        userConnections.forEach(user => {
            if (user.Username.includes(Author)) {
                friend = true
            }
        })

        return (
            <div className={styles.item_comment_container}>
                <Row>
                    <Avatar pointer onClick={() => router.push(`/dashboard/profile/${Author}`)} size={'lg'} src={imageUser ?? "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-3.jpg"} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span className={styles.font_author_comment}>{Author}</span>
                        <Row>
                            <span style={{ fontSize: '0.8em', marginLeft: '10px', color: 'grey' }}>{handleTimaAgo(time_ago)}</span>
                            {solicitation_by ?
                                <FaUserClock size={14} color={'grey'} style={{ marginLeft: 8, marginTop: 3 }} cursor={'pointer'} /> :
                                solicitation_for ?
                                    <RiUserShared2Fill size={14} color={'blue'} style={{ marginLeft: 8, marginTop: 3 }} cursor={'pointer'} onClick={() => dispatch(setUsersSolicitationModal(true))} /> :
                                    friend ?
                                        <FaUsers size={14} color={'grey'} style={{ marginLeft: 8, marginTop: 3 }} /> :
                                        user_author ? null :
                                            <FaUserPlus size={14} color={'grey'} onClick={() => handleSendSolicitation(Author)} style={{ marginLeft: 8, marginTop: 3 }} cursor={'pointer'} />}
                        </Row>
                    </div>
                </Row>
                <span style={{ marginTop: 20, marginBottom: 25, marginLeft: 5 }}>{Content}</span>
                {Img && <Image height={350} width={400} src={Img} objectFit={'contain'} />}
                <Row align="center" style={{ marginTop: Img && 15 }}>
                    <span>{Like.length}</span>
                    {like ?
                        <AiFillLike color={'#73a4ec'} onClick={() => handleLike(like, dislike, idComment, Author, user_author)} className={styles.likes_icons} style={{ marginLeft: 4 }} /> :
                        <AiOutlineLike onClick={() => handleLike(like, dislike, idComment, Author, user_author)} style={{ marginLeft: 4 }} className={styles.likes_icons} size={18} />}
                    <span style={{ marginLeft: 5 }}>{Dislike.length}</span>
                    {dislike ?
                        <AiFillDislike color={'#73a4ec'} style={{ marginLeft: 5 }} className={styles.likes_icons} onClick={() => handleDislike(dislike, like, idComment, Author, user_author)} /> :
                        <AiOutlineDislike onClick={() => handleDislike(dislike, like, idComment, Author, user_author)} style={{ marginLeft: 5 }} className={styles.likes_icons} size={18} />}
                </Row>
            </div>
        )
    }

    return (
        <FlatList
            list={comments}
            wrapperHtmlTag="div"
            renderOnScroll
            renderWhenEmpty={() => <Row justify="center">
                <Loading type={"points"} />
            </Row> }
            renderItem={handleComment}
            className={`${styles.lists_container} custom_scrollbar`}
        />
    )

}