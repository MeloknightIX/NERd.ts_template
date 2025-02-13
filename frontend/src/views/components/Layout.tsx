import { Children, ReactNode, useState } from "react";
import Flex from "./Flex";
import { useNavigate } from "react-router-dom";
import useDarkmode from "../../utils/useDarkmode";
import Grid from "./Grid";
import { useUser } from "../../context/UserContext";
import Button from "./Button";
import getColor from "../../utils/getColor";

type LayoutProps = {
  children: ReactNode[];
};

const Layout = ({ children }: LayoutProps) => {
  const { toggleDarkmode } = useDarkmode();
  const childrenArray = Children.toArray(children);
  const { user, signout } = useUser();
  const navigate = useNavigate();
  const [isSettingsShown, setIsSettingsShown] = useState(false);

  if (childrenArray.length < 2) {
    return null;
  }

  return (
    <Flex>
      <Grid
        style={{
          gridTemplateColumns: "auto 1fr auto",
          // justifyItems: "center",
          alignItems: "center",
          paddingLeft: 0,
          paddingRight: 0,
        }}
      >
        <Button icon onClick={() => navigate("/")} tooltip="return to homepage">
          home
        </Button>
        {childrenArray[0]}
        <Flex row>
          {isSettingsShown && (
            <>
              <Button icon onClick={toggleDarkmode} tooltip="toggle darkmode">
                contrast_circle
              </Button>
              {user && (
                <>
                  <Button
                    icon
                    onClick={() => navigate("/changepw")}
                    tooltip="change password"
                  >
                    password
                  </Button>
                  <Button
                    icon
                    onClick={() => navigate("/delete")}
                    tooltip="delete account"
                  >
                    delete
                  </Button>
                </>
              )}
            </>
          )}
          <Button
            icon
            onClick={() => setIsSettingsShown((p) => !p)}
            tooltip="toggle settings"
            style={{
              backgroundColor: isSettingsShown
                ? getColor("text")
                : getColor("background"),
              color: isSettingsShown
                ? getColor("background")
                : getColor("text"),
              borderRadius: "1em",
            }}
          >
            settings
          </Button>
          {!user && (
            <Button icon onClick={() => navigate("/signin")} tooltip="sign in">
              login
            </Button>
          )}
          {user && (
            <Button icon onClick={signout} tooltip="sign out">
              logout
            </Button>
          )}
        </Flex>
      </Grid>
      {childrenArray.slice(1).map((child, index) => (
        <div key={index}>{child}</div>
      ))}
    </Flex>
  );
};
export default Layout;
