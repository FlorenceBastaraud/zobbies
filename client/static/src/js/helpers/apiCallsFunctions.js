export async function handleRegister(formData, event){

  const userRegisterData = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
  };


  try {

    const response = await fetch("http://localhost:5000/auth/register", userRegisterData);
    const data = await response.json();

    if(data.message == 'This user already exists'){

      document.getElementById('error-register').innerText = 'Sorry, this email address is already taken.';

    } else {

      event.target.reset();

      document.querySelector('.enter-space__register--title').innerText = "You're signed up!";
      document.querySelector('.enter-space__register--description').innerText = "You can now log in to discover our Zobbies channels. You've been sent a mail to confirm your e-mail address.";
      document.getElementById('registerForm').innerHTML = "";
      window.scrollTo({ top: 0, behavior: 'smooth' })

    }

    

  } catch(err){

    return err;

  }

}