import { useRecoilValue } from 'recoil'
import selectors from '../selectors'

const JavaClassName = () => {
  const javaClassName = useRecoilValue(selectors.javaClassName)
  return (
    <fieldset>
      <legend>Java Class Name</legend>
      <code>{javaClassName}</code>
    </fieldset>
  )
}

export default JavaClassName
