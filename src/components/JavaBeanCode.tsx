import {useRecoilState} from 'recoil'
import atoms from '../atoms'
import JavaIcon from '../icons/JavaIcon'

const JavaBeanCode = () => {
    const [javaBeanCode, setJavaBeanStr] = useRecoilState(atoms.javaBeanCode)

    return (
        <fieldset>
            <legend><JavaIcon/> Java Bean Code</legend>
            <textarea
                style={{height: '220px'}}
                value={javaBeanCode}
                onChange={e => setJavaBeanStr(e.target.value)}
            />
        </fieldset>
    )
}

export default JavaBeanCode
