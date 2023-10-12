'use client';

import { useState } from "react";
import { toast } from "react-hot-toast";
import { signIn } from 'next-auth/react';
import { 
  FieldValues, 
  SubmitHandler, 
  useForm
} from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";

import useLoginModal from "@/app/hooks/useLoginModal";
import { useTranslation } from "@/app/i18n/client";

import SlimModal from "./SlimModal";
import Button from "../Button";

const LoginModal = ({ lng }: { lng: string }) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const { t } = useTranslation(lng);
  const [isLoading, setIsLoading] = useState(false);

  const { 
    register, 
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    },
  });
  
  const onSubmit: SubmitHandler<FieldValues> = 
  (data) => {
    setIsLoading(true);

    signIn('credentials', { 
      ...data, 
      redirect: false,
    })
    .then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success(t("loginSuccessToast"));
        router.refresh();
        loginModal.onClose();
      }
      
      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  }

  const bodyContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button 
        outline 
        label={t("googleLoginTitle")}
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
    </div>
  )

  return (
    <SlimModal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title={t("loginModalTitle")}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
}

export default LoginModal;
