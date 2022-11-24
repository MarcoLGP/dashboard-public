import SocialButton from "./SocialButton";
import { FcGoogle } from 'react-icons/fc';
import { BsGithub } from 'react-icons/bs';
import { RiFacebookCircleFill } from 'react-icons/ri';

export default function SocialButtons({ styles }) {

    return (
        <div className={styles.container_social_buttons}>
            <SocialButton styles={styles} platform='Facebook'>
                <RiFacebookCircleFill size={27} />
            </SocialButton>
            <SocialButton styles={styles} platform='Google'>
                <FcGoogle size={25} />
            </SocialButton>
            <SocialButton styles={styles} platform='Github'>
                <BsGithub size={25} />
            </SocialButton>
        </div>
    )

}