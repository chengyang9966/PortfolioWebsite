// The sign-in walkthrough shown by the TechDevX Identity diagram and listed on its case study.
export const identitySteps: { edges: string[]; text: string }[] = [
  { edges: ["authorize"], text: "TaxHacker sends the user to /oidc/auth with a PKCE challenge." },
  {
    edges: ["toLogin", "toSocial"],
    text: "The hosted login signs them in: password, magic link, or Google, GitHub or Apple.",
  },
  {
    edges: ["toDb", "toEmail"],
    text: "The session and an audit event are saved in Postgres; emails go out through Resend.",
  },
  {
    edges: ["tokens"],
    text: "The app swaps a one-time code for RS256-signed tokens and checks them against the JWKS.",
  },
  {
    edges: ["fromStripe", "toVault"],
    text: "Stripe plans arrive as an entitlement claim, and the mobile app shares the same accounts.",
  },
];
