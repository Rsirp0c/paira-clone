import imgImage99 from '../assets/images/imgImage99.png';
import imgImage98 from '../assets/images/imgImage98.png';
import imgImage67 from '../assets/images/imgImage67.png';
import stanfordLogo from '../assets/images/stanfotd.png';
import deephealthLogo from '../assets/images/deephealth.png';
import metaLogo from '../assets/images/imgImage30.png';
import cornellLogo from '../assets/images/imgImage31.png';
import camilaPhoto from '../assets/images/img9Avatar.png';

export const profiles = {
  chloe: {
    id: 'chloe',
    name: 'Chloe Anderson',
    title: 'Product Design Intern at Meta',
    location: 'San Francisco Bay Area',
    photo: imgImage67,
    overview: 'Currently designing at Meta with a psychology twist from Cornell. Big fan of blending research and creativity to make products people love. Always up for mock interviews, mentorship chats, or just grabbing coffee to talk design and life.',
    tags: ['Technology', '3 YOE', 'Human-Centered AI', 'UX Research', 'UI Design'],
    socialPurpose: {
      lookingFor: ['Mentor', 'Mentee', 'Peer', 'Investor'],
      wantToDo: ['Mock Interview', 'Networking', 'Coffee Chat']
    },
    experience: [
      {
        title: 'Product Design Intern',
        company: 'Meta',
        duration: 'May 2025 - Until Now, 3 months',
        location: 'Mountain View, CA',
        description: 'Drive product vision and strategy for cross-functional teams, defining clear roadmaps and success metrics. Collaborate with engineers, designers, and data scientists to ship user-centric features.',
        logo: metaLogo
      }
    ],
    education: [
      {
        school: 'Cornell University',
        degree: 'Bachelor of Science, Psychology',
        duration: 'Aug 2023 - Now',
        description: 'Conducted independent research on human behavior and decision-making, designing and running experiments to explore cognitive psychology and user experience design principles.',
        logo: cornellLogo
      }
    ],
    background: {
      skills: ['UI Design', 'UX Research', 'Usability Testing', 'Prototyping', 'Team Collaboration'],
      industries: ['Technology', 'Cybersecurity', 'Finance'],
      languages: ['English', 'Spanish']
    },
    recommendations: [
      {
        name: 'Camila Perez',
        title: 'UX Design Intern @Microsoft',
        photo: camilaPhoto,
        text: 'Chloe was an incredible mentor during my interview process. She generously shared her time and insights, helping me build confidence and refine my portfolio. Her feedback was spot-on and really helped me land my dream role!'
      }
    ]
  },
  dylan: {
    id: 'dylan',
    name: 'Dylan Johnson',
    title: 'AI Engineer @ DeepHealth',
    location: 'Palo Alto, CA',
    photo: imgImage99,
    overview: 'Experienced AI engineer specializing in medical AI startups with 5 years of experience in the healthcare industry. Passionate about building technology that improves patient outcomes and healthcare accessibility. Currently leading AI initiatives at DeepHealth focused on predictive diagnostics.',
    tags: ['Healthcare AI', '5 YOE', 'Machine Learning', 'Medical Technology', 'Python'],
    socialPurpose: {
      lookingFor: ['Co-founder', 'Partner', 'Investor', 'Collaborator'],
      wantToDo: ['Networking', 'Coffee Chat', 'Partnership Discussion']
    },
    experience: [
      {
        title: 'AI Engineer',
        company: 'DeepHealth',
        duration: 'Jan 2023 - Present, 2 years',
        location: 'Palo Alto, CA',
        description: 'Leading development of AI-powered diagnostic tools for early disease detection. Built and deployed machine learning models serving over 100K patients. Collaborated with medical professionals to ensure clinical accuracy and regulatory compliance.',
        logo: deephealthLogo
      },
      {
        title: 'Senior ML Engineer',
        company: 'HealthTech Solutions',
        duration: 'Mar 2020 - Dec 2022, 2 years 9 months',
        location: 'San Francisco, CA',
        description: 'Developed predictive models for patient risk assessment. Improved model accuracy by 35% through novel feature engineering approaches.',
        logo: null
      }
    ],
    education: [
      {
        school: 'Stanford University',
        degree: 'Master of Science, Computer Science',
        duration: 'Sep 2018 - Jun 2020',
        description: 'Specialized in AI and Machine Learning with focus on healthcare applications. Thesis on deep learning for medical imaging analysis.',
        logo: stanfordLogo
      },
      {
        school: 'UC Berkeley',
        degree: 'Bachelor of Science, Computer Science',
        duration: 'Sep 2014 - May 2018',
        description: 'GPA: 3.8/4.0. Minor in Biology.',
        logo: null
      }
    ],
    background: {
      skills: ['Machine Learning', 'Deep Learning', 'Python', 'TensorFlow', 'Healthcare AI', 'Medical Imaging', 'Data Science'],
      industries: ['Healthcare', 'Medical Technology', 'AI/ML', 'Biotech'],
      languages: ['English', 'Spanish']
    },
    recommendations: [
      {
        name: 'Dr. Sarah Chen',
        title: 'Chief Medical Officer @ DeepHealth',
        photo: null,
        text: 'Dylan is an exceptional AI engineer who truly understands the intersection of technology and healthcare. His ability to translate complex medical requirements into working AI systems is remarkable. Highly recommend him for any healthcare AI venture.'
      }
    ]
  },
  nora: {
    id: 'nora',
    name: 'Nora Patel',
    title: 'Ex-PM @ Calm',
    location: 'Los Angeles, CA',
    photo: imgImage98,
    overview: 'Product leader with extensive experience in wellness and mental health applications. Former PM at Calm where I led features used by millions of users daily. Passionate about creating technology that genuinely improves mental health and wellbeing. Now building my own AI wellness startup.',
    tags: ['Product Management', '6 YOE', 'Wellness Tech', 'Mental Health', 'AI Products'],
    socialPurpose: {
      lookingFor: ['Co-founder', 'Technical Partner', 'Advisor', 'Investor'],
      wantToDo: ['Partnership Discussion', 'Coffee Chat', 'Networking']
    },
    experience: [
      {
        title: 'Product Manager',
        company: 'Calm',
        duration: 'Jun 2020 - Mar 2025, 4 years 9 months',
        location: 'Los Angeles, CA',
        description: 'Led product strategy for AI-powered personalization features. Shipped features used by 5M+ daily active users. Increased user engagement by 45% through data-driven product decisions and A/B testing. Worked closely with design, engineering, and data science teams.',
        logo: null
      },
      {
        title: 'Associate Product Manager',
        company: 'Headspace',
        duration: 'Aug 2018 - May 2020, 1 year 9 months',
        location: 'Santa Monica, CA',
        description: 'Managed content delivery features for meditation and mindfulness programs. Conducted user research and translated insights into product requirements.',
        logo: null
      }
    ],
    education: [
      {
        school: 'UCLA',
        degree: 'Bachelor of Arts, Psychology',
        duration: 'Sep 2014 - Jun 2018',
        description: 'Focus on cognitive psychology and human-computer interaction. Led research project on digital interventions for anxiety management.'
      }
    ],
    background: {
      skills: ['Product Management', 'AI/ML Products', 'User Research', 'A/B Testing', 'Product Strategy', 'Wellness Tech'],
      industries: ['Wellness', 'Mental Health', 'Consumer Tech', 'AI/ML'],
      languages: ['English', 'Hindi', 'Gujarati']
    },
    recommendations: [
      {
        name: 'Michael Torres',
        title: 'VP Product @ Calm',
        photo: null,
        text: 'Nora is one of the most talented product managers I have worked with. Her deep empathy for users combined with strong analytical skills makes her exceptional at building products people love. She would be an incredible co-founder for any wellness venture.'
      }
    ]
  }
};

export const requests = {
  chloe: {
    id: 'chloe',
    title: 'Seeking Feedback on Behavioral Questions for Meta PD',
    type: 'Mock Interview',
    description: "I've got a Meta Product Designer interview coming up, and the next round is all about behavior questions with a senior PM hiring manager. I'd love to practice with someone—peer or mentor—who can throw real interview-style prompts my way and give me honest feedback. Think STAR stories, communication tips, and tightening up answers. Totally happy to compensate you for your time ✨",
    tags: [
      { icon: 'industry', label: 'Technology' },
      { icon: 'person', label: 'Mentor' },
      { icon: 'location', label: 'Remote' },
      { icon: 'money', label: '$50' }
    ],
    requester: profiles.chloe
  },
  nora: {
    id: 'nora',
    title: 'Seeking technical co-founder for AI wellness app',
    type: 'Networking Request',
    description: "I'm building an AI-powered wellness app that provides personalized mental health support and daily check-ins. The product combines my PM experience at Calm with cutting-edge AI to create truly adaptive wellness experiences. Looking for a technical co-founder who's passionate about mental health and has strong AI/ML engineering skills. Ideally someone with healthcare or wellness tech experience who can help architect and build the platform from the ground up. This is a founding role with equity - let's build something meaningful together!",
    tags: [
      { icon: 'industry', label: 'Healthcare' },
      { icon: 'person', label: 'Co-founder' },
      { icon: 'location', label: 'Los Angeles' },
      { icon: 'equity', label: 'Equity Available' }
    ],
    requester: profiles.nora
  }
};
