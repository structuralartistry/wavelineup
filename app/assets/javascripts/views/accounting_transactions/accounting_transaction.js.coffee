class Wavelineup.Views.AccountingTransaction extends Backbone.View
  tagName: 'li'

  template: JST['accounting_transactions/accounting_transaction']

  render: ->
    $(@el).html(@template(accounting_transaction: @model.toJSON()))
    this
