import { useRecoilState } from 'recoil'
import JavaIcon from '../icons/JavaIcon'
import javaBeanCodeAtom from '../atoms/javaBeanCodeAtom';

const JavaBeanCode = () => {
  const [javaBeanCode, setJavaBeanStr] = useRecoilState(javaBeanCodeAtom)

  return (
    <fieldset>
      <legend><JavaIcon/> Java Bean Code</legend>
      <textarea
        style={{ height: '220px' }}
        value={javaBeanCode}
        onChange={e => setJavaBeanStr(e.target.value)}
      />
    </fieldset>
  )
}

export default JavaBeanCode
