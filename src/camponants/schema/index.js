import * as Yup from 'yup'

export const SignUpSchema = Yup.object().shape({
    Name: Yup.string()
        .min(4, 'Please Enter atleast 4 characters')
        .matches(/^[A-zA-Z]+$/, 'Empty, Number and Special charector not allowed')
        // .matches(/[!@#$%^&*~`,."';:{}[]-_+=]/, 'Number not allowed')
        .required('Name is Required'),

    Email: Yup.string()
        .email()
        .required('Please Enter valide email'),

    DOB: Yup.date()
        .required('Date of Birth is required')
        .max(new Date(), 'Date of birth cannot be in the future')
        .min(new Date(new Date().setFullYear(new Date().getFullYear() - 100)), 'Date of birth cannot be more than 100 years ago'),
  
    Password: Yup.string()
        .min(8, 'Please Enter atleast 8 characters')
        .required('Password is Required')
        .matches(/[A-Z]/, 'Password must be one uppercase letter')
        .matches(/[a-z]/, 'Password must be one lowercase letter')
        .matches(/[0-9]/, 'Password must be one number')
        .matches(/[@$!%*?&]/, 'Password must be one special character: @$!%*?&'),

    RePassword: Yup.string()
        .required('RePassword is Required')
        .oneOf([Yup.ref('Password'), null], 'Password does not match')
})