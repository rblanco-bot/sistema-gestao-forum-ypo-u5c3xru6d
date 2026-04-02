migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('basereuniaoypo')
    col.fields.add(new TextField({ name: 'title', required: true }))
    col.fields.add(new TextField({ name: 'description', required: false }))
    col.fields.add(new TextField({ name: 'status', required: false }))
    app.save(col)
  },
  (app) => {
    const col = app.findCollectionByNameOrId('basereuniaoypo')
    col.fields.removeByName('title')
    col.fields.removeByName('description')
    col.fields.removeByName('status')
    app.save(col)
  },
)
