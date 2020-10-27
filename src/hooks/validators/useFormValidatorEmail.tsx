import { useTranslation } from 'react-i18next';

const useFormValidatorEmail = () => {
 
    const [t] = useTranslation();

    return {
        required: t('field_required').toString(), 
        pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: t('invalid_email_address')
        }
    };
  
}

export default useFormValidatorEmail;
