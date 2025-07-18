import styles from './ErrorMessage.module.css';

const ErrorMessage = () => {
  return (
    <p className={styles.text}>
      There was an error, please try again later.
    </p>
  );
};

export default ErrorMessage;
