import { Button } from '@chakra-ui/react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className='flex h-full flex-col items-center justify-center gap-2'>
      <h2 className='text-xl font-semibold'>Oops something happened!</h2>
      <p>We could not find the requested anime</p>
      <Link href='/information'>
        <Button>Go Back</Button>
      </Link>
    </main>
  );
}
