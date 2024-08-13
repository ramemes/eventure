import { SignUp } from "@clerk/nextjs"

const Page = () => {
  return <SignUp forceRedirectUrl="/" signInUrl="/sign-in"/>
};

export default Page;
