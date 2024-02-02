import formatTitles from '../utils/formatTitles';
import styles from '../styles.module.css';

const Report = ({report}) => {
    return (
        <div className={styles.container2}>
                { Object.entries(report)
                        .map(([key,value]) => (
                            <div className={styles.report} 
                                ><h2>{formatTitles(key)}
                                </h2>{value}
                            </div>
                ))}
            </div>
    )
}

export default Report;