import { useRecoilState, useRecoilValue } from 'recoil'
import atoms from '../atoms'
import { useEffect } from 'react'

const JavaClassName = () => {
  const javaBeanCode = useRecoilValue(atoms.javaBeanCode)

  const [javaClassName, setJavaClassName] = useRecoilState(atoms.javaClassName)

  useEffect(() => {
    const javaClassNameMatchResult = javaBeanCode.match(/public class (\w+)/)
    console.log('javaClassNameMatchResult', javaClassNameMatchResult)
    if (javaClassNameMatchResult) {
      const javaClassName = javaClassNameMatchResult[1]
      console.log('javaClassName', javaClassName)
      setJavaClassName(javaClassName)
    }
  }, [javaBeanCode])

  return (
    <fieldset>
      <legend>Java Class Name</legend>
      <code>{javaClassName}</code>
    </fieldset>
  )
}

export default JavaClassName
