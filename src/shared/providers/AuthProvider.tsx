import { msalInstance } from "@/shared/configurations/authConfig";
import { MsalProvider } from "@azure/msal-react";

interface IAuthProvider {
    children: React.ReactNode
}

const AuthProvider: React.FC<IAuthProvider> = ({ children }) => {
    return (
        <MsalProvider instance={msalInstance}>
            {children}
        </MsalProvider>
    );
};

export default AuthProvider;
