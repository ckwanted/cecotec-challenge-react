import { useTranslation } from 'react-i18next';

const useFormValidatorText = () => {
 
    const [t] = useTranslation();

    return {
        required: t('field_required').toString(),
    }
  
}

export default useFormValidatorText;
