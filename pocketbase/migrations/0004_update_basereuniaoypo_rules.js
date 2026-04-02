migrate(
  (app) => {
    try {
      const col = app.findCollectionByNameOrId('basereuniaoypo')
      col.listRule = "@request.auth.id != ''"
      col.viewRule = "@request.auth.id != ''"
      col.createRule = "@request.auth.id != ''"
      col.updateRule = "@request.auth.id != ''"
      col.deleteRule = "@request.auth.id != ''"
      app.save(col)
    } catch (_) {
      // Silently ignore if collection doesn't exist
    }
  },
  (app) => {
    // Down migration no-op
  },
)
