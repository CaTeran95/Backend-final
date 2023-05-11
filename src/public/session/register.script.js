const form = document.querySelector('#userForm');

/* 
This takes the information entered by the user in the register form and creates a request to register endpoint to generate a new user.
*/
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const formObject = Object.fromEntries(formData.entries());
  checkPasswords(formObject);
  const userToSend = formatUserInput(formObject);
  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userToSend),
      headers: { 'Content-type': 'application/json' },
    });
    // const { redirect } = await res.json();
    // window.location = redirect;
  } catch (error) {
    console.error('There was an error:', error);
  }
});

/*
This formats the data from the form to follow the standard from CreateUserDTO 
*/
const formatUserInput = (payload) => {
  const {
    firstName,
    lastName,
    username,
    password,
    avatar,
    alias,
    birthday,
    phoneNumber,
    country,
    city,
    postalCode,
    addressLine,
    personalID,
  } = payload;
  return {
    name: { firstName, lastName },
    email: username,
    password,
    avatar,
    alias,
    birthday,
    phoneNumber,
    address: { country, city, postalCode, addressLine },
    personalID,
  };
};

/* 
This function checks the passwords input and checks if them both are equal, if it's not the case, an alert pops and the corresponding fields in the form are emptied.
*/
const checkPasswords = (payload) => {
  const { password, passwordVerification } = payload;
  if (password !== passwordVerification) {
    alert('Passwords must be equal, please try again');
    document.querySelector('#password').value = '';
    document.querySelector('#passwordVerification').value = '';
  }
};
