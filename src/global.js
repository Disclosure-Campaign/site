const copy = {
    siteName: 'Disclosure Campaign',
    introText: 'Disclosure Campaign is a site to research money in politics'
};

const styles = {
    primaryColor: 'blue-600',
    lighterPrimaryColor: 'blue-500',
    text: 'text-white',

    standardSpace: 4,
    borderRadius: 'rounded-2xl',

    wiggle: 'button-wiggle hover:scale-105'
};

styles.primaryColorBg = `bg-${styles.primaryColor}`;
styles.primaryColorText = `text-${styles.primaryColor}`;
styles.lighterPrimaryColorBg = `bg-${styles.lighterPrimaryColor}`;
styles.lighterPrimaryColorText = `text-${styles.lighterPrimaryColor}`;

styles.darkenOnPressButton = `
    transform transition-transform duration-300
    active:${styles.primaryColorBg}
    ${styles.lighterPrimaryColorBg}
`;

styles.button = `
    ${styles.darkenOnPressButton}
    ${styles.borderRadius}
    ${styles.wiggle}
    ${styles.text}
    ${styles.lighterPrimaryColorText}
    hover:${styles.primaryColorText}
    rounded-md flex items-center px-4 py-2
`;

styles.icon = `
    'px-3 bg-gray-100 border-r'
    ${styles.lighterPrimaryColorText}
    hover:${styles.primaryColorText}
`;

export { copy, styles };
