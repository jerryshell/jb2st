import {useRecoilValue} from 'recoil'
import javaClassNameSelector from '../selectors/javaClassNameSelector'

const JavaClassName = () => {
    const javaClassName = useRecoilValue(javaClassNameSelector)

    return (
        <fieldset>
            <legend>Java Class Name</legend>
            <code>{javaClassName}</code>
        </fieldset>
    )
}

export default JavaClassName
