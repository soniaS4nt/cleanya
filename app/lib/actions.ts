export async function createBooking(prevState: any, formData: any) {
  // Validate form fields using Zod
  const validatedFields = {
    date: formData.get('picker'),
    hours: formData.getAll('multiSelect'),
  }

  console.log(validatedFields, 'actions')
}
