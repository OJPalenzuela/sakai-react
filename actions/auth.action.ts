'use server';
import type { loginSchema } from '@/lib/zod';
import type { z } from 'zod';
import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';

export async function loginAction(values: z.infer<typeof loginSchema>) {
  try {
    await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false
    });

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error?.cause?.err?.message };
    }
    return { error: 'An error occurred: 500' };
  }
}

export async function logoutAction() {
  await signOut();
}
