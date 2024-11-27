'use server';
import { loginSchema, registerSchema } from '@/lib/zod';
import type { z } from 'zod';
import { signIn, signOut } from '@/auth';
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

    const user = await backend.post({
      where: {
        email: data.email
      }
    });

    if (user) {
      return { error: 'User already exists' };
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
