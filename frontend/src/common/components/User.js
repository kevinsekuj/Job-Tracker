import { useAuth0 } from "@auth0/auth0-react";

const User = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;
  console.log(user);

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} />
        <h2>{user.name}</h2>
        <h2>{user.email}</h2>
      </div>
    )
  );
};

export default User;
