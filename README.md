# Personal web security notes

This are my personal notes on understanding more about web security -- different protocols, flows and terminology

## Identity use cases

| Use case                                   | Protocol                            |      What for? |
| ------------------------------------------ | :---------------------------------- | -------------: |
| Simple Login                               | OpenID Connect or forms and cookies | Authentication |
| Single sign-on accross sites (SSO)         | OpenID Connect or SAML              | Authentication |
| Mobile app login                           | OpenID Connect                      | Authentication |
| Delegated authorization (genesis of OAuth) | OAuth 2.0                           |  Authorization |

---

## Simple login or forms authentication

This is just `username-password` auth where a user sends these credentials and the backend looks for those credentials in the database to see if they exist.

Usually we store passwords **_hashed_** in the database so the backend will verify the **_hash_** if it is the same stored in the database. Then the app will set a cookie into the web browser to keep track of that user that has logged in.

### Downsides

- Security
- Maintance

---

## The delegated authorization problem

> How can I let a website access my data without giving it my password?

## OAuth 2.0

- [Scenario](#scenario)
- [Terminology](#terminology)
- [OAuth2 flow](#oauth-2.0-flow-basic-high-level-flow) (high-level)
- [Notes](#notes)
- OAuth 2.0 flows (in-depth)
  - [Authorization grant type](#authorization-grant-type-flow-oauth2-flow)
  - [Implicit](#implicit-oauth2-flow)
  - Resource owner password credentials
  - Client credentials
- [OpenID Connect](#openid-connect)

### Scenario

> I trust _Gmail_ and I kind of trust _UnknownApp_. I want _UnknownApp_ to have access to my contacts only

1. We would have a button that says `Connect with Google`

2. When the user clicks on that button, the user will be put on _OAuth flow_. The web browser will redirect the user over to google domain to be prompted to log into their google account.

3. Over to google domain, assume user is logged in successfully, user will then be prompted to allow _UnknownApp_ have access to user's contacts, and so user has to explicitly consent granting access.

4. If users has decided not to grant access, _OAuth flow_ stops. If, yes, then the web browser redirects again back to the _UnknownApp_ at
   either `unknownapp.com/callback` or `unknownapp.com/redirectUri`

5. The _UnknownApp_ can finally talk to that specific google ap, ex. `contacts.google.com` on behalf of the user logged in.

### Terminology

- [Resource owner](#resource-owner)
- [Client](#client)
- [Authorization server](#authorization-server)
- [Resource server](#resource-server)
- [Authorization grant](#authorization-grant)
- [Redirect URI](#redirect-uri)
- [Access token](#access-token)
- [Scope](#scope)
- [Consent](#consent)

#### Resource owner

It is the user who owns the data the application wants to have access to.

#### Client

It is the application that wants to have access to that data on behalf of the user.

#### Authorization server

It is the api that authorizes the permission of an action to happen (ex. `accounts.google.com`)

#### Resource server

It is the api that holds the resource of that user for whom another application wants to have access to. (ex. `contacts.google.com`). Sometimes, the **_authorization server_** and then **_resource server_** might be the same thing, sometimes together but in the same system, but many times seperate.

#### Authorization grant

It is the thing that 'proves' that the user has allowed the app to have access to their data.

#### Redirect URI

It is the URI that the **_authorization server_** needs to know to redirect back when the _OAuth flow_ finishes.

#### Access token

It is the token that a client needs to know at the highest level.

#### Scope

The **_authorization server_** has a list of scopes that it understands.

ex.

- `contacts.read.google.com`
- `contacts.write.google.com`
- `email.read.google.com`
- `email.delete.google.com`

Permissions that make sense in the system.

Then the **_client_** decides which scopes they want access on behalf of the **_resource owner_**.

#### Consent

Depending on what **_scope_** the **_client_** asked to have access to, the **_authorization server_** generates the **_consent_** page for the **_resource owner_** to understand better about the resources that the **_client_** wants to have access to.

### OAuth 2.0 flow (basic high-level flow)

1. The **_resource owner_** using the **_client_** clicks that `Connect with Google` button.

2. Then **_client_** gets redirected to the **_authorization server_** ex. `accounts.google.com`. Right at the beginning of this flow, **_client_** passes the some configuration information that the server needs.

   - **_redirect uri_** (`unknownapp.com/callback` or `unknownapp.com/redirectUri`).
   - type of authorization grant (sometimes a code) that **_client_** wants to receive back.
   - **_scope_** which is a list of permissions.

   And the **_resource owner_** is prompted to login.

3. Assuming **_resource owner_** has logged in, the **_authorization server_** prompts the **_resource owner_** with the **_consent_** page to allow **_client_** have access to that resource.

4. If **_resource owner_** has allowed access, the **_authorization server_** redirects back to the **_client_** in that **_redirect uri_** passing the _authorization code_.

5. **_client_** goes back to the **_authorization server_** to exchange the _authorization code_ with an **_access token_**. The **_authorization server_** verifies the _authorization code_ and if valid, sends back to the **_client_** the **_access token_**. Then **_client_** has finally access to that resource on behalf of the **_resource owner_**. That **_access token_** has limited permissions depending on the **_scope_** of the initial step in the _OAuth flow_.

### Notes

> Why do we have to get an **_authorization code_** first and then exchange it with an **_access token_**, and not getting the token right away?

Some networking terminology...

- **Back channel** (highly secure channel) - an example of it might be when we make an http call to a server which goes through _https_, _ssl-encrypted_.
- **Front channel** (less secure channel) - an example of it would be a web browser which various of loopholes can be found security-wise.

Most of the steps in the _OAuth flow_ are held in the **_front channel_** (web browser). The configuration info the **_client_** sends to the **_authorization server_** are usually in the form of _query params_, and so a malicious code could actually intercept the **_authorization code_** being sent back from the **_authorization server_** to the **_client_** via the **_redirect uri_**. But the actual exchange of that code for the **_access token_** is done in the **_back channel_** (http call in the server), passing also in the body of that http request some secret key that only the **_authorization server_** and the **_client_** know. So even if the malicious code would acquire the **_authorization code_** through **_front channel_** calls, they would not be able to make the call themselves before the **_client_**, because they would not know the secret key which is passed through the body. Also, the communication between the **_client_** and the **_resource server_** is transmitted again via **_back channels_** because now the **_access token_** is considered sensitive information.

### Authorization grant type (OAuth2 flow)

**_front channel_** + **_back channel_**

#### Initiating a client

Before we send that http request to an **_authorization server_** we have to go there and create a **_client_** and that will give us two things.

- client_id
- client_secret

This information identify us to that **_authorization server_** our app wants to talk to.

The **_client_id_** is sent to the **_authorization server_** in the **_front channel_** (web browser) in a _query param_, where the **_client_secret_** is sent through the **_back channel_** in _body_

#### Starting the flow

The **_client_** sends an http request to the **_authorization server_** to get the _authorization code_ and the consent the user to give permissions on behalf of them.

```http
https://authoarization_server/oauth2? <--- the app we get access to
 client_id=abc123&
 redirect_uri=https://unknownapp.com/callback& <-- our app
 scope=profile&
 response_type=code&
 state=foobar
```

if user has logged in and consent the permissions then **_client_** gets back.

```http
https://unknownapp.com/callback?
 code=obs123Qsdr534&
 state=foobar
```

or else another response having maybe a description message in a _query param_.

#### Exchange code for an access token

The **_client_** should now exchange the _authorization code_ for the **_access token_** by sending another http request to the **_authorization server_**.

```http
POST https://authorization_server/oauth2
Content-Type: application/x-www-form-urlencoded

code=obs123Qsdr534&
client_id=abc123&
client_secret=secret123&
grant_type=authorization_code
```

and the **_authorization server_** responds back.

```json
{
  "access_token": "fFAGRNJru1FTz70BVZhT3Zg",
  "expires_in": 3920,
  "token_type": "Bearer",
  ...
}
```

#### Use the access token

The **_client_** can now use the token to talk to the **_resource server_** on behalf of the **_resource owner_** who gave permissions by attaching the **_access token_** into the _headers_

```http
GET https://resource_server/some/endpoint
Authorization: Bearer 7470ddf0-61b1-4134-b28b-ba6f5186f74b
```

### Implicit (OAuth2 flow)

**_front channel_**

The difference on that flow is that **_client_** asks only for the **_access token_**, from the **_authorization server_**, instead of the **_authorization code_** which would then exchange for the token. And that is because when we have an SPA (single page app) we do not have a backend to exchange the **_authorization code_** with the **_access token_**, so we only need the token directly, treating the whole flow through a static page.

```http
https://authoarization_server/oauth2? <--- the app we get access to
 client_id=abc123&
 redirect_uri=https://unknownapp.com/callback& <-- our app
 scope=profile&
 response_type=token& <--- we specify token instead of code
 state=foobar
```

### OpenID Connect

When we are dealing with **_authentication_** and not **_authorization_** it is better to use **_OpenID Connect_** which will give us more information about the user straight away. This is another protoccol not entirely separated by **_OAuth2_**, but rather an extension of it. The only thing that changes is the **_scope_** of the request we make to the **_authorization server_**

for example:

this is a **_authorization code oauth2 flow_** (we are asking for a code and not the token directly) but receiving and **_id token_** too.

```http
https://authoarization_server/oauth2? <--- the app we get access to
 client_id=abc123&
 redirect_uri=https://unknownapp.com/callback& <-- our app
 scope=openid profile& <--- openid scope + profile scope
 response_type=code& <--- the same authorization code
 state=foobar
```

We have added **_openid_** in the list of scopes we are asking from the **_authorization server_**. We are still receiving the **_authorization code_** which we have put into the `response_type`. When we finally exchange the code with the **_access token_** we receive the token plus an **_id token_** which contains information about the user (**_authorization_**). Note that we still have to use the **_access token_** to talk to whatever **_resource server_** we want to talk to. If **_id token_** does not contain sufficient information about the user, we can talk to `/userinfo` **_resource server_** since we already have the **_access token_** with "profile" access in the `scope`. Thus effectively we are using **_oauth2 flow_** to do **_OpenID Connect_**.

For all this to happen the **_authorization server_** needs to understand **_OpenID Connect_** protoccol.
