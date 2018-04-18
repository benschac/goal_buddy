export const inputs = [
  {
    type: 'email',
    label: 'Email',
    name: 'email',
    component: 'input',
  },
  {
    type: 'password',
    label: 'Password',
    name: 'password',
    component: 'input',
  },
  {
    type: 'password',
    label: 'Re-enter Password',
    name: 'password',
    component: 'input',
  },
];

export const fields = {
  form: 'signup',
  fields: ['email', 'password', 'confirmPassword'],
};
