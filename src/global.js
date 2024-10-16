const copy = {
    siteName: 'Disclosure Campaign',
    introText: 'Disclosure Campaign - uncover how elections can be bought',
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
    },
    contactText:
`
If you are interested in contributing to this project, offering substantive critiques or suggestions for it, or supporting it in another way, please email me at ((info@disclosurecampaign.org|||mailto:info@disclosurecampaign.org)).
\n\n
I'm also looking for new employment opportunities, especially working on campaign finance reform or criminal justice reform.
`
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
    sponsors: 'congressGov',
    org: 'openSecrets',
    breakdown: 'openSecrets'
};

styles.primaryColorBg = `bg-${styles.primaryColor}`;
styles.primaryColorText = `text-${styles.primaryColor}`;
styles.lighterPrimaryColorBg = `bg-${styles.lighterPrimaryColor}`;
styles.lighterPrimaryColorText = `text-${styles.lighterPrimaryColor}`;

styles.darkenOnPressButton = `

transform transition-transform duration-300
active:${styles.primaryColorBg}
${styles.lighterPrimaryColorBg}

`.replace(/(\r\n|\n|\r)/gm, ' ');

styles.button = `

${styles.darkenOnPressButton}
${styles.wiggle}
${styles.text}
${styles.lighterPrimaryColorText}
hover:${styles.primaryColorText}
flex items-center
z-20

`.replace(/(\r\n|\n|\r)/gm, ' ');

const menuLinks = [
    {text: 'About', url: 'about'},
    {text: 'Contact', url: 'contact'}
];

const states = {
    'US': 'Federal',
    'AL': 'Alabama',
    'AK': 'Alaska',
    'AS': 'American Samoa',
    'AZ': 'Arizona',
    'AR': 'Arkansas',
    'CA': 'California',
    'CO': 'Colorado',
    'CT': 'Connecticut',
    'DE': 'Delaware',
    'DC': 'District Of Columbia',
    'FM': 'Federated States Of Micronesia',
    'FL': 'Florida',
    'GA': 'Georgia',
    'GU': 'Guam',
    'HI': 'Hawaii',
    'ID': 'Idaho',
    'IL': 'Illinois',
    'IN': 'Indiana',
    'IA': 'Iowa',
    'KS': 'Kansas',
    'KY': 'Kentucky',
    'LA': 'Louisiana',
    'ME': 'Maine',
    'MH': 'Marshall Islands',
    'MD': 'Maryland',
    'MA': 'Massachusetts',
    'MI': 'Michigan',
    'MN': 'Minnesota',
    'MS': 'Mississippi',
    'MO': 'Missouri',
    'MT': 'Montana',
    'NE': 'Nebraska',
    'NV': 'Nevada',
    'NH': 'New Hampshire',
    'NJ': 'New Jersey',
    'NM': 'New Mexico',
    'NY': 'New York',
    'NC': 'North Carolina',
    'ND': 'North Dakota',
    'MP': 'Northern Mariana Islands',
    'OH': 'Ohio',
    'OK': 'Oklahoma',
    'OR': 'Oregon',
    'PW': 'Palau',
    'PA': 'Pennsylvania',
    'PR': 'Puerto Rico',
    'RI': 'Rhode Island',
    'SC': 'South Carolina',
    'SD': 'South Dakota',
    'TN': 'Tennessee',
    'TX': 'Texas',
    'UT': 'Utah',
    'VT': 'Vermont',
    'VI': 'Virgin Islands',
    'VA': 'Virginia',
    'WA': 'Washington',
    'WV': 'West Virginia',
    'WI': 'Wisconsin',
    'WY': 'Wyoming'
}

export { copy, styles, cardSourceMap, states, menuLinks };
