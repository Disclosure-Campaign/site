import { styles } from 'global';

const Button = ({Icon, text, onClick, disabled, aria, addStyles}) => {
  var disabledStyles = ' cursor-not-allowed' + (Icon ?
    ` text-gray-500` :
    ` bg-gray-500`
  );

  var buttonStyles = styles.button;
  var iconStyles = styles.icon;

  if (addStyles) {
    buttonStyles += ` ${addStyles}`;
    iconStyles += ` ${addStyles}`;
  }

  if (disabled) {
    buttonStyles += disabledStyles;
    iconStyles += disabledStyles;
  }

  iconStyles = `flex items-center justify-center h-10 w-10 rounded-full ${iconStyles}`;

  return (
    <button
      className={buttonStyles}
      disabled={disabled}
      aria-label={aria}
      onClick={onClick}
    >
      {Icon ? (
        <div className={iconStyles}><Icon/></div>
      ) : (
        <div>{text}</div>
      )}
    </button>
  );

};

export default Button;