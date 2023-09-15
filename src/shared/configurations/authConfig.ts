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
        `${process.env.NEXT_PUBLIC_AZURE_AD_APP_AUTH_SCOPE}`,
        "profile",
        "openid",
        "user.read"
    ]
};

console.log(">>> Scopes", loginRequest);

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft-ppe.com/v1.0/me",
};

export const msalInstance = new PublicClientApplication(authConfig);
