// Centralized skills data. `icon` keys are mapped to react-icons
// inside src/components/Skills.jsx — add a new case there if you
// add a skill whose icon key doesn't exist yet.

export const skillCategories = [
  {
    id: 'frontend',
    labelKey: 'skills.frontend',
    items: [
      { name: 'HTML', icon: 'html5' },
      { name: 'CSS', icon: 'css3' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'React', icon: 'react' },
      { name: 'Bootstrap', icon: 'bootstrap' },
    ],
  },
  {
    id: 'backend',
    labelKey: 'skills.backend',
    items: [
      { name: 'Core Java', icon: 'java' },
      { name: 'Advanced Java', icon: 'java' },
      { name: 'Spring', icon: 'spring' },
      { name: 'Spring Boot', icon: 'spring' },
      { name: 'JDBC', icon: 'database' },
      { name: 'Hibernate', icon: 'hibernate' },
      { name: 'JPA', icon: 'database' },
    ],
  },
  {
    id: 'database',
    labelKey: 'skills.database',
    items: [
      { name: 'MySQL', icon: 'mysql' },
      { name: 'Oracle SQL', icon: 'oracle' },
    ],
  },
  {
    id: 'java',
    labelKey: 'skills.java',
    items: [{ name: 'Collection Framework', icon: 'java' }],
  },
  {
    id: 'tools',
    labelKey: 'skills.tools',
    items: [
      { name: 'Git', icon: 'git' },
      { name: 'GitHub', icon: 'github' },
      { name: 'Maven', icon: 'maven' },
      { name: 'Postman', icon: 'postman' },
      { name: 'Vercel', icon: 'vercel' },
      { name: 'Render', icon: 'render' },
    ],
  },
]
