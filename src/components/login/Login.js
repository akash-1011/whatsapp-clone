import React from 'react'
import {Button} from "@material-ui/core";
import "./login.css"
import {auth, provider} from "../../firebase";
import { useStateValue } from '../../provider/StateProvider';
import { actionType } from '../../provider/reducer';

export default function Login() {
    const [{}, dispatch] = useStateValue();

    const signIn = () => {
        auth
            .signInWithPopup(provider)
            .then((result) => dispatch({
                type: actionType.SET_USER,
                user: result.user,
            }))
            .catch((error) => alert(error.message));
    }

    return (
        <div className="login">
            <div className="login-container">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHwAAAB8CAMAAACcwCSMAAAAYFBMVEX///8vgOwofewAc+sie+z///0XeOsQduv7/f0Aceru9Ps/h+xWk+3P3vbz9/wzgutPj+3l7vrY5fhpne56qO9zo+9el+2zzPSOs/CiwPKsx/SDrfCbvPKVuPHE1vW60PV5UBb7AAAEg0lEQVRoge1Z2ZajIBBtEQpc0KhxT/T//3JcAU003Yp5Ge5DnxNbudReFD8/BgYGBgYGBgYGBgYGBvpBGGPk+7Quz+sstHp4fl3x6Ft7IG6eeJhihAZyC2GAMHvE7AvUPLXoRKsAAWRVcDE39+1X5omfWsWV9JHvbFEPwM7zKuWz4o2+1/RWfonvxT58ou4Bqaufu0EfxZ6ED7lmapLbv6PuQXO93KWzIkBgOzbg4e+LSpynTvIHXTJTSEru9q5FXF7dQxuvZK/1cVd0SZ21gerThPE6XG4PtLHzhZuDz98Es/sIF9LThx7uQPVzZFUbgezWWDW+0+jgJpkiEtyi7Te5p6oIdt78NSolyOz7bv4itfIuup1PtZGiS1p8yp2lIjsUp8nvUulQf8zbJFdshM+muliKgpMFNwuimMdRsNpQrnxwO1dkSCIkQZ5SrUlUZMjuQMO0WtiWKAkJ2lPksdQijeVjnjkirhDQQi1kJFU0f0p0aXH6FAsFyaqwY1CDn8l/nioxgRQiFMqNwlUm7xWcKrpvhOLRGau3wnugmp/Fbws7JJJdcRQnfrvuryDNh2cRovB9U0GV/BOLV9DxAkNEFYe5QjN/q6GxK/mh3LR3uKHlghzNiXpV2VVgqWKZHZzDieYxCyAcJ9qk7shT8SHLZv3gw3pP5yWgnJ489zpYJEUXOR75B8sLuwnySXlkh1pxjE5DwjrhwcoaoPUKfNvivZSecHi5b3ww2KLZ34TJy8kJ8NixIsDqTwtLKWux8YOSx3NrgJLpyX1cMnzkfcThpC16dvTIx24HZOvUOLPND+Y4Lsjv05PRiWnnAazfEhk8i3a1KxjUDDKVkwRG3RwNtWYmF/EyWhL1DnzHQwh0Zc9hfQM1kCt5hiUYgIaH28gt8r64Es9CfVx3vcOgCH9N/kN4+WyPH9hf1Z6Mkod509cOqPnggShv0kHJoKlZX5CL3FVP3g6je+PJ26ef0jE1QIba7LLVayVfINRHLlsJb+qTot0kYw2+p4vcmxcVWdvbnxCc6R1WIMlMJXqxan80Qs+1qws8RUmdPYnti47PH1IEuDx6zc1xs231blso3V3vT2CyjZrTB6m3FI/6hKrhcCggGhIkgijI3ocbLUkJiGqcQUr/skWSDm7v2O1nn1CxRnf/CaSOZaNAkpexGKKjWQKv2lzr71COS6V4SHJrMf5CdiY6Bp0DQOWgqPZD7sOzx5MiQhSy5qJxbyIPHzfVmQJe+J4Xel5SxpddMyhjMEhXLMx116MBzVBO23D//LpeuIprvch+OVolsCC7YJi+h8WYA990D9M/gFnq+BNfdo3yHvFy8Bu2X7V8s6xkNKy+afp2VcWhOyl94wpxAGnXVRyD5WVF1TZNm/PLrxLxa/+EMB1gXx4Csbfds6PTI95PYOn6hklhv11M3jm9tdk4I40dzAaCGjZ0f7nee8Qpekv/Bck7kLjGr1eIpwa8f0KQZw5dRB6i3yw3rHn62LYpYIQxONrvjT+BsIjn5bMonuVV/aOBgYGBgYGBgYGBwX+Nf3fgL6K0imPLAAAAAElFTkSuQmCC"
                    alt=""
                />
                <div className="login-text">
                    <h1>Sign in</h1>
                </div>
                <Button onClick={signIn}>Sign in with Google</Button>
            </div>
        </div>
    )
}
