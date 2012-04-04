class Wavelineup.Routers.AccountingTransactions extends Backbone.Router

  routes:
    '': 'index'
    'accounting_transactions/new': 'new'
    'accounting_transactions/:id': 'show'

  initialize: ->
    @collection = new Wavelineup.Collections.AccountingTransactions()
    @collection.fetch()

  index: ->
    view = new Wavelineup.Views.AccountingTransactionsIndex(collection: @collection)
    $('#container').html(view.render().el)

  new: ->
    alert 'new Accounting Transaction'

  show: (id) ->
    alert "Accounting Transaction #{id}"
