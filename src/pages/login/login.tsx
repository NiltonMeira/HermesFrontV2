import { UserForm } from "./components/userForm";

export const LoginPage = () => {
  return (
    <>
      <article className=" flex justify-center items-center w-full h-screen bg-[url(images/brand/super.svg)] bg-cover bg-center">
        <UserForm/>
      </article>
    </>
  );
};
