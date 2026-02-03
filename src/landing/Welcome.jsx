import FirstInterface from "./FirstInterface";

// Welcome Page now delegates to FirstInterface
export const WelcomePage = () => {
  return <FirstInterface />;
};
