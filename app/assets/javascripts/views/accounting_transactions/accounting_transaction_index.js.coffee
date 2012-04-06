class Wavelineup.Views.AccountingTransactionsIndex extends Backbone.View
  el: '#container'

  template: JST['accounting_transactions/index']


  events:
    'submit #new_accounting_transaction': 'create_accounting_transaction'

  initialize: ->
    @collection.on('reset', @render, this)
    @collection.on('add', @append_accounting_transaction, this)

  render: ->
    data = { accounting_transactions: @collection.toJSON() }
    $(@el).html(@template(data))
    @collection.each(@append_accounting_transaction)
    @el

  append_accounting_transaction: (accounting_transaction) ->
    view = new Wavelineup.Views.AccountingTransaction(model: accounting_transaction)
    $('#accounting_transactions').append(view.render().el)

  create_accounting_transaction: (event) ->
    event.preventDefault()
    @collection.create(
      t_datetime: $('#new_accounting_transaction_t_datetime').val(),
      t_type: $('#new_accounting_transaction_t_type').val(),
      amount: $('#new_accounting_transaction_amount').val(),
      category_id: $('#new_accounting_transaction_category_id').val(),
      account_id: $('#new_accounting_transaction_account_id').val(),
      note: $('#new_accounting_transaction_note').val() )
    # need to clear form???
    #$('#new_accounting_transaction')[0].reset()
