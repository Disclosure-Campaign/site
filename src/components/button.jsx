import { styles } from 'global';

const Button = ({Icon, text, onClick, disabled, aria, addStyles}) => {
  var disabledStyles = ' cursor-not-allowed' + (Icon ?
    ` text-gray-500` :
    ` bg-gray-500`
  );

  var buttonStyles = Icon ? styles.icon : styles.button;

  if (disabled) buttonStyles += disabledStyles;

  buttonStyles += ` ${addStyles}`;

  return (
    <button
      aria-label={aria}
      onClick={onClick}
      disabled={disabled}
      className={buttonStyles}
    >
      {Icon ? (
        <div className="flex items-center justify-center h-5 w-5 rounded-full">
          <Icon />
        </div>
      ) : (
        <div>{text}</div>
      )}
    </button>
  );

};

export default Button;