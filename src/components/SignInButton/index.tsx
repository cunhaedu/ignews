import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

export function SignInButton() {
  const isUserLoggedIn = true;

  return (
    <button
      type='button'
      className='h-12 rounded-full bg-shape py-0 px-6 flex items-center justify-center font-bold hover:brightness-90 transition duration-200'
    >
      {isUserLoggedIn
        ? (
          <>
            <FaGithub size={20} color='#04D361'className="first:mr-4" />
            Eduardo Assunção
            <FiX color='#737380' className='ml-4' />
          </>
        )
        : (
          <>
            <FaGithub size={20} color='#EBA417' className="first:mr-4" />
            Sign in with github
          </>
        )
      }

    </button>
  );
}
