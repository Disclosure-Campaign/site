import { styles } from 'global';


const Button = ({Icon, text, onClick, disabled, aria, addStyles}) => {
  var disabledStyles = ' cursor-not-allowed' + (Icon ?
    ` text-gray-500` :
    ` bg-gray-500`
  );

  var buttonStyles = styles.button;
  var iconStyles = `items-center justify-center h-10 w-10 rounded-full ${!disabled ? 'text-blue-500 hover:text-blue-600' : ''}`;

  if (addStyles) {
    buttonStyles += ` ${addStyles}`;
    iconStyles += ` ${addStyles}`;
  }

  if (disabled) {
    buttonStyles += disabledStyles;
    iconStyles += disabledStyles;
  }

  return (
    <button
      className={buttonStyles}
      disabled={disabled}
      aria-label={aria}
      onClick={onClick}
    >
      {Icon ? (
        <div className={iconStyles}>
          <Icon/>
        </div>
      ) : (
        <div>{text}</div>
      )}
    </button>
  );

};

export default Button;