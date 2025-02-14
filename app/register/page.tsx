import { createClient } from '@/utils/supabase/server';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SubmitButton } from '@/components/submit-button';
import { FormMessage, Message } from '@/components/form-message';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

// Server action to handle registration
function registerUser(formData: FormData): Promise<Message> {
  'use server';
  
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;

  if (!name || !email) {
    return { error: 'Name and email are required' };
  }

  const supabase = await createClient();
  
  const { error } = await supabase
    .from('users')
    .insert({ name, email });

  if (error) {
    return { error: 'Failed to register user. Email might already be taken.' };
  }

  try {
    revalidatePath('/movies');
    return redirect('/movies');
  } catch (error) {
    console.error('Redirect failed:', error);
    return { error: 'Redirect failed' };
  }
}

export default async function Register(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  
  return (
    <form className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Register</h1>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            required
            placeholder="Your name"
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="your@email.com"
          />
        </div>

        <SubmitButton formAction={registerUser}>
          Register
        </SubmitButton>

        <FormMessage message={searchParams} />
      </div>
    </form>
  );
} 