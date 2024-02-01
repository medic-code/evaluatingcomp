import styles from '../styles.module.css';

const Error = ({ message }) => (
    <div className={styles.error}>
        {message}
    </div>
);

export default Error;