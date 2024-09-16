const copy = {
    siteName: 'Disclosure Campaign',
    introText: 'Disclosure Campaign is a site to research money in politics',
    dataSources: {
        congressGov: {
            name: 'Congress.gov',
            baseUrl: 'www.congress.gov',
            shortDescription: `
                Congress.gov is the United States' official website for its federal
                legislative information.
            `,
            longDescription: `

            `
        },
        openSecrets: {
            name: 'Open Secrets',
            baseUrl: 'www.opensecrets.org',
            shortDescription: `
                Open Secrets is a nonpartisan, nonprofit organization trying to address the issue of money in politics.
            `,
            longDescription: `
                From their 'about' page:
                "Nonpartisan, independent and nonprofit, OpenSecrets is the nation's
                premier research group tracking money in U.S. politics and its effect
                on elections and public policy. Our mission is to track the flow of
                money in American politics and provide the data and analysis to strengthen
                democracy. Our vision is for Americans to use this knowledge to create
                a more vibrant, representative and accountable democracy."
            `
        }
    }
};

const styles = {
    primaryColor: 'emerald-600',
    lighterPrimaryColor: 'emerald-500',
    text: 'text-white',

    standardSpace: 4,
    border: 'border rounded-2xl',

    clickable: 'text-blue-500 cursor-pointer',

    wiggle: 'button-wiggle hover:scale-105'
};

const cardSourceMap = {
    bio: 'congressGov',
    sponsoredLegislation: 'congressGov',
    cosponsoredLegislation: 'congressGov',
    memProf: 'openSecrets',
    candContrib: 'openSecrets',
    bill: 'congressGov',
    summaries: 'congressGov',
    sponsors: 'congressGov'
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
    ${styles.border}
    ${styles.wiggle}
    ${styles.text}
    ${styles.lighterPrimaryColorText}
    hover:${styles.primaryColorText}
    rounded-md flex items-center px-4 py-2
`;

styles.icon = `
    px-3 border-r
    ${styles.lighterPrimaryColorText}
    hover:${styles.primaryColorText}
`;

export { copy, styles, cardSourceMap };
