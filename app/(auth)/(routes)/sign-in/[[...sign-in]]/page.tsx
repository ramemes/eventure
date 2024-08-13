import { SignIn } from "@clerk/nextjs"

const Page = () => {
  return <SignIn forceRedirectUrl="/" signUpUrl="/sign-up"/>
};

export default Page;
