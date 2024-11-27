'use server';
import { loginSchema, registerSchema } from '@/lib/zod';
import type { z } from 'zod';
import { signIn, signOut, UserBackend } from '@/auth';
import { AuthError } from 'next-auth';
import { backend } from '@/config/backend';

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

export async function registerAction(values: z.infer<typeof registerSchema>) {
  try {
    const { data, success } = registerSchema.safeParse(values);

    if (!success) {
      return { error: 'Invalid credentials' };
    }

    const user: UserBackend = await backend.post('/api/gateway/register', data).then((res) => res.data);

    if (user.errors) {
      return { error: user?.message };
    }

    await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false
    });

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error?.cause?.err?.message };
    }
    console.error(error);

    return { error: 'An error occurred: 500' };
  }
}

export async function logoutAction() {
  await signOut();
}
