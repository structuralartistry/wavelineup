class Wavelineup.Views.AccountingTransactionsIndex extends Backbone.View
  el: '#container'

  template: JST['accounting_transactions/index']


  events:
    'submit #new_accounting_transaction': 'create_entry'

  initialize: ->
    @collection.on('reset', @render, this)

  render: ->
    template = @template
    data = { accounting_transactions: @collection.toJSON() }
    $(@el).html(template(data))
    #$('#container').html(template(data))

  create_entry: (event) ->
    alert event
    event.preventDefault()
    @collection.create(
      t_datetime: $('#new_accounting_transaction_t_datetime').val(),
      t_type: $('#new_accounting_transaction_t_type').val(),
      amount: $('#new_accounting_transaction_amount').val(),
      category_id: $('#new_accounting_transaction_category_id').val(),
      account_id: $('#new_accounting_transaction_account_id').val(),
      note: $('#new_accounting_transaction_note').val() )
