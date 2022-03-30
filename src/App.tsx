import {useEffect, useState} from 'react'
import './App.css'
import JavaField from './interfaces/JavaField'
import SqlField from './interfaces/SqlField'
import ProjectInfo from './components/ProjectInfo'

const initJavaBeanCode = `public class JavaBean {
    private Boolean deleteFlag;
    private Instant createTime;
    private Instant updateTime;
    private Long id;
    private String name;
    private Integer age;
    private BigDecimal balance;
}`

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
    const [javaBeanStr, setJavaBeanStr] = useState(initJavaBeanCode)

    const [javaClassName, setJavaClassName] = useState('')
    const [sqlTableName, setSqlTableName] = useState('')
    const [javaFieldList, setJavaFieldList] = useState<JavaField[]>([])
    useEffect(() => {
        const javaClassNameMatchResult = javaBeanStr.match(/public class (\w+)/)
        console.log('javaClassNameMatchResult', javaClassNameMatchResult)
        if (javaClassNameMatchResult) {
            const javaClassName = javaClassNameMatchResult[1]
            setJavaClassName(javaClassName)

            const sqlTableName = camelCase2SnakeCase(javaClassName)
            console.log('sqlTableName', sqlTableName)
            setSqlTableName(sqlTableName)
        }

        const javaFieldLineListMatchResult = javaBeanStr.match(/private (.*);/g)
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

    }, [javaBeanStr])

    const [sqlFieldList, setSqlFieldList] = useState<SqlField[]>([])
    useEffect(() => {
        const sqlFieldList = javaFieldList.map((javaField) => {
            return {
                type: javaType2SqlType(javaField.type),
                name: camelCase2SnakeCase(javaField.name),
                primaryKeyFlag: javaField.primaryKeyFlag,
            } as SqlField
        })
        setSqlFieldList(sqlFieldList)
    }, [javaFieldList])

    const [sqlTableStr, setSqlTableStr] = useState('')
    useEffect(() => {
        let sqlTableStr = `CREATE TABLE ${sqlTableName} (\n`
        sqlFieldList.forEach((sqlField, index) => {
            sqlTableStr += `\t${sqlField.name} ${sqlField.type}`
            if (sqlField.primaryKeyFlag) {
                sqlTableStr += ' PRIMARY KEY'
            }
            if (index < sqlFieldList.length - 1) {
                sqlTableStr += ',\n'
            }
        })
        sqlTableStr += '\n);'
        setSqlTableStr(sqlTableStr)
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
        setJavaFieldList(newJavaFieldList)
    }

    const copySqlTableStr2Clipboard = () => {
        window.navigator.clipboard.writeText(sqlTableStr).then(r => {
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
                    value={javaBeanStr}
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
                <legend>SQL Table</legend>
                <textarea
                    style={{height: "200px"}}
                    disabled
                    value={sqlTableStr}
                    onChange={e => setSqlTableStr(e.target.value)}
                />
                <button onClick={copySqlTableStr2Clipboard}>Copy To Clipboard</button>
            </fieldset>
        </div>
    )
}

export default App
