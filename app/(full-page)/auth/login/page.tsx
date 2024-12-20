'use client';
import { useRouter } from 'next/navigation';
import React, { useContext, useState, useTransition } from 'react';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from '../../../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginAction } from '@/actions/auth.action';
import { loginSchema } from '@/lib/zod';
import Link from 'next/link';

const defaultValues = {
  email: '',
  password: ''
};

const LoginPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { layoutConfig } = useContext(LayoutContext);

  const router = useRouter();
  const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });

  const {
    control,
    handleSubmit,

    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: zodResolver(loginSchema as any)
  });

  const onSubmit = async (data: any) => {
    startTransition(async () => {
      const response = await loginAction(data);

      if (response.error) {
        setError(response.error);
      } else {
        router.push('/');
      }
    });
  };

  const getFormErrorMessage = (name: keyof typeof defaultValues) => {
    return errors[name] && <div className="p-error mb-4">{errors[name].message}</div>;
  };

  return (
    <div className={containerClassName}>
      <div className="flex flex-column align-items-center justify-content-center">
        <img src={`/layout/images/logo-${layoutConfig.colorScheme === 'light' ? 'dark' : 'white'}.svg`} alt="Sakai logo" className="mb-5 w-6rem flex-shrink-0" />
        <div
          style={{
            borderRadius: '56px',
            padding: '0.3rem',
            background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)'
          }}
        >
          <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="email" className="block text-900 text-xl font-medium mb-2">
                Email
              </label>
              <Controller
                name="email"
                control={control}
                rules={{ required: 'Nombre requerido' }}
                render={({ field }) => <InputText id={field.name} {...field} type="text" placeholder="Email" className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} />}
              ></Controller>
              {getFormErrorMessage('email')}

              <label htmlFor="password" className="block text-900 font-medium text-xl mb-2">
                Contraseña
              </label>
              <Controller
                name="password"
                control={control}
                rules={{ required: 'Correo requerido' }}
                render={({ field }) => <Password id={field.name} {...field} placeholder="Contraseña" feedback={false} toggleMask className="w-full mb-5" inputClassName="w-full p-3 md:w-30rem"></Password>}
              ></Controller>
              {getFormErrorMessage('password')}

              <div className="flex align-items-center justify-content-between mb-5 gap-5">
                <div className="flex align-items-center"></div>
                <Link href="/auth/register" className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }}>
                  Registrarse
                </Link>
              </div>

              {error && <div className="p-error mb-4">{error}</div>}

              <Button type="submit" label="Iniciar sesión" className="w-full p-3 text-xl" disabled={isPending} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
