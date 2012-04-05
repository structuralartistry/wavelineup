class Wavelineup.Views.AccountingTransactionsIndex extends Backbone.View

  template: JST['accounting_transactions/index']

  initialize: ->
    @collection.on('reset', @render, this)

  render: ->
    template = @template
    data = { accounting_transactions: @collection.toJSON() }
    $('#container').html(template(data))

