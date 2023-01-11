# Entities

  user {
    name,
    email,
    username,
    password
  }

  token {
    token,
    expires_in
  }

  session {
    user,
    token
  }

# Services

  GET /whoami
    - expected payload {
      token
    }
    - expected response {
      name,
      email,
      token,
      session_id
    }

  POST /login
    - expected body {
      username,
      password
    }
    - expected response {
      token
    }

  POST /register
    - expected body {
      name,
      email,
      username,
      password
    }