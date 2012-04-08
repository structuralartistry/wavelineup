class Wavelineup.Views.AccountingTransactionEdit extends Backbone.View
  tagName: 'li'

  template: JST['accounting_transactions/edit_accounting_transaction_form']

  events:
    'submit #edit_accounting_transaction': 'update_accounting_transaction'

  render: ->
    $(@el).html(@template(accounting_transaction: @model.toJSON()))
    this

  update_accounting_transaction: ->
    event.preventDefault()
    attributes =
      t_datetime: $('#edit_accounting_transaction #accounting_transaction_t_datetime').val(),
      t_type_id: $('#edit_accounting_transaction #accounting_transaction_t_type_id').val(),
      amount: $('#edit_accounting_transaction #accounting_transaction_amount').val(),
      category_id: $('#edit_accounting_transaction #accounting_transaction_category_id').val(),
      account_id: $('#edit_accounting_transaction #accounting_transaction_account_id').val(),
      note: $('#edit_accounting_transaction #accounting_transaction_note').val()
    @model.save(attributes,
      wait: true,
      success: =>
        $('#notices').html('Accounting Transaction updated by server!')
        view = new Wavelineup.Views.AccountingTransactionLineItem(model: this.model)
        $(@el).replaceWith(view.render().el)
      error: @handle_error
    )
