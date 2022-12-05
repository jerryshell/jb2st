import { atom } from 'recoil';

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

const javaBeanCodeAtom = atom({
  key: 'javaBeanCode',
  default: initJavaBeanCode,
})

export default javaBeanCodeAtom
