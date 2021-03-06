import { ActionMap } from '../utils';
import type { User } from './type';
import { uniqueNamesGenerator, animals } from 'unique-names-generator';

const getAnonymousDetails = () => {
  const name =
    localStorage.getItem('name') ||
    uniqueNamesGenerator({
      dictionaries: [['Anonymous'], animals],
      length: 2,
      separator: ' ',
      style: 'capital',
    });
  localStorage.setItem('name', name);

  // const votes = localStorage.getVotes('votes') || {};
  // localStorage.setItem('votes', votes);
  return {
    image: `https://avatars.dicebear.com/api/gridy/${name?.replaceAll(' ', '')}.svg`,
    name: name,
    // votes: votes,
  };
};
const generateRandomName = () => {
  const name = uniqueNamesGenerator({
    dictionaries: [['Anonymous'], animals],
    length: 2,
    separator: ' ',
    style: 'capital',
  });
  localStorage.setItem('name', name);

  // const votes = localStorage.getVotes('votes') || {};
  // localStorage.setItem('votes', votes);
  return {
    image: `https://avatars.dicebear.com/api/gridy/${name?.replaceAll(' ', '')}.svg`,
    name: name,
    // votes: votes,
  };
};

const getInitialState = (): User => {
  const anon = getAnonymousDetails();

  return {
    name: '',
    userId: '',
    image: anon.image,
    isAdmin: false,
    anonymousName: anon.name,
  };
};

type UserPayload = {
  ['UPDATE_PROFILE']: Partial<User>;
  ['RANDOMIZE_NAME']: undefined;
  ['SIGN_IN']: string;
  ['SIGN_OUT']: undefined;
};

type UserActions = ActionMap<UserPayload>[keyof ActionMap<UserPayload>];

const userReducer = (prevState: User = getInitialState(), action: UserActions): User => {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        ...prevState,
        userId: action.payload,
      };
    case 'UPDATE_PROFILE':
      return {
        ...prevState,
        ...action.payload,
      };
    case 'RANDOMIZE_NAME':
      const { name, image } = generateRandomName();
      return {
        ...prevState,
        anonymousName: name,
        image: image,
      };
    case 'SIGN_OUT':
      return {
        ...getInitialState(),
      };
    default:
      return prevState;
  }
};

export default userReducer;
