import {useRecoilState, useRecoilValue} from 'recoil'
import atoms from '../atoms'
import {useEffect} from 'react'
import JavaField from '../interfaces/JavaField'

const JavaFieldList = () => {
    const javaBeanCode = useRecoilValue(atoms.javaBeanCode)

    const [javaFieldList, setJavaFieldList] = useRecoilState(atoms.javaFieldList)

    useEffect(() => {
        const javaFieldLineListMatchResult = javaBeanCode.match(/private (.*);/g)
        console.log('javaFieldLineListMatchResult', javaFieldLineListMatchResult)
        if (javaFieldLineListMatchResult) {
            const newJavaFieldList = javaFieldLineListMatchResult
                .map((javaFieldLine) => {
                    const javaFieldMatchResult = javaFieldLine.match(/private (\w+) (\w+);/)
                    if (javaFieldMatchResult) {
                        const javaFieldType = javaFieldMatchResult[1]
                        const javaFieldName = javaFieldMatchResult[2]
                        return {
                            type: javaFieldType,
                            name: javaFieldName,
                        } as JavaField
                    }
                    return null
                })
                .filter((javaField) => javaField !== null) as JavaField[]
            console.log('newJavaFieldList', newJavaFieldList)
            setJavaFieldList(newJavaFieldList)
        }
    }, [javaBeanCode])

    return (
        <fieldset>
            <legend>Java Field List</legend>
            <table>
                <thead>
                <tr>
                    <th>Type</th>
                    <th>Name</th>
                </tr>
                </thead>
                <tbody>
                {javaFieldList.map((javaField) => {
                    return (
                        <tr key={javaField.name}>
                            <td>
                                <code>{javaField.type}</code>
                            </td>
                            <td>
                                <code>{javaField.name}</code>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </fieldset>
    )
}

export default JavaFieldList
