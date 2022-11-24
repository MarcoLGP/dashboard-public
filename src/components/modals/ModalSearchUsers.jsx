import { Input, Loading, Modal } from "@nextui-org/react";
import { BsSearch } from 'react-icons/bs'
import ModalListSearchUser from "../../lists/ModalListSearchUser";
import axios from "../../utils/api/axios";
import { useDispatch } from "react-redux";
import searchUserData, { setSearchUserData } from "../../../redux/slices/searchUserData";

export default function ModalSearchUsers({ visibleSearchUsersModal, setVisibleSearchUsersModal, styles, React }) {

    const [search, setSearch] = React.useState()
    const [error, setError] = React.useState()
    const [helper, setHelper] = React.useState()
    const [loading, setLoading] = React.useState()
    const dispatch = useDispatch()

    function handleSearch() {
        if (!search) {
            setError(true)
            setHelper('Digite um nome de usuário')
        } else {
            setLoading(true)
            setHelper('')
            axios.post('/searchUsers/' + search, { key: process.env.NEXT_PUBLIC_CRYPTO_SECRET }).then(res => {
                switch (res.data.code) {
                    case 200:
                        setError(false)
                        setHelper('')
                        setLoading(false)
                        dispatch(setSearchUserData(res.data.users))
                        break;
                    default:
                        setError(true)
                        setHelper('Houve um erro interno, tente novamente')
                        setLoading(false)
                        break;
                }
            })
        }

    }

    return (
        <Modal
            css={{ backgroundColor: '#f3eded', height: 500 }}
            width={500}
            open={visibleSearchUsersModal}
            onClose={() => setVisibleSearchUsersModal(false)}
        >
            <Modal.Header>
                <div>
                    <h1 className="font_title_modals">Buscar usuários</h1>
                    <Input label={helper} onKeyDown={e => e.key == 'Enter' && handleSearch()} value={search} onChange={e => setSearch(e.target.value)} labelLeft={<BsSearch />} status={error ? 'error' : 'primary'} />
                </div>
            </Modal.Header>
            <Modal.Body>
                {loading ?
                    <div className={styles.searchingUserContainer}>
                        <Loading type="points" css={{ marginTop: '25%' }} />
                        <span className={styles.fontSearchingUser} style={{ marginTop: 15 }}>Procurando usuários</span>
                    </div> : searchUserData &&
                    <ModalListSearchUser dispatch={dispatch} data={searchUserData} setVisibleSearchUsersModal={setVisibleSearchUsersModal} React={React} styles={styles} />}
            </Modal.Body>
        </Modal>
    )

}