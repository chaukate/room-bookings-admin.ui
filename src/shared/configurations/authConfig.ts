import {
    Configuration,
    PublicClientApplication,
    RedirectRequest,
} from "@azure/msal-browser";

// Config object to be passed to Msal on creation
export const authConfig: Configuration = {
    auth: {
        clientId: `${process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID}`,
        authority: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ID}`,
        redirectUri: "/login",
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
    },
};

console.log(">>> authConfig", authConfig)

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest: RedirectRequest = {
    scopes: [
        "api://df837e8f-9bd1-40df-84c4-dbb2426d96df/admin_access",
        "profile",
        "openid",
        "user.read"
    ]
};

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft-ppe.com/v1.0/me",
};

export const msalInstance = new PublicClientApplication(authConfig);
