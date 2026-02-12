'use server'

export async function loginWithCaptcha(formData: FormData) {
  const token = formData.get('g-recaptcha-response');

 
  if (!token) {
    return { error: 'Por favor, complete o desafio do Captcha.' };
  }

  
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

  const res = await fetch(verificationUrl, { method: 'POST' });
  const data = await res.json();

  if (!data.success) {
    return { error: 'Falha na validação do Captcha. Tente novamente.' };
  }

 
  const email = formData.get('email');
  const password = formData.get('password');
  

  
  return { success: true };
}