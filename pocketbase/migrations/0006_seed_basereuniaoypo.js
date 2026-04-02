migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('basereuniaoypo')

    try {
      app.findFirstRecordByData('basereuniaoypo', 'title', 'Reunião de Alinhamento - Q3')
    } catch (_) {
      const record1 = new Record(col)
      record1.set('title', 'Reunião de Alinhamento - Q3')
      record1.set('description', 'Discussão sobre os objetivos do trimestre e metas da equipe.')
      record1.set('status', 'Agendada')
      app.save(record1)
    }

    try {
      app.findFirstRecordByData('basereuniaoypo', 'title', 'Reunião Extraordinária - Financeiro')
    } catch (_) {
      const record2 = new Record(col)
      record2.set('title', 'Reunião Extraordinária - Financeiro')
      record2.set('description', 'Revisão do balanço patrimonial e fluxo de caixa do último mês.')
      record2.set('status', 'Concluída')
      app.save(record2)
    }
  },
  (app) => {
    try {
      const record1 = app.findFirstRecordByData(
        'basereuniaoypo',
        'title',
        'Reunião de Alinhamento - Q3',
      )
      app.delete(record1)
    } catch (_) {}

    try {
      const record2 = app.findFirstRecordByData(
        'basereuniaoypo',
        'title',
        'Reunião Extraordinária - Financeiro',
      )
      app.delete(record2)
    } catch (_) {}
  },
)
