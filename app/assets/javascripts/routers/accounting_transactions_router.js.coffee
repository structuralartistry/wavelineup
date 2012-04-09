class Wavelineup.Routers.AccountingTransactions extends Backbone.Router

  routes:
    '': 'index'
    # these just here for example, delete at some point
    'accounting_transactions/new': 'new'
    'accounting_transactions/:id': 'show'

  initialize: ->
    @collection = new Wavelineup.Collections.AccountingTransactions()
    @collection.fetch()

  index: ->
    view = new Wavelineup.Views.AccountingTransactionsIndex(collection: @collection)
    $('#container').html(view.render().el)

  # these just here for example, delete at some point
  new: ->
    alert 'new Accounting Transaction'

  show: (id) ->
    alert "Accounting Transaction #{id}"
