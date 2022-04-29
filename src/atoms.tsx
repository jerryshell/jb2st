import { atom } from 'recoil'
import JavaField from './interfaces/JavaField'
import SqlField from './interfaces/SqlField'

const initJavaBeanCode = `@Data
public class JavaBean {
    private Boolean deleteFlag;
    private Instant createTime;
    private Instant updateTime;
    private Long id;
    private String name;
    private Integer age;
    private BigDecimal balance;
}`

const initJavaType2SqlTypeMap = {
    'String': 'VARCHAR(255)',
    'Integer': 'INT(11)',
    'Long': 'BIGINT',
    'Boolean': 'TINYINT(1)',
    'Date': 'DATETIME',
    'Instant': 'TIMESTAMP',
    'LocalDate': 'DATE',
    'BigDecimal': 'DECIMAL(10,3)',
} as { [key: string]: string }

export default {
    javaType2SqlTypeMap: atom({
        key: 'javaType2SqlTypeMap',
        default: initJavaType2SqlTypeMap,
    }),
    javaBeanCode: atom({
        key: 'javaBeanCode',
        default: initJavaBeanCode,
    }),
    javaClassName: atom({
        key: 'javaClassName',
        default: '',
    }),
    sqlTableName: atom({
        key: 'sqlTableName',
        default: '',
    }),
    javaFieldList: atom({
        key: 'javaFieldList',
        default: [] as JavaField[],
    }),
    sqlFieldList: atom({
        key: 'sqlFieldList',
        default: [] as SqlField[],
    }),
    sqlTableCode: atom({
        key: 'sqlTableCode',
        default: '',
    }),
}
