class Wavelineup.Routers.AccountingTransactions extends Backbone.Router

  routes:
    '': 'index'
    'accounting_transactions/new': 'new'
    'accounting_transactions/:id': 'show'

  index: ->
    view = new Wavelineup.Views.AccountingTransactionsIndex()
    $('#container').html(view.render().el)

  new: ->
    alert 'new Accounting Transaction'

  show: (id) ->
    alert "Accounting Transaction #{id}"
