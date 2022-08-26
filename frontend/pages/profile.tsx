import { useAuth0 } from "@auth0/auth0-react";
import { Profile } from "../components/home/Profile";

const Profiles = () => {
    const { user } = useAuth0();
    return (
      <div>
        <Profile />
      </div>
    );
  };
  
  export default Profiles;