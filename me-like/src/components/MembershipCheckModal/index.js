"use client";
import { useState } from "react";
import { useForm } from "@mantine/form";
import {
  Text,
  Modal,
  TextInput,
  Button,
  PasswordInput,
  Group,
  Notification,
} from "@mantine/core";
import { signIn } from "next-auth/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/lib/firebase";

export default function RegisterModal({ opened, onClose }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loginForm = useForm({
    initialValues: { email: "", password: "" },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Geçersiz email"),
      password: (value) =>
        value.length >= 6 ? null : "Şifre en az 6 karakter olmalı",
    },
  });

  const registerForm = useForm({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      lastName: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Geçersiz email"),
      password: (value) =>
        value.length >= 6 ? null : "Şifre en az 6 karakter olmalı",
      confirmPassword: (value, values) =>
        value === values.password ? null : "Şifreler eşleşmiyor",
      name: (value) =>
        value.length >= 2 ? null : "İsim en az 2 karakter olmalı",
      lastName: (value) =>
        value.length >= 2 ? null : "Soyad en az 2 karakter olmalı",
    },
  });

  const handleLogin = async (values) => {
    debugger;
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });
  
      if (result?.error) {
        setErrorMessage(`Giriş başarısız: ${result.error}`);
      } else if (result?.ok) {
        console.log("Giriş başarılı!");
        setErrorMessage(""); // Hata mesajını temizle
        onClose(); // Modal'ı kapat
      }
    } catch (error) {
      setErrorMessage(`Bir hata oluştu: ${error.message}`);
    }
  };
  
  const handleRegister = async (values) => {
    debugger;
    try {
      // Firebase ile yeni kullanıcı kaydı
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      console.log("Kayıt başarılı!", userCredential.user);
  
      // Otomatik giriş işlemi
      await handleLogin(values);
    } catch (error) {
      // Firebase hata kodlarına göre kullanıcı dostu mesajlar
      if (error.code === "auth/email-already-in-use") {
        setErrorMessage("Bu email adresi zaten kayıtlı.");
      } else if (error.code === "auth/weak-password") {
        setErrorMessage("Şifreniz çok zayıf. Daha güçlü bir şifre kullanın.");
      } else {
        setErrorMessage(`Kayıt sırasında bir hata oluştu: ${error.message}`);
      }
    }
  };
  
  return (
    <Modal
      opened={opened}
      onClose={() => {
        onClose();
        setIsSignUp(false);
        setErrorMessage("");
      }}
      size="lg"
      centered
    >
      {errorMessage && (
        <Notification color="red" onClose={() => setErrorMessage("")}>
          {errorMessage}
        </Notification>
      )}

      <Text size={28} weight={600} align="center">
        {isSignUp ? "Me - Like'e Üye Ol!" : "Me - Like'e Hoşgeldiniz!"}
      </Text>

      {isSignUp ? (
        <form onSubmit={registerForm.onSubmit(handleRegister)}>
          <Group mt="md">
            <TextInput
              label="İsim"
              placeholder="İsim"
              {...registerForm.getInputProps("name")}
            />
            <TextInput
              label="Soyisim"
              placeholder="Soyisim"
              {...registerForm.getInputProps("lastName")}
            />
          </Group>

          <TextInput
            mt="md"
            label="Email"
            placeholder="Email"
            {...registerForm.getInputProps("email")}
          />
          <PasswordInput
            mt="md"
            label="Şifre"
            placeholder="Şifre"
            {...registerForm.getInputProps("password")}
          />
          <PasswordInput
            mt="md"
            label="Şifreyi Onayla"
            placeholder="Şifreyi Onayla"
            {...registerForm.getInputProps("confirmPassword")}
          />

          <Group position="right" mt="md">
            <Button onClick={() => setIsSignUp(false)} variant="light">
              Geri
            </Button>
            <Button type="submit">Kayıt Ol</Button>
          </Group>
        </form>
      ) : (
        <form onSubmit={loginForm.onSubmit(handleLogin)}>
          <TextInput
            mt="md"
            label="Email"
            placeholder="Email"
            {...loginForm.getInputProps("email")}
          />
          <PasswordInput
            mt="md"
            label="Şifre"
            placeholder="Şifre"
            {...loginForm.getInputProps("password")}
          />

          <Group position="right" mt="md">
            <Button
              variant="light"
              onClick={() => setIsSignUp(true)}
              color="blue"
            >
              Üye Ol
            </Button>
            <Button type="submit">Giriş Yap</Button>
          </Group>
        </form>
      )}
    </Modal>
  );
}
