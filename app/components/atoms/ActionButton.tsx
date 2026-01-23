import styles from './ActionButton.module.css';

interface ActionButtonProps {
  onClick: () => void;
  text: string;
  ariaLabel?: string;
  disabled?: boolean;
}

export default function ActionButton({
  onClick,
  text,
  ariaLabel,
  disabled = false,
}: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={styles.button}
      aria-label={ariaLabel || text}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
