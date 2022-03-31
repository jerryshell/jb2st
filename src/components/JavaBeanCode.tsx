import {useRecoilState} from 'recoil'
import atoms from '../atoms'

const JavaBeanCode = () => {
    const [javaBeanCode, setJavaBeanStr] = useRecoilState(atoms.javaBeanCode)

    return (
        <fieldset>
            <legend>Java Bean Code</legend>
            <textarea
                style={{height: "200px"}}
                value={javaBeanCode}
                onChange={e => setJavaBeanStr(e.target.value)}
            />
        </fieldset>
    )
}

export default JavaBeanCode
