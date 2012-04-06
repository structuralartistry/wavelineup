class Wavelineup.Views.AccountingTransaction extends Backbone.View

  template: JST['accounting_transactions/accounting_transaction']

  render: ->
    $(@el).html(@template())
    this
