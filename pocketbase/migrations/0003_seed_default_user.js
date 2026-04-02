migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('users')

    // Idempotent: check if user already exists
    try {
      app.findAuthRecordByEmail('users', 'suporte@daxia.com.br')
      return // already seeded
    } catch (_) {}

    const record = new Record(users)
    record.setEmail('suporte@daxia.com.br')
    record.setPassword('Skip@Pass')
    record.setVerified(true)
    record.set('name', 'Admin')

    app.save(record)
  },
  (app) => {
    try {
      const record = app.findAuthRecordByEmail('users', 'suporte@daxia.com.br')
      app.delete(record)
    } catch (_) {}
  },
)
