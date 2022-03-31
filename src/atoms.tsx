import {atom} from 'recoil'
import JavaField from "./interfaces/JavaField";
import SqlField from "./interfaces/SqlField";

const initJavaBeanCode = `public class JavaBean {
    private Boolean deleteFlag;
    private Instant createTime;
    private Instant updateTime;
    private Long id;
    private String name;
    private Integer age;
    private BigDecimal balance;
}`

export default {
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
