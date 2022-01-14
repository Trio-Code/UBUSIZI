import * as yup from 'yup';

const SUPPORTED_IMG_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

const SUPPORTED_AUDIO_FORMATS = ['audio/mpeg'];

const validators = {
  content: yup
    .string()
    .min(15, 'Text content must be atleast 15 characters long'),
  password: yup.string().min(6, 'Password must be atleast 15 characters long'),
  img: yup
    .mixed()
    .test(
      'fileFormat',
      'Only jpeg/png images are allowed',
      (value) => value && SUPPORTED_IMG_FORMATS.includes(value.type)
    ),
  file: yup
    .mixed()
    .test(
      'fileFormat',
      'Please upload an mp3 file',
      (value) => value && SUPPORTED_AUDIO_FORMATS.includes(value.type)
    ),
};

export default (value) => {
  const selected = {};
  Object.keys(value).forEach((key) => {
    selected[key] = validators[key];
  });
  return yup
    .object()
    .shape(selected)
    .validate(value, { abortEarly: false })
    .catch((err) => err.errors);
};
