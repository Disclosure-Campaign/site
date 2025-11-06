import { copy } from 'global';

const aboutText = [
  {
    heading: 'Introduction',
    paragraph:
`
Disclosure Campaign is a project about shedding light on the connection between politicians and campaign donations in America. When a wealthy individual, a corporation, or an advocacy organization gives money to help elect a politician, it influences the politician to make decisions that benefit that person or organization. Of course, not every contribution is part of a straightforward, 1-for-1 quid pro quo, but it is dangerously naive to ignore this phenomenon because each instance of buying influence is difficult to prove.
\n\n
There can be legitimate use of campaign donations, and in fact, some people argue that this practice is always legitimate. However, it is clear that many politicians are engaging in shameless, traditional corruption by taking money from wealthy individuals or organizations, then making decisions that further enrich those special interests. And often, those decisions disadvantage the constituents that the politician is supposed to represent.
`
  },
  {
    heading: 'Disclosure Campaign',
    paragraph:
`
This website is meant as a window into the problem of campaign finance. Starting from the homepage, you can search for a politician by name or zipcode. You'll then be able to see some information about which organizations have donated to their campaigns, what legislation they've sponsored or co-sponsored, and an estimation of their assets. In addition, there will be a collection of links for you to explore further. And of course, the best way to move forward is to keep reading. Find news articles (from various news organizations) about whichever politicians, organizations, or bills interest you (combine search terms to find more about the connections).
\n\n
There are various other links on the site to explore donor organizations, bills, and other nonprofits aimed at addressing this issue. The data used on the site is all publicly available (all data should have its source labeled). Some data comes from sources that organize publicly accessible data to make it easier to use, like ((OpenSecrets|||www.opensecrets.org)). Another thing to note is that Disclosure Campaign currently only has federal level data - local elections are not covered yet.
\n\n
This site was created by Justin Poser. I recently finished a graduate program in public policy and data science at Carnegie Mellon, and I've worked as a software engineer and a public school teacher (here's my ((LinkedIn profile|||www.linkedin.com/in/justin-poser-a328b3167/))). ${copy.contactText}
`
  },
  {
    heading: 'Campaign Finance Blog Coming Soon',
    paragraph:
`
I'm working on a blog to go in-depth on campaign finance - please check back soon for updates.
`
  },
  {
    heading: 'More on Campaign Finance Reform',
    paragraph:
`
I am passionate about this issue and I've researched it extensively, but there are well-established, large, non-profit organizations working on this issue, which I encourage you to visit:
\n\n
((OpenSecrets|||www.opensecrets.org/about)): The leading nonprofit working to publicize campaign finance data. Update: Open Secrets has discontinued their API, so this site can no longer display their data. I'm working on finding a new data source to replace it.
\n\n
((The Brennan Center for Justice|||www.brennancenter.org/issues/reform-money-politics)): An influential legal non-profit working on a number of critical issues.
\n\n
((American Civil Liberties Union|||www.aclu.org/issues/free-speech/campaign-finance-reform)): The premier legal advocacy non-profit in America. They have a different take on campaign finance than I do - it's well worth reading their perspective.
\n\n
((Represent Us|||represent.us/about)): An influential non-profit working on campaign finance and other issues of corruption in America.
`
  }
];

export default aboutText;