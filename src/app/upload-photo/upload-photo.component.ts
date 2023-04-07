onSubmit() {
  const photoInput = document.getElementById('photo') as HTMLInputElement;
  const file = photoInput.files[0];
  console.log(file);
}