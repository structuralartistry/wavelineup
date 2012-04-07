class Wavelineup.Views.AccountingTransactionEdit extends Backbone.View
  tagName: 'li'

  template: JST['accounting_transactions/edit_accounting_transaction_form']

  render: ->
    $(@el).html(@template(accounting_transaction: @model.toJSON()))
    this
