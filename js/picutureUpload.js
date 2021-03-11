const avatar  = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview-img')
const images = document.querySelector('#images');
const imagesPreview = document.querySelector('.ad-form__photo');

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png', 'svg'];

avatar.addEventListener('change', () => {
  const file = avatar.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((item) => {
    return fileName.endsWith(item);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      avatarPreview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
})
