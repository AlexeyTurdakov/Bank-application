import { computed, watch } from "vue";
import * as yup from "yup";
import { useField, useForm } from "vee-validate";

export default function useLoginForm() {
  const { handleSubmit, isSubmitting, submitCount } = useForm();

  const {
    value: email,
    errorMessage: eError,
    handleBlur: eBlur,
  } = useField("email", yup.string().trim().required().email());

  const {
    value: password,
    errorMessage: pError,
    handleBlur: pBlur,
  } = useField("password", yup.string().trim().required().min(6));

  const isTooManyAttempts = computed(() => submitCount.value >= 3);

  const onSubmit = handleSubmit((values) => {
    console.log(values);
  });

  watch(isTooManyAttempts, (value) => {
    if (value) {
      setTimeout(() => {
        submitCount.value = 0;
      }, 15000);
    }
  });

  return {
    email,
    eError,
    eBlur,
    password,
    pError,
    pBlur,
    onSubmit,
    isSubmitting,
    isTooManyAttempts,
  };
}
