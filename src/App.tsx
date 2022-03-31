import {useEffect} from 'react'
import './App.css'
import JavaField from './interfaces/JavaField'
import SqlField from './interfaces/SqlField'
import ProjectInfo from './components/ProjectInfo'
import {useRecoilState} from "recoil";
import atoms from "./atoms";

const camelCase2SnakeCase = (camelCaseStr: string) => {
    let snakeCaseStr = camelCaseStr.replace(/[A-Z]/g, (match) => '_' + match.toLowerCase())
    if (snakeCaseStr.slice(0, 1) === '_') {
        snakeCaseStr = snakeCaseStr.slice(1)
    }
    return snakeCaseStr
}

const javaType2SqlType = (javaType: string) => {
    switch (javaType) {
        case 'Integer':
            return 'INT(11)'
        case 'Long':
            return 'BIGINT'
        case 'String':
            return 'VARCHAR(255)'
        case 'Boolean':
            return 'TINYINT(4)'
        case 'Date':
            return 'DATETIME'
        case 'Instant':
            return 'TIMESTAMP'
        case 'LocalDate':
            return 'DATE'
        case 'BigDecimal':
            return 'DECIMAL(19,3)'
        default:
            return 'VARCHAR(255)'
    }
}

function App() {
    const [javaBeanCode, setJavaBeanStr] = useRecoilState(atoms.javaBeanCode)

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
                            primaryKeyFlag: javaFieldName === 'id',
                        } as JavaField
                    }
                    return null
                })
                .filter((javaField) => javaField !== null) as JavaField[]
            console.log('newJavaFieldList', newJavaFieldList)
            setJavaFieldList(newJavaFieldList)
        }
    }, [javaBeanCode])

    const [sqlTableName, setSqlTableName] = useRecoilState(atoms.sqlTableName)
    useEffect(() => {
        const sqlTableName = camelCase2SnakeCase(javaClassName)
        console.log('sqlTableName', sqlTableName)
        setSqlTableName(sqlTableName)
    }, [javaClassName])

    const [sqlFieldList, setSqlFieldList] = useRecoilState(atoms.sqlFieldList)
    useEffect(() => {
        const sqlFieldList = javaFieldList.map((javaField) => {
            return {
                type: javaType2SqlType(javaField.type),
                name: camelCase2SnakeCase(javaField.name),
                primaryKeyFlag: javaField.primaryKeyFlag,
            } as SqlField
        })
        console.log('sqlFieldList', sqlFieldList)
        setSqlFieldList(sqlFieldList)
    }, [javaFieldList])

    const [sqlTableCode, setSqlTableStr] = useRecoilState(atoms.sqlTableCode)
    useEffect(() => {
        let sqlTableCode = `CREATE TABLE ${sqlTableName} (\n`
        let hasPrimaryKey = false
        sqlFieldList.forEach((sqlField, index) => {
            sqlTableCode += `\t${sqlField.name} ${sqlField.type}`
            if (sqlField.primaryKeyFlag) {
                hasPrimaryKey = true
            }
            if (index < sqlFieldList.length - 1) {
                sqlTableCode += ',\n'
            }
            if (index === sqlFieldList.length - 1 && hasPrimaryKey) {
                sqlTableCode += ',\n'
            }
        })
        const primaryKeyFieldList = sqlFieldList.filter((sqlField) => sqlField.primaryKeyFlag)
        const primaryKeyFieldListStr = primaryKeyFieldList.map((sqlField) => sqlField.name).join(',')
        if (hasPrimaryKey) {
            sqlTableCode += `\tPRIMARY KEY (${primaryKeyFieldListStr})`
        }
        sqlTableCode += '\n);'
        console.log('sqlTableCode', sqlTableCode)
        setSqlTableStr(sqlTableCode)
    }, [sqlFieldList])

    const updateJavaFieldPrimaryKeyFlag = (javaFieldName: string, primaryKeyFlag: boolean) => {
        const newJavaFieldList = javaFieldList.map((javaField) => {
            if (javaField.name === javaFieldName) {
                return {
                    ...javaField,
                    primaryKeyFlag: primaryKeyFlag,
                }
            }
            return javaField
        })
        console.log('newJavaFieldList', newJavaFieldList)
        setJavaFieldList(newJavaFieldList)
    }

    const copySqlTableStr2Clipboard = () => {
        window.navigator.clipboard.writeText(sqlTableCode).then(r => {
            console.log('copySqlTableStr2Clipboard', r)
        })
    }

    return (
        <div className="App">
            <h1>Java Bean 2 SQL Table</h1>

            <ProjectInfo/>

            <fieldset>
                <legend>Java Bean Code</legend>
                <textarea
                    style={{height: "200px"}}
                    value={javaBeanCode}
                    onChange={e => setJavaBeanStr(e.target.value)}
                />
            </fieldset>

            <fieldset>
                <legend>Java Class Name</legend>
                <code>{javaClassName}</code>
            </fieldset>

            <fieldset>
                <legend>Java Field List</legend>
                <table>
                    <thead>
                    <tr>
                        <th>Type</th>
                        <th>Name</th>
                        <th>Primary Key</th>
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
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={javaField.primaryKeyFlag}
                                        onChange={e => {
                                            updateJavaFieldPrimaryKeyFlag(javaField.name, e.target.checked)
                                        }}
                                    />
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </fieldset>

            <fieldset>
                <legend>SQL Table Name</legend>
                <code>{sqlTableName}</code>
            </fieldset>

            <fieldset>
                <legend>SQL Primary Key</legend>
                <code>
                    {sqlFieldList.filter((sqlField) => sqlField.primaryKeyFlag).map((sqlField) => {
                        return sqlField.name
                    }).join(', ')}
                </code>
            </fieldset>

            <fieldset>
                <legend>SQL Field List</legend>
                {sqlFieldList.map((sqlField) => {
                    return (
                        <div key={sqlField.name}>
                            <code>{sqlField.type} {sqlField.name}</code>
                        </div>
                    )
                })}
            </fieldset>

            <fieldset>
                <legend>SQL Table Code</legend>
                <textarea
                    style={{height: "200px"}}
                    disabled
                    value={sqlTableCode}
                    onChange={e => setSqlTableStr(e.target.value)}
                />
                <button onClick={copySqlTableStr2Clipboard}>Copy To Clipboard</button>
            </fieldset>
        </div>
    )
}

export default App
