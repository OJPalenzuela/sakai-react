import { object, string } from 'zod';

export const loginSchema = object({
  email: string({ required_error: 'Correo es requerido' }).min(1, 'Correo es requerido').email('Correo no válido'),
  password: string({ required_error: 'Contraseña requerida' }).min(1, 'Contraseña requerida').min(8, 'La contraseña debe tener al menos 8 caracteres').max(32, 'La contraseña debe tener menos de 32 caracteres')
});

export const registerSchema = object({
  name: string({ required_error: 'Nombre es requerido' }).min(1, 'Nombre es requerido').max(32, 'Nombre debe tener menos de 32 caracteres'),
  email: string({ required_error: 'Correo es requerido' }).min(1, 'Correo es requerido').email('Correo no válido'),
  password: string({ required_error: 'Contraseña requerida' }).min(1, 'Contraseña requerida').min(8, 'La contraseña debe tener al menos 8 caracteres').max(32, 'La contraseña debe tener menos de 32 caracteres'),
  password_confirmation: string({ required_error: 'Confirmación de contraseña requerida' })
    .min(1, 'Confirmación de contraseña requerida')
    .min(8, 'La confirmación de contraseña debe tener al menos 8 caracteres')
    .max(32, 'La confirmación de contraseña debe tener menos de 32 caracteres')
});
